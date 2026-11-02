# WEALTH BRIDGE — Premium Investment Advisory Website

> **"Build Wealth With Clarity. Invest With Confidence."**

A complete, responsive, institutional-grade investment advisory website engineered for **Wealth Bridge**, a professional wealth advisory firm that helps individuals, families, and businesses make informed financial decisions through structured investment guidance, long-term wealth planning, financial education, and risk-aware investment strategies.

---

## 🏛️ Brand Positioning & Visual Direction

Wealth Bridge delivers a **financial editorial aesthetic** inspired by established private wealth advisory institutions, boutique consultancies, and investment research publications.

- **Trustworthy & Refined:** Free from speculative cryptocurrency graphics, trading terminal tickers, or fintech gimmicks.
- **Fiduciary Creed:** Built upon evidence-based financial economics, asset allocation, and capital preservation.
- **Color Palette:**
  - **Midnight Navy:** `#14263D`
  - **Deep Blue:** `#203C5B`
  - **Muted Gold:** `#B69A62` (and accented pale gold `#CBB482`)
  - **Warm Ivory:** `#F7F5EF` / `#FCFBF9`
  - **Slate Grey:** `#687586`
  - **White:** `#FFFFFF`
  - **Charcoal:** `#252B33`
- **Typography:**
  - Headings: *Playfair Display* & *DM Serif Display*
  - Body & Analytics: *Inter* & *Manrope*

---

## 📄 Site Structure & Pages

| Page | File | Purpose & Highlights |
|---|---|---|
| **Home** | `index.html` | Flagship corporate homepage, fiduciary trust pillars, 6 service overviews, 4-stage visual approach, advisor leadership previews with credential modals, research insights, and prominent risk callouts. |
| **About Firm** | `about.html` | Mission, vision, core values, investment principles, corporate governance, headquarters architecture, and full advisory committee profiles. |
| **Advisory Services** | `advisory-services.html` | Deep-dive into 6 core practice areas (Investment Advisory, Wealth Planning, Portfolio Strategy, Goal-Based Planning, Risk Assessment, Financial Guidance) with target profiles, advisory scope, deliverables, and service limitation notices. |
| **Our Approach** | `investment-approach.html` | 4-Stage Investment Methodology timeline framework, scientific principles of asset allocation & diversification, capital preservation priority, and portfolio breakdown architecture. |
| **Insights & Resources** | `insights.html` | Financial education hub featuring 6 editorial articles, real-time live search, interactive category filtering, article summary modals, and comprehensive investor FAQ accordion. |
| **Risk Disclosures** | `risk-disclosures.html` | Dedicated, high-contrast disclosure documentation covering capital loss risk, market volatility, lack of return guarantees, individual suitability, educational material boundaries, and regulatory jurisdiction. |
| **Contact & Consultation** | `contact.html` | Polished consultation enquiry form with field-by-field validation, future date restriction, prefilled service capability, office details, and interactive confirmation modal. |
| **Client Login** | `login.html` | Separate authentication page with luxury split-screen branding, password visibility eye toggle, remember me, and forgot password modal. |
| **Investor Sign Up** | `signup.html` | Separate client onboarding registration page with password confirmation validation, terms acceptance, and password toggle. |
| **404 Error Page** | `404.html` | Branded error page guiding visitors smoothly back to key advisory pages. |
| **Coming Soon** | `coming-soon.html` | Branded portal page for upcoming institutional research and document vault. |

---

## ⚡ Functional Features

1. **Mandatory Navigation Bar:**
   - Items: `Home` \| `About` \| `Advisory Services` \| `Our Approach` \| `Insights` \| `Risk Disclosures` \| `Contact` \| `Login` \| `Sign Up`
   - Highlighted CTA: **Schedule a Consultation**
   - Active page indicator and blur backdrop on scroll.
   - Mobile-first offcanvas drawer with zero horizontal overflow.
2. **Light / Dark Theme Switcher:**
   - Instant toggle between Warm Ivory editorial mode and Midnight Navy dark mode.
   - Smooth transitions and persistent `localStorage` preference.
3. **Interactive Advisor Credential Modal:**
   - Dynamic pop-up modal displaying CFA®, CFP®, ChFC®, and Ph.D. qualifications, verified experience, and fiduciary pledge.
4. **Interactive Category Filtering & Live Search:**
   - Real-time text search and topic filtering on `insights.html` with responsive count and empty state handling.
5. **Consultation Enquiry Validation:**
   - Full client-side validation, date constraints, service prefill from URL query parameters, and interactive confirmation modal with reference tracking code.
6. **Password Visibility Toggles:**
   - Accessible eye toggle buttons on `login.html` and `signup.html`.

---

## 💻 Tech Stack

- **HTML5:** Semantic architecture, accessible forms, descriptive meta tags, SEO hierarchy.
- **CSS3:** Custom CSS variables, responsive fluid typography (`clamp`), custom card shadows, micro-interactions.
- **Bootstrap 5:** Grid, utilities, offcanvas, and modals via CDN.
- **Bootstrap Icons:** Vector iconography.
- **Vanilla JavaScript:** Fast, dependency-free interactive logic in `assets/js/main.js`.
- **Assets:** High-resolution executive boardroom, consultation, architecture, and advisor portrait imagery.

---

## 🚀 Running Locally

Open any `.html` file directly in any modern browser, or launch a local web server:

```powershell
# Using the included native PowerShell static server
powershell -ExecutionPolicy Bypass -File server.ps1

# Or using any standard static server:
# npx serve .
# python -m http.server 8080
```

Navigate to `http://localhost:8080/` in your browser.
