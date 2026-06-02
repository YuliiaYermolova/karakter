# Karakter 6 — Egenvurdering VG1 IM

Min dokumentasjon for **Konseptutvikling og Programmering VG1** og **YFF VG1**
ved Charlottenlund VGS.

🔗 **Live:** _legg inn URL etter deploy_
🎓 **Mål:** opptak til **NTNU** Trondheim, august 2027

---

## Hva er dette?

En håndlaget enkeltsides presentasjon som dokumenterer:

- **9 kompetansemål** (KM1-KM9) med konkrete bevis
- **7 ferdige prosjekter** (web, iOS, datamodell, design)
- **Tidslinje** fra august 2025 til NTNU 2027
- **Refleksjon** og egenvurdering
- **YFF**-arbeidet og koblingen til yrkeslivet

---

## Tech stack

- **HTML5** semantisk, m/ `<main>`, `<section>`, `<details>`
- **CSS3** custom properties, grid, container queries-klar, print-styles
- **Vanilla JavaScript** — ingen rammeverk
- **Canvas API** for animert Van Gogh-stjernehimmel
- **PWA** — service worker + manifest, fungerer offline
- **A11y** — skip-link, prefers-reduced-motion, ARIA, semantisk markup
- **SEO** — meta description, Open Graph, JSON-LD structured data

## Struktur

```
karakter-6-presentasjon/
├── index.html          # Hovedside
├── style.css           # Van Gogh-tema (~1200 linjer)
├── script.js           # Canvas + interaktivitet
├── manifest.webmanifest# PWA manifest
├── sw.js               # Service worker for offline
├── assets/             # Bilder
│   ├── barn.jpg
│   ├── grisha.jpg
│   ├── grisha-coder.jpg
│   └── datamodell.jpeg
└── screens/            # Skjermbilder av prosjekter
```

## Kjør lokalt

```bash
# Bare en statisk side — kjør hvilken som helst HTTP-server
python3 -m http.server 8000
# → http://localhost:8000
```

Eller åpne `index.html` direkte i en nettleser
(noen funksjoner krever http://, ikke file://).

## Kvalitet

| Test | Resultat |
|---|---|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| W3C HTML validator | 0 errors |
| W3C CSS validator | 0 errors |
| WCAG kontrast | AA + |

> Skjermbilder fra Lighthouse i seksjonen «Refleksjon».

## Tilgjengelighet

- ⌨️ Full tastaturnavigasjon
- 🔊 Skip-link for skjermlesere
- ♿ ARIA-labels på dekorative elementer
- 🎬 Respekterer `prefers-reduced-motion`
- 🖨️ Egne print-styles for utskrift
- 🌗 God kontrast (WCAG AA+)

## Forfatter

**Yuliia Yermolova** · VG1 IM · Charlottenlund VGS · 2025-2026

- GitHub: [@yuliiayermolova](https://github.com/yuliiayermolova)
- Portefølje:
  - [moonlitconfessions.me](https://moonlitconfessions.me)
  - [Pine & Brass Coffee](https://yuliiayermolova.github.io/pine-brass-coffee/)
  - [Project Naturfag](https://yuliiayermolova.github.io/project-Naturfag/)

---

_«Store ting er ikke gjort av impuls, men av en serie små ting brakt sammen.»_
— Vincent van Gogh
