# AGENTS.md: ice cream shop website template

One-page website for an ice cream parlour, gelateria or dessert shop with flavours, prices, workshops and a monthly subscription. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/ice-cream-shop-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/ice-cream-shop-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/ice-cream-shop-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/ice-cream-shop-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__menu` `.nav__overlay` `.nav__close`
  - `section-script:visit`: `.visit__form` `.visit__status` `data-sent`
  - `scene-script:cross`: `.reviews__band--a` `.reviews__track` `.reviews__band--b` `.reviews__band`
  - `scene-script:peel`: `.q` `.q__card` `.q__phrase`
  - `scene-script:fan`: `.plan`
- `style="--len:N"` = characters in that display line, spaces included: `melty.` is 6.
- The footer wordmark gets its size from style="--len:6", the number of characters in melty. including the period: update it when the name changes. The inline kit splits the wordmark into letters (data-8b-split="chars") for the melt.
- The stickers, the ink outlines, hard shadows and highlight boxes are CSS: recolour them through the colour variables in :root.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #fff48d (lemon page ground, the first screen, the logo pill, plan price pills, the end of the visit gradient), `--color-2` #1d1c1c (text, every 1.5px outline, the hard shadows (except under the dark button) and the dark button), `--color-3` #ffffff (white cards, nav bar, buttons, form fields, badges and the first review ribbon), `--color-4` #fd74fd (pink: button hover wipe, second highlight style, second question card, second review ribbon, shadow of the dark button), `--color-5` #83f582 (green: first highlight style, first question card, odd price pills, nav link hover, ribbon dots, gradient), `--color-6` #7af7f7 (cyan: third highlight style, third question card, even price pills, gradient), `--color-7` #ff6a8d (coral: start of the menu overlay and visit section gradients), `--color-8` #ffb38a (peach: middle of those gradients and start of the flavour card gradient), `--color-9` #b06cf8 (violet: end of the Pint Club sheet gradient and of the green card gradient); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Order a pint button in the nav: now #club; owner's target: your online ordering page, or keep #club for the Pint Club.
- Join solo, Join as a duo and Fill my freezer buttons in the Pint Club: now #visit; owner's target: the sign-up or checkout page for each plan.
- Book a Saturday button in the churn school: now #visit; owner's target: your workshop booking page.
- Cups, cones and pints link in the flavours section, and the birthday booking link in the questions: now #prices and #visit; owner's target: keep them, or point the birthday link at your booking page.
- Instagram and TikTok icons and the email icon in the footer: now the Instagram and TikTok home pages, and a mailto link; owner's target: your own profiles and email.
- The form in `#visit` (fields `name`, `email`, `topic`, `date`, `guests`, `note`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Melty (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (18, Unsplash: opening 1, flavours 5, morning 3, questions 3, prices 1, neighbours 2, school 1, club 1, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Shop profile: a twelve-seat small-batch ice cream parlour with a brand line, "Open daily from noon", twelve flavours a day, a flavour gone when its tub is empty, "Melty Ice Cream Ltd" (title, meta description, opening, footer).
- Flavours: names, descriptions, ingredient sources and tags (dairy-free, nuts, gluten, "every week", "new this week") for five flavours, and "five of them new this week" (flavours).
- Production claims: shopping at the market at six, twelve runs of six litres before eleven, two hours resting at minus fourteen (morning).
- Allergen and diet claims: "at least four" dairy-free flavours, sorbets of fruit, sugar and water only, an oat-milk chocolate churned separately on Tuesdays and Fridays (questions).
- Takeaway claims: pints kept firm for forty minutes in a lined bag, free dry ice at the till (questions).
- Party terms: up to twenty guests on weekday afternoons, a tasting flight of six, book a week ahead (questions).
- Prices: £3.20, £5.40, £7.20, £9.50 and £17 rows, toppings at 80p, free tasting spoons (prices).
- Suppliers: eight named local producers and what each provides (neighbours); all invented.
- Workshop: Saturdays 9 to 11, six people aged eight and up, £45 with a pint included (school, visit).
- Pint Club: Solo £11, Duo £20, Freezer full £36 a month, collection or cycle delivery, skip any month (club).
- Reviews: eight invented quotes and names (reviews).
- Address, hours (12:00 to 21:00 Monday to Thursday, to 22:00 Friday and Saturday, to 20:00 Sunday), the walk from the station, twelve seats, a bench and a hatch, the placeholder phone 020 0000 0000 and email hello@melty.example (visit, footer, overlay).
- Booking promise: "We’ll write back within a day" (visit form).

## Known limits
- Without JavaScript the phone menu button cannot open the overlay and the booking form posts back to the page itself and sends nothing; the flavours show as a tilted column and the reviews as wrapped rows.
- The motion CSS fixes several counts. The flavour deck is written for five cards (--count: 5 and one scroll range per card; the third card is picked by its m-surface class and the second, fourth and fifth by position). Each review ribbon holds four reviews: the loop script clones exactly four per ribbon, so a fifth would break the seamless run. The Pint Club has three plans, the middle one picked by its m-surface-3 class, and the questions three. Prices, steps and neighbours can change in number.
- The flavour deck holds the page for about three screens, which can feel long on short phone screens.
- With motion on, the review bands scroll sideways on their own and pause only when off screen, not on hover or focus. Without CSS scroll-driven animation support (Firefox today), without JavaScript or with reduced motion, the scroll scenes, the entrances, the review loop and the smooth wheel are off: the flavours show as a tilted column, the reviews as wrapped rows and the question cards fully coloured. Firefox still plays the opening load-in; the bottom bar still hides on scroll and hover effects keep running.
- The questions are headings and answers in cards, not native details elements, so they are always open.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Melty left only in class names.
