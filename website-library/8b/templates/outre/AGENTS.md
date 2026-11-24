# AGENTS.md: fashion brand website template

One-page website for a fashion label or clothing brand that sells a seasonal collection and runs a few stores. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/fashion-brand-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/fashion-brand-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/fashion-brand-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/fashion-brand-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav__menu` `.nav__sheet` `.nav__close`
  - `section-script:collections`: `.nav__count` `.col__add` `.m-btn-2__label` `data-done`
  - `section-script:contact`: `.ct__form` `.ct__status` `data-sent`
  - `section-script:footer`: `.ft__news` `.ft__status` `data-sent`
  - `scene-script:opening`: `.hero__panel` `.hero__ghost` `.about__lens` `.about__stack` `.about__card--front`
  - `scene-script:deal`: `.col__looks` `.col__look`
  - `scene-script:index`: `.idx__rows` `.idx__row` `.idx__preview` `.idx__shot`
  - `scene-script:shutter`: `.arr__photo`
  - `scene-script:stores`: `.ct__stores` `.ct__store`
- `style="--len:N"` = characters in that display line, spaces included: `Fearless` is 8, `Layers` is 6, `# Outre # Outre` is 15, `Colour` is 6, `Just landed` is 11, `Street` is 6, `Notebook` is 8, `Outre` is 5.
- Every large word is sized from a --len custom property that holds its character count: the two title lines (8 for Fearless, 6 for Layers, set on both the title and its aria-hidden outline copy), the brand row (15), the giant word Colour (6), Just landed (11), Street Notebook (6 and 8) and the footer Outre (5). Update each when you change the words, or the type overflows or leaves gaps.
- The first screen's title and the brand row each exist twice: the visible one and an aria-hidden copy that the lens clips to the portrait panel's moving shape. Edit both copies together and keep the classes hero__ghost and about__lens.
- The season colours are the variables --color-8 to --color-12, used by the palette bands (Cobalt, --color-10, also fills the ground behind the arrivals photo); the shell, knit, padding, fur and shirt wording in the palette section must match whatever you pick.
- The deal of looks, the index preview and the stores bar measure their items from the page, so looks, index rows and stores can be added or removed; the index preview reuses its photos if there are fewer photos than rows. The palette has exactly five bands and the notebook six photos: their CSS addresses each by position (data-8b-fixed), and each notebook photo carries its depth, scale and tilt as inline custom properties.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page background, text on the black edit and footer, outline strokes on the lens copies), `--color-2` #111111 (text, buttons, nav badge, the black edit and footer sections, the menu sheet and the lit store row), `--color-3` #767676 (grey start of the statements that fill, the giant Colour word, inactive index rows, the brand row and hairlines in the FAQ and footer), `--color-4` #555555 (small body text, FAQ answers and the quote attribution), `--color-5` #e6e6e6 (hairlines: nav border, first-screen grid, studio facts and store dividers), `--color-6` #f2f2f2 (round icon buttons, FAQ section ground, photo placeholders and the start of the quote gradient), `--color-7` #a6a6a6 (small grey text on black: edit caption, footer legal line and the address of a lit store), `--color-8` #d92b1a (the first colour band, Signal red, with white text), `--color-9` #f2b705 (the second colour band, Marigold, with ink text), `--color-10` #1f4fd6 (the third colour band, Cobalt, with white text, and the ground behind the new arrivals photo), `--color-11` #f4a3c4 (the fourth colour band, Peony, with ink text), `--color-12` #a9d8ec (the fifth colour band, Glacier, with ink text); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, form, email, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Shop the edit button in the first screen, Shop new arrivals arrow and See every new piece link in the arrivals section: now #collections; owner's target: your shop, collection or new arrivals page.
- Add to bag buttons on the four looks: now a script adds one to the bag counter in the nav and shows Added to bag; nothing is stored; owner's target: your cart or checkout (for example a Shopify, Snipcart or Stripe button per product).
- Bag icon in the nav: now #collections; owner's target: your cart page.
- Browse the index icon in the nav and the four index rows (Outerwear, Knitwear, Accessories, Archive sale): now #index and #collections; owner's target: your category pages.
- Delivery and returns link in the footer and Ask the cutting room link in the FAQ: now #faq and #contact; owner's target: your shipping and returns page, or keep.
- Send message button in the contact form and Sign up button in the newsletter form: now no submission; a script shows a thank-you line; owner's target: your form service (Formspree, Netlify Forms) or your mailing list provider.
- Instagram, TikTok and Pinterest links in the footer: now the networks' home pages; owner's target: your profile addresses.
- The form in `#contact` (fields `name`, `email`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The form in `#footer` (fields `email`) sends nothing; `section-script:footer` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name OUTRE (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (21, Unsplash: opening 4, collections 4, index 4, voice 1, arrivals 1, studio 1, notebook 6): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Brand: "OUTRE", Antwerp, "since 2019", the season "Autumn Winter 2026", the 2019 cutting table story (opening, menu, studio).
- Products and prices: Marigold sheer layer € 145, Glacier overshirt € 180, Peony faux fur € 340, Signal dot blouse € 120 (collections); "48 pieces in stock" (index); "Twelve new pieces" (arrivals).
- Colours and what they are used for: five season colours, each tied to a garment type, "a hundred washes" (palette).
- Customer quote and name: "Mara V., Lisbon", three winters (voice).
- Studio: eleven people, surplus fabric from Belgian and Italian mills, taped and double stitched seams, repairs with current-season panels (studio, faq).
- Delivery: the EU, the UK, Korea and the US, leaving within two working days, two to six more days, tracking (faq).
- Returns: thirty days, unworn with tags, free inside the EU, refund to the original payment method (faq).
- Repairs: book in your account, only return postage paid, panel replaced from the current season (faq, studio).
- Sizing and care: roomy shells, one size down if worn alone, wash at thirty degrees, dry flat (faq).
- Stores: three cities with addresses, opening hours and phones, and the Seoul details (contact).
- Social: the hashtag #wearoutre and the Friday pinning promise (notebook).
- Newsletter and contact promises: "the next drop lands in your inbox first", a reply within two working days (footer, contact, faq).

## Known limits
- Without JavaScript the menu button cannot open the sheet (the nav has three visible links on wide screens), the Add to bag buttons do nothing, and the forms reload the page at their anchor instead of showing the thank-you line.
- The Add to bag button only counts clicks in the nav badge; there is no cart. Connect a real shop before publishing.
- The lens recomputes the clip paths of the outline copies in CSS on every frame of scroll, the heaviest effect on the page; it is off with reduced motion and in browsers without scroll-driven animations.
- The shutter strips in the arrivals section are copies of the photo, so the image loads once but is drawn five times (three on phones) while the effect is live.
- The index preview photos have empty alt text, so the category photos are not announced; the rows carry the meaning.
- Without scroll-driven animation support (Firefox today) and with reduced motion on, the page shows its finished layout: the portrait panel over the title with no lens, the looks in their row, the first index row lit with its photo (pointing at another row does not swap it), the arrivals photo whole, the colour bands in plain flow, the statements in ink. Firefox still plays the opening load-in, the thumbnail sway, the portrait pan and the burst spin; in both cases the nav still hides on scroll down and the hover fills stay.
- A sixth colour band would cover the fifth without the shrink, and a seventh notebook photo would land on the first one's spot, until the CSS gets rules for them.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and OUTRE left only in class names.
