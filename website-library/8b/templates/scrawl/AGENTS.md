# AGENTS.md: streetwear brand website template

One-page website for a streetwear or print-on-fabric label that sells limited drops and credits its artists. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/streetwear-brand-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/streetwear-brand-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/streetwear-brand-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/streetwear-brand-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:nav`: `.nav-sheet` `.nav-menu` `.nav-close`
  - `scene-script:process-track`: `.pr-track` `.pr-step` `.pr-photo`
  - `scene-script:crew-unpack`: `.cw-wall` `.cw-item`
  - `scene-script:heavy-tour`: `.hv-head` `.hv-stage` `.hv-zoom` `.hv-item` `.hv-marks` `data-x` `data-y`
  - `scene-script:drops-marker`: `.ds-list` `.ds-mark` `.ds-row`
- `style="--len:N"` = characters in that display line, spaces included: `Say hi` is 6.
- The process strip has four steps (the CSS colours each step number by position) and the hoodie tour has four details: the CSS zoom keyframes stop at four positions, the script pairs each list item and each marker ring by position, each pin sits by its ring through left and top, and each item has data-x and data-y (percent of the photo) as its zoom target, so move items, rings and pins together with the photo.
- The crew wall positions each portrait with inline custom properties (--cw-x, --cw-y, --cw-w, --cw-r); the contact heading carries style="--len:6", the character count of "Say hi", so update it with the text. Each marker stroke that draws itself carries --scrawl-len, its path length: set it again if you redraw the stroke.
- Stickers, tape, the marker underlines, the hoodie rings and the highlighter are CSS and SVG, not images: recolour them through the colour variables in :root.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #e6e6e2 (paper page ground and the translucent nav bar once scrolled), `--color-2` #121212 (text, buttons, outlines, rules and the grid lines), `--color-3` #2b48e0 (cobalt: phone menu sheet, the questions splash, step four number, focus outlines), `--color-4` #f8cc2e (yellow: button hover fill, the next drop row and its highlighter, the active hoodie item, step two number, hover blob behind nav icons), `--color-5` #f25c1f (orange: marker underlines, hoodie pins and rings, fund splash, step three number), `--color-6` #ffffff (taped strips, text on near-black buttons and on cobalt, the question cards), `--color-7` #d2d2cc (hoodie photo frame ground and the paper note in the fund section), `--color-8` #4a4a46 (secondary text: drop details, answers, contact labels, copyright line); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Shop link in the nav, the phone menu and the footer: now #heavy, the hoodie section; owner's target: your shop URL, or keep #heavy.
- Join the crew button in the nav and the phone menu: now #crew; owner's target: your sign-up, newsletter or community page.
- See the drops button on the first screen: now #drops; owner's target: your shop or drop page, or keep #drops.
- Meet the crew button on the first screen: now #crew; owner's target: keep #crew, or a page about your artists.
- Search and Bag (0) icons in the nav: now #heavy, the hoodie section; owner's target: your shop and cart URLs; the bag count (0) is static text.
- Send a doodle button in the crew wall: now #contact; owner's target: your submission form or a mailto to the address that takes artwork.
- Nominate a club link in the fund section: now a mailto to the fund address; owner's target: your nomination form or the right address.
- Remind me links in the five drop rows: now #contact; owner's target: a drop reminder or newsletter sign-up page.
- Email link in the questions heading: now a mailto to the main hello address (the same as the Write strip); owner's target: your support address or help page.
- Instagram, TikTok and YouTube links in the footer: now the networks' home pages; owner's target: your profile URLs.
- The name SCRAWL (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (14, Unsplash: process: sketch to stitch 4, the crew wall 6, made heavy: one hoodie up close 1, the brighter fund 2, studio and contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Brand story: prints start as doodles sent in by the crew (skaters, students, nurses, bus drivers), "thousands of people sketch for us", "no robots, only pens", every tag carries the artist's name (process, crew, title and meta description).
- Release rhythm: new ink every other Friday at 6 pm CET, online and in the studio shop at the same minute; "sold-out drops never come back" (drops, faq; the meta and og descriptions say every Friday, so make them agree).
- Drop calendar: five dates, names, moods and piece counts, 09 Oct to 04 Dec (drops).
- Artist credits: Ama & Jo, Theo, Kofi, Dre & Sam, Lena, Nate, Ola & Ty, Rui and the prints they drew (crew); the portraits are stock photos of real people.
- Doodle rules and pay: submit a daylight photo by email before the last Sunday of the month; a picked artist gets a fee, ten percent of the print's sales, a box of pieces and a name on the tag (faq).
- Product claims: boxy hoodie of brushed fleece, double-layer hood, flat cotton cords, dropped shoulder, kangaroo pocket, "a hundred washes" (heavy).
- Charity fund: five cents of every dollar to youth art clubs near stockists, workshops in nine cities (fund).
- Shipping and returns: worldwide in recycled mailers, free returns within 30 days unworn and unwashed (faq).
- Sizing advice: boxy and a touch long, usual size or one down (faq).
- Studio: address, opening hours Thursday to Sunday 11:00 to 19:00, phone and three email addresses (contact; the placeholders are not real).
- Process claims: a monthly open call, a crew vote, the loudest ten going to the studio wall, prints pulled by hand one colour at a time (process).
- Social profiles: Instagram, TikTok and YouTube point to the networks' home pages (footer).
- Bag count (0) and the search icon: static, no shop behind them (nav).

## Known limits
- Without JavaScript the phone menu button cannot open the sheet, and on phones the nav links are hidden; the footer repeats Shop, Drops, Crew, Help and Studio.
- The nav bag shows a fixed (0) and the search icon only jumps to the hoodie section: there is no shop behind either.
- The contact section has no form: doodles go to an email address, so connect a form if you want uploads on the page.
- The process strip holds the screen for about one and a half screen heights of scroll and the hoodie tour for three; on a landscape phone the sideways strip alone takes about seven.
- Without scroll-driven animation support (Firefox today) and with reduced motion on, the page shows its finished layout: the four steps as a grid under the headline, the crew collage in place, the hoodie photo whole with all four rings drawn and no item lit, the next drop row in yellow. Firefox still plays the intro load-in; in both cases the nav bar still hides on scroll down and the hover effects stay.
- The hoodie tour is fixed at four details (data-8b-fixed): its CSS zoom keyframes have four stops, so a fifth detail gets no zoom unless the keyframes get one. The process strip colours its four step numbers by position; a fifth step gets a plain black number.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and SCRAWL left only in class names.
