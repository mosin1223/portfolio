## Context
- Portfolio root is a static Tailwind-by-CDN single page ([index.html](index.html), [script.js](script.js)); dark/light theme via `localStorage` + `documentElement.classList`, EmailJS contact form, hero typing loop, IntersectionObserver fade-ins.
- Other showcase projects live under `projects/`: weather dashboard (vanilla JS + OpenWeatherMap), data-analysis-dashboard (Python Tkinter), quiz admin/app (Firebase auth/firestore/storage in `projects/projct_/`), small weather-app.
- Assets live in `images/` and PDFs in `certificates/`; screenshots documented in [README.md](README.md).

## Build/Run
- Root site: open [index.html](index.html) in a browser or serve statically (e.g., `python -m http.server 8000`).
- Weather dashboard: open [projects/weather dashboard/index.html](projects/weather%20dashboard/index.html); set `API_KEY` in [script.js](projects/weather%20dashboard/script.js#L1-L5) or flip `USE_DEMO_MODE` for offline demo.
- Quiz app: files in [projects/projct_](projects/projct_), Firebase initialized in [firebase.js](projects/projct_/firebase.js#L1-L16); expects Firestore/Auth/Storage enabled.
- Data analysis dashboard (Tkinter): `cd projects/data-analysis-dashboard && pip install -r requirements.txt && python main.py`.

## Patterns & Conventions
- **Styling:** Tailwind configured inline in HTML; prefer utility classes over custom CSS. Avoid introducing preprocessors.
- **Animations:** Use JS-driven class toggles and IntersectionObserver for fade-ins on root site; mirror this pattern for new sections.
- **State:** Theme preference stored as `theme` in `localStorage`; keep icon sync (`fa-sun`/`fa-moon`).
- **Forms:** Contact form uses EmailJS (`emailjs.init`, `emailjs.send` with `service_gua48y4`/`template_xy51j7t`), shows success/error banners with 5s auto-hide—reuse the same UX for new forms.
- **APIs:** Weather dashboard fetches OpenWeatherMap (`/data/2.5`), maps icon codes via `weatherIconMap`, and offers demo calendar data; follow existing DOM id conventions when extending views.
- **Firebase quiz:** Global `auth`, `db`, `storage` exposed on `window`; new modules should use those rather than reinitializing Firebase.
- **Assets/links:** Existing screenshots referenced with encoded spaces (e.g., `images/portfolio%20screen%20shot/...`). Keep paths consistent and avoid renaming unless updating README.

## Testing/Verification
- For static pages, verify in browser for theme toggle, nav scroll highlighting, modal open/close, EmailJS send success/failure paths.
- Weather dashboard: test search, retry, sidebar view switches, and forecast rendering; toggle `USE_DEMO_MODE` before committing if API key should not be used.
- Tkinter app: run locally; confirm CSV upload, analysis, chart generation, and missing-value handling.

## Secrets & Safety
- EmailJS public key and Firebase config are in repo; if changing, keep IDs consistent or move to `.env` and inject at build if you introduce tooling.
- Replace OpenWeatherMap `API_KEY` before deployment; do not hard-code personal keys in commits.

## Contribution Tips
- Keep instructions and project list in [README.md](README.md) aligned if adding sections or projects.
- Favor small, isolated changes per subproject; avoid mixing Tkinter/Python changes with frontend assets in the same change set.