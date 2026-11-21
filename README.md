# Silver Circuit

Landing site + companion-finder quiz for the **Silver Circuit** channel — independent reviews of AI companions and care technology for aging parents. An Influencers.NYC Media property.

## What's inside

| File | Purpose |
|---|---|
| `index.html` | Landing page: hero, value prop, guide cards, email capture (buyer's checklist lead magnet) |
| `quiz.html` + `quiz.js` | "Which AI Companion Fits Your Parent?" — 6-question quiz, weighted scoring, matched recommendation (ElliQ / Meela / GrandPad / JubileeTV / start-simple) |
| `styles.css` | Brand system: navy `#1F3A5F`, gold `#E8B54D`, cream `#FAF6EE` |

Pure static site — no build step, no dependencies.

## Deploy to Vercel

```bash
# from this directory
npx vercel
```

Or: Vercel dashboard → **Add New Project** → import this repo → Framework Preset: **Other** → deploy. No build command or output directory needed.

## Before launch — 3 TODOs

1. **Email capture:** ✅ Done — the checklist form posts to Formspree (`https://formspree.io/f/moedndkr`, delivering to `hello@silvercircuit.care` via the catch-all). Remaining setup in the Formspree dashboard: attach `SilverCircuit-Buyers-Checklist-2026.pdf` as the auto-reply email so new subscribers receive it instantly.
2. **Domain:** SilverCircuit.care — in Vercel → Project Settings → Domains, add `silvercircuit.care` (and `www`), then follow the DNS prompts.
3. **Guide links:** the six guide cards currently match the first videos. Link each card to the YouTube video (or a full article page) as they publish.

## Brand footer

Every page carries: *Silver Circuit is an Influencers.NYC Media property.* Sponsor and press contact goes through the parent brand.
