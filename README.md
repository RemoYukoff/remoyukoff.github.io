# remoyukoff.github.io

Personal portfolio — Senior Software Development Engineer in Test.

🔗 **Live:** [remoyukoff.com](https://remoyukoff.com)

## Stack

Hand-written. No build step.

- HTML, CSS, vanilla JS
- Plus Jakarta Sans, IBM Plex Mono (Google Fonts)
- Bilingual (ES / EN) with browser-locale auto-detect
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
└── assets/
    ├── Remo_Yukoff_CV.pdf
    └── logos/        # client wordmarks (rendered monochrome via CSS mask)
```

## Contact

- **Email:** remo.yukoff@gmail.com
- **GitHub:** [@RemoYukoff](https://github.com/RemoYukoff)
- **LinkedIn:** [in/remoyukoff](https://www.linkedin.com/in/remoyukoff)
