Deployed to Vercel as an SPA. Build with `npm run build`; output goes to `dist/`.

SCSS uses the modern module system (`@use`/`@forward`). Every partial that needs shared variables/mixins must have `@use "../../abstracts/abstracts" as *;` (path relative to the file). Do not use `@import`.

Lint with `npm run lint`. No tests are configured.

## Z-index stacking order

The 3D blob canvas is `position: fixed; z-index: 1` and must remain visible through page content. The stacking order from back to front is:

1. **Section backgrounds** (furthest back) — no z-index on sections themselves
2. **Blob canvas** — `z-index: 1`
3. **Content / content backgrounds** — inner containers get `position: relative; z-index: 2`

Never put `position`/`z-index` on `.site-main`, `.site-header`, `.site-footer`, or section-level elements directly — that hides the blob behind their backgrounds. Instead, target inner containers (e.g. `.intro > .container`, `.our-mission > .container`) so the blob can show through between sections.
