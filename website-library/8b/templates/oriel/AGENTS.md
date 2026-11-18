# AGENTS.md: jewelry website template

One-page website for a goldsmith who remakes old gold into custom rings and jewellery. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/jewelry-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/jewelry-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/jewelry-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/jewelry-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.menu__close`
  - `section-script:contact`: `.ct__form` `.ct__status` `data-done` `data-error`
  - `scene-script:pieces`: `.pc__track` `.pc__item` `.pc__frame`
  - `scene-script:bench`: `.bn__step` `.bn__name` `.bn__photo`
  - `scene-script:studio`: `.st__people` `.st__circle`
  - `scene-script:footer`: `.ft__mark` `.ft__dot`
- `style="--len:N"` = characters in that display line, spaces included: `Sit &amp; Sketch` is 12, `Melt &amp; Refine` is 13, `Saw &amp; Forge` is 11, `Set The Stone` is 13, `Polish &amp; Hand Over` is 18, `Oriel` is 5.
- The wordmark in the footer sets its size from style="--len:5", the number of characters of the name. The coral dot after the name is a separate span, repeated in the header.
- The five bench step names carry an inline --len each (12, 13, 11, 13, 18, the character counts of the names); change them when you rename a step. With motion on, scene-script:bench wraps each name in a .bn__heat span and adds three aria-hidden copies at narrower and lighter settings of the width and weight axes, so keep the name as plain text.
- The fused photo-and-pill rows of the metal section and the stand-in points (m-fuse-2) get their neck from CSS variables and from atom-script:m-fuse-2, which measures the pill height against the round photo; keep the orb, neck and pill elements in that order. The smaller near-black pills (m-fuse: the photo caption and the contact facts) use the same order without the script.
- The strand of pieces needs its photos wider than their frames (with motion on, the scene styles the images at 124% width), so use images that can be cropped sideways. The script measures the strand, so the number of pieces can change.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #eeeef1 (page background and the nav bar once it floats), `--color-2` #121014 (text, the pieces, makers, menu and footer grounds, the middle story card, the booking form, the small fused pills of the contact facts and the photo caption, rules in the sittings list), `--color-3` #e9736a (the opening panel, buttons, the free-cleaning pill, piece prices, the logo dot, the 'You' circle, the open question's plus), `--color-4` #8e8a75 (the sittings ground, the first story card, the empty backing of photos), `--color-5` #cdcae8 (the stand-in and care grounds, the third story card), `--color-6` #ffffff (text on dark grounds, the fused photo pills, price pills, an opened question), `--color-7` #5b5a63 (small text in the metal rows, care prices, the empty frames of the pieces strip), `--color-8` #aeacb6 (secondary text on near-black: piece lines, makers' roles, footer labels, the form status line); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Price Guide button in the header: now #care; owner's target: your price list page, or keep it on the care and prices section.
- Talk To A Goldsmith button in the header: now a tel: link to the studio phone, labelled with the founder's name; owner's target: your own number and the name of the person who answers.
- Book A Free Valuation button in the first screen: now #contact; owner's target: your booking calendar URL, or keep it on the form.
- Read Our Questions button in the gold section: now #faq; owner's target: keep it, or point to a longer sourcing page.
- Ask About A Stand-In button in the proposing section: now #contact; owner's target: your enquiry form or an email link.
- Request A Time button of the Book A Visit form: now action="#" with method post; a script checks the name and email, clears the form and shows a thank-you line, nothing is sent; owner's target: your form endpoint (Formspree, Netlify Forms) or your own handler; drop the preventDefault in section-script:contact when you do.
- Email us link in the contact block and the email in the footer: now mailto links to the studio address; owner's target: your studio address.
- The form in `#contact` (fields `name`, `email`, `phone`, `topic`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Oriel (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (26, Unsplash: navigation 1, studio 4, opening 1, pieces 5, gold 3, bench 5, standin 1, stories 6, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Starting prices: engagement rings from £1,450, wedding bands from £420, earrings from £260, signet rings from £680, pendants from £340; the £60 stand-in ring credit (pieces, proposing).
- Service prices: resizing from £45, restringing from £55, re-plating £60, chain repair from £35, re-setting from £80, engraving from £40, insurance valuation £50, free cleaning and claw check for life (care).
- Process claims: six to eight weeks (four for wedding bands), a free valuation in about twenty minutes, five sittings, two approval visits per commission (opening, bench, FAQ).
- Metal and hallmark claims: gold returned as your own metal, 9, 14 or 18 carat, recycled grain from a British refiner, hallmarks from the Edinburgh Assay Office, stones traceable to the mine (gold, FAQ): all must be true for the new business.
- People: Isla Gowan (founder, answers the header call button), Tam Rennie (thirty years setting stones), Morag Baird (front desk), Calum Shaw (third-year apprentice); the portraits are stock photos (studio).
- Customer stories: Eilidh of Portobello, Graham of Stockbridge and Priya of Leith, their quotes and the three before and after stories, with stock photos as the pieces (stories).
- Opening hours: Tuesday to Saturday 10:00 to 17:30, Thursday until 19:00; visits by appointment (menu, contact, footer).
- Location: the studio address and postcode, the street named in the contact heading "To Tanner's Wynd" and the city, Edinburgh (menu, contact, footer, hallmark mention).
- Company line: "Oriel Goldsmiths Ltd. Registered in Scotland." (footer): put in your legal name and registration.
- Gold buying: "We do, at the day's rate" with a written figure (FAQ): confirm you offer it.
- Contact responses: "Morag will email you within a working day with two or three times" (the form's thank-you line).
- Phone and email placeholders in the header, menu, FAQ, contact and footer: put in your own.

## Known limits
- Without JavaScript the Menu button cannot open the overlay; the footer links stay reachable. The questions are native details and open without it.
- The booking form is a demo: with JavaScript it only checks the name and email, clears itself and shows the thank-you line; without it the form posts to #.
- The pieces section holds the screen for about four item widths of scroll and the studio section for about 1.4 screens, which is long on short laptop screens.
- On phones the stacking story cards are compressed into a smaller layout with a small came-in photo; long stories may be tight.
- The story stack is written for three cards: the sticky offsets of cards 2 and 3 are :nth-child rules, and scene:stories ties each card's shrink to the next card by its surface class (m-surface, m-surface-2, m-surface-4). A fourth card needs its own offset and scene rules.
- Without scroll-driven animation support (Firefox today) and with reduced motion, the load-in, the scroll motion and the smooth wheel are off: the pieces sit in a five-column grid (three below 1024 px, two on phones), the sitting names rest wide and bold with full-size photos, the makers show in their row, the care pills in one block and the wordmark at full width. The story cards still stack without shrinking, and the nav still floats and hides on scroll.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Oriel left only in class names.
