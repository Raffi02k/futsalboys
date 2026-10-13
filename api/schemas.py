from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class LeadPayload:
    name: str
    email: str
    phone: str = ""
    company: str = ""
    customer_type: str = "private"
    service: str = "Allmänt"
    timeframe: str = ""
    message: str = ""
    websiteUrl: str = ""
    budget: str = ""
    timeline: str = ""
    form_type: str = "contact"
    website: str = ""  # Honeypot

    def validate(self) -> tuple[bool, str]:
        if self.website:
            return True, ""  # Honeypot silently accepted
        if not self.name or len(self.name.strip()) < 1:
            return False, "Namn är obligatoriskt."
        if not self.email or "@" not in self.email:
            return False, "En giltig e-postadress krävs."
        return True, ""


@dataclass
class SubmissionResult:
    status: str  # 'sent', 'preview', 'error'
    message: str
