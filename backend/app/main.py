from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler
from .config import settings
from .schemas import ContactSchema
from .rate_limiter import limiter
from .services.lead_dispatcher import LeadDispatcher

app = FastAPI(title="MediaMagnet Website API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "provider": settings.form_provider,
        "web3forms": "configured" if bool(settings.web3forms_access_key) else "missing",
        "crm": "configured" if bool(settings.mediamagnet_crm_endpoint) else "missing",
    }


@app.post("/api/contact")
@limiter.limit("5/minute")
async def handle_contact(request: Request, body: ContactSchema):
    # Spamkontroll via honeypot
    if body.website_url:
        return {"success": True, "message": "Meddelande mottaget."}
    return await LeadDispatcher.dispatch(body)
