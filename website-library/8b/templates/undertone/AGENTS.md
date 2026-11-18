# AGENTS.md: hair salon website template

One-page website for a hair salon or colour studio with a price list, a team of stylists and a booking form. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/hair-salon-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/hair-salon-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/hair-salon-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/hair-salon-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__toggle` `.nav__menu` `.nav__close`
  - `section-script:contact`: `.contact__form` `.contact__status` `data-missing` `data-sent`
  - `scene-script:shades`: `.shades__row` `.shades__strip`
  - `scene-script:late`: `.late__mask` `.late__word`
  - `scene-script:transform`: `.transform__spray` `.transform__photo`
- `style="--len:N"` = characters in that display line, spaces included: `Late` is 4, `Louder` is 6, `Undertone` is 9.
- The shades row and the aftercare rules are built for exactly six and five items (repeat(6, 1fr) and repeat(5, 1fr) grid columns; the scenes read whatever count is there). Change the copy, not the number, or change the grid columns with it.
- The words Late, Louder and Undertone (footer) carry style="--len:N", the number of characters, which sizes the type to the width. Update it when you change the word.
- The red, ink, cyan and white are CSS variables in :root; the torn edges on buttons, badges and paper notes are CSS clip-paths, so recolour through the variables.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f6f6f4 (page ground, the solid nav bar after a short scroll, the shades, consultation, transformation and aftercare sections), `--color-2` #0e0e0e (text, rules, the dark late, prices and footer sections, the fill of the two ink buttons before the hover and of three badges), `--color-3` #d3261e (the opening screen and contact section ground, the colour price band, big numerals, the cut rule, red badges, the word Louder, the price in the transformation section and the hover fill of ink buttons), `--color-4` #dcdcd8 (grey ground of the cuts and chairs sections and behind photos while they load), `--color-5` #36c6cb (cyan accent: Cool badges, the lightening price band and the layer a white button's hover wipe reveals), `--color-6` #ffffff (paper notes, form fields, the fill of white buttons, labels on ink buttons, text on red and ink, the white cut price band), `--color-7` #555553 (secondary text: intros, descriptions, roles, dashed formula lines), `--color-8` #a3a39f (muted text on the dark late, prices and footer sections); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a chair button in the nav and the phone menu's Book link: now #contact; owner's target: your online booking page, or keep #contact once the form is connected.
- Book a chair button on the first screen: now #contact; owner's target: your online booking page, or keep #contact once the form is connected.
- Book a late chair button in the Late section: now #contact; owner's target: your booking page filtered to Thursday evenings.
- Plan a transformation button in the transformation section: now #contact; owner's target: your booking page or an enquiry form for long appointments.
- Book with Ama, Book with Jess, Book with Theo and Book with Dez links in the chairs section: now #contact; owner's target: each stylist's own booking page.
- Request a chair button in the contact form: now a form with action "#" that checks the two required fields and shows a thank-you line; nothing is sent; owner's target: your form service, or your booking system's widget.
- Instagram and TikTok links in the footer: now the networks' home pages (https://www.instagram.com/ and https://www.tiktok.com/); owner's target: your own profile addresses.
- The form in `#contact` (fields `name`, `contact`, `service`, `day`, `note`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Undertone (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (19, Unsplash: opening 1, shades 6, cut 1, consult 1, late 1, chairs 4, transform 1, prices 1, care 1, contact 1, footer 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Prices: every figure in the six shades (from £150 to £210), the four cuts (£68, £72, £42, £18), the 15-line price list, the transformation day (from £320, £60 deposit) and the £20 deposit in the contact notes (shades, cut, prices, transform, contact).
- Price rules: "very long or very thick hair can add up to 20%", walk-ins welcome before noon for the fringe, "a gloss two weeks later, on us" (prices, cut, transform).
- Opening hours: Tue to Wed 10 to 7, Thursday 10am to 11pm, Friday 9 to 6, Saturday 9 to 5, Sunday and Monday closed; three late chairs at 7, 8 and 9pm (contact, late).
- Team: Ama (head colourist, 11 years), Jess (cutting lead, 8 years), Theo (vivid colourist, 6 years), Dez (crops and fades, 9 years), with their specialisms and who takes the Thursday late chairs; the portraits are stock photos and their alt texts name the people (chairs).
- Location: Northern Quarter, Manchester (title, description, contact, footer), the address placeholder and the phone and email placeholders; "Manchester rain" in Ama's bio (chairs).
- Company: "Undertone Studio Ltd" and the year 2026 (footer).
- Consultation promises: a free 15-minute daylight consultation, a strand test, a written formula card the client keeps; the example card names "R. Ahmed", a date and formula values (consult).
- Booking terms: a call back within one working day, a free ten-minute patch test 48 hours before any colour, a £20 deposit that comes off the bill, free moving with 24 hours' notice (contact).
- Transformation day: one stylist, one chair, five hours, lunch brought in (transform).
- Late evening: "Thursdays we stay open till 11pm", the playlist and the phones-in-bags rule, "same prices as daytime" (late).
- Aftercare rules: 72 hours before the first wash, sulphate-free shampoo, heat protection, a twenty-minute gloss at week 6 (care).
- In-house claims: "mixed in-house", "priced before we start", "cut dry", "nobody leaves with a colour they didn't choose" (shades, cut, chairs).

## Known limits
- Without JavaScript the phone menu button cannot open the overlay, and below 900px the section links and the phone number in the bar are hidden. The footer repeats most section links.
- The form does not send anything yet: it only checks the name and the phone or email and shows a message. Connect a form service or a booking widget before publishing.
- The Instagram and TikTok links point at the networks' home pages until you replace them.
- The Late section holds its screen in place for about one and a third screens of scrolling, on phones too; the word is sized by CSS from its --len, and the photo inside the letters is dark, so check it after swapping the photo.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, the scroll effects do not run: the shades sit in a plain row in colour, the word Late stays at its normal size in one screen, Louder stays one word, photos show without the torn reveal and the wheel scrolls natively. The opening load-in still plays in Firefox, not with reduced motion; the bar still hides on scroll.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Undertone left only in class names.
