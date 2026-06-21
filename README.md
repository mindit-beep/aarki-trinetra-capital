# AarKi Trinetra Capital

### Capital. Vision. Scale.

A strategic capital facilitation dashboard built for AarKi Trinetra Capital — a next-generation advisory firm operating across India's most dynamic sectors.

## Features

### 📊 Deal Pipeline Dashboard
- Kanban-style board with 7 pipeline stages
- Full CRUD: Add, Edit, View, Delete deals
- Charts: Pipeline by stage, sector distribution
- Search & Filter by keyword, sector, stage
- Persistent storage via SQLite + Prisma

### 📈 Sector Research Reports
- 6 pre-built intelligence reports across 8 sectors
- Expandable full reports with market data
- Add custom reports
- Search and filter by sector

### ✉️ Outreach & Proposal Templates
- 11 professional templates in 4 categories
- Email templates: Investor outreach, developer outreach, follow-ups, MOU dispatch, PSU introductions
- Proposals: Real Estate, Renewable Energy, Infrastructure
- One-Pagers: Company, RE sector, Energy sector
- Copy-to-clipboard with variable placeholders

## Sectors Covered
1. Real Estate & Strategic Assets
2. Investment & Capital Facilitation
3. Renewable Energy & Green Infrastructure
4. EPC & Infrastructure
5. DPR, Feasibility & Technical
6. Loan & Structured Finance
7. Aviation & Aerospace
8. IT & Digital Infrastructure

## Tech Stack
- **Frontend:** Vite + React + TypeScript + Tailwind CSS
- **UI:** shadcn/ui components
- **Backend:** Hono (server.tsx) + Prisma 7 + SQLite
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
bun install

# Run the app
bun run dev

# The app will be available at http://localhost:5173
# The API will be available at http://localhost:3001
```

## Project Structure
```
├── src/
│   ├── App.tsx                 # Main app with navigation
│   ├── components/
│   │   ├── DealPipeline.tsx    # Deal pipeline dashboard
│   │   ├── SectorResearch.tsx  # Sector research reports
│   │   └── OutreachTemplates.tsx # Outreach templates
│   └── ui/                     # shadcn/ui components
├── prisma/
│   └── schema.prisma           # Database schema
├── server.tsx                  # Backend API (auto-generated)
└── custom-routes.ts            # Custom API routes
```

## Website
[www.aarkitrinetracapital.com](https://www.aarkitrinetracapital.com)

---

**AarKi Trinetra Capital** — Founded by Aadi Joshy
*Advisory & Facilitation Model | NCNDA-Governed | Success-Based Fees*