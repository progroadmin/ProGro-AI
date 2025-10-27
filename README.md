# 🧱 Visionaire × ProGro.AI

A modern web platform built with **Next.js 15**, **Tailwind CSS v4**, and **shadcn/ui** — developed to showcase and power the **Visionaire Construction × ProGro.AI** ecosystem.

---

## 🚀 Project Overview

**Visionaire × ProGro.AI** is a responsive, AI-powered construction management web app that blends precision design, quoting automation, and branding consistency.

This setup merges **Next.js (App Router)** with **custom ProGro.AI styling**, giving you:
- A modern layout
- Fast component-driven UI
- Tailwind design tokens customized for the brand

---

## 🧭 Current Project Structure


---

## 🎨 Brand Styling

All styling is centralized inside `globals.css`, which defines **ProGro.AI’s official palette:**

| Variable | Color | Description |
|-----------|--------|-------------|
| `--brand-navy` | `#0C2340` | Primary text & header |
| `--brand-gold` | `#F7B32B` | Accent & CTA |
| `--brand-green` | `#009B55` | Secondary CTA |
| `--brand-cream` | `#FDF6ED` | Background |
| `--brand-slate` | `#2E2E2E` | Neutral font tone |
| `--brand-sage` | `#C5D3C0` | Muted tone |
| `--brand-blush` | `#E8C8D8` | Soft accent |

### 🔹 Custom Utility Classes
Added under `@layer utilities`:
- `.hover-lift` → gentle scale hover animation  
- `.hover-glow` → soft gold glow around CTAs  
- `.container-progro` → consistent centered layout

---

## 🧩 Components

### ✅ `site-header.tsx`
- Displays **ProGro.AI logo** centered at the top  
- Navigation links: `Projects`, `About`, `Demo`, `Contact`  
- Right-aligned CTA button “Get Quote” with glow hover effect

### ✅ `site-footer.tsx`
- Elegant bottom section across all pages  
- Includes brand line:
  > “Built with 💖 by Visionaire + ProGro.AI”
- Links to `/privacy` and `/terms`

---

## 🏠 Pages (App Router)

| Path | Description |
|------|--------------|
| `/` | Home page with logo, headline, tagline, and CTA buttons |
| `/privacy` | Placeholder Privacy Policy (ready for content) |
| `/terms` | Placeholder Terms of Service (ready for content) |

### 🏡 `page.tsx` — Main Hero Layout
- Headline: **Visionaire × ProGro.AI**
- Tagline: “A smarter way to manage, quote, and grow your construction projects — powered by AI & precision design.”
- Buttons:
  - 🟡 Request Demo
  - 🟢 Get Quote
  - ⚪ Contact Us

---

## ⚙️ Development

### Run the Development Server
```powershell
npm run dev
