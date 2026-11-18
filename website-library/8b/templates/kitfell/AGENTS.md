# AGENTS.md: outdoor gear rental website template

One-page website for an outdoor kit hire shop that rents tents, packs and boots by the night. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/outdoor-gear-rental-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/outdoor-gear-rental-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/outdoor-gear-rental-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/outdoor-gear-rental-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav-menu`
  - `section-script:footer`: `.foot-form` `.foot-form__msg` `data-invalid` `data-done`
  - `section-script:packs`: `.pack__price` `.packs-nights`
  - `scene-script:kit-index`: `.kit-cards` `.kit-card__title` `.kit-grid` `data-index-label`
  - `scene-script:packs-deal`: `.packs-grid` `.pack`
  - `scene-script:care-track`: `.care-pin` `.care-track` `.care-panel` `.care-tick`
  - `scene-script:trips-zoom`: `.trips-stage` `.trips-grid` `.trips-cell--centre`
- `style="--len:N"` = characters in that display line, spaces included: `Kitfell` is 7.
- The pack prices are data values: each price element carries data-price-2, data-price-3 and data-price-7, and section-script:packs writes the one chosen with the radios. Change both the visible price and the three attributes.
- The trips grid is built for exactly nine cells (six photos and three quotes) and its centre cell is marked trips-cell--centre; scene:trips-zoom scales about that cell.
- scene:kit-index builds the shelf index from each kit card's title and id, and from the section's data-index-label; keep the id on each card (kit-tents, kit-sleep and so on) when you rename or add cards.
- The footer wordmark has style="--len:7", its character count, which CSS uses to size it.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ecf1f5 (page ground and the opening screen), `--color-2` #06132e (text, the packs band, the footer and the full-screen menu), `--color-3` #2b3bff (the only accent: button fills on hover, kit prices, the shelf index marker, focus outlines), `--color-4` #b4ddf8 (background of the care section), `--color-5` #ffffff (kit cards and other surfaces, text on navy), `--color-6` #4c5a70 (descriptions under headings, table headings, detail labels and unselected shelf links), `--color-7` #a7b4ca (small text on navy: the packs intro and legend, field placeholders, the form message and the legal lines), `--color-8` #ddebf6 (round buttons, small badges, photo backing and link underlines); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, map, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- "Book kit" button in the nav, "Reserve kit" button in the kit room, and the round arrow on each kit card and ready pack: now #visit; owner's target: your online booking or enquiry page, or keep #visit.
- "How hire works" button in the opening: now #how; owner's target: keep as is.
- "Book by email" button in the visit card: now mailto: with a placeholder address and the subject "Kit booking"; owner's target: your booking email, or a link to your booking system.
- "Get directions" link in the visit card: now Google Maps search for the town; owner's target: a map link to your shop.
- Phone link in the visit card: now tel: with a placeholder number; owner's target: your real number.
- "Instagram" and "Strava club" links in the footer: now the home pages of the networks; owner's target: your own profile pages, or remove them.
- "Hire terms" and "Privacy" links in the footer: now #faq and #visit; owner's target: your hire terms page and privacy policy.
- Route notes sign-up form in the footer: now action="#": nothing is sent, the script only shows a thank-you line; owner's target: your newsletter form address or provider.
- The form in `#footer` (fields `email`) sends nothing; `section-script:footer` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Kitfell (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (29, Unsplash: opening 1, kit 6, packs 4, fitting 3, care 6, routes 1, trips 6, faq 1, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Kit room: six shelves of about four hundred pieces and nightly prices (Tents from £12, Sleep from £6, Packs from £5, Cook from £4, Boots from £8, Shells from £7) (kit, opening).
- Ready packs: four packs with their contents and prices for 2 nights, 3 nights and a week: £64/£82/£140, £48/£60/£98, £96/£124/£210, £36/£46/£80 (packs). The prices sit in data attributes as well as visible text.
- Hire terms: nothing charged until collection, a card held and released on return, normal wear free, damage charged beyond a simple repair and never more than the item is worth, extensions at the nightly rate, delivery to campsites and huts within twenty miles for £15 each way, booking needed for weekends from May to September (how, FAQ).
- Fitting: a free twenty-minute fitting, boots tried on a slope, packs loaded to weight, shells tried over layers (fitting, how).
- Care process: six checks including forty-eight hours in a drying loft, a hosed tent, stoves lit and seals replaced each season, a card with the date and initials on each piece (care).
- Support: a phone number answered until nine at night, a route card with every hire, an after-hours returns locker (how, visit).
- Routes: four real-sounding routes in the Lake District with distance, ascent, time and grade (routes); check against your own area.
- Trips: three customer quotes with first names and the pack or route they used (trips).
- Shop: the building and road (placeholders after replacement), opening every day 8:00 to 18:00 with the returns locker open all night, phone and email (visit, footer).
- Company: "Kitfell Kit Hire Ltd", a registration number (replaced with zeros), "Hire since 2011, at the foot of Loughrigg" (footer).
- Newsletter: route notes once a month, the next sent on the first Friday of the month (footer).

## Known limits
- Without JavaScript the menu button cannot open the overlay at 900 px and below, the pack prices do not follow the nights switch, the kit index is not built, and the sign-up form sends nothing; the FAQ still opens.
- Without scroll-driven animation support (Firefox today) the page shows its finished layout: the opening window and lift still play on load, but the photo does not drift, the kit index is not built, the care checks and the trips form plain grids and nothing pins. With reduced motion on, nothing plays on load either; the nav bar still hides on scroll and hover transitions still run.
- The sign-up form has action="#" and nothing is sent; connect a form or newsletter service before publishing.
- The care track pins its section at every width and the trips zoom pins its section on screens wider than 760 px, so the page is long to scroll; the trips grid is a fixed 3 by 3.
- The fitting section swaps exactly three photos for three stories through CSS :nth-of-type rules; a fourth story would get no photo swap unless those rules get a fourth entry.
- The opening style block still holds rules for a removed first screen (op-word, op-screen--1, op-card) that no markup uses; they do nothing and can be deleted.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Kitfell left only in class names.
