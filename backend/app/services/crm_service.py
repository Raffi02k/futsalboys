import httpx
from fastapi import HTTPException
from ..config import settings
from ..schemas import ContactSchema


class CRMService:
    @staticmethod
    async def send_lead(data: ContactSchema):
        if not settings.mediamagnet_crm_endpoint or not settings.mediamagnet_crm_api_key:
            return {"success": True, "message": "Preview: CRM-konfiguration saknas."}

        headers = {"Authorization": f"Bearer {settings.mediamagnet_crm_api_key}"}
        payload = {
            "project_id": settings.project_id,
            **data.model_dump(),
        }
        async with httpx.AsyncClient() as client:
            res = await client.post(settings.mediamagnet_crm_endpoint, json=payload, headers=headers, timeout=15)
            if res.status_code not in (200, 201):
                raise HTTPException(status_code=502, detail="Misslyckades att registrera lead i CRM.")
        return {"success": True, "message": "Tack! Din förfrågan har registrerats."}
