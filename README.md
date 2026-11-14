# Nadam Veena Academy — Carnatic Music & Saraswati Veena Conservatory

> *"Where every string finds its raga."* (`நாதம் வீணை வித்யாலயம்`)

A complete, production-quality, multi-page HTML5, CSS3, and vanilla ES6+ JavaScript website for a **Carnatic Music & Saraswati Veena Academy** rooted in the South Indian temple and Sabha concert-hall tradition.

---

## Key Highlights & Features

- **24 Complete Pages (Zero Duplicated Sections):**
  - **Two Distinct Home Pages:**
    - `index.html` (*Home 1: "The Concert Hall"*) — Cinematic full-bleed Veena hero with floating Margazhi countdown card, raga marquee, 3D tilt upcoming concerts, 4 Why Carnatic cards, signature courses, Guru spotlight, 4-step journey timeline, counters, testimonial slider, and demo CTA.
    - `pages/home-2.html` (*Home 2: "The Living Gurukulam"*) — Split-screen typographic hero with interactive class-finder bar and 3 arch-shaped photographs, horizontal instrument family scroll, Learn-by-Level tabs, interactive 7-Swara Web Audio API Explorer, Online vs Offline comparison, 6-photo academy mosaic, student voices masonry wall, Margazhi schedule, free swara-sheet lead form, and newsletter.
  - **Academic & Cultural Pages:** `about.html`, `courses.html`, `course-detail.html`, `teachers.html`, `teacher-detail.html`, `concerts.html`, `fees.html`, `resources.html`, `blog.html`, `blog-detail.html`, `gallery.html`, `contact.html`, `faq.html`.
  - **Auth & Utility Pages:** `login.html`, `signup.html`, `forgot-password.html`, `404.html`, `coming-soon.html`, `privacy-policy.html`, `terms-conditions.html`.
  - **Interactive Portals (`localStorage` Powered):**
    - `pages/student-dashboard.html` — 8-panel Student Sadhana Portal (Overview, 3-step Class Booking Wizard, Weekly Schedule, Swara Practice Notes + Web Audio Reference Player + Sadhana Diary, Fees & Instant Payment Modal, Progress & Printable Certificate, Guru-Shishya Chat, and Profile Settings).
    - `pages/instructor-dashboard.html` — 5-panel Acharya Faculty Portal (Overview, Disciple Roster, Interactive One-Click Attendance, Swara Notation Publisher, and Honorarium Statements).
- **Authentic Web Audio API Musical Tools:**
  - **Tanpura Sruti Drone (`D# / 2.5 Kattai`)** in the top utility bar (`Sa–Pa–Sa` harmonic drone).
  - **Interactive 7-Swara Explorer** (`Sa Ri2 Ga3 Ma1 Pa Dha2 Ni3 Sa` in Melakarta #29 Dheerasankarabharanam).
  - **Raga Arohanam Synthesizer** & **Raga of the Day Widget** (automatically adapts to morning/afternoon/evening/night *Gana Kala*).
  - **Suladi Sapta Tala Metronome** with visual beat counter and BPM control (`Adi`, `Rupaka`, `Misra Chapu`, `Khanda Chapu`).
- **76 Local, Unique `.webp` Photographs (`assets/images/`):**
  - Every photograph is stored locally in `assets/images/*.webp` with zero external image hotlinks and zero repeated photographs across the entire site. Full attribution is documented in [`documentation/credits.md`](documentation/credits.md).
- **Accessibility, Theme & Internationalization:**
  - Warm Rosewood **Dark/Light Mode** (`assets/css/dark-mode.css`) with system preference detection and `localStorage` persistence.
  - Full **Right-to-Left (RTL)** support (`assets/css/rtl.css`).
  - **Tamil / English Script Toggle** (`EN / தமிழ்`) for classical musical terminology.
  - **WCAG 2.1 AA** compliant contrast, keyboard focus rings, skip links, semantic landmarks, and `prefers-reduced-motion` support.

---

## Folder Structure

```text
nadam-veena-academy/
├── assets/
│   ├── css/
│   │   ├── style.css          # Variables, base typography, components, responsive rules
│   │   ├── dark-mode.css      # Nocturnal rosewood & brass lamp dark theme
│   │   ├── rtl.css            # Full Right-to-Left layout rules
│   │   └── dashboard.css      # Student & Instructor portal layout and widgets
│   ├── js/
│   │   ├── main.js            # Nav, theme, RTL, Web Audio synth, filters, modals, forms
│   │   ├── dashboard.js       # Booking wizard, practice player, attendance, fees, chat
│   │   └── plugins/
│   │       └── vanilla-tilt.js # 3D perspective card tilt with golden glare
│   ├── images/                # 76 unique local .webp photographs
│   └── fonts/                 # Font documentation & local hosting instructions
├── pages/                     # 23 inner pages, auth flows, and dashboards
├── documentation/
│   ├── guide.md               # Installation, deployment & customization guide
│   └── credits.md             # Complete attribution for all 76 local photographs
├── index.html                 # Home 1 ("The Concert Hall")
├── robots.txt                 # Search engine crawler directives
├── sitemap.xml                # Complete XML sitemap
└── README.md                  # Project overview
```

---

## Quick Start

1. Open `index.html` directly in any modern browser, or serve the root folder over HTTP:
   ```bash
   python -m http.server 8080
   ```
2. Visit `http://localhost:8080` in your browser.
3. For full deployment and customization instructions, read [`documentation/guide.md`](documentation/guide.md).
