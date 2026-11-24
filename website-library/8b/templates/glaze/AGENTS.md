# AGENTS.md: nail salon website template

One-page website for a gel nail studio or beauty salon, for clients who book a chair. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/nail-salon-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/nail-salon-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/nail-salon-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/nail-salon-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__toggle` `.menu__close`
  - `section-script:visit`: `.visit__form` `.visit__status` `data-sent`
  - `scene-script:finishes`: `.finishes__stage` `.finishes__head` `.finishes__track` `.finish__photo`
  - `scene-script:layers`: `.layers__stage`
  - `scene-script:club`: `.club__stage`
- `style="--len:N"` = characters in that display line, spaces included: `Glaze` is 5.
- The orbs, rings and glass panes are CSS (radial gradients, masks, backdrop blur), not images: recolour them through the colour variables in :root.
- The footer wordmark is sized from style="--len:5", the number of letters: update it when the name changes.
- The finishes scene measures the card size and the track's overflow on load and resize, so finish cards can be added or removed. The four layer sheets and the four care notes are timed one by one in the CSS (data-8b-fixed="4"): keep four of each.
- The visit form shows its thank-you line from the form's data-sent attribute and sends nothing until you connect a service.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #a6968f (light taupe at the upper end of the booking section's background gradient), `--color-2` #62504c (page background, the ground of the finishes, artists and club sections, and the bottom of the booking gradient), `--color-3` #fbf5f0 (text on dark sections, the pale glass edges and borders, button text on the near black fill), `--color-4` #23171a (near black: the layers and footer backgrounds, text on light sections, the filled Request a time button), `--color-5` #f2671f (orange of the opening ground, the orbs and rings, the button hover fill, the number discs in the care notes as they pass and the favicon), `--color-6` #ffc49b (peach: the top of the opening ground, the care section's ground, finish prices, small labels on dark glass, the light end of the orb gradients and the tint of the peach panes), `--color-7` #98320c (deep ember: the dark end of the orb and ring gradients and the care note titles as they pass the middle of the screen), `--color-8` #bcb0a9 (sand: the ground of the studio, prices and questions sections); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a chair button in the opening and Join at your visit button in the club section: now #visit, the booking form; owner's target: your online booking page, or keep #visit once the form is connected.
- How a set is built link in the opening: now #layers; owner's target: keep, or a page about your process.
- Phone link in the phone menu, phone and email links in the Talk to us line and the footer: now a tel: link and a mailto: link with placeholder numbers; owner's target: your real phone number and email address.
- Instagram link in the footer: now https://www.instagram.com/ (the home page of Instagram); owner's target: your Instagram profile.
- The form in `#visit` (fields `name`, `phone`, `finish`, `day`, `note`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Glaze (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (14, Unsplash: opening 1, finishes 6, layers 1, studio 1, artists 4, file 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Location and contacts: the street name "Example Street" (in the studio heading and address), London E8, "five minutes from Hackney Central" (Visit), phone +44 20 0000 0000, hello@glaze.example (studio heading, Visit, menu, footer, title and meta description).
- Prices: the six finishes "From £42, £52, £48, £45, £50, £68" (finishes) and the 14 rows of the price sheet, incl. £3-8 per nail of art, £15 removal, £38 refill, £82 hands and feet (finishes, prices).
- Club: "£39 a month", a refill or colour every 21 days, first pick of Saturday tables, 10% off hand-painting and pedicures, pause any month (club).
- Hours: Tuesday to Friday 10-20, Saturday 9-18, Sunday 11-17, Monday closed in Visit; the footer says Tuesday to Saturday 10-20, Sunday 11-17 and does not match, set one version.
- Team: Mara Osei, Juno Bell, Ines Varga and Theo Lam with specialties and working days, "six tables", "Each artist keeps her own lamp" (artists, studio, faq).
- Process claims: sixty seconds of curing per layer, six to nine layers, a set takes fifty to eighty minutes, lasts three weeks, up to four for a bare set (opening, layers, faq).
- Studio details: six tables along one window, a low sofa, talk-free weekday mornings from ten to eleven, pot tea, oat milk and clementines, daylight from nine until four (studio, in the meta description).
- Promises: a glass file etched with initials kept at the studio, free repair of a chipped nail within seven days, "we answer the same day", a call back within the day, card or phone payment only (file, faq, prices, visit).
- Walk-ins and booking: walk-ins when a table is free, a photo added to the booking note for a custom design, Best day and Finish options (faq, visit).
- Care advice: cuticle oil at night, one-way filing, gloves, refill before a millimetre and a half of growth (file, faq).
- Photos and their alt texts: all show other people's work and hands; replace with the studio's own (opening, finishes, layers, studio, artists, file).

## Known limits
- Without JavaScript the phone menu button does nothing, the form does not send anything and the top bar keeps its docked dark text, hard to read over the dark sections; the FAQ rows open natively.
- The footer hours differ from the hours in the Visit section.
- In the finishes scene the frosted bands use backdrop-filter, which is heavy on older phones; five of the six photos are 650 px wide, the Sculpt photo 1140 px.
- The orbs and rings are decorative and cross the edges of the screen on phones by design; text on the club cards and the other glass panes sits on translucent glass, so check contrast after changing colours.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the scroll animations and the smooth wheel are off: the six finishes sit in a grid of three columns (one on phones), the two club cards stand side by side, the layer sheets, the studio photo, orbs, rings and headings rest in place. In Firefox the opening pane and photo still rise in and its rings turn.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Glaze left only in class names.
