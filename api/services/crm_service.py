from __future__ import annotations

import json
import urllib.error
import urllib.request
from ..schemas import LeadPayload, SubmissionResult


class CRMService:
    def __init__(self, api_url: str, api_key: str = "", project_id: str = "painting-project") -> None:
        self.api_url = api_url
        self.api_key = api_key
        self.project_id = project_id

    def submit(self, payload: LeadPayload) -> SubmissionResult:
        if not self.api_url:
            return SubmissionResult(
                status="preview",
                message="Formuläret är validerat men CRM_API_URL saknas i miljövariablerna.",
            )

        body = {
            "project_id": self.project_id,
            "form_type": payload.form_type,
            "name": payload.name,
            "email": payload.email,
            "phone": payload.phone,
            "company": payload.company,
            "customer_type": payload.customer_type,
            "service": payload.service,
            "timeframe": payload.timeframe,
            "websiteUrl": payload.websiteUrl,
            "budget": payload.budget,
            "timeline": payload.timeline,
            "message": payload.message,
        }
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "MediaMagnet-Backend/1.0",
        }
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"

        req = urllib.request.Request(
            self.api_url,
            data=json.dumps(body).encode("utf-8"),
            headers=headers,
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                if response.status >= 400:
                    raise RuntimeError(f"CRM returned status {response.status}")
        except urllib.error.HTTPError as exc:
            raise RuntimeError(f"CRM HTTP Error {exc.code}") from exc

        return SubmissionResult(
            status="sent",
            message="Tack! Din förfrågan har registrerats i vårt CRM.",
        )
