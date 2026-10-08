# remoyukoff.github.io

Personal portfolio — Senior Software Development Engineer in Test.

🔗 **Live:** [remoyukoff.com](https://remoyukoff.com)

## Stack

Hand-written. No build step.

- HTML, CSS, vanilla JS
- Archivo (variable width axis) + JetBrains Mono via Google Fonts
- Bilingual (ES / EN) with browser-locale auto-detect
- Test-report concept: career rendered as a trace (one span per role), roles as suites, bullets as passing assertions
- Forest palette: one green for "passed", one amber for the role still running
- Light / dark theme with `prefers-color-scheme` default + localStorage persistence

## Local preview

Open `index.html` directly in a browser, or run any static file server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Structure

```
.
├── index.html        # page markup
├── styles.css        # all styles (light + dark themes)
├── i18n.js           # ES/EN dictionary + locale toggle
├── main.js           # trace durations, theme toggle, copy email
├── CNAME             # custom domain (remoyukoff.com)
└── assets/
    ├── favicon.svg
    ├── Remo_Yukoff_CV.pdf
    └── logos/        # client wordmarks (rendered monochrome via CSS mask)
```

## Contact

- **Email:** remo.yukoff@gmail.com
- **GitHub:** [@RemoYukoff](https://github.com/RemoYukoff)
- **LinkedIn:** [in/remoyukoff](https://www.linkedin.com/in/remoyukoff)
