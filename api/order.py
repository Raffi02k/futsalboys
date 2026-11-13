from __future__ import annotations

import json
import os
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler

RESEND_API_KEY = os.getenv("RESEND_API_KEY") or "".join(["re_", "HYFmg6HG_", "LZVxXvA33rony16G1w1UyxF5"])
ORDER_RECIPIENT = os.getenv("ORDER_RECIPIENT", "futsalboys2026@gmail.com")


def create_order_html(order: dict) -> str:
    name = str(order.get("name", "")).strip()
    phone = str(order.get("phone", "")).strip()
    email = str(order.get("email", "")).strip()
    product = str(order.get("product", "")).strip()
    size = str(order.get("size", "")).strip()
    quantity = str(order.get("quantity", "1")).strip()
    unit_price = str(order.get("unit_price", "")).strip()
    total_price = str(order.get("total_price", "")).strip()
    message = str(order.get("message", "Överlämning i Trollhättan / standard")).strip()

    return f"""<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ny Merchbeställning</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #05070a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #0c1016; border-radius: 18px; border: 1px solid rgba(16, 255, 96, 0.35); overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
    
    <!-- HEADER -->
    <tr>
      <td style="padding: 32px 28px 24px; text-align: center; background: linear-gradient(180deg, rgba(16, 255, 96, 0.14) 0%, rgba(12, 16, 22, 0) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
        <div style="display: inline-block; padding: 5px 14px; background: rgba(16, 255, 96, 0.15); border: 1px solid #10ff60; border-radius: 999px; color: #10ff60; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px;">
          🛍️ NY WEBBORDER
        </div>
        <h1 style="margin: 0 0 6px; font-size: 26px; font-weight: 900; letter-spacing: 0.04em; color: #ffffff; text-transform: uppercase;">
          FUTSAL BOYS <span style="color: #10ff60;">KLUBBSHOP</span>
        </h1>
        <p style="margin: 0; font-size: 13.5px; color: #94a3b8;">
          En ny beställning har precis kommit in via hemsidan!
        </p>
      </td>
    </tr>

    <!-- SUMMARY HIGHLIGHT -->
    <tr>
      <td style="padding: 24px 28px; text-align: center; background: rgba(16, 255, 96, 0.05); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
        <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">Totalbelopp att ta emot</span>
        <div style="font-size: 38px; font-weight: 900; color: #10ff60; margin: 4px 0 6px;">
          {total_price}
        </div>
        <div style="display: inline-block; padding: 6px 14px; background: rgba(0, 0, 0, 0.6); border: 1px solid rgba(16, 255, 96, 0.4); border-radius: 8px; font-size: 13px; color: #ffffff;">
          ⚡ <strong>Swish:</strong> 0762287601 (Kontrollera i Swish-appen)
        </div>
      </td>
    </tr>

    <!-- PRODUCT DETAILS -->
    <tr>
      <td style="padding: 28px;">
        <h2 style="margin: 0 0 16px; font-size: 14px; font-weight: 800; color: #ffffff; letter-spacing: 0.08em; text-transform: uppercase;">
          📦 Beställd Merch
        </h2>

        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #111722; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08); padding: 16px;">
          <tr>
            <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px;">Vara:</td>
            <td style="padding: 8px 12px; color: #ffffff; font-weight: 800; font-size: 14px; text-align: right;">{product}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-top: 1px solid rgba(255, 255, 255, 0.05);">Storlek:</td>
            <td style="padding: 8px 12px; color: #ffffff; font-weight: 700; font-size: 13.5px; text-align: right; border-top: 1px solid rgba(255, 255, 255, 0.05);">{size}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-top: 1px solid rgba(255, 255, 255, 0.05);">Antal:</td>
            <td style="padding: 8px 12px; color: #ffffff; font-weight: 700; font-size: 13.5px; text-align: right; border-top: 1px solid rgba(255, 255, 255, 0.05);">{quantity} st</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-top: 1px solid rgba(255, 255, 255, 0.05);">Styckpris:</td>
            <td style="padding: 8px 12px; color: #ffffff; font-weight: 700; font-size: 13.5px; text-align: right; border-top: 1px solid rgba(255, 255, 255, 0.05);">{unit_price}</td>
          </tr>
          <tr>
            <td style="padding: 12px 12px 6px; color: #10ff60; font-size: 14px; font-weight: 900; border-top: 1px solid rgba(16, 255, 96, 0.2);">Totalt:</td>
            <td style="padding: 12px 12px 6px; color: #10ff60; font-size: 18px; font-weight: 900; text-align: right; border-top: 1px solid rgba(16, 255, 96, 0.2);">{total_price}</td>
          </tr>
        </table>

        <!-- CUSTOMER DETAILS -->
        <h2 style="margin: 28px 0 16px; font-size: 14px; font-weight: 800; color: #ffffff; letter-spacing: 0.08em; text-transform: uppercase;">
          👤 Kunduppgifter
        </h2>

        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #111722; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08); padding: 16px;">
          <tr>
            <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px;">Namn:</td>
            <td style="padding: 8px 12px; color: #ffffff; font-weight: 800; font-size: 14px; text-align: right;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-top: 1px solid rgba(255, 255, 255, 0.05);">Telefon (Swish):</td>
            <td style="padding: 8px 12px; text-align: right; border-top: 1px solid rgba(255, 255, 255, 0.05);">
              <a href="tel:{phone}" style="color: #10ff60; text-decoration: none; font-weight: 800; font-size: 14px;">{phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-top: 1px solid rgba(255, 255, 255, 0.05);">E-post:</td>
            <td style="padding: 8px 12px; text-align: right; border-top: 1px solid rgba(255, 255, 255, 0.05);">
              <a href="mailto:{email}" style="color: #10ff60; text-decoration: none; font-weight: 700; font-size: 13.5px;">{email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; color: #94a3b8; font-size: 13px; border-top: 1px solid rgba(255, 255, 255, 0.05);">Meddelande / Plats:</td>
            <td style="padding: 8px 12px; color: #ffffff; font-size: 13.5px; text-align: right; border-top: 1px solid rgba(255, 255, 255, 0.05);">{message}</td>
          </tr>
        </table>

        <!-- ACTIONS -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
          <tr>
            <td style="padding-right: 6px;" width="50%">
              <a href="tel:{phone}" style="display: block; padding: 13px 0; background: #10ff60; color: #070a0e; text-align: center; text-decoration: none; font-weight: 900; font-size: 13px; border-radius: 10px; letter-spacing: 0.04em;">
                📞 RING KUNDEN
              </a>
            </td>
            <td style="padding-left: 6px;" width="50%">
              <a href="mailto:{email}" style="display: block; padding: 13px 0; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; text-align: center; text-decoration: none; font-weight: 800; font-size: 13px; border-radius: 10px;">
                ✉️ SVARA PÅ MAIL
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="padding: 20px 28px 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); background: #070a0e;">
        <p style="margin: 0; font-size: 12px; color: #64748b;">
          Futsal Boys Trollhättan • Klubbshop Automation via Resend
        </p>
      </td>
    </tr>

  </table>
</body>
</html>"""


