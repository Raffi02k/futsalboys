# Vercel Distribution & Deployment Guide

Detta projekt är förberett för direkt driftsättning på **Vercel** med både frontend (React + Vite SPA) och serverless backend (`/api/contact.py`).

## 1. Miljövariabler (Environment Variables)

Ställ in följande under **Project Settings > Environment Variables** i Vercel:

| Variabel | Beskrivning | Exempel |
|---|---|---|
| `FORM_PROVIDER` | Val av lead-leverantör (`web3forms` eller `crm`) | `web3forms` |
| `WEB3FORMS_ACCESS_KEY` | Din access key från Web3Forms (om Web3Forms används) | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `CRM_API_URL` | Endpoint till eget CRM (om CRM används) | `https://crm.mediamagnet.se/api/leads` |
| `CRM_API_KEY` | API-nyckel för CRM | `secret_crm_key` |
| `PROJECT_ID` | Projektidentifierare för CRM | `mediamagnet-template` |
| `VITE_API_BASE_URL` | Frontend API-url (lämna tom för samma domän på Vercel) | `` |

## 2. Serverless Python Arkitektur

- Pinned Python version: `.python-version` är satt till `3.12` för att förhindra problem med experimentell Python 3.14.
- Zero external pip dependencies i serverless API: `api/contact.py` och `api/health.py` använder Pythons standardbibliotek med `BaseHTTPRequestHandler`, vilket garanterar 100% snabba starter och noll kompileringsfel.
- Inbyggd in-memory IP rate limiting och honeypot skydd mot spamrobotar.
