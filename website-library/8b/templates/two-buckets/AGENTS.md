# AGENTS.md: car wash website template

One-page website for a hand car wash and valeting business that takes bookings and memberships. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.11 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/car-wash-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/car-wash-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/car-wash-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/car-wash-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:prices`: `.prices__price`
  - `section-script:book`: `.book__form` `.book__status` `data-done` `data-missing`
  - `section-script:top`: `.nav__open` `.menu__close`
  - `scene-script:inside`: `.inside__rail` `.inside__track`
  - `scene-script:protect`: `.protect__coats`
  - `scene-script:method`: `.method__steps`
- The prices come from three data attributes on each price element (data-small, data-family, data-large); the script reads them by those names, so add a value in all three when you add a service, and keep the three size labels in step with the radio values small, family and large.
- The method's steps and photos pair by order and the motion is written for exactly five (data-8b-fixed="5"): the photo rises are CSS rules per position and the step tracking names the five steps, so another count needs those rules and the script changed.
- The protection list holds exactly four coats (data-8b-fixed="4"): each coat's colour and its timing in the slab are CSS rules per position.
- The scalloped edges, the star, the club disc and the bubbles are CSS gradients and SVG, not images: recolour them through the colour variables. The "Step N" tags on the photos are CSS counters.
- The interiors motion measures the card track on load and on resize to size the held stage; if you add cards, the stage lengthens by itself.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #3b20f0 (primary buttons, the wordmark, the violet price, protection, review and booking grounds, the menu overlay, the second line of the h1, the club price), `--color-2` #fdf7e3 (page ground, review and booking form cards, text on the violet sections, scalloped edges), `--color-3` #160c50 (body and heading text, the footer ground, the fourth protection coat, the hover fill of the primary button), `--color-4` #ffc83d (prices, the selected size, the Step tags, the club disc, the secondary button, the second protection coat, alternate review cards), `--color-5` #d6d0ff (badges, photo frame backgrounds, lead text on violet, the third protection coat, tint of the question rows), `--color-6` #5a3ffd (bubbles in the booking section, the size switch border, icon button hover and the menu close button), `--color-7` #4b4386 (paragraph text on cream sections and review footers); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Book a wash button in the top bar, Book a slot button in the opening, Book a valet, Ask about protection and Join the club buttons: now #book, the booking form near the end of the page; owner's target: your online booking page if you take bookings there, or keep #book once the form is connected.
- Call the bay button in the top bar and the phone links in the questions, booking and footer sections: now a tel: link to the demo number; owner's target: your bay's phone number as tel:+44....
- See how a wash goes link in the opening: now #method; owner's target: keep it.
- Instagram and Facebook links in the footer: now the instagram.com and facebook.com home pages; owner's target: your profile addresses.
- Request a slot button in the booking form: now submits the form to nothing; a script shows a thank-you line and resets the fields; owner's target: a form service (Formspree, Netlify Forms) or your booking system.
- The form in `#book` (fields `name`, `mobile`, `size`, `service`, `day`, `notes`) sends nothing. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it.
- The name Two Buckets (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (17, Unsplash: opening 1, method 5, interiors 5, protection 2, crew 4): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Place and contact: the placeholders Unit 1, Example Yard, Sheffield S1 0ZZ, the phone 0114 000 0000 and bay@two-buckets.example (menu overlay, booking, footer, FAQ); put in the real ones.
- Opening hours: Mon to Sat 8:00 to 18:00, Sun 9:00 to 16:00; walk-ins until 4pm (menu overlay, prices, booking, FAQ).
- Prices: six services in three vehicle sizes (£15 to £155) and the protection prices from £45 to £420 (prices, protection).
- Durations: about forty minutes a car, step times of 10, 8, 12, 4 and 6 minutes, service durations from 30 minutes (pet hair, added to a valet) to 4 to 5 hours (opening, method, prices).
- Wash Club: £34 a month, two hand washes, first pick of Saturday slots, 10% off, pause while away, cancel any month (membership).
- Ratings: "4.9 out of 5 across more than 640 Google reviews" and eight named reviews with cars, invented for the demo (reviews).
- Staff: Kemi Adeyemi, Joel Hart, Ray Tran, Sami Kaya, with roles and lines such as "Eleven years of brake dust" (crew); the portraits are stock photos.
- Guarantees and policies: the 48 hour free redo, vans up to 2.9 metres tall in the covered bay, a warm room with coffee and Wi-Fi, a text when the car is ready, card or cash on collection (FAQ, prices).
- Protection claims: a sealant that keeps the shine for six months, a ceramic coat that lasts up to five years, most cars needing two coats (protection).
- Method claims: a lambswool mitt, a grit guard, low-pressure pre-rinse, a five minute foam dwell, twisted-loop towels (opening, method, FAQ).
- History and place: "Two buckets for every car since 2014" and the Kelham Island area (footer, meta description), Sheffield in the title, the reviews heading "What Sheffield says" and the first review's Peak District (head, reviews).
- Footer: "© 2026 Two Buckets Hand Car Wash Ltd · Registered in England and Wales": put in your legal name and, if you show it, your company number.

## Known limits
- Without JavaScript the menu button cannot open the overlay (it is hidden by an attribute the script removes), the size switch cannot change the prices (the Family column stays) and the booking form cannot show its thank-you line; the FAQ answers still open and the footer links stay reachable.
- The booking form sends nothing: the button only shows the thank-you line, so connect a form service or your booking system before publishing.
- The method photos are stacked and only the scroll motion uncovers them in turn: with reduced motion, without CSS scroll-driven animations (Firefox today) or without JavaScript the window shows the fifth photo and its "Step 5" tag beside all five steps. On phones the window is held at 40% of the screen height above the steps, which leaves little room for the text on short screens.
- Without CSS scroll-driven animation support or with reduced motion the smooth wheel and all scroll motion are off and each section shows its finished layout: the interiors and the reviews are wrapping grids of cards, the club disc is full size, and the opening has no load-in. The navigation's slide-in on load still plays in Firefox, not with reduced motion.
- The navigation hide-on-scroll and the hover effects keep running with reduced motion.
- Section links jump with no offset for the floating bar, so a section's top can sit under the bar until you scroll up a little.
- Leftovers of a removed first screen: the stylesheet still carries rules and looping keyframes for a violet hero (#wash .wash__one, its pattern, rating, badge, two photos and foam rows); no markup uses them, so they can be deleted.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Two Buckets left only in class names.