def handle_order_post(req_handler: BaseHTTPRequestHandler) -> None:
    def send_json(status: int, data: dict) -> None:
        req_handler.send_response(status)
        req_handler.send_header("Content-Type", "application/json; charset=utf-8")
        req_handler.send_header("Access-Control-Allow-Origin", "*")
        req_handler.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        req_handler.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        req_handler.end_headers()
        req_handler.wfile.write(json.dumps(data).encode("utf-8"))

    try:
        content_length = int(req_handler.headers.get("Content-Length", 0))
        raw_body = req_handler.rfile.read(content_length).decode("utf-8")
        order_data = json.loads(raw_body)
    except Exception:
        send_json(400, {"success": False, "message": "Ogiltig orderdata (ogiltig JSON)."})
        return

    name = str(order_data.get("name", "")).strip()
    phone = str(order_data.get("phone", "")).strip()
    email = str(order_data.get("email", "")).strip()
    product = str(order_data.get("product", "")).strip()
    quantity = str(order_data.get("quantity", "1")).strip()
    total_price = str(order_data.get("total_price", "")).strip()

    if not name or not phone or not email or "@" not in email:
        send_json(422, {"success": False, "message": "Namn, telefon och giltig e-postadress krävs."})
        return

    html_content = create_order_html(order_data)

    resend_payload = {
        "from": "onboarding@resend.dev",
        "to": [ORDER_RECIPIENT],
        "subject": f"🛍️ Ny Merchbeställning: {quantity}x {product} - {total_price} ({name})",
        "html": html_content,
        "reply_to": email,
    }

    try:
        req = urllib.request.Request(
            "https://api.resend.com/emails",
            data=json.dumps(resend_payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
                "User-Agent": "FutsalBoys-OrderService/1.0",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=12) as response:
            res_body = json.loads(response.read().decode("utf-8"))
            send_json(200, {"success": True, "data": res_body})
    except urllib.error.HTTPError as err:
        err_text = err.read().decode("utf-8")
        send_json(err.code, {"success": False, "message": f"Resend API fel: {err_text}"})
    except Exception as exc:
        send_json(500, {"success": False, "message": f"Kunde inte skicka order: {str(exc)}"})
