# AGENTS.md: creative agency website template

Website for a creative agency or production house, with a portfolio, services, team and studio. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/creative-agency-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/creative-agency-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/creative-agency-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/creative-agency-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__toggle` `.nav__menu` `.nav__close`
  - `section-script:works`: `.works__cell` `.works__card` `.works__status` `data-filter` `data-tags` `data-template`
  - `scene-script:works`: `.works__grid` `.works__plate` `.works__frame`
  - `scene-script:clients`: `data-row-loop`
  - `scene-script:method`: `.method__track` `.method__frame` `.method__stage`
  - `scene-script:crew`: `.crew__grid` `.crew__card`
- `style="--len:N"` = characters in that display line, spaces included: `Not what` is 8, `a brand says.` is 13, `What stays` is 10, `in the room.` is 12, `The Amber Hour` is 14, `hello@sillage.example` is 21.
- The wordmark is HTML text, one span per letter with a data-glyph copy for the trail: change the letters in both the hero and the footer and set --len to the number of letters.
- The works filter matches each card's data-tags against the buttons' data-filter values: keep them in sync when you change the categories.
- The scene scripts read [data-row-loop] in clients, .method__stage, .method__track and .method__frame in method, .crew__grid and .crew__card in crew, and .works__plate and .works__frame in works: keep these; if one goes missing, that section stays still.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page background, cuts through the wordmark), `--color-2` #0b0b0b (text, rules, buttons, dark services section), `--color-3` #676767 (secondary text), `--color-4` #9b9b9b (spare light grey for small text, defined in the variables but unused by the demo), `--color-5` #cfcfcf (light rules, grey plates behind photos), `--color-6` #2f2f2f (rules on the dark section); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Request the full reel (works): now mailto:hello@ (subject Full reel); owner's target: your showreel URL (Vimeo, YouTube), or keep the email.
- Request the case (feature): now mailto:hello@ (subject The Amber Hour); owner's target: the case study page or film of that project.
- Book the studio (studio): now mailto:studio@ (subject Studio booking); owner's target: your booking form or calendar; remove the studio section if you have no space to rent.
- The name Sillage (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (22, Unsplash: hero 1, works 8, feature 1, expertise 1, method 4, studio 1, crew 6): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Client and project names in works (Ondine Parfums, Night Bloom, Halcyon Eyewear, White Noise, Maison Orrel, Hard Line looks, Atelier Vauque, Volume Studies, Northe Joaillerie, Ten Rings, Lumen & Ash, Gilt, Casa Albar, Copper Line, Kestrel, Hands On), the hero caption "Halcyon, Red Season, campaign film", the featured project "The Amber Hour" for Ondine Parfums (feature) and the ten names in clients (also Brunner Genève, Vellum): all invented; publish only clients you may name.
- "Eight stories from the last two seasons" (works note) and "some for one launch, most for years" (clients note).
- Feature credits: "Two shoot days at Studio Sillage", "212 assets for 14 markets", "Edit, colour, 3D and retouch in-house" (feature).
- Services and in-house claims: the five disciplines and their tags, including "AI-assisted workflows", "Rooftop daylight" and "Crew catering" (expertise), "one floor", "our own workshop", "one crew" (manifesto, expertise, method).
- The studio and its specs: "Studio Sillage, Montreuil", "Six hundred square metres", "ten minutes from Paris", a 12 × 8 m cyclorama with 6 m clear height, a 140 m² north-facing rooftop, a workshop, chef-led catering "for crews of up to sixty" (studio, expertise).
- Team: "Forty-two strategists, producers, editors and retouchers" (crew note), six named people with roles, Élise Marchetti, Tomasz Wren, Adaeze Okafor, Henri Paz, Noor Haddad, Julien Ferreira, shown with stock portraits (crew), and "We are hiring producers, retouchers and strategists" (crew).
- Contacts: Clara Vidal, managing partner and Julien Ferreira, studio manager; "read every Friday"; the emails hello@, studio@, jobs@, press@sillage.example and the phones +33 1 00 00 00 00 / 01 (contact, navigation overlay, works and feature buttons, studio button, crew).
- Addresses: "1 rue de l’Exemple, 75003 Paris" (office) and "2 rue de l’Exemple, 93100 Montreuil" (studio) are placeholders (contact).
- Location: Paris and Montreuil in the meta description, the studio heading and "© 2026 Sillage. Paris, Montreuil." (footer).

## Known limits
- Without JavaScript the works filter does nothing (all eight projects stay visible) and the phone Menu button cannot open its overlay; on phones the section links (Work, Expertise, Method, Studio, People, Contact) live only in that overlay, and the footer has only social links and Back to top.
- Without scroll-driven animation support (Firefox today) or with reduced motion on, the page shows its finished layout: the wordmark stays whole, the projects sit in their grid without the fanned plates, the method steps form a plain grid instead of the sideways track, and the client names wrap into a still wall instead of looping.
- The scroll motion is written per item in CSS :nth-of-type rules for the seven letters of the wordmark (the split in the hero, the close in at the footer), the four manifesto lines and the eight project cards: a ninth card or a fifth line stays still, and a wordmark of another length needs those letter rules changed.
- The stencil slit in the wordmark is drawn in the page colour: while the split wordmark passes over the hero photo the slits show as thin white lines.
- On phones the width-filling email line in contact is set small (about 20 px) so a long address fits.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Sillage left only in class names.
