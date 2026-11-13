from __future__ import annotations

import os
import sys
import urllib.request
from pathlib import Path
from http.server import BaseHTTPRequestHandler

# Ensure current dir is in sys.path for robust imports in Vercel
_current_dir = Path(__file__).resolve().parent
if str(_current_dir) not in sys.path:
    sys.path.insert(0, str(_current_dir))

try:
    from health import handler as HealthHandler
    from contact import handler as ContactHandler
    from order import handle_order_post
except ImportError:
    from .health import handler as HealthHandler
    from .contact import handler as ContactHandler
    from .order import handle_order_post


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self) -> None:
        backend_url = os.getenv("BACKEND_URL", "").strip().rstrip("/")
        if backend_url:
            path = self.path
            target = f"{backend_url}{path}" if path.startswith("/api") else f"{backend_url}/api{path}"
            try:
                req = urllib.request.Request(
                    target,
                    headers={"Accept": "application/json", "User-Agent": "MediaMagnet-APIGateway/1.0"},
                    method="GET",
                )
                with urllib.request.urlopen(req, timeout=10) as res:
                    self.send_response(res.status)
                    self.send_header("Content-Type", "application/json; charset=utf-8")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    self.wfile.write(res.read())
                    return
            except Exception:
                pass
        HealthHandler.do_GET(self)

    def do_POST(self) -> None:
        if "/order" in self.path:
            handle_order_post(self)
        else:
            ContactHandler.do_POST(self)


__all__ = ["handler"]
