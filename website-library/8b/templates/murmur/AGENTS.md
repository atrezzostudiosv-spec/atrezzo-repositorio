# AGENTS.md: saas landing page template

One-page website for a SaaS or app that sends small businesses one short weekly message, with a phone mockup, two plans and a contact form. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/saas-landing-page-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/saas-landing-page-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/saas-landing-page-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/saas-landing-page-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__toggle` `.nav__overlay` `.nav__close`
  - `section-script:contact`: `.contact__form` `.contact__done` `.contact__error`
  - `scene-script:noise`: `.noise__stage` `.noise__head` `.noise__field`
  - `scene-script:sources`: `.sources__cols`
  - `scene-script:note`: `.note__panel` `.note__phone` `.note__part` `.note__block` `data-part`
  - `scene-script:makers`: `.makers__stage` `.makers__track`
  - `scene-script:field`: `.field__stage` `.field__grid` `data-field-zoom`
  - `scene-script:pricing`: `.pricing__plan`
- `style="--len:N"` = characters in that display line, spaces included: `No dashboards.` is 14, `No streaks.` is 11, `No charts at midnight.` is 22, `One sentence on Monday.` is 23.
- The wordmark is six pieces of drawn SVG stroke paths (top bar, menu overlay, phone, two surface tiles, footer), not text in a font. Changing the name needs new paths in each of them and in the footer's six glyph paths, which the footer wave moves one by one.
- The four manifesto lines and the contact address carry style="--len:N", their character count, which sets the font size so they fit the width. Update it when the text changes.
- The first screen has 18 signal chips, the sources section exactly five columns, the makers track five cards, the field grid exactly eight tiles, the pricing row two plans and the manifesto four lines; the motion CSS and the scene measurements are built for those counts (the columns and manifesto lines are timed by :nth-of-type position). The field zoom starts from the tile marked data-field-zoom.
- The phone mockup, tiles, chips and arches are HTML and CSS, not images: recolour them through the colour variables in :root.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #6e1c1a (maroon: page ground, buttons, the note panel behind the phone, manifesto and contact backgrounds, the first-screen note card), `--color-2` #fee7a6 (butter: first screen, moodboard and FAQ backgrounds, text on dark slabs, the signal chips, form fields), `--color-3` #3d2217 (dark brown: body text, the Stock column, makers, surfaces and footer backgrounds, the hover fill of maroon buttons, borders), `--color-4` #8c4f25 (rust: the Visits column, one moodboard note, the printed-card tile), `--color-5` #bb9657 (gold: the Sales column, one moodboard note, the text-message tile, the hover fill of butter buttons and FAQ rows, the active outline on the phone), `--color-6` #171616 (near-black: sources and pricing backgrounds, the phone body); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Start free button in the top bar and the phone menu, Start listening button in the first screen: now #pricing; owner's target: your sign-up or trial page.
- Read a Monday note link in the first screen: now #note; owner's target: keep it, or link to a sample note or a demo.
- Start four free weeks buttons in the two plans (Studio, Collective): now #contact; owner's target: your checkout or sign-up page for each plan.
- Email links in the questions and in the large address in the contact section: now a mailto link to the placeholder address hello@murmur.example; owner's target: your support address.
- Phone link in the contact section: now a tel link to a placeholder number; owner's target: your phone number, or delete the line.
- The form in `#contact` (fields `name`, `email`, `shop`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name murmur (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (11, Unsplash: makers 5, field 5, faq 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Prices: Studio €9 a month, Collective €24 a month, "Prices include VAT", billing terms and "Four Mondays free", "No card needed until your fifth note" (pricing, FAQ).
- Customer count and customers: "forty-one small studios" and the five named makers with trades, towns and quotes (makers, field notes).
- What the product connects to and does: five sources, read-only access, "under twenty" words per sentence, "The common online shop platforms and card readers" (sources, note, FAQ).
- Delivery: Monday at 7:40, by app, email or text, a Thursday check-in, a printed card posted weekly (note, surfaces, pricing).
- Privacy promises: no ads, no data sold, stored in the EU, deleted the day an account closes, no notifications after six (manifesto, FAQ).
- Pause and cancel terms: pause up to eight weeks without billing, cancel in two taps (FAQ, pricing).
- Plan limits: one shop, up to five shops, up to eight people, replies from a person within a day (pricing, FAQ, contact).
- Sample signals and figures: 41 shop visits, 3 returns, a green vase saved 12 times, card fees up 0.2%, a postage change in May, and the other chips (first screen, sources).
- Company: "murmur AB, Stockholm", the Stockholm studio address, phone, email and hours Monday to Thursday 9:00 to 16:00 are placeholders (contact, footer, FAQ).
- Languages and time zones: "Notes arrive in your language and your time zone" (note).
- The note's date "Monday, 13 October" and "Week 42" (note, surfaces).
- "Posted weekly on Collective" and the Collective plan features (surfaces, pricing).

## Known limits
- Without JavaScript the Menu button cannot open the overlay, and the top bar links are hidden under 960 px.
- On phones the "Heard this week" lines in the five sources columns are hidden to fit the screen.
- The contact form has no backend: it checks the name and email, shows the thank-you line and sends nothing until you connect a form service.
- The first screen, the sources, the makers and the moodboard pin the page (300svh, 290svh, a long horizontal track and a zoom), which feels long on short laptop screens.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, nothing is pinned and the smooth wheel is off: every section shows its finished layout, the makers as a grid, the whole moodboard, and the phone's blocks are not lit as you read the three parts. In Firefox the first-screen load-in and the footer wave still play; with reduced motion they stop.
- Five Unsplash portraits and five moodboard photos load from Unsplash's servers, and the maker names on them are invented.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and murmur left only in class names.
