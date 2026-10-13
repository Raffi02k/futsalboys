from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    environment: str = os.getenv("ENVIRONMENT", "development")

    # Form Provider: 'web3forms', 'crm', or 'smtp'
    form_provider: str = os.getenv("FORM_PROVIDER", "").strip().lower()

    # Web3Forms
    web3forms_access_key: str = os.getenv("WEB3FORMS_ACCESS_KEY", "").strip()

    # MediaMagnet CRM
    crm_api_url: str = os.getenv("CRM_API_URL", "").strip()
    crm_api_key: str = os.getenv("CRM_API_KEY", "").strip()
    project_id: str = os.getenv("PROJECT_ID", "mediamagnet-template").strip()

    # SMTP (valfri fallback)
    contact_to_email: str = os.getenv("CONTACT_TO_EMAIL", "").strip()
    smtp_host: str = os.getenv("SMTP_HOST", "").strip()
    smtp_port: int = int(os.getenv("SMTP_PORT", "587"))
    smtp_username: str = os.getenv("SMTP_USERNAME", "").strip()
    smtp_password: str = os.getenv("SMTP_PASSWORD", "").strip()
    smtp_from_email: str = os.getenv("SMTP_FROM_EMAIL", "").strip()
    smtp_use_tls: bool = os.getenv("SMTP_USE_TLS", "true").lower() in {"1", "true", "yes"}

    dist_path: Path = Path(__file__).resolve().parent.parent / "frontend" / "dist"

    @property
    def is_smtp_configured(self) -> bool:
        return bool(self.contact_to_email and self.smtp_host and self.smtp_from_email)

    @property
    def effective_provider(self) -> str:
        if self.form_provider:
            return self.form_provider
        if self.web3forms_access_key:
            return "web3forms"
        if self.crm_api_url:
            return "crm"
        if self.is_smtp_configured:
            return "smtp"
        return "preview"


settings = Settings()
