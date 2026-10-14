# Decoration Academy

Onboarding site for CompanyStore.IO new joiners: how branding works, every decoration method (animated), surface fit, placement zones, the full production clock, a method picker and a quiz.

Static site, no build step. Everything lives in `docs/`:

- `docs/index.html` — structure, product silhouettes, inline CompanyStore mark symbol
- `docs/style.css` — CompanyStore palette (red #E01E23, ink #121212), layout
- `docs/app.js` — all content data (methods, stages, surfaces, zones, quiz, glossary), scenes and interactions
- `docs/assets/` — `logo-red.svg` (mark), `logotype.svg`

## Edit content

Open `docs/app.js`. Each method is one object in `methods[]` with `how`, `best`, `avoid`, `facts`, `stages` (the production clock) and `placement`. Surfaces are in `surfaces[]`, placement zones in `products[]`, questions in `quiz[]`.

Stage timing: `m` = minutes, `per: 'job'` counted once, `per: 'piece'` multiplied by quantity and divided by `par` (pieces processed in parallel). `t: 'wait'` stages are shown as calendar notes, not on the bar.

After edits bump `?v=` on the CSS and JS links in `index.html`.

## Deploy (GitHub Pages)

Served from the `docs/` folder on `main`. Every push to `main` deploys to https://rogerdf30.github.io/decoration-academy/

## Sources

Figures are typical industry ranges; confirm against ink, powder, thread or machine data sheets per job. References are listed at the bottom of the site.
