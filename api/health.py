from __future__ import annotations

import json
import os
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        backend_url = os.getenv("BACKEND_URL", "").strip().rstrip("/")
        if backend_url:
            import urllib.request
            try:
                req = urllib.request.Request(
                    f"{backend_url}/api/health",
                    headers={"Accept": "application/json", "User-Agent": "MediaMagnet-APIGateway/1.0"},
                    method="GET",
                )
                with urllib.request.urlopen(req, timeout=10) as res:
                    res_body = res.read()
                    self.send_response(res.status)
                    self.send_header("Content-Type", "application/json; charset=utf-8")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    self.wfile.write(res_body)
                    return
            except Exception:
                pass

        provider = os.getenv("FORM_PROVIDER", "").strip().lower()
        if not provider:
            if os.getenv("WEB3FORMS_ACCESS_KEY"):
                provider = "web3forms"
            elif os.getenv("CRM_API_URL"):
                provider = "crm"
            else:
                provider = "preview"

        data = {
            "status": "ok",
            "provider": provider,
            "web3forms": "configured" if bool(os.getenv("WEB3FORMS_ACCESS_KEY")) else "missing",
            "crm": "configured" if bool(os.getenv("CRM_API_URL")) else "missing",
        }
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))
