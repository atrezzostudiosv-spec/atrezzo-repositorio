# AGENTS.md: print shop website template

One-page website for a print and copy shop that takes walk-in and file-based jobs. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.11 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/print-shop-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/print-shop-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/print-shop-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/print-shop-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.nav__links`
  - `section-script:opening`: `.op-tab` `.op-proof__clip` `data-img`
- The opening tabs, their photos and their panels are tied together by matching names: each tab's data-img, aria-controls and the panel id and each photo's data-img must agree, or the script shows the wrong or no panel.
- The selection boxes (.m-sel in the poster stage and in .cn-photo) are CSS boxes the scene CSS moves to the photo's edges by class name: keep all eight parts of each (four m-sel__e edges, four m-sel__h handles). Keep the seven size items in the size row too: the poster scene's size steps and marker positions are fixed for seven sizes in the CSS.
- The scene CSS animates fixed counts by position: four finishing panels (data-8b-fixed="4", each with its start offset in an inline style) and five colour bar squares on the preflight sheet (:nth-of-type rules). Extra items do not unfold or stamp in step; change the scene CSS too if you change those numbers.
- The Ready badges, the progress bars, the paper weights and the checklist ticks are drawn with CSS and inline SVG: recolour them through the CSS variables.
- The navigation script tucks the header away while a section whose first child is sticky fills the screen (the held poster, finishing and preflight stages).
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f7efe5 (page ground, the header bar, card and table surfaces, form fields, text on the ink sections), `--color-2` #171513 (text, every 1.5px border, the strip above the header, the finishing section and the footer), `--color-3` #ffc21f (yellow: buttons, icon buttons, the margin stripe, selection handles, the active tab, the size marker, the FAQ plus box, two heading highlights, the column heads in the footer), `--color-4` #ff6a3d (coral: the wordmark blocks in the header and footer, the jobs heading highlight, the bleed line on the sample sheet, link hover fill, one badge), `--color-5` #8682f7 (violet: the paper section ground, the safe-area line on the sample sheet, two counter icons, one weight badge), `--color-6` #a9dcf6 (pale blue: the file checklist section ground, the FAQ heading highlight, one counter icon, photo placeholders), `--color-7` #bdf35f (lime: the recycled section ground, the Ready and Collected badges, tab and FAQ row hover, one counter icon), `--color-8` #57514a (muted text: column heads, small notes, spec labels, FAQ answers); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Start a job button in the first screen, Quote buttons in the job panels and Quote a poster button: now #contact, the quote form; owner's target: your online ordering or quote page, or keep them on the form.
- The address link in the top strip: now #contact; owner's target: a map URL of your shop, or keep the anchor.
- Send files icon in the header: now #preflight, the file checklist; owner's target: your file upload page (a transfer or upload form), or keep the anchor.
- The quote form: now a mailto form action that opens the visitor's mail app with the demo address; owner's target: a form service (Formspree, Netlify Forms) or your own endpoint.
- The form in `#contact` (fields `name`, `email`, `job`, `quantity`, `date`, `notes`) sends nothing. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it.
- The name Shortrun (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (19, Unsplash: opening 4, paper 1, posters 1, jobs 6, finishing 4, recycled 1, preflight 1, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Opening hours: Monday to Friday 8:00 to 19:00, Saturday 9:00 to 17:00, closed Sunday; "Open today 8:00-19:00" (top strip, contact, footer).
- Same-day rule: files in by 2 pm printed that day, "Same-day print!" (top strip, rail label, posters, questions).
- Founding year: "on Narborough Road since 2011" (footer).
- Job specs and prices: poster sizes A3 to A0 from £4 an A3, flyers from £28 for 250 A6, zines from £1.90 a copy, cards from £22 for 100, with paper weights and turnarounds (opening tabs).
- Counter prices and times: copies 8p a side, printing from a file 15p, scans £1, laminating £1.50, binding £3.50, large format £9; "while you wait", ten minutes, same day (counter).
- Proof policy: a printed proof on the real stock, free on runs of twenty or more and a pound otherwise (opening, questions); free double-sided on 500 or more flyers.
- Paper stocks and weights: bond 100 gsm, silk 170 gsm, recycled 120 gsm, matt board 350 gsm, kraft 300 gsm, colour card 240 gsm in eighteen colours (paper).
- Recent jobs: six invented jobs with quantities, sizes, days and times (jobs).
- Finishing limits: saddle stitching up to 64 pages, fold types, rounded corners on request (finishing).
- Delivery and layout terms: a bike courier inside the ring road the same evening, tracked post the next morning, small layout fixes free, new layouts charged by the half hour, rings ahead for runs over a thousand sheets (questions).
- Green claims: recycled or FSC-certified stock, toner cartridges returned, free notepads of fifty, offcuts collected every Friday by the school next door (recycled).
- File requirements: 3 mm bleed, 5 mm safe area, 300 dpi, PDF best, accepted formats (preflight, questions).
- Response promise: "We answer within two working hours" (contact).
- Footer: "© 2026 Shortrun Print & Copy Ltd. Prices include VAT.": put in your legal name and tax status.

## Known limits
- Without JavaScript the opening tabs do not switch (only the first tab's photo and spec list show) and, on screens narrower than the desktop layout, the Menu button cannot open the link overlay.
- The quote form uses a mailto action: it opens the visitor's email program instead of sending anything, which does not work for visitors without one.
- The poster scene holds the page for about two screens of scrolling at every width (a 300svh section around a 100svh stage), and the finishing and preflight scenes for about one and a half screens each on wide screens, so the page feels long.
- Without scroll-driven animation support (Firefox today) and with reduced motion, the load-in, the crop, select and stamp effects, the scroll scenes and the smooth wheel are off and each section shows its finished layout: the poster wall at full size, the finishing panels flat, every check ticked. The header still hides on scroll down, and the hover transitions and the opening tabs still work.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Shortrun left only in class names.
