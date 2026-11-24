# AGENTS.md: interior design website template

One-page website for an interior colour studio or interior designer, with a method, projects, paints, fixed prices and a contact form. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/interior-design-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/interior-design-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/interior-design-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/interior-design-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:contact`: `.contact__form` `.contact__status`
  - `section-script:nav`: `.nav__menu` `.nav__close`
  - `scene-script:method`: `.method__tile`
  - `scene-script:alphabet`: `.alphabet__g` `.alphabet__entry` `.alphabet__letter`
  - `scene-script:rooms`: `.rooms__stage` `.rooms__head` `.rooms__sheet` `.rooms__photo`
  - `scene-script:light`: `.light__hour` `.light__wall`
  - `scene-script:sittings`: `.sittings__chain` `.sittings__slide` `.sittings__line` `.sittings__pip`
- `style="--len:N"` = characters in that display line, spaces included: `Colour first` is 12.
- The contact word "Bonjour" is split into one span per letter with style="--len:7" (the character count); change both together if the word changes. The Colour first pair has style="--len:12".
- The Sittings section is drawn for four: the SVG chain places four rings at fixed cx positions (150, 383, 617, 850) with per-ring colours set by nth-child in the CSS, the sittings scene CSS slides rings two to four by fixed distances (233, 467 and 700 px), and the steps grid has four columns; to change the number, edit the rings, their colours, those slide rules and the steps together.
- The tiles, rings, petals, sparkles, the sunlit wall and the lamp are CSS and SVG, not images: recolour them through the five colour variables in :root (near-white, periwinkle, pink, lime, ink blue).
- The six paint cards each take their colour from a class (paints__card--pervenche, --bonbon and so on), and the paints scene CSS gives each of those classes its own slide range; rename a class in the colour rule and the scene rules together.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #f6f6f9 (page ground, navigation bar, and text on the periwinkle bands and the menu overlay), `--color-2` #5767c2 (body text and headings, hairline rules, the quote, price and sittings bands, the menu overlay and the daylight wall), `--color-3` #fbb3c9 (glossary letter discs, the plus and ring tiles, the hover dot on buttons, one paint card, the open question icon), `--color-4` #dde833 (the Commissions and form buttons, price pills, the opening text tile's fill, one paint card and the daylight lamp), `--color-5` #242b68 (text on lime and pink surfaces, form text, the opening button, focus outlines and the darkest paint card); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, form, email, phone, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a colour walk buttons in the first section and in the Commissions heading: now #contact; owner's target: your online booking page, or keep #contact once the form is connected.
- See the rooms tile in the first section: now #rooms; owner's target: keep, or a page with your full portfolio.
- Contact form (Send a note): now action="#": it checks the required fields and shows a thank-you line, nothing is sent; owner's target: your form service (Formspree, Netlify Forms) or your own endpoint.
- Instagram and Pinterest links in the footer: now the home pages https://www.instagram.com/ and https://www.pinterest.com/; owner's target: your own profile addresses.
- The form in `#contact` (fields `name`, `email`, `room`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Pervenche (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (7, Unsplash: method 1, rooms 6): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Prices: Colour walk €280, One-room drawing €1,900, Light score €850, Whole-home specimen from €7,400, "Fixed prices, written down before we start" and "bought at cost and never marked up" (prices).
- Location and address: Lyon (title, meta description, nav, footer), "1 Example Street, 69000 Lyon, France" (contact, footer), phone +33 4 00 00 00 00 and bonjour@pervenche.example are placeholders.
- Hours and replies: "Tuesday to Saturday, 10 to 6" (contact), "Replies within two days" (contact strip and thank-you line), "Studio visits by appointment" (menu, contact strip).
- Projects: Salon Grenadine, Lilac attic, Pâtisserie Mauve, Teal guest room, Café Lilas, Velvet duplex, with towns (Lyon, Annecy, Grenoble, Valence, Geneva) and years 2023 to 2025 (rooms).
- Client quotes and names: Inès and Paul, Clara Morel, Salomé Roux, with their projects (voices).
- Process promises: four meetings "never more", three weeks from the first sitting to the specimen sheet and two more for the painters, swatches a metre square on your walls, a tin of every shade left behind (sittings, faq, paints).
- Service area: colour walks "within two hours of Lyon by train", drawings and light scores made remotely from photos, plans and a video call (faq).
- The paints: six house paints mixed in Lyon from three pigments, each with a pairing; sold only within a commission (paints, faq).
- Colour walk contents: two hours in your rooms and a written palette (prices, sittings); the Light score covers lamps, colour temperatures, dimmers and switch positions (prices).
- Studio claims: "Created with patience in Lyon" and "Our blue, and our name" in the glossary entry for Pervenche (footer, alphabet).
- Project names such as Salon Grenadine, Pâtisserie Mauve and Café Lilas read like real businesses: replace them with the studio's own projects (rooms, voices).

## Known limits
- Without JavaScript the Menu button cannot open the overlay and the form posts back to the page instead of showing the thank-you line; on phones the top links are hidden, but the footer repeats Method, Rooms, Paints, Prices and Questions.
- Without CSS scroll-driven animation support (Firefox today) the page shows its finished layout with ordinary scrolling: the photos sit in their frames, the paint cards stand side by side in a grid, the daylight wall shows noon and the rings sit in their chain; the opening's load-in and the socket dot's drift still play, and the bar still hides on scroll. With reduced motion on, those stop too, while the bar still hides on scroll.
- Counts are fixed in the scene CSS: six paint cards (--paints-n: 6 and one slide range per card class), four price rows on phones (nth-of-type rules) and four rings; an extra item stays still unless its rules are added.
- The contact word's rising letters and the pink dot's hops onto the j are written in the contact scene CSS for Bonjour; a new word needs those rules rewritten, or the dot removed.
- The A to Z wall and the sunlit wall are decorative and hidden from screen readers; the glossary and the hour list carry the content.
- On phones the daylight wall sits above its text, so it has scrolled away by the time the Night line is read, and the ring chain is small (about 90 px rings).
- The alphabet wave stretches letters only to 85% width, because only that part of the font's width axis is loaded.
- Fonts load from Google Fonts and photos from Unsplash, so a first visit needs a network connection.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Pervenche left only in class names.
