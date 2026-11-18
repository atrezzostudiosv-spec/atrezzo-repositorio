# AGENTS.md: ceramic tile website template

One-page website for a tile maker or ceramics studio that sells custom glazed tiles to homes, cafes and trade. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/ceramic-tile-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/ceramic-tile-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/ceramic-tile-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/ceramic-tile-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.nav__close` `.nav__overlay`
  - `section-script:opening`: `.rotor`
  - `section-script:maker`: `.mk-form` `.mk-preview` `data-out` `.m-swatch` `.m-swatch__name` `data-core` `data-price` `data-extra`
  - `section-script:contact`: `.ct-form` `.ct-status`
  - `scene-script:opening`: `.op-field` `.op-plate` `.c` `.rotor`
  - `scene-script:patterns`: `.pt-list` `.is-on`
  - `scene-script:making`: `.mg-track` `.mg-window` `.mg-stage`
  - `scene-script:trade`: `.tr-sq`
- `style="--len:N"` = characters in that display line, spaces included: `Inset` is 5.
- The tile is drawn in CSS from three nested squares, and its colours come from the variables --a (frame) and --b (core) set inline on each tile and swatch; recolour the palette in :root (--color-3 to --color-14 are the glazes) and rename the glazes together in the glaze wall, the pairing notes, the designer swatches (both rows), the designer's default summary, the project captions and the patterns and making texts that name them.
- Counts the layout and scripts depend on: thirteen glaze tiles on a 7 column wall; a floor of exactly 36 tiles in 6 columns for the patterns section (the checker start comes from nth-child rules for 6 columns, and each tile's flips through the four layouts are timed by its :nth-of-type position in the motion CSS); a 5 by 5 preview floor in the designer; eight tiles on the 3 column puzzle board (each slot's moves are written by its :nth-of-type position in the motion CSS); three size cards (phone CSS places their drawings by nth-child, and the motion kit nests the squares around the middle one); six projects and eight chips placed by --c, --r, --s (desktop) and --mc, --mr, --ms (phone) custom properties on each item. The making track measures its own width, so steps can be added.
- The designer reads data-price on each size and data-extra and data-core on each inlay (core size in percent, extra price in euros); keep those attributes when changing prices or options.
- The footer wordmark is sized from style="--len:5", the number of characters of "Inset"; update it when you rename the brand.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page ground, the headline plate, tile rings, text on the navy panels, form fields), `--color-2` #0a1a35 (body text, buttons and the outlined button's hover fill, the 2px rules, the navy panels, the Night glaze), `--color-3` #b8144a (Raspberry glaze, the filled button's hover fill, focus outline, list bullets, the logo mark's core, the top contact band), `--color-4` #74152a (Claret glaze), `--color-5` #c22a26 (Signal glaze), `--color-6` #ef6420 (Tangerine glaze), `--color-7` #ebb52a (Marigold glaze, the designer's default core, the thank-you line, the right contact band, focus outline on navy), `--color-8` #a6772b (Ochre glaze), `--color-9` #17853a (Fern glaze, the designer's default frame, the left contact band), `--color-10` #0b4a66 (Harbour glaze and the secondary text: pairing notes, spec labels, step numbers, layout descriptions, footer lines), `--color-11` #0a4597 (Cobalt glaze, the second colour of the patterns floor, the core of the fired tile, the bottom contact band), `--color-12` #0b9ad6 (Lido glaze), `--color-13` #a5c5c9 (Mist glaze and the backgrounds behind photos while they load), `--color-14` #7a96b4 (Slate glaze); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, form, phone, email, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Sample box button in the nav: now #samples; owner's target: your sample order page or shop.
- Design your tile and Order samples buttons in the first screen: now #maker and #samples; owner's target: keep, or point to your configurator and sample shop.
- Put it in a sample box button under the tile designer, and Build your box in the samples section: now #samples and #maker; owner's target: your checkout or an order form that receives the chosen frame, core, inlay and size (the designer form posts nothing).
- Order the studio mix link and Ask for a trade account button: now #contact; owner's target: your order page or trade account form.
- Send to the studio button in the contact form: now submits to the same page; nothing is sent, a script shows the thank-you line; owner's target: your form service (Formspree, Netlify Forms) or your email.
- Instagram and Pinterest links in the footer: now the networks' home pages; owner's target: your profile addresses.
- Newsletter link in the footer: now mailto: placeholder; owner's target: your newsletter sign-up page.
- The form in `#maker` (fields `frame`, `core`, `inlay`, `size`) is the tile designer: it has no submit button and sends nothing; `section-script:maker` only updates the preview, the summary and the price on every change and blocks a submit. To take orders, pass the chosen values to your shop or an order form (for example as a query string on the Put it in a sample box link), or keep it as a preview only.
- The form in `#contact` (fields `name`, `email`, `project`, `area`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Inset (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (10, Unsplash: opening 1, making 2, projects 6, samples 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Studio: "Inset Tile Studio S.L.", Valencia, "pressed and fired in Valencia since 2014" (footer, meta description, opening).
- Glazes: thirteen named glazes with pairing notes and the "169 pairs" claim, the bare-clay fourteenth colour (glazes, maker).
- Prices: €84, €96 and €108 per square metre by size, inlay extras of €0, €6 and €10, default €102 (maker, trade); sample box €15 refunded on five square metres or more; delivery free in Spain and €9 to the rest of Europe (samples).
- Trade terms: 15% off list prices, a named person, glaze matching for orders over 40 m², drawings for every size (trade, faq).
- Size specs: thickness 8, 9 and 10 mm, pieces per m² 100, 44 and 25, weight 17, 19 and 21 kg, lead times 3, 4 and 5 weeks (trade).
- Making facts: 1,200 °C, twelve hours up and a day to cool, ten days drying, white stoneware clay (opening, making).
- Projects: six venues with cities, the glazes and, for five of them, the tile size (Bar Quart, Casa Alta, Sucre, Fonda Lumière, Casa Rosa, Lido Sud); the photos are stock images (projects).
- Delivery and lead promises: three days for samples, two days in Spain, four to six days across Europe by pallet, three to five weeks per order (samples, faq).
- Technical claims in the FAQ: frost and sun resistance, the R11 non-slip finish, 10% and 15% spare allowance, three test firings and two extra weeks for custom colours, cleaning advice (faq).
- Services: laying plans with every order and recommended tilers in Valencia, Barcelona and Madrid (faq).
- Showroom: address, opening hours Tuesday to Saturday 10:00 to 18:00, phone and email (contact, footer).
- "Prices include VAT" and the company form S.L. (footer).

## Known limits
- Without JavaScript the menu button cannot open the overlay (on wide screens the nav links are visible), the designer keeps its default summary and price whatever is picked, and the patterns and making sections show their plain layouts.
- The form and the designer send nothing: the contact form posts to the same page and the designer form only changes the preview. Connect a form service or a shop before publishing.
- The patterns and making sections hold the screen for 310svh and 420svh; on short or landscape phone screens the stage is tight.
- The opening field is made of about two hundred small elements and sorts them with a script on every refresh; on slow phones the first scroll can feel heavier than the rest of the page.
- The decorative tile chips in the projects collage are hidden from screen readers; the captions carry the project facts.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, the scroll animations do not run: the opening field stays whole, the patterns floor rests in Checker, the making steps wrap into a grid, the sample board sits in colour order, the size squares sit apart, the contact frame is in place and the wheel scrolls natively. The load-in and the two small tile loops still play in Firefox, not with reduced motion.
- The patterns list marks the current layout at fixed points of the scroll for four layouts; a fifth layout would need new flips in the motion CSS and a new point in scene-script:patterns.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Inset left only in class names.
