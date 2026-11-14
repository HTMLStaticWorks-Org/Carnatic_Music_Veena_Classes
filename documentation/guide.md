# Nadam Veena Academy — Official Documentation & Customization Guide

**Template Name:** Nadam Veena Academy — Carnatic Music & Saraswati Veena Conservatory Multi-Page Website  
**Version:** 1.0.0  
**Tech Stack:** Pure HTML5, CSS3, Vanilla ES6+ JavaScript, Web Audio API  

---

## 1. Installation & Deployment Guide

Because **Nadam Veena Academy** is built with clean, framework-free HTML5, CSS3, and vanilla ES6+ JavaScript with 100% locally stored `.webp` photographs, no build step or bundler is required.

### A. Running Locally
1. Extract or clone the project folder `nadam-veena-academy/`.
2. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari), or launch a local static server for optimal testing:
   ```bash
   # Using Python 3
   python -m http.server 8080

   # Or using VS Code Live Server extension
   ```
3. Navigate to `http://localhost:8080`.

### B. Deploying to Netlify
1. Log into [Netlify](https://app.netlify.com/) and click **Add new site → Deploy manually** (or connect your Git repository).
2. Drag and drop the root project directory.
3. No build command is needed; set the **Publish directory** to `.` (root).
4. Optional: Add the `netlify` attribute to `<form>` tags in `pages/contact.html` to enable zero-backend Netlify Forms submissions.

### C. Deploying to Vercel
1. Run `npx vercel` inside the project root or import the Git repository in the Vercel dashboard.
2. Select **Other (Static HTML)** as the framework preset.

### D. Deploying to cPanel / Traditional Shared Hosting
1. Open **cPanel → File Manager** and navigate to `public_html/`.
2. Upload the contents of the root folder (`index.html`, `robots.txt`, `sitemap.xml`, `assets/`, `pages/`, `documentation/`).

### E. Deploying to GitHub Pages
1. Push the repository to GitHub.
2. Go to **Settings → Pages**, select your main branch and `/ (root)` folder, and click **Save**.

---

## 2. Customization Guide

### A. Changing Brand Colors (CSS Variables)
All colors are centrally controlled via `:root` custom properties at the top of `assets/css/style.css` (and dark-mode overrides in `assets/css/dark-mode.css`):

```css
:root {
  --teak-deep: #2B120A;   /* Rich rosewood/teak, main dark */
  --kumkum: #A3171E;      /* Kumkum red, primary accent */
  --turmeric: #E0A526;    /* Turmeric gold, highlight/CTA */
  --sandal: #F6EBD9;      /* Sandalwood cream, light background */
  --jackwood: #8A4B1F;    /* Veena jackfruit-wood brown */
  --peacock: #0F5C5A;     /* Peacock teal, secondary accent */
  --ink: #1A0E09;         /* Primary dark ink text */
  --mist: #EADBC3;        /* Warm mist border/card tone */
}
```

### B. Changing Fonts
Fonts are loaded from Google Fonts in the `<head>` of each HTML document and referenced in `assets/css/style.css`:
- `--font-heading: 'Cormorant Garamond', Georgia, serif;`
- `--font-body: 'Poppins', sans-serif;`
- `--font-tamil: 'Noto Serif Tamil', serif;`

### C. Updating Photographs (`assets/images/`)
- All 76 unique photographs live inside `assets/images/` in compressed `.webp` format.
- To replace an image, drop a new `.webp` photo with the same filename into `assets/images/`, or update the `<img src="...">` attribute in the corresponding HTML file.
- Always maintain descriptive `alt="..."` attributes and explicit `width` and `height` attributes for zero Cumulative Layout Shift (CLS).

### D. Customizing Web Audio API Pitch & Swaras (`assets/js/main.js`)
- The Tanpura Sruti Drone (`D# / 2.5 Kattai`, `155.56 Hz` fundamental), 7-Swara Explorer (`Sa Ri2 Ga3 Ma1 Pa Dha2 Ni3 Sa`), Raga Arohanam synthesizer, and Suladi Sapta Tala Metronome are powered natively by the browser's `AudioContext` in `assets/js/main.js`.
- You can adjust base frequencies in the `SWARA_FREQS` object inside `assets/js/main.js`.

---

## 3. Complete Page Structure (23 Pages)

| # | File Path | Purpose & Unique Sections |
|---|---|---|
| 1 | `index.html` | **Home 1 ("The Concert Hall")** — Full-bleed Veena hero, floating concert countdown, raga marquee, 3D tilt upcoming concerts, 4 Why Carnatic cards, signature courses, Guru spotlight, 4-step journey timeline, counters, testimonial slider, demo CTA. |
| 2 | `pages/home-2.html` | **Home 2 ("The Living Gurukulam")** — Split typographic hero with class finder & 3 arch photos, horizontal instrument family scroll, Learn-by-Level tabs, interactive 7-Swara Web Audio explorer, Online vs Offline split, 6-photo academy mosaic, student voices masonry, Margazhi schedule, free swara-sheet download, newsletter. |
| 3 | `pages/about.html` | **About Us** — Academy story, Thanjavur Parampara lineage tree, mission & acoustics, 1988–2026 milestones. |
| 4 | `pages/courses.html` | **Courses** — 10-course catalog with live multi-criteria filter (Level, Discipline, Age Group, Mode). |
| 5 | `pages/course-detail.html` | **Course Detail** — 8-Module Saraswati Veena syllabus accordion, outcomes, batch schedule, fee breakdown. |
| 6 | `pages/teachers.html` | **Teachers** — 8 Acharyas faculty grid with discipline filter (Veena, Vocal, Violin, Mridangam, Flute). |
| 7 | `pages/teacher-detail.html` | **Teacher Detail** — Vidushi Dr. Meenakshi Sundaram bio, lineage, awards, lec-dem video modal, class slots. |
| 8 | `pages/concerts.html` | **Concerts & Events** — 6 upcoming Sabha kutcheris, interactive RSVP/Ticket modal, past concert archive, JSON-LD `MusicEvent` schema. |
| 9 | `pages/fees.html` | **Fees & Pricing** — Monthly/Quarterly/Annual + INR/USD switcher, 4 tuition tiers, feature comparison table, UPI/Stripe/PayPal checkout modal. |
| 10 | `pages/resources.html` | **Resources** — Searchable Raga Glossary with Web Audio Arohanam playback, Suladi Sapta Tala guide with interactive Metronome, downloadable notations, listening guide, Veena Care manual. |
| 11 | `pages/blog.html` | **Blog** — 6 scholarly essays on Carnatic musicology with category filter. |
| 12 | `pages/blog-detail.html` | **Blog Detail** — In-depth treatise on *Dashavidha Gamakas on the Saraswati Veena* with swara tables & comments. |
| 13 | `pages/gallery.html` | **Gallery** — 12-photo filterable visual archive with keyboard-accessible Lightbox viewer. |
| 14 | `pages/contact.html` | **Contact & Book Free Demo** — Dual-tab Free Trial Class booking & General Enquiry form, Mylapore campus map & hours. |
| 15 | `pages/faq.html` | **FAQ** — 10 accordion questions across 5 topics + live keyword search + JSON-LD `FAQPage` schema. |
| 16 | `pages/login.html` | **Login** — Split-screen portal with one-click Demo Student & Demo Guru login buttons. |
| 17 | `pages/signup.html` | **Sign Up** — Multi-field Shishya registration with discipline, grade level, and mode selection. |
| 18 | `pages/forgot-password.html` | **Forgot Password** — Account recovery workflow with instant confirmation state. |
| 19 | `pages/404.html` | **404 Page** — Custom musical *"Apaswaram — A Missed Beat"* page with playable Sa–Pa–Sa tuning button. |
| 20 | `pages/coming-soon.html` | **Coming Soon** — Live countdown timer & email waitlist for Nadam Digital Palm-Leaf Archive 2.0. |
| 21 | `pages/privacy-policy.html` | **Privacy Policy** — Comprehensive student data, recording, and payment privacy policy. |
| 22 | `pages/terms-conditions.html` | **Terms & Conditions** — Gurukulam code of conduct, attendance, fee, and instrument care terms. |
| 23 | `pages/student-dashboard.html` | **Student Dashboard** — 8 interactive panels (Overview, Book Classes, Schedule, Practice Notes + Audio Player, Fees + Pay Modal, Progress + Certificate, Guru Chat, Settings). |
| 24 | `pages/instructor-dashboard.html` | **Instructor Dashboard** — 5 interactive panels for Acharyas (Overview, My Students, Schedule & One-Click Attendance, Publish Practice Notes, Honorarium Statements). |

---

## 4. Credits & Attribution

See [credits.md](credits.md) for the complete table of all 76 local photographs, photographers, Wikimedia Commons source links, and Creative Commons licenses.

---

## 5. Changelog

### Version 1.0.0 — Initial Release (November 2026)
- Initial production release with 24 HTML files (22 public/auth/utility pages + Student & Instructor Dashboards).
- Built-in Web Audio API Tanpura Sruti Drone, 7-Swara Explorer, Raga Arohanam synthesizer, and Tala Metronome.
- Full Dark Mode (`dark-mode.css`), RTL layout (`rtl.css`), Tamil/English bilingual script toggle, and 3D Tilt cards (`vanilla-tilt.js`).

---

## 6. Support Information

For technical support, customization assistance, or bug reports:
- **Support Desk:** `dean@nadamveena.org`
- **Documentation Folder:** `/documentation/guide.md` and `/documentation/credits.md`
