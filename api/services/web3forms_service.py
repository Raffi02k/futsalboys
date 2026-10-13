from __future__ import annotations

import json
import urllib.error
import urllib.request
from ..schemas import LeadPayload, SubmissionResult


class Web3FormsService:
    ENDPOINT = "https://api.web3forms.com/submit"

    def __init__(self, access_key: str) -> None:
        self.access_key = access_key

    def submit(self, payload: LeadPayload) -> SubmissionResult:
        if not self.access_key:
            return SubmissionResult(
                status="preview",
                message="Formuläret är validerat men WEB3FORMS_ACCESS_KEY saknas i miljövariablerna.",
            )

        subject_prefix = "Offertförfrågan" if payload.form_type == "quote" else "Kontaktförfrågan"
        body = {
            "access_key": self.access_key,
            "subject": f"Ny {subject_prefix}: {payload.service or payload.name}",
            "from_name": f"{payload.name} ({payload.form_type.capitalize()})",
            "name": payload.name,
            "email": payload.email,
            "phone": payload.phone or "-",
            "company": payload.company or "-",
            "customer_type": payload.customer_type or "-",
            "service": payload.service or "-",
            "timeframe": payload.timeframe or "-",
            "websiteUrl": payload.websiteUrl or "-",
            "message": payload.message,
        }
        if payload.budget:
            body["budget"] = payload.budget
        if payload.timeline:
            body["timeline"] = payload.timeline

        req = urllib.request.Request(
            self.ENDPOINT,
            data=json.dumps(body).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "MediaMagnet-Backend/1.0",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                if not res_data.get("success"):
                    raise RuntimeError(res_data.get("message", "Web3Forms submission failed"))
        except urllib.error.HTTPError as exc:
            raise RuntimeError(f"Web3Forms HTTP Error {exc.code}") from exc

        return SubmissionResult(
            status="sent",
            message="Tack! Din förfrågan har skickats. Vi återkommer så snart vi kan.",
        )
