# AGENTS.md: self storage website template

One-page website for a self storage facility with unit sizes, prices per week, building specification and a unit reservation form. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/self-storage-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/self-storage-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/self-storage-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/self-storage-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:contact`: `.ct__form` `.ct__status` `data-done` `data-missing`
  - `scene-script:opening-roll`: `.op__screen--1` `.op__mline`
  - `scene-script:promises-track`: `.pr__track` `.pr__panel` `.pr__ghost`
  - `scene-script:units-block`: `.un__faces` `.un__face`
  - `scene-script:move-in-deal`: `.mv__wall` `.mv__sheet`
  - `scene-script:extras-drum`: `.ex__drum` `.ex__item`
- `style="--len:N"` = characters in that display line, spaces included: `We keep what you` is 16, `are not using yet` is 17, `so the rooms you` is 16, `the bike, the cot,` is 18, `the boxed letters,` is 18, `the sofa for your` is 17, `new flat, kept dry` is 18, `and lit till you` is 16, `want it all back.` is 17, `Room` is 4, `Reach` is 5, `Return` is 6, `Elbowroom` is 9.
- The giant ghost words in the promise panels repeat the three promise names, and each carries style="--len:N" (Room 4, Reach 5, Return 6) that sizes it to fit: update --len when you rename a promise. The footer wordmark (--len:9) and the giant lettering in the contact section (--len:7, one span per letter) work the same way.
- The unit block turns exactly four faces, 90 degrees apart, and the move-in wall deals exactly four sheets (each with its own --move-in-tilt). The manifesto in the opening has ten lines in separate spans, and the opening scene reads their count to set its length. The extras drum reads its item count and takes another number of items; the neighbours grid places its five items by the classes nb__item--a to nb__item--e, so a sixth item needs its own grid position.
- The posters, the light bars, the ovals and the halftone dots are CSS and SVG, not images: recolour them through the colour variables in :root (--color-6 is the signal yellow). Scenes sit in separate style blocks named scene:<id> and their scripts only measure the page and set CSS variables.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ebebeb (page ground, a cool light grey), `--color-2` #121212 (text, button and form outlines, the dashed nav pill, the dark extras panel and the dots of the Come by lettering), `--color-3` #f8f8f7 (poster and sheet paper, the nav pill, form fields and text on the dark panel), `--color-4` #565656 (secondary text: the hours note, promise numbers and the line under the unit sizes), `--color-5` #848484 (the giant pale words behind the three promises), `--color-6` #ffd21a (the only saturated colour: the main button, price highlights, the manifesto's last word, the specification heading band, the location dot and link hovers), `--color-7` #c6c6c6 (hairlines between the services on the dark extras panel); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a unit button on the first screen: now #contact; owner's target: your online booking page, or keep #contact once the reservation form is connected.
- See the sizes button on the first screen and the Find the size that fits link in the room section: now #units; owner's target: keep as it is, or point to a page with your full price list.
- Privacy and terms link in the footer: now /privacy, a page the template does not contain; owner's target: your privacy policy and storage terms page.
- Phone links in the questions section and the contact section: now tel:+441610000000; owner's target: your own number, in the tel: link and in the visible text.
- The form in `#contact` (fields `name`, `contact`, `size`, `date`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Elbowroom Storage (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (18, Unsplash: promises 2, clear-room 1, units 4, conditions 1, move-in 4, neighbours 5, extras 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Size: 612 units, floors 0 to 3, 2.4 m high, a climate floor (opening, promises, units, conditions, neighbours, meta description).
- Prices: from £8, £15, £27 and £46 a week by size, VAT included, a 4-week month, first month half price online (units); van and two movers from £49 inside the M60; racking from £35; cover £1 a week (move-in, extras, faq).
- Terms: no contract, no deposit, no admin fee, fourteen days' notice, charged to the day access is handed back, a unit held free for a week, "your next month is free" if a promise is broken (opening, promises, faq, contact).
- Opening hours: open 24/7 by app, desk and staff 7:00 to 21:00, a guard at night, Christmas Day by app only (opening, conditions, faq, footer).
- Building: temperature 16 to 20 °C, humidity under 55% read every ten minutes, cameras with recordings kept thirty days, alarmed doors opened by phone (conditions).
- Insurance: contents cover up to £2,000 in the price, up to £50,000 from £1 a week (conditions, extras, faq).
- Location: Salford, M5, a few minutes from the M602, free parking by the loading doors, the address Example Wharf, Unit 4 (opening, contact, footer, nav).
- Customer claims: "most people stay eight months", "clear about nine square metres at home on average", "kerb to unit in four minutes", "four minutes to book" (opening, promises, clear-room, move-in).
- Door stories: units 118, 207, 033, 311 and 420 with what is kept (a red canoe, a wedding dress for a daughter who is nine, fourteen hundred records, a florist's buckets, nine years of a dental practice's files), "shared with permission" (neighbours).
- Services: five box sizes, bubble wrap and covers, parcel signing, student summer storage collected from halls in June, trader stock rooms with invoices, disc padlocks (extras).
- Rules: what cannot be stored (food, paint thinners, gas bottles, fuel, cash), access sharing in the app with a logged visit, card or direct debit monthly in advance with VAT invoices (faq).
- Company: "Elbowroom Storage Ltd", registered in England, no. 00000000, and the Privacy and terms page (footer).
- Promises: unit changes the same week at no cost, a free padlock, "we call you within the hour" after a reservation (promises, move-in, contact thank-you line).

## Known limits
- Scroll-driven animation is used when the browser supports it (Chrome, Edge and Safari today; Firefox does not yet) and the visitor has not asked for reduced motion. Otherwise the page is static: the opening still has its load-in, but the posters, tracks, blocks and drum are plain layouts and the nav captions stay.
- With reduced motion requested the load-in, the light-bar glints, the tilting brand oval and all scroll scenes are off, and the page is the same static layout; the hover transitions on buttons, links and the FAQ markers still run.
- On wide screens with a mouse, a small script smooths the wheel so scrolling feels softer; on touch screens and in static mode the browser scrolls natively. The pinned scenes add scroll length: about 1.6 screens for the move-in wall, 2.2 for the extras drum, 2.6 for the units block, and the promises track as much as its width needs (about four screens at 1440 by 900).
- The reservation form sends nothing: connect it to a form service or your booking system. The Privacy and terms link goes to /privacy, which the template does not contain.
- The giant pale words in the promise panels are decorative and low in contrast by design; the real text is in the headings and paragraphs. The handwritten notes use a third font (Playpen Sans) at 19 px, 17 px in the promise panels on phones.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Elbowroom Storage left only in class names.
