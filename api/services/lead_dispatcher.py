from __future__ import annotations

from ..config import settings
from ..schemas import LeadPayload, SubmissionResult
from .crm_service import CRMService
from .email_service import EmailService
from .web3forms_service import Web3FormsService


class LeadDispatcher:
    def __init__(self) -> None:
        self.web3forms_service = Web3FormsService(settings.web3forms_access_key)
        self.crm_service = CRMService(
            api_url=settings.crm_api_url,
            api_key=settings.crm_api_key,
            project_id=settings.project_id,
        )
        self.email_service = EmailService()

    def dispatch(self, payload: LeadPayload) -> SubmissionResult:
        provider = settings.effective_provider

        if provider == "crm":
            return self.crm_service.submit(payload)
        elif provider == "web3forms":
            return self.web3forms_service.submit(payload)
        elif provider == "smtp":
            return self.email_service.submit(payload)

        return SubmissionResult(
            status="preview",
            message="Formuläret är validerat men ingen leverantör (Web3Forms/CRM/SMTP) är aktiverad på servern.",
        )


lead_dispatcher = LeadDispatcher()
