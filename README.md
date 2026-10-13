# ⚽ Futsal Boys – Officiell Webbplats & Truppportal

Officiell webbapplikation för **Futsal Boys (Trollhättan)**. Byggd med energifylld sportestetik, interaktiv truppkarusell, matchcenter, Instagram-integration och produktionsklar driftsättning via Vercel Multi-Services.

---

## ⚡ Funktioner & Design

- **Hero & Ledartrio**: "LEADERS OF THE CLUB" med klubbledarna (*Raffi Medz*, *Elvis Mesic*, *Marcelo Villa*), optimerad för att alltid ligga snyggt på en rad i mobilen.
- **Interaktiv Spelartrupp**: Chelsea FC-inspirerad karusell med:
  - Fri horisontell scroll, drag-to-scroll och touch-swipe.
  - Center-snapping och dynamisk förstoring med neon-aura (`#10FF60`) på aktiv spelare.
  - Snabbfiltrering per position (*Forward*, *Mittfält*, *Försvar*, *Målvakt*).
  - Skärmläge som alltid håller sidans vertikala scroll position i toppen vid laddning.
- **Oändlig Match-Ticker**: Sömlös löpande textremsa i sportstil med arena-, liga- och klubbinfo som rullar i en jämn loop utan att pausas av hover.
- **Matchcenter & Nyheter**:
  - Nästa match mot *Riverdale FC* i Arena Älvhögsborg.
  - Interaktiv nyhetsläsare med matchrapporter och analys.
  - Merch-teaser för officiella supportertröjor.
- **Instagram-Integration**: Profilkort baserat på klubbens officiella konto ([@grabbarna.futsal](https://www.instagram.com/grabbarna.futsal/)) med aktuell bio, följarantal och bildgalleri.
- **Footer & Varumärke**:
  - Klickbar Futsal Boys-logga med mjuk scroll-to-top.
  - Kontakt till `raffi9998@gmail.com`.
  - Media Magnet-partnerbadge med responsiv skalning och hovring.

---

## 🛠️ Teknisk Arkitektur

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Vanilla CSS (`frontend/src/styles/global.css`) med ett skräddarsytt dark-mode färg- och typsnittssystem (*Bebas Neue*, *Teko*, *Montserrat*, *Inter*) och neon-accenter.
- **Ikoner**: `lucide-react`
- **Routing**: `react-router-dom`

### Vercel Multi-Services (`vercel.json`)
Projektet är konfigurerat som ett Vercel-projekt med flera oberoende tjänster:
- **`frontend`** (Vite SPA): Servar den publika webbplatsen på `/(.*)`.
- **`api`** (Python Serverless): Publik API-gateway på `/api/(.*)` med rate limiting och stöd för intern service-binding.
- **`backend`** (FastAPI): Intern mikrotjänst för affärslogik och lead dispatching, ansluten via Vercel binding (`BACKEND_URL`).

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "api": {
      "root": "api",
      "runtime": "python",
      "entrypoint": "index.py",
      "bindings": [
        {
          "type": "service",
          "service": "backend",
          "format": "url",
          "env": "BACKEND_URL"
        }
      ]
    },
    "backend": {
      "root": "backend",
      "framework": "fastapi",
      "entrypoint": "main.py"
    },
    "frontend": {
      "root": "frontend",
      "framework": "vite"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": {
        "service": "api"
      }
    },
    {
      "source": "/(.*)",
      "destination": {
        "service": "frontend"
      }
    }
  ]
}
```

---

## 💻 Lokal Utveckling

### 1. Installera frontend-beroenden
```bash
cd frontend
npm install
```

### 2. Starta utvecklingsservern
```bash
npm run dev
```

### 3. Bygg för produktion
```bash
npm run build
```

---

## 🚀 Driftsättning på Vercel

1. Pusha ändringarna till `main`-branschen:
   ```bash
   git push origin main
   ```
2. Vercel bygger och deployar automatiskt alla tre tjänsterna (`frontend`, `api`, `backend`) baserat på [vercel.json](file:///Users/raffimedz/Desktop/Raffi/afterschool/hemsidor/futsalboys/vercel.json).
3. Vid behov av formulär- och kontaktutskick kan följande miljövariabler sättas i Vercel Dashboard:
   - `FORM_PROVIDER`: `web3forms` eller `crm`
   - `WEB3FORMS_ACCESS_KEY`: Din Web3Forms-nyckel
   - `CRM_API_URL` & `CRM_API_KEY`: Vid integration med externt CRM

---

## 📄 Licens & Upphovsrätt
© Futsal Boys Trollhättan. Utvecklad i samarbete med [Media Magnet](https://mediamagnet.se).
