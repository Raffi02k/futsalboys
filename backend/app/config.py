import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    frontend_url: str = os.getenv("FRONTEND_URL", "*")
    form_provider: str = os.getenv("FORM_PROVIDER", "web3forms")  # "web3forms" eller "crm"
    web3forms_access_key: str = os.getenv("WEB3FORMS_ACCESS_KEY", "")
    mediamagnet_crm_api_key: str = os.getenv("MEDIAMAGNET_CRM_API_KEY", "")
    mediamagnet_crm_endpoint: str = os.getenv("MEDIAMAGNET_CRM_ENDPOINT", "")
    project_id: str = os.getenv("PROJECT_ID", "mediamagnet-template")

    class Config:
        env_file = ".env"


settings = Settings()
