# AGENTS.md: bubble tea shop website template

One-page website for a bubble tea bar with a signature menu, a build-your-own guide and weekly limited drinks. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/bubble-tea-shop-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/bubble-tea-shop-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/bubble-tea-shop-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/bubble-tea-shop-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:visit`: `.visit__form` `.visit__status`
  - `section-script:nav`: `.nav__bar` `data-8b-sticky-under-nav`
  - `scene-script:build`: `.build__stack` `.layer`
  - `scene-script:pearls`: `.pearls__stage` `.pearls__frame` `.pearls__chips` `.m-badge`
  - `scene-script:rules`: `.rules__band` `.rules__hem` `.rules__card`
  - `scene-script:drops`: `.drops__stage` `.drops__rail` `.drop`
- The five build cards get their colours from nth-child rules in the CSS and their stacking offset from an inline --layer-i number (0 to 4); a sixth card needs its own colour rule and offset.
- The four drop cards take their date colour from their own --drop-fill rules, and the drops scene turns the stage background through four colour steps, one per card; a fifth card needs a --drop-fill rule and a fifth step in that scene's CSS.
- The scalloped edges of the rules band and the bumps in the visit photo are CSS shapes. The pearls scene measures each chip's distance from the frame, so keep the chips as badges inside the list items of the chips list, and keep the bumps as five empty spans: CSS moves the first five.
- The step words Pick, Shake and Sip, and the "Chewsday replied" labels in the regulars rows, are plain text in the cards; the effects only swing or move whole cards, so you can rewrite the words freely.
- The three ordering steps and the four footer tiles take their fills (and the tiles their heights) from nth-child rules; another step or tile needs a rule of its own.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #ffffff (page background, nav bar, FAQ, house rules and drop cards, the order form, secondary button, footer text and one chip fill), `--color-2` #02091d (text outside the footer and the visit photo, borders and outlines, the dark footer panel, button fill on hover), `--color-3` #529dff (primary button, house rules band, first build card, second ritual step, first chat bubble, first drop colour, Menu nav pill, first footer tile, tinted pearls section), `--color-4` #ff7a33 (second build card, third ritual step, second chat bubble and second drop colour, Build nav pill), `--color-5` #53c690 (third build card, first ritual step, third chat bubble and third drop colour, Visit nav pill), `--color-6` #f6f07a (FAQ panel, fourth build card, default chip fill, footer tile hover, visit bump), `--color-7` #e3a2f8 (fifth build card, fourth chat bubble and fourth drop colour, Drops nav pill), `--color-9` #596078 (grey-blue lede lines under section headings); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, phone, email, map, form, social): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Find the bar button in the first section and Visit pill in the navigation: now #visit; owner's target: keep them on the visit section, or point them to your map or booking page.
- Build your own button in the first section: now #build; owner's target: keep it, or point it to your online order page.
- Reserve a cup button in the drops section: now #visit; owner's target: your pre-order or reservation page, or keep it on the visit section.
- Get directions button in the visit section: now a Google Maps search for Leeds; owner's target: the Google Maps link of your bar.
- Phone and email links in the visit section and the footer: now a tel: link and a mailto: link to placeholders; owner's target: your shop phone in tel: form (+44...) and your email.
- Instagram and TikTok links in the footer: now the home pages instagram.com and tiktok.com; owner's target: your profile URLs.
- Send the order button of the group order form: now a script that checks name and email, shows a thank-you line and clears the form; nothing is sent; owner's target: your form endpoint (Formspree, Netlify Forms) or your ordering tool, and drop the thank-you script.
- The form in `#visit` (fields `name`, `email`, `cups`, `when`, `message`) sends nothing; `section-script:visit` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Chewsday (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (16, Unsplash: drinks 4, build 5, pearls 1, regulars 1, drops 4, visit 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Business: a bubble tea bar in Leeds, "open till 10pm"; the street address, postcode, phone and email are placeholders (first section, visit, footer).
- Menu and prices: Brown Sugar Tiger £4.90, Sunset Thai £4.60, Matcha Cloud £5.20, Pink Milk £4.80; extras such as oat milk +30p, popping strawberry and coconut jelly +60p, taro paste +80p (drinks, build).
- Ingredient and process claims: loose-leaf tea brewed in small pots every two hours, fresh whole milk from Wharfedale, fruit pressed or puréed each morning, pearls cooked in batches of forty and binned at two hours, simmered twenty-five minutes, first batch at 10:30 (build, pearls, rules).
- Service details: free tasters, a ten-second hand shake, hot drinks from October to March, 50p off any clean cup up to 700 ml, a free first refill on the bar's glass cups (ritual, build, rules, FAQ).
- Allergen and diet claims: all teas, oat milk, fruit bases and brown-sugar pearls vegan; fresh milk, cheese foam and taro paste not; popping pearls contain seaweed extract; taro paste contains milk; an allergen sheet on the counter and the order screen (FAQ). Check these against your real menu.
- Caffeine claim: a regular jasmine or Assam cup has about as much as a small coffee (FAQ).
- Weekly drops: four drinks with dates Tue 13 Oct, 20 Oct, 27 Oct and 3 Nov at 11am until sold out (drops). The dates carry no year in the text and need updating.
- Opening hours: Mon to Thu 11:00 to 21:00, Fri and Sat 11:00 to 22:00, Sunday 12:00 to 20:00 (visit); the "open till 10pm" line must match them.
- Ordering: call to order ahead, a group order form for ten cups or more with confirmation "within a day", a counter order screen; "we answer within the hour while we are open" (FAQ, visit).
- Customer messages: four named regulars (Priya R., Tom O., Ama A., Jess L.) and the bar's replies; the photo is a stock picture (regulars). Replace with real, permitted messages.
- Name puns: "Tuesday, sorry, Chewsday" in the drops lede, "Chewsday replied" in four replies and the visit title "Come chew it over"; they must change if you rename the bar.
- Footer: "© 2026 Chewsday Tea Bar Ltd, Leeds": put in your legal name.

## Known limits
- The page has no full-screen hero: it opens on a heading, two buttons and the signature menu, so the first view is dense on short phones.
- The group order form sends nothing: its handler is a script that checks the required fields, shows the thank-you line and clears the form. Without JavaScript the browser posts it back to the page and nothing is sent, so connect a form service.
- The build cards are sticky under the navigation bar, and with scroll motion on the drops section is held for as much scroll as its rail (intro and four cards) is wider than the screen; both ask for long scrolling and are worth checking on short laptop screens.
- Without CSS scroll-driven animation support (Firefox today) or with reduced motion on, the scroll scenes and the smooth wheel are off: the cups, chips, bubbles and bumps show at rest, the drops section is a normal block with its cards in a grid, and the build cards still stick and stack without scaling. Firefox still plays the opening load-in; the nav bar tucks away on scroll in both cases.
- The pearls scene times its eight chips one by one through CSS :nth-of-type rules; a ninth chip needs a rule of its own or it flies out on a different timing.
- The Instagram and TikTok links point to the sites' home pages until you change them.

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Chewsday left only in class names.
