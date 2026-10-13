from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.request
from collections import defaultdict, deque
from http.server import BaseHTTPRequestHandler

# In-memory IP rate limiting
RATE_WINDOW_SECONDS = 15 * 60
RATE_LIMIT = 5
REQUESTS: dict[str, deque[float]] = defaultdict(deque)


def is_rate_limited(ip: str) -> bool:
    now = time.time()
    attempts = REQUESTS[ip]
    while attempts and now - attempts[0] > RATE_WINDOW_SECONDS:
        attempts.popleft()
    if len(attempts) >= RATE_LIMIT:
        return True
    attempts.append(now)
    return False


def send_to_web3forms(payload: dict, access_key: str) -> dict:
    form_type = payload.get("form_type", "contact")
    name = payload.get("name", "")
    prefix = "Offertförfrågan" if form_type == "quote" else "Kontaktförfrågan"
    service = payload.get("service") or "Allmänt"

    body_data = {
        "access_key": access_key,
        "subject": f"Ny {prefix}: {service} – {name}",
        "from_name": f"{name} ({form_type.capitalize()})",
        "name": name,
        "email": payload.get("email", ""),
        "phone": payload.get("phone") or "-",
        "company": payload.get("company") or "-",
        "customer_type": payload.get("customer_type") or payload.get("customerType") or "-",
        "service": service,
        "timeframe": payload.get("timeframe") or "-",
        "message": payload.get("message") or payload.get("details") or "",
    }
    if payload.get("budget"):
        body_data["budget"] = payload["budget"]

    req = urllib.request.Request(
        "https://api.web3forms.com/submit",
        data=json.dumps(body_data).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "MediaMagnet-Backend/1.0",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=15) as res:
        return json.loads(res.read().decode("utf-8"))


def send_to_crm(payload: dict, crm_url: str, api_key: str, project_id: str) -> None:
    body = {
        "project_id": project_id,
        **payload,
    }
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "MediaMagnet-Backend/1.0",
    }
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"

    req = urllib.request.Request(
        crm_url,
        data=json.dumps(body).encode("utf-8"),
        headers=headers,
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=15) as res:
        if res.status >= 400:
            raise RuntimeError(f"CRM returned status {res.status}")


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status: int, data: dict) -> None:
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_POST(self) -> None:
        # 1. IP Rate Limiting
        forwarded = self.headers.get("x-forwarded-for", "")
        ip = forwarded.split(",")[0].strip() if forwarded else (self.client_address[0] if self.client_address else "unknown")

        if is_rate_limited(ip):
            self._send_json(429, {"status": "error", "message": "För många försök. Vänligen vänta en stund och prova igen."})
            return

        # 2. Parse JSON body
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            raw_body = self.rfile.read(content_length).decode("utf-8")
            payload = json.loads(raw_body)
        except Exception:
            self._send_json(400, {"status": "error", "message": "Ogiltig förfrågan (ogiltig JSON)."})
            return

        # 3. Honeypot check for bots
        if payload.get("website") or payload.get("website_url"):
            self._send_json(200, {"status": "accepted", "message": "Tack för ditt meddelande."})
            return

        name = str(payload.get("name", "")).strip()
        email = str(payload.get("email", "")).strip()
        phone = str(payload.get("phone", "")).strip()
        message = str(payload.get("message") or payload.get("details") or "").strip()

        if len(name) < 1 or "@" not in email or (len(message) < 2 and len(phone) < 3):
            self._send_json(422, {"status": "error", "message": "Vänligen fyll i namn, giltig e-post samt telefon eller meddelande."})
            return

        provider = os.getenv("FORM_PROVIDER", "").strip().lower()
        web3forms_key = os.getenv("WEB3FORMS_ACCESS_KEY", "").strip()
        crm_url = os.getenv("CRM_API_URL", "").strip()
        crm_key = os.getenv("CRM_API_KEY", "").strip()
        project_id = os.getenv("PROJECT_ID", "mediamagnet-template").strip()

        # 4. Dispatch: Web3Forms
        if provider == "web3forms" or (not provider and web3forms_key):
            if not web3forms_key:
                self._send_json(200, {
                    "status": "preview",
                    "message": "Formuläret är validerat. WEB3FORMS_ACCESS_KEY saknas i miljövariablerna (test/preview läge).",
                })
                return

            try:
                result = send_to_web3forms(payload, web3forms_key)
                if not result.get("success"):
                    self._send_json(502, {"status": "error", "message": "Kunde inte skicka förfrågan via Web3Forms."})
                    return
            except Exception as exc:
                self._send_json(502, {"status": "error", "message": f"Formulärtjänsten svarade inte: {str(exc)}"})
                return

            self._send_json(200, {"status": "sent", "message": "Tack! Din förfrågan har mottagits. Vi återkommer så snart vi kan."})
            return

        # 5. Dispatch: MediaMagnet CRM
        elif provider == "crm" or (not provider and crm_url):
            if not crm_url:
                self._send_json(200, {
                    "status": "preview",
                    "message": "Formuläret är validerat. CRM_API_URL saknas i miljövariablerna (test/preview läge).",
                })
                return

            try:
                send_to_crm(payload, crm_url, crm_key, project_id)
            except Exception as exc:
                self._send_json(502, {"status": "error", "message": f"Kunde inte registrera lead i CRM: {str(exc)}"})
                return

            self._send_json(200, {"status": "sent", "message": "Tack! Din förfrågan har registrerats i CRM."})
            return

        # Fallback / Preview (e.g. during dev without keys)
        self._send_json(200, {
            "status": "sent",
            "message": "Tack! Din förfrågan har tagits emot (simulerat testläge).",
        })
