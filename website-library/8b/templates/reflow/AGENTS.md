# AGENTS.md: repair shop website template

Website for a phone and laptop repair shop with walk-in repairs, prices and refurbished devices. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/repair-shop-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/repair-shop-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/repair-shop-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/repair-shop-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits.
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__bar` `.nav__menu` `.nav__toggle` `.nav__menu-close`
  - `section-script:opening`: `.op-stage`
  - `section-script:visit`: `.vs-form` `.vs-status` `data-ok` `data-error`
  - `scene-script:opening`: `.op-stage` `.op-wm` `.op-second` `.op-stair__word`
  - `scene-script:diagnosis-scan`: `.dg-list` `.dg-band`
  - `scene-script:refurb-shelf`: `.rf-pin` `.rf-track`
  - `scene-script:fleet-cursor`: `.fl-board` `.fl-cursor` `.fl-track` `.fl-win` `.fl-bar`
  - `scene-script:reviews-read`: `.rv-quote` `data-8b-split` `.rv-sel` `.w`
  - `scene-script:visit-grow`: `.vs-title` `.vs-w`
- The REFLOW wordmark on the first screen is not a font: each letter is a 5-column grid of rounded dashes in the markup (.op-wm__letter, .op-wm__row, <i style="grid-column:…">). For another name, redraw the letters in the same way, or replace the block with text.
- The time bars on the price wall (style="--m:<minutes>") and the pickup windows (style="--a:<hour>;--b:<hour>") are sized from those numbers: update them together with the visible times.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #0e0e0e (near-black grained sections), `--color-2` #f5f5f5 (off-white sections, headings), `--color-3` #d0d0d0 (text on dark, wordmark), `--color-4` #8e8e8e (muted text on dark), `--color-5` #575757 (muted text on light), `--color-6` #0000ff (electric blue highlights), `--color-7` #1b1b1b (hairlines on dark), `--color-8` #e2e2e2 (hairlines, form panel); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a repair buttons in the nav, the first screen and the footer: now #visit; owner's target: your booking page, or keep #visit if the form on the page is connected.
- Reserve links on the five refurbished devices: now #visit; owner's target: each device's product or checkout page in your shop.
- Request a box button in the repair-by-post section: now #visit; owner's target: your mail-in request form or booking page.
- Open an account button in the business section: now mailto:fleet@reflow.example; owner's target: your business-accounts email or sign-up form.
- The form in `#visit` (fields `name`, `contact`, `device`, `model`, `fault`, `when`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Reflow (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (11, Unsplash: opening 3, bench 1, parts 1, refurb 5, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Address and area: "23 Tib Street, Northern Quarter, Manchester M4 1LX" in full in visit, in shorter forms in the nav menu, opening bar and footer, and "on Tib Street" (opening paragraph, bench caption, meta description); directions "Four minutes from the Market Street tram stop. Bike rack outside the window." (visit). The street is real; the shop and the number are invented.
- Phone 0161 000 0000 and emails bench@reflow.example, fleet@reflow.example (replaced placeholders: the phone in the nav menu, opening bar, refurb note, visit and footer; fleet@ on the Open an account button).
- Hours: "Mon-Sat 09:00-19:00", "Walk-ins until 18:00", "Sunday closed", "Walk-ins welcome" (nav, opening bar, visit, footer, booking form option "Today, walk-in").
- "Since 2014" (opening paragraph) and the company "Reflow Repair Ltd · Registered in England" (footer).
- Service promises: a free fifteen-minute diagnosis, twelve checks, a fixed price before work starts, most screens and batteries back "within the hour", the bench in the shop window with a magnifier camera, nothing goes to a back room (opening, diagnosis, bench, meta description).
- The example diagnosis: battery at 71%, "Quote £129, ready in 50 minutes" (diagnosis).
- Every price and time on the price wall: phones £89, £49, £45, £69, £35; laptops £179, £99, £119, £59, £79; tablets and consoles £79, £35, £85; bench times 20 min to 3 h; the model ranges (iPhone 11-16, Pixel 6-9, Galaxy S21-S24, "since 2018", "since 2016" and so on); water damage and data recovery "from £59", "usually a day" (prices).
- Warranty: 12 months on repairs and refurbished devices, 6 months on Value parts, VAT included, "you pay the cheaper price" (prices, parts, refurb, faq, reviews, meta description).
- Parts grades and the iPhone 13 screen prices £189 / £129 / £89, "True Tone moved over by us" (parts).
- Refurbished stock: iPhone 11 Pro £329, MacBook Air 13" M2 £749, MacBook Pro 16" M1 Pro £1,190, iPhone Air £699, MacBook Pro 14" M2 Pro £1,050 with their specs and grades; "New stock lands every Thursday", devices held for two days (refurb).
- Business service: weekly pickup route Monday-Friday with the areas (Northern Quarter, Ancoats, Salford Quays, MediaCity, Spinningfields, Deansgate, Oxford Road universities, Didsbury, Stockport) and every time window, loan devices, monthly invoice, accounts from five devices (fleet).
- Repair by post: price range reply the same day, a padded box and prepaid label, a video call diagnosis, back "usually within three working days", free return postage on repairs over £60 (mailin).
- Reviews by Priya (Pixel 7), Tom (MacBook Pro 13") and Aisha (iPad Air) (reviews).
- FAQ answers: passcode handling, ultrasonic board cleaning with an answer within a day, what the warranty covers, buying broken devices (faq).
- Booking: "We will confirm your slot by text or email within the hour" (the form's data-ok message in visit).

## Known limits
- The diagnosis checklist is held in place only on screens at least 1024 px wide and 760 px tall, with scroll-driven animations and motion allowed; on phones, tablets and shorter screens the band runs while the list scrolls past.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, the diagnosis shows every result and the quote at once, the refurbished devices wrap as a grid instead of sliding sideways, and the business schedule shows all its windows without the moving cursor.
- Without JavaScript the phone menu button cannot open the overlay; the links stay reachable in the footer.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Reflow left only in class names.
