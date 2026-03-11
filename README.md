# Joint Medias

Portfolio website for Joint Medias, a creative agency based in Sacramento operating since 2006. The site showcases their work in web design & development, graphic design, and motion graphics.

## Tech Stack

- **React 18** with React Router v6 (SPA)
- **Three.js** + React Three Fiber — animated 3D blob with custom shaders
- **GSAP** + ScrollTrigger — scroll-based reveal animations & parallax
- **Lenis** — smooth scrolling synced with GSAP
- **Sass** (SCSS) — modern module system (`@use`/`@forward`), ITCSS-inspired architecture
- **Vite** — bundler & dev server
- **Headless WordPress** — content via REST API (projects, pages, ACF fields)
- **Vercel** — deployment platform

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint & Stylelint |
| `npm run lint:js` | ESLint only |
| `npm run lint:css` | Stylelint only |

## Project Structure

```
src/
├── components/
│   ├── Blob/              # 3D blob (Three.js mesh + custom shaders)
│   ├── BlobCanvas.jsx      # Fixed canvas for the blob
│   ├── Cursor/             # Custom cursor (desktop)
│   ├── SmoothWrapper/      # Lenis smooth scroll + GSAP integration
│   ├── ScrollReveal.jsx    # GSAP ScrollTrigger reveal animations
│   ├── PageTransition.jsx  # Blob fade on route change
│   ├── Parallax/           # Parallax scroll effect
│   ├── CallToAction/       # CTA block
│   ├── LogoSlider/         # Client logo carousel
│   ├── SliderCard/         # Work portfolio cards
│   ├── Layout.jsx          # Header/footer wrapper
│   ├── Seo.jsx             # Helmet meta tags
│   └── home/               # Home page sections (Intro, OurMission, WorkTogether)
├── pages/
│   ├── Home.jsx            # Home page
│   ├── WorkPost.jsx        # Project detail (dynamic from WordPress)
│   ├── Services.jsx        # Services page
│   ├── Page.jsx            # Generic CMS page
│   └── NotFound.jsx        # 404
├── hooks/
│   ├── useWordPress.js     # WordPress REST API fetching + cache
│   ├── useProjects.js      # Project list with featured filter
│   ├── usePageTracking.js  # Google Analytics (GA4)
│   └── useMediaQuery.js    # Responsive breakpoint detection
├── helpers/
│   └── utils.js            # Utilities (lerp, getMousePos, etc.)
└── sass/
    ├── abstracts/          # Variables, mixins
    ├── generic/            # Normalize, box-sizing
    ├── base/               # Base styles, typography, elements
    ├── components/         # Component styles, page-specific styles
    └── utilities/          # Helpers, accessibility, alignments
```

## Key Features

- **3D Blob** — fixed-position animated blob rendered with custom vertex/fragment shaders, responding to scroll position and mouse velocity
- **Smooth Scrolling** — Lenis scroll synced with GSAP ticker for frame-perfect animations
- **Scroll Animations** — ScrollTrigger reveal effects and parallax on hero sections
- **Headless CMS** — WordPress API for portfolio projects with ACF metadata
- **SEO** — dynamic meta tags, structured data (schema.org) on work posts
- **Analytics** — Google Analytics (GA4) + Umami
- **Lazy Loading** — route-level code splitting via `React.lazy`

## Deployment

Deployed to **Vercel** as an SPA. The `vercel.json` handles client-side routing rewrites and cache headers for static assets.

```bash
npm run build   # outputs to dist/
```
