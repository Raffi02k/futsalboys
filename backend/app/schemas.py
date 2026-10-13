from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class ContactSchema(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = Field(default="", min_length=0)
    message: str = Field(default="", min_length=0)
    customer_type: Optional[str] = "private"
    service: Optional[str] = "Allmänt"
    timeframe: Optional[str] = None
    details: Optional[str] = None
    form_type: Optional[str] = "contact"
    website_url: str = ""  # Honeypot field
