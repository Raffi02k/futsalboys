from ..config import settings
from ..schemas import ContactSchema
from .crm_service import CRMService
from .web3forms_service import Web3FormsService


class LeadDispatcher:
    @staticmethod
    async def dispatch(data: ContactSchema):
        if settings.form_provider == "crm":
            return await CRMService.send_lead(data)
        return await Web3FormsService.send_lead(data)
