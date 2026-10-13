import httpx
from fastapi import HTTPException
from ..config import settings
from ..schemas import ContactSchema


class Web3FormsService:
    @staticmethod
    async def send_lead(data: ContactSchema):
        if not settings.web3forms_access_key:
            return {"success": True, "message": "Preview: Web3Forms access key saknas."}

        prefix = "Offertförfrågan" if data.form_type == "quote" else "Kontaktförfrågan"
        payload = {
            "access_key": settings.web3forms_access_key,
            "subject": f"Ny {prefix}: {data.service} – {data.name}",
            "from_name": f"{data.name} ({data.form_type})",
            "name": data.name,
            "email": data.email,
            "phone": data.phone or "-",
            "customer_type": data.customer_type or "-",
            "service": data.service or "-",
            "timeframe": data.timeframe or "-",
            "message": data.message or data.details or "",
        }
        async with httpx.AsyncClient() as client:
            res = await client.post("https://api.web3forms.com/submit", json=payload, timeout=15)
            if res.status_code != 200:
                raise HTTPException(status_code=502, detail="Misslyckades att skicka via Web3Forms.")
        return {"success": True, "message": "Tack för ditt meddelande! Vi återkommer inom kort."}
