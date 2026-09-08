# Anandhu Aniyan — Professional Portfolio

Production URL: https://anandhuaniyan.github.io/

A dependency-free static portfolio for Application Support, Production Operations, IT Service Management and Automation. The existing GitHub Pages configuration remains `main` / repository root, with `.nojekyll` preserved.

## Build and preview

Requires Node.js 18 or newer. No runtime packages or installation are required.

- `npm run build` validates internal anchors, local assets, structured data and the PDF signature, then copies the production files into `dist/`.
- `npm run check` also checks JavaScript syntax.
- Preview the root or `dist/` with any static HTTP server.
- GitHub Pages continues serving the repository root. Do not change its source to `dist/` without deliberately updating the deployment configuration.

## Components

`index.html` contains semantic, progressively enhanced sections: hero, recruiter overview, about, automation impact/workflow, expandable career timeline, searchable skill categories, engineering lab, interactive operations simulation, certifications/ITSM, education, local terminal, portfolio assistant, resume and contact.

`styles.css` provides shared dark/light tokens, five responsive layouts, visible focus, print styles and reduced motion. `script.js` implements navigation, motion controls, local theme preference, workflow highlighting, filtering, simulation states, curated answers, command allowlist and clipboard fallback.

## Content and assets

- The existing resume remains at `assets/Anandhu_Aniyan_Resume.pdf`; its latest-version status has not been confirmed by the owner. Replace this file with the latest supplied PDF, keeping the same path.
- No professional photograph was supplied or found. The hero uses an intentional AA monogram. Replace `.profile-mark` content with the supplied portrait, provide descriptive alt text and explicit dimensions, and retain its responsive frame. Do not generate a substitute face or alter facial appearance.
- The certification card records only the confirmed ITIL 4 Foundation qualification and PeopleCert issuer. Additional certification cards can be added inside the certification section without changing JavaScript. No credential metadata has been invented.
- Indian OTT Tracker's public repository README was checked for the high-level React/Vite, FastAPI, PostgreSQL, Redis/Celery architecture. No live demo URL was available, so no demo link is invented.
- The original email, LinkedIn, GitHub, phone and resume destinations are preserved.

## Motion and media

No stock video, external video player, WebGL or animation library is downloaded. Native CSS provides the portrait-frame orbit and sequential workflow highlights; the operations simulation advances only on request. These are conceptual illustrations, never recordings of employer infrastructure. Static HTML is the mobile/no-JavaScript fallback. Reduced-motion preferences and the global motion pause control stop animation. Rotation pauses when the hero is focused, offscreen or the document is hidden. The workflow only advances while visible. A real portrait is the only outstanding required visual asset.

## Security and privacy

No frontend AI API, API key, contact backend, analytics or third-party script. The assistant answers from curated portfolio text and cites the corresponding section. The terminal uses an explicit command allowlist and `textContent`; it cannot execute commands or HTML. Only a theme preference is stored locally, with storage errors handled. External new-tab links use `noopener noreferrer`. Clipboard failures offer the visible email as a fallback. Simulations show no actual service data.

An optional future AI provider must use a separately secured backend with server-held credentials, approved knowledge retrieval, rate limits, input limits and appropriate privacy controls. Do not put its secret in this static repository.

## Verification — 9 September 2026

- Production build and JavaScript syntax passed.
- Browser checks: 1440×1000, 768×1024, 390×844, 320×700 and 844×390; no horizontal overflow.
- Axe WCAG A/AA checks: no violations at those sizes or in light mode (checked after theme transitions settle).
- Verified menu opening/closing, section navigation, experience disclosure, skill filtering/empty results, all simulation stages/reset, assistant citations, terminal command handling/XSS input, resume download, theme switching, reduced-motion changes and copy email.
- No browser JavaScript errors. The resume response is a valid PDF.
- Local mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100. This is a lab result, not a guarantee of field performance. The audit report was successfully written; the CLI subsequently hit a Windows temporary-profile cleanup permission error.
- Final publication and external destination checks are recorded in the delivery report. LinkedIn may block automated checks; do not treat that alone as a broken profile link.

## SEO

Canonical URL, description, Open Graph, Twitter summary metadata, SVG favicon, Person and WebSite structured data, `robots.txt` and `sitemap.xml` identify the existing GitHub Pages URL. No unverified portrait or social-card URL is included.
