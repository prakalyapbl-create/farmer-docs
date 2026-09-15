# Farmer Docx 🌾🌐

**Understand Your Agricultural Loan Documents in Simple Language**

Farmer Docx is a full-stack, production-ready web application built for the **Smart India Hackathon AGR-09** problem statement (*Farmer Loan Document Explainer with Rural Accessibility through Area-Admin Proxy Access*).

---

## 🌟 Key Features

1. **Multilingual Architecture (13 Indian Languages)**
   - Supports English, Assamese, Bengali, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Odia, Punjabi, and Gujarati.
   - Onboarding wizard with native script location selectors (e.g. Assam districts in Assamese: *কামৰূপ, নগাঁও, দৰং*).
   - Dynamic language switching without requiring logout.
   - Strict language-isolated AI answers.

2. **Document Explainer & Authenticity Screening**
   - 12 Document categories supported.
   - 10-Tab detailed breakdown (Summary, Loan Details, Interest Rate & Subsidies, Repayment Schedule, Fees, Eligibility, Dates, Missing Info, Simple Localized Explanation, Sources).
   - 17-Point Preliminary Authenticity Assessment with legal disclaimers.

3. **RAG Knowledge Base & AI Assistant**
   - Grounded in official NABARD, PMFBY, and RBI circulars with source citations.
   - Gemini API integration with automatic Demo Mode fallback.

4. **Rural Accessibility ("Call 434" Telephony Simulator)**
   - Common number 434 IVR call simulator.
   - Village $\rightarrow$ Taluk $\rightarrow$ Area Admin auto-mapping.
   - Dual-language proxy workbench for Area Admins.

---

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js 14+ (App Router, TypeScript), Tailwind CSS, Lucide Icons
- **Database & ORM**: PostgreSQL / SQLite with Prisma ORM
- **Authentication**: JWT & Session Cookies, role-based auth (`FARMER`, `AREA_ADMIN`, `SUPER_ADMIN`, `BANK_OFFICER`)
- **i18n Engine**: Custom production-ready i18n Context supporting 13 translation dictionaries

---

## 🚀 How to Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `farmer-docx`).

2. In your terminal, run:

```bash
cd C:\Users\PrakalyaVadivelu\.gemini\antigravity\scratch\farmer-docx

# Add your GitHub remote repository URL
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/farmer-docx.git

# Set main branch and push
git branch -M main
git push -u origin main
```

---

## ☁️ Deployment Instructions

### Deploy to Vercel

1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Configure Environment Variables in Vercel settings:
   - `DATABASE_URL`: Your production PostgreSQL database URL (or Supabase/Neon URL).
   - `AUTH_SECRET`: Secret JWT key.
   - `AI_API_KEY`: (Optional) Gemini API key.
3. Build Command: `prisma generate && next build`
4. Click **Deploy**.

### Deploy to Render / Railway

1. Connect your repository to Render or Railway.
2. Add PostgreSQL service.
3. Set Environment Variable: `DATABASE_URL`
4. Run migration command: `npx prisma db push && npx tsx prisma/seed.ts`
5. Start command: `npm start`

---

## 🔑 Demo Login Credentials

- **Farmer**: Mobile `9876543210` | Password `farmer123`
- **Area Admin**: Mobile `9876543211` | Password `admin123`
- **Super Admin**: Mobile `9876543212` | Password `super123`
