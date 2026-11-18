# AGENTS.md: wedding planner website template

One-page website for a wedding planning studio that plans garden weddings. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/wedding-planner-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/wedding-planner-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/wedding-planner-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/wedding-planner-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.menu__close` `.menu__links`
  - `section-script:contact`: `.contact__form` `.contact__status`
  - `scene-script:seasons`: `.seasons__viewport`
  - `scene-script:handover`: `.handover__stage` `.handover__item`
- `style="--len:N"` = characters in that display line, spaces included: `Spring` is 6, `Summer` is 6, `Autumn` is 6, `Winter` is 6, `Aubade` is 6.
- The logo in the top bar is a round chip (.nav__logo, black at the top of the page, orange once scrolled) holding a small inline SVG plus mark, not the name; the name appears as text only in the menu and the footer. Replace the chip with your own logo or a text link.
- The season words and the footer wordmark use style="--len:N" (the number of characters) to size the type. Update it when you rename them.
- The four seasons become a horizontal track of 100vw fields in CSS while the motion runs; the track moves 75% of its width over 300vw of scroll, so it is built for exactly four fields. Keep four, or change the track keyframes and the room height in the seasons scene together.
- Each quote card gets its stack offset from the inline --quote-step (0 to 3) and its colour from a class (quote--orange, quote--black, quote--grey, quote--white); keep steps in order when you add or remove cards.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #efefef (page ground and the grounds of the packages, weddings, quotes and contact sections, the spring field), `--color-2` #1c1c1c (text, buttons, rules, the black day and journal sections, the winter field, one wedding card and one quote card), `--color-3` #8c8c8c (the handover and footer grounds, the summer field, one wedding card, the grey quote card), `--color-4` #f0925c (the opening field, the autumn field, the logo chip, button hover fills, question markers, hour times on black, one wedding card and the orange quote), `--color-5` #ffffff (text on black and grey, the planners and questions grounds, the handover labels, one wedding card and one quote card, the footer wordmark), `--color-6` #5c5c5c (secondary paragraphs and captions on light grounds), `--color-7` #a3a3a3 (secondary text on the black sections and in the menu overlay); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Check your date button in the top bar and Tell us your date button in the opening: now #contact; owner's target: your booking or enquiry page, or keep them pointing to the enquiry form.
- Ask about full planning, Ask about partial planning and Ask about the day links in the planning section: now #contact; owner's target: the same enquiry form or a page for each package.
- Read the note links under the three journal posts: now relative addresses journal/sweet-peas-in-september, journal/a-rain-plan-is-not-a-marquee and journal/a-run-sheet-your-aunt-can-read, which do not exist in this file; owner's target: your own blog post addresses, or remove the links and the journal section.
- Instagram and Pinterest links in the footer: now the home pages instagram.com and pinterest.com; owner's target: your studio's profiles.
- Send the enquiry button in the contact form: now nothing is sent: the form has action="#contact" and a script shows the thank-you line; owner's target: your form endpoint (Formspree, Netlify Forms) or your own handler.
- The form in `#contact` (fields `names`, `email`, `date`, `place`, `guests`, `source`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Aubade (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (23, Unsplash: opening 1, seasons 4, day 8, weddings 4, planners 2, journal 3, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Studio size and capacity: "Two planners, eighteen weddings a year", never two on one weekend, ninety minutes from Bath (opening, FAQ).
- Package names, prices and timing: Full planning from £7,400 (twelve to eighteen months ahead), Partial planning from £4,200 (six to nine months), The day itself from £1,900 (from eight weeks), with the inclusion lists (planning, FAQ).
- Process promises: a written run sheet and rain plan with every wedding, a rain plan by the third month, a free first call of half an hour, a reply within two working days, a written quote after the first call (planning, FAQ, contact).
- The timed wedding day: times from 05:40 to 22:30 and what happens at each (day).
- Planner profiles: Nell Ashby (founder, ten years at a Somerset garden estate) and Theo Marsh (former stage manager); the portraits are stock photos (planners).
- Weddings shown: Hattie & Sol, Priya & Tom, Ines & Rowan, Mei & Callum with venues, months and stories (the 13:20 move under the arch); the photos are stock (weddings).
- Couples' quotes: Amara & Joe, Hattie & Sol, Ines & Rowan, Mei & Callum (words).
- Seasons and flowers: the flower lists per season, the timing of the ceremony and dinner per season, and the claim that the growers cut flowers the evening before (seasons, day).
- The ten tasks the studio takes on and the four that stay with the couple (handover).
- Journal posts: three titles, dates in 2026 and sentences; they are invented, and the Read the note addresses lead nowhere (journal).
- Address and hours: "The Glasshouse Rooms, 1 Example Street, Bath BA1 0ZZ" and "Visits by appointment, Tuesday to Friday" (menu, contact, footer).
- Footer: "© 2026 Aubade Weddings Ltd. Planned in Bath.": put in your legal name.

## Known limits
- Without JavaScript the menu button cannot open the overlay and the enquiry form shows no thank-you line; the FAQ opens natively.
- Without scroll-driven animation support (Firefox today) and with reduced motion, the scroll scenes and the smooth wheel are off, the seasons stack one screen each and every section shows its finished layout. The opening load-in and the menu wipe still play in Firefox and stop with reduced motion; the bar still hides on scroll down and the menu dots move on hover in both.
- The CSS animates fixed counts: eight hours with eight photos in the day (:nth-of-type rules), four wedding pairs (classes wedding--a to wedding--d) and four quote cards (one colour class each). A ninth hour, a fifth pair or a fifth card stays still unless the scene CSS gets a matching rule.
- The journal links point to pages that do not exist in this file.
- The opening has no scroll motion, only the load-in, so the first screen is quieter than the sections below it; its four .opening__flood spans are the same orange as the ground and show nothing.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Aubade left only in class names.
