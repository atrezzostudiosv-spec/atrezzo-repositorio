# AGENTS.md: stonemason website template

One-page website for a stonemasonry yard or restoration craft business, for clients who commission repairs, new stonework and lettering. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/stonemason-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/stonemason-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/stonemason-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/stonemason-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav-menu` `.nav-overlay` `.nav-overlay__close`
  - `section-script:contact`: `.ct-form` `.ct-status`
  - `scene-script:banker`: `.bk-step`
  - `scene-script:work`: `.wk-runway` `.wk-viewport` `.wk-track` `.wk-card` `.wk-photo`
  - `scene-script:lettering`: `.lt-inscription`
- The footer wordmark is two spans, "Banker" and "mark", and its size comes from style="--len:10", the number of characters in the name: change both halves and the number together.
- The seven mason marks and the footer mark carry data-8b-motion="cut" and their path length in style="--cut-length"; the mark on the process photo (.bk-sign) is drawn by scene:banker with its length fixed in the CSS. Keep these marks as stroked paths inside their svg, and give a new mark its own --cut-length (the path's getTotalLength).
- The inscription in the lettering section is three .lt-line spans: the scene script adds two guide lines to each, the CSS times exactly three lines one after another (a fourth would stay still) and the runway is 210vh tall in CSS.
- The work scene measures the track from the cards at load and on resize; after changing the number or width of cards scroll through the section to check it.
- The review panes take their climb and tilt from inline custom properties on each .rv-item (--reviews-figure-rv-quote-translate-from-2, --reviews-figure-rv-quote-rotate-from and a phone value); a fourth pane without them takes the first pane's values.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #e7e7e5 (light panels (trades, process, recent work, lime, questions, footer), text on the dark sections, the logo and call pills, the stone cards), `--color-2` #151614 (text on light panels, the dark buttons, the pill around Menu and Book a site visit), `--color-3` #0e100e (page background, the opening, the full-screen menu and the shade over the clients photo), `--color-4` #d9dcc4 (pale stone green: the filled buttons, the Menu button, the mason marks, the lettering prices and inscription, the second contact heading line, button hover fills), `--color-5` #555753 (grey text on light panels: leads, labels, step text, job detail lines), `--color-6` #a2a69d (muted text and hairlines on the dark sections, the scratched colour of the inscription before it is cut), `--color-7` #fafaf8 (trade cards, badges, the frosted quote panes and form, the lime comparison card, the hover fill of the filled button), `--color-8` #b39a7f (tan: the three small icons under the opening text and the mark on the process photo); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a site visit button in the nav, the opening and the footer: now #contact, the enquiry form; owner's target: your enquiry or booking page, or keep #contact once the form is connected.
- Call the yard link in the nav, and the phone and email links in the contact section and the footer: now a tel: link and a mailto: link with placeholder numbers; owner's target: your real phone number and email address.
- Ask about a repair, Send us your drawings and Commission an inscription links in the three trade cards, and the Commission an inscription button in the lettering section: now #contact (the third card link goes to #lettering); owner's target: keep, or pages for each trade.
- See recent work link in the opening: now #work; owner's target: keep, or your portfolio page.
- The form in `#contact` (fields `name`, `contact`, `job`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Bankermark (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (17, Unsplash: opening 1, trades 3, stones 5, banker 1, work 4, lime 1, reviews 1, contact 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Location and contacts: Corsham, Wiltshire, the yard address 1 Example Yard, SN13 0AA, phone 01249 000 000, yard@bankermark.example, hours Monday to Friday 7.30 to 4.30 with Saturday visits by appointment (title and meta description, opening, contact, footer, nav).
- Business details: "© 2026 Bankermark Stonemasons Ltd. Registered in England, no. 00000000." (footer), "Seven masons at one banker" (opening, masons).
- Prices: house names and plaques from £380, memorials and headstones from £1,450, inscriptions by the letter (lettering).
- Service area and visits: fixing teams across Wiltshire, Bath, Somerset and Gloucestershire; a free first visit and written quote within thirty miles of Corsham, travel only further away; a reply within two working days (faq, contact).
- Team: Tom Hearn (founded the yard), Ellie Pratt, Dan Okafor, Martha Vowles, Sam Beddoe, Ruth Allard and Josh Tanner (a third-year apprentice) with their roles and what each does (masons, a quote in reviews).
- Recent jobs: the Georgian terrace in Bath (42 cornice blocks, eleven houses, Grade I), St Bartholomew's tower (four pinnacles), the garden arch at Box (thirteen voussoirs, four days), the boundary wall at Lacock (sixty metres), with years 2024 and 2025 (work).
- Clients and quotes: Helen Marsh, James Okoro, Priya and Tom Hale and the jobs they name (reviews); a quote that says the repair cost a third of another quote and has been through two winters.
- Stones and sources: Bath stone from the mines, Portland, York stone, Ham stone, Welsh slate with their origins, and the extra list Purbeck, Hornton and Doulting (stones, opening).
- Process and promises: zinc templates, full-size drawings before any cut, the mason's mark cut on a hidden face, a stone fixed in lime by the team that made it, consent drawings and method statements for listed buildings, mortars mixed from hot lime (trades, banker, faq, lime).
- Timing: a memorial takes eight to twelve weeks from an approved drawing and the yard makes the churchyard application (faq).
- Photos: all are stock photos of other masons' work and places; replace with the yard's own (all sections).

## Known limits
- Without JavaScript the Menu button does nothing and the form sends nothing; the FAQ rows open natively. The footer links only four sections (trades, recent work, lettering, contact): stones, process, masons, lime, clients and questions are reached only from the menu.
- The enquiry form is a placeholder: it resets and shows a thank-you line until you connect a form service.
- In the work section the cards sit on a held stage (CSS sticky) for as much scroll as the track is wider than the window: about one screen at 1440 px, about 1.4 screens on a 375 by 667 phone.
- Photos are 500 to 1600 px wide stock images loaded lazily; the wall behind the reviews has no alt text on purpose.
- The three trade panels are fixed (data-8b-fixed="3"): the CSS times the first two panels' shrink and the second and third photos' settle by :nth-of-type, so a fourth panel would stick without its motion.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the scroll animations, the opening load-in and the smooth wheel are off: the trade panels follow one another, the inscription and the marks appear finished, the process steps show at full opacity and recent work is a row that scrolls sideways. The bar still hides on scroll.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Bankermark left only in class names.
