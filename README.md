# Studio Wdech (pilates studio)

One-page website for a pilates studio: light, calm design, interactive weekly class schedule, pricing plans, FAQ and a booking form. Language: Polish.

> **Concept project.** The business, prices, address and phone number are fictional.
> The form does not send data anywhere.

## Structure

```
studio-wdech-pilates/
├── index.html      Markup only
├── css/
│   └── style.css   Styles: design tokens (CSS variables), light/dark theme, responsive layout
└── js/
    └── main.js     Mobile menu, scroll reveal, weekly schedule, demo form
```

## Run locally

No build step, no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Features

- Weekly schedule rendered from a data array (day tabs, sign-up button pre-fills the form)
- Pricing plans and expandable FAQ (native `<details>`)
- Sticky header with mobile menu
- Scroll-reveal animation (disabled for `prefers-reduced-motion`)
- Light and dark colour schemes

## Deploy

Static site. Works as is on GitHub Pages (Settings, Pages, branch `main`, folder `/root`), Netlify or Vercel.

## Stack

HTML5, CSS3 (custom properties, grid, flexbox, `prefers-color-scheme`, `prefers-reduced-motion`), vanilla JavaScript. Fonts: Google Fonts, with system fallbacks.
