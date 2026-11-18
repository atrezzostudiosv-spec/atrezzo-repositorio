# AGENTS.md: hardware store website template

One-page website for an independent hardware store with services, workshops and tool hire. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/hardware-store-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/hardware-store-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/hardware-store-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/hardware-store-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits.
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.menu__close` `data-ground`
  - `section-script:opening`: `.opening__stage`
  - `section-script:visit`: `.visit__form` `.visit__fields` `.visit__done`
  - `scene-script:classes`: `.classes__deck`
- `style="--len:N"` = characters in that display line, spaces included: `Sixpenny` is 8.
- The opening's 26 tiles are positioned by inline custom properties on each tile (--x, --y, --w, --h, --delay, --phase) and fly along a CSS keyframe; to add or remove tiles, copy a tile and give it its own position and a different delay.
- The footer wordmark is sized from style="--len:8", the number of characters of the name; set it to the length of the new name.
- The departments section is built for exactly five panels: the CSS sets --departments-count: 5 on #departments for the held height and has separate rules for the first and last panel. To add or remove a panel, change that number too, and keep the markup of a panel (photo, copy, aisle label).
- Each hire row has a front face (the weekend price) and a back face (the price to buy new); the scroll animation turns the tag from the back to the front, so keep both faces in every row.
- The classes script measures each card's distance from the centre of the row, so the number of cards can change.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f1eee9 (page background and the soft fog behind the opening heading), `--color-2` #211d1e (text, rules, dark button fills, the departments ground and the menu overlay), `--color-3` #ffffff (button, guide card and class card faces, text on dark sections, the focus ring gap), `--color-4` #e4e17a (footer ground, front of each hire tag, owner role and quote, button hover fill, a yellow tone), `--color-5` #0e2c29 (owner section ground), `--color-6` #ef6a44 (the dot beside Open 7 days and the orange tone behind some photos, badges and guide covers), `--color-7` #b8cda1 (sage tone behind some photos, badges and guide covers), `--color-8` #ceb58c (sand tone behind some photos, badges and guide covers), `--color-9` #93abc9 (blue tone behind some photos, badges and guide covers), `--color-10` #66605b (stock counts, input placeholders and small grey text), `--color-11` #e5e1d9 (ground of the hire and brought photo frames and the newsletter box, and the fallback tone); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Find your aisle button in the first screen: now #departments; owner's target: keep it, or point it to your online catalogue or shop.
- Open today 8-6 link in the first screen and Open 7 days in the header: now #visit; owner's target: keep them on the opening hours, and update the hours text.
- See fixings, See tools, See paint, See garden and See keys links on the department panels: now #aisles, #hire, #counter, #aisles and #counter; owner's target: the matching category page of your online shop, if you have one.
- Read the guide, Read the list, Work it out, See the list and Check yours links on the department panels: now #faq; owner's target: a guide or blog page for each topic, or keep them on the questions.
- Call the counter, Book by phone and Reserve by phone links: now a tel: link to the counter phone; owner's target: your phone, or a booking page for the classes and hire.
- What the counter does and Come and say hello links: now #counter and #visit; owner's target: keep them.
- Sign me up button of the newsletter form: now a script checks the email and swaps the form for a thank-you line; nothing is sent (the form has action="#visit"); owner's target: your newsletter service form (Mailchimp, Buttondown, Formspree) or remove the form.
- The form in `#visit` (fields `email`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Sixpenny Hardware (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (47, Unsplash: opening 19, departments 5, counter 2, aisles 6, brought 6, owner 2, classes 4, hire 1, visit 1, faq 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Shop history and size: "since 1968", "Third owner ... since 2004", the story of the name and the Ashworths, "1,240 lines in stock" and the other aisle counts (opening, owner, aisles).
- Owner name, role and quote: Len Hollis (owner).
- Services, prices and times: keys from £4.50 in about 3 minutes, paint from £14 a litre, timber 50p a cut, sharpening from £5, rewiring from £18 (counter).
- Opening hours: Monday to Friday 8:00 to 18:00, Saturday 8:00 to 17:00, Sunday 10:00 to 16:00, "Open today 8-6" and "Open 7 days" (opening, header, visit, footer).
- Class programme: titles, four Saturday dates, times, prices of £15, £15, £20 and £18, places left, "eight people" and the rule for under-16s (classes).
- Tool hire terms: six tools with deposits, weekend prices and new prices; collect Friday from three, return by ten on Monday, a deposit and photo ID (hire, FAQ).
- Delivery and returns: "Within three miles on Tuesdays and Fridays", £5 and free over £60, returns "within 30 days, with the receipt" (FAQ).
- Key and paint claims: "most house, shed and padlock keys while you wait", security and car keys "three to five days", a scanner that matches paint in about ten minutes (FAQ).
- Ordering promise: "we can usually have it here by Thursday" (aisles).
- Parts brought in: the six cases with prices of £3.40 and £6.80 and a six-minute key cut (brought).
- Location notes: loading bays, the 14 and 22 buses, the district name Northfield (visit, footer).
- Newsletter promise: "One email a month" and "first Saturday of the month" (visit).

## Known limits
- Without JavaScript the menu button cannot open the menu, and the newsletter form posts to the page itself and sends nothing (a static host may answer with an error); the section links in the header stay reachable on wide screens.
- The departments section holds the screen for about four screens of scrolling (one per panel after the first), which is long on a short screen.
- Without scroll-driven animation support (Firefox today) and with reduced motion, the scroll motion and the smooth wheel are off: every section shows its finished layout, the departments stack as five screens and the hire tags show the weekend price. The tile loop and the opening load-in still play in Firefox and stop with reduced motion; the bar still hides on scroll down in both.
- The opening's tiles are small photos on a pale ground; they are decorative, so their alt text is empty.
- The class dates (18 October onwards) are written into the text and go stale; update them with the year before using the template.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Sixpenny Hardware left only in class names.
