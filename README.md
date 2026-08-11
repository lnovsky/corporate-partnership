# corporate-partnership

Static marketing site for City University of Seattle's Corporate & Community Partnerships team.

## Structure

- `index.html`, `workforce-solutions.html`, `partners.html`, `success-stories.html`, `resources.html`, `faq.html`, `events.html`, `contact.html`, `dashboard.html` — top-level pages
- `programs/` — LevelUP™, You're Closer Than You Think™, BAM, and Professional Certificates program pages
- `assets/styles.css`, `assets/main.js` — shared styles and nav/FAQ behavior
- `assets/cityu-logo.svg`, `assets/logos/*.svg` — placeholder text-based logo marks (swap for real brand assets when available)

No build step — plain HTML/CSS/JS.

## Local preview

```
powershell -NoProfile -ExecutionPolicy Bypass -File .claude/serve.ps1 -Port 8080
```

Then open http://localhost:8080.
