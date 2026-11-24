# AGENTS.md: sneaker store website template

One-page website for an independent streetwear and sneaker shop with a product drop, repairs and stores. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/sneaker-store-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/sneaker-store-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/sneaker-store-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/sneaker-store-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:contact`: `.contact__form` `.contact__status`
  - `scene-script:drop`: `.drop__photo`
  - `scene-script:lookbook`: `.look__pin` `.look__track`
  - `scene-script:repair`: `.rep__cards`
  - `scene-script:club`: `.club__lane`
  - `scene-script:contact`: `.contact__mark` `.cm__word`
- `style="--len:N"` = characters in that display line, spaces included: `Say hello` is 9.
- The big "Say hello" wordmark has style="--len:9", the character count that CSS uses to size it; scene:contact splits the two words into letters, so keep the markup of two words in their own spans.
- The lookbook rail is CSS under [data-8b-live]: the scene script wraps the stage in a taller room and measures how much wider the row is than the screen, so you can add or remove looks and the hold follows. The static layout is a CSS grid of cards.
- The repair cards are a three-column CSS grid; a fourth card would need a new grid rule, and scene:repair spreads them from the middle card on desktop.
- Headings are split into lines by the .ln spans inside them; keep one span per visual line so the slab effect can slide each line.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f4f7ec (page background and the top bar), `--color-2` #121411 (text, button hover fill, the run club panel and the footer background), `--color-3` #c6ef4e (the accent: button fill, badges, run club paces, open FAQ plus), `--color-4` #e5eadb (icon circles, image frame backing, the closed FAQ plus), `--color-5` #cfd6c3 (dashed rules and form field borders), `--color-6` #ffffff (repair cards, form fields, text on the dark panels), `--color-8` #a9ae9f (run club paragraph and group labels, footer address and small print), `--color-9` #1f231d (dashed rules inside the run club panel and the footer), `--color-10` #5d6254 (spec labels, wear-test column heads, hours labels, contact labels); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, map, email, phone, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- "Get a reminder" button in the drop section: now #contact; owner's target: your release reminder or newsletter sign-up, or your shop page for the product.
- The bag icon in the top bar: now #drop; owner's target: your cart or checkout page (or remove the icon if you do not sell online).
- The saved-looks and members icons in the top bar: now #lookbook and #club; owner's target: a wishlist page and a members or login page, or remove them.
- "Book a repair" button in the repairs section: now #contact; owner's target: your repair booking page.
- "Join a run" button in the run club section: now #contact; owner's target: your run club sign-up or group chat link.
- "Directions" links in the two store cards: now a Google Maps search for the city only (Rotterdam); owner's target: a map link to each of your stores.
- Contact form: now action="#contact": nothing is sent, the script only shows a thank-you line; owner's target: a form service address (Formspree, Netlify Forms).
- The form in `#contact` (fields `name`, `email`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name STRADE (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (13, Unsplash: drop 1, lookbook 5, wear-test 1, repair 3, stores 2, club 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- The drop: name "Concrete Low", 300 pairs, no restock, €145, EU sizes 38 to 47, recycled suede with ripstop panels, a stitched gum sole resoled free, a workshop in Porto, release Saturday 18 October at 10:00 in both stores and online (drop, FAQ, lookbook, wear-test).
- Look prices: Twill zip jacket €149, Wide black chinos €95, Wool car coat €239, Red heavy tee €39, Pleated trousers €110, Boxy blazer €169, Straight jeans €99, Leather loafers €135, Cropped heavy tee €35, Baggy light jeans €105, Round sunglasses €65, Ribbed knit set €129, Wide white trousers €115, Chunky boots €189 (lookbook).
- Wear-test log: label names (Grauwerk, Odd Mile, Kanto, Halde, Sola Lab), days worn (28 to 40), the notes and the verdicts, including "212 km on foot, one resole" (wear-test).
- Wear-test process: samples worn by staff for a month, in the rain and on the bike; what fails goes back to the maker with notes (wear-test).
- Repair promise: free mending for as long as you wear anything bought there, most repairs ready within a week, cuts and burns quoted first, trade-in for store credit (repair, FAQ).
- Stores: two shops in Rotterdam named Kade and Binnenweg, their addresses (placeholders in this package), the weekly opening hours of each, the Thursday late opening, Binnenweg closed on Sunday (stores).
- Run club: every Saturday at 07:30 from the Kade store, three pace groups with paces and routes, a bag drop and coffee, free, no sign-up, any shoes (club).
- Shipping and returns: orders before 15:00 leave the same day, one to two working days in the Netherlands and three to five in the EU, 30-day returns unworn with tags, free in store, a prepaid label by post (FAQ).
- Release stock split: half the pairs held for the stores, half online at 10:00, a reminder email ten minutes before (FAQ).
- Sizing: the maker's measurements listed next to the shop's, measuring a piece you own in store (FAQ).
- Contact: reply within a day, the email and phone, which are placeholders (contact, footer).
- Legal line: "© 2026 STRADE, Rotterdam. Prices include VAT." (footer).

## Known limits
- Without JavaScript the lookbook is a plain grid and the drop photo stays whole, which is fine; the contact form posts to #contact and sends nothing. Connect a form service before publishing.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the page shows its finished layout: the drop photo whole, the looks as a grid, the repair cards in their row, the run club lines and the wordmark in place, with the browser's own scrolling. The top bar still hides on scroll down.
- The top bar has no phone menu: below 640 px it keeps the three links and only the members icon (saved looks and bag are hidden), and at 375 px the links are 13 px.
- The bag, saved looks and members icons only scroll to a section; there is no cart, wishlist or login in the file.
- The lookbook rail holds the section while it runs; on very short landscape screens the cards get small because their width follows the screen height.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and STRADE left only in class names.
