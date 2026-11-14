# Typography & Local Font Hosting (`assets/fonts/`)

Nadam Veena Academy uses three Google Font families defined in `assets/css/style.css`:

1. **Cormorant Garamond** (`--font-heading`) — Classical editorial serif for headings, raga titles, and Sabha banners (`500`, `600`, `700`, `600i`).
2. **Poppins** (`--font-body`) — Clean geometric sans-serif for body copy, navigation, buttons, and dashboard UI (`400`, `500`, `600`, `700`).
3. **Noto Serif Tamil** (`--font-tamil`) — Authentic classical Tamil serif for subtle cultural accents (`ஸ்வரம்`, `ராகம்`, `தாளம்`).

## Self-Hosting `.woff2` Files (Optional Offline Mode)

To switch from the Google Fonts CDN to 100% offline local fonts:

1. Download the `.woff2` files for `Cormorant Garamond`, `Poppins`, and `Noto Serif Tamil` into this directory (`assets/fonts/`).
2. Add `@font-face` declarations at the top of `assets/css/style.css` pointing to `../fonts/<filename>.woff2`.
