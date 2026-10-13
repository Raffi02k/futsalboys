# MediaMagnet Template – Företagswebbplats & Lead-Generering

En komplett, professionell och produktionsklar företagswebbplats byggd enligt **MediaMagnets master-arkitektur**

Webbplatsen är designad som en modulär **template** som enkelt kan användas för framtida projekt genom att endast uppdatera innehåll, logotyp och bilder.

---

## 🎨 Visuell Identitet & Design

- **Typografi**: Google Fonts `Bricolage Grotesque` (rubriker/display) & `Instrument Sans` (brödtext).
- **Färgpalett**: Mörk hantverkspalett med djupblå bakgrund (`#0e1622`), krispiga mörka ytor (`#1c242f`), stålblå accent (`#5e8cd1`) och gyllengula konverteringsaccenter (`#e5b800`).
- **Formulär (LeadConnector-stil)**: Centrerad kortlayout (`max-w-md`), mjuk droppskugga, rundade hörn, stacked inputs med distinkt fokusring, honeypot spam-skydd och fullbredds konverteringsknapp.
- **Hero Video**: Autoplay loopande video med fallback-poster för blixtsnabb LCP utan layout-shift.
- **ReviewsRail**: Sömlöst rullande horisontell marquee med Google-recensioner, stjärnbetyg och betygssammanfattning.
- **Before & After Showcase**: Visuell jämförelse av tak- och ytrenoveringar.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Routing**: `react-router-dom` (multi-route SPA)
- **Styling**: Handbyggd responsiv Vanilla CSS (`frontend/src/styles/global.css`) med CSS-variabler och micro-animationer.
- **Ikoner**: `lucide-react`

### Backend & API
- **Vercel Serverless (`api/`)**: Zero-dependency Python 3.12 handler (`BaseHTTPRequestHandler`) för att eliminera risken för Rust/Python 3.14-kompileringskrascher.
- **Fristående Backend (`backend/`)**: FastAPI-applikation för lokal utveckling eller Docker-containers.
- **Lead Dispatching**: Stöd för Web3Forms, MediaMagnet CRM och SMTP.

---

## 🚀 Hur du anpassar denna mall för nya projekt

All data är samlad i `frontend/src/content/`:
1. **Företagsuppgifter & SEO**: Redigera `frontend/src/content/siteContent.ts` (namn, telefon, e-post, adress, öppettider, länkar).
2. **Tjänster**: Redigera `frontend/src/content/services.ts` (lägg till/ta bort tjänster, beskrivningar och process-steg).
3. **Kundomdömen**: Redigera `frontend/src/content/reviews.ts` (namn, betyg, citat).
4. **Projekt & Galleri**: Redigera `frontend/src/content/projects.ts` (bilder, kategorier, före/efter-foton).
5. **Formuläralternativ**: Redigera `frontend/src/content/quoteOptions.ts` (kundtyper, tjänstekategorier, tidsramar).
6. **Bilder & Logotyper**: Byt ut loggan i `frontend/public/brand/` och bilderna i `frontend/public/media/`.

---

## 💻 Installation & Lokal Utveckling

### 1. Installera frontend-beroenden
```bash
cd frontend
npm install
```

### 2. Starta utvecklingsservern
```bash
npm run dev
```
Webbplatsen startar på `http://localhost:5173`.

### 3. Bygg för produktion
```bash
npm run build
```

---

## ☁️ Driftsättning på Vercel

1. Pusha projektet till ditt Git-arkiv.
2. Importera projektet i Vercel.
3. `vercel.json` och `.python-version` är förkonfigurerade för automatisk installation och build.
4. Lägg till miljövariabler i Vercel Dashboard:
   - `FORM_PROVIDER`: `web3forms` eller `crm`
   - `WEB3FORMS_ACCESS_KEY`: Din Web3Forms-nyckel
   - `CRM_API_URL` / `CRM_API_KEY`: Vid anslutning till MediaMagnet CRM.

Läs mer i [VERCEL_DEPLOY.md](file:///Users/raffimedz/Desktop/Raffi/afterschool/hemsidor/painting/VERCEL_DEPLOY.md).
