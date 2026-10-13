from __future__ import annotations

import json
import os
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
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
