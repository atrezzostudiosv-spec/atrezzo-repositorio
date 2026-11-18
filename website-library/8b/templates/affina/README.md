# Free HTML cheese shop website template with scroll animations and no libraries

Cheese shop website template: one free HTML page for a cheesemonger that matures its own wheels in a cellar, with a counter list, five cellar steps, tastings, a monthly club and a visit form. Light grey and black with hairline grids; the scroll motion is plain CSS, no libraries. AGENTS.md guides Claude Code, Cursor or Codex.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/cheese-shop-website-template/)** · **[Use this template](https://github.com/new?template_name=cheese-shop-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/cheese-shop-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/affina/)**

<a href="https://8bsite.github.io/cheese-shop-website-template/"><img src="previews/desktop.png" alt="Cheese shop website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/cheese-shop-website-template/"><img src="previews/phone.png" alt="Cheese shop website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/cheese-shop-website-template/"><img src="previews/scroll.gif" alt="Cheese shop website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/cheese-shop-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/cheese-shop-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/cheese-shop-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/cheese-shop-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Make this the site for <my shop: name, address, hours, counter cheeses with milk, age and price per kilo, farms we buy from, tastings, club plans, phone, email>. Replace the shop name, address, cheeses, farms and prices first. Keep the section ids, the classes AGENTS.md lists, the gate script, the data-8b attributes, the --h and --w values and each --len equal to its word's character count; add no animation library. Ask me for any missing fact; never invent prices, ages, farms, hours or contacts.
```

As a cheese shop website template for Claude Code, Cursor or Codex, vibe coding starts with the facts only the shop has: prices per kilo, milk, ageing times, tasting dates, club plans and delivery rules. The agent replaces the shop name in the bar, menu and footer wordmark, gives each new counter panel its own height and width, and keeps five cellar steps, three milks and three parcels, the counts the CSS motion is written for. The [steps for editing it in Claude Code](https://8b.com/templates/for-claude-code/) cover the first session.

No agent? Click **[Use this template](https://github.com/new?template_name=cheese-shop-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: bar with the wordmark, four links and a menu button; full-screen overlay with seven links, address, phone and email.
- **Ripened down here**: two screens: a two-line headline with a small pill, a product label panel, a framed cellar photo, then the dark cellar with three facts. On load the headline lines rise and the product label and cellar photo open upward; scrolling floods the page black from the bottom left, parts the headline to the sides, widens the cellar photo leftward across its frame and brings the second screen's copy in from the right.
- **On the counter this week**: five cheeses on a stepped skyline of tall panels, each with a label of milk, age, name and price. With the scroll, each panel climbs out of the floor a beat after its left neighbour until the row settles into its stepped heights, and on phones the panels slide in from the left.
- **What the cellar does**: five steps of the maturing process beside a held square frame that turns a quarter turn per step and changes photo. A square frame held by CSS sticky turns a quarter turn per step while its photo stays upright and fades to the next step's photo, and each step's hairline fills as it passes.
- **Three milks, three tempers**: three bands (cow, ewe, goat), each with a photo of the animals, a black field with a giant word and a short text. Each band's black field starts across the whole band and recedes to its 40 percent side as you scroll, with the giant word riding the edge and the photo settling from a closer crop.
- **Cut to order, wrapped in paper**: a photo of a wheel being cut beside a heading and four ruled tips. The photo opens upward from its bottom edge, the heading rises line by line and a hairline draws above each of the four tips, once, as they enter.
- **Seven farms we buy from**: seven farms on a horizontal track that slides sideways while the page scrolls down. The section holds a screen-high stage while the track of seven panels slides sideways by its own overflow and each photo drifts against the movement.
- **Thursdays in the cellar**: a heading, a photo of a laid table and four dated tasting rows with seats, price and a Book a seat link. The heading rises line by line, the photo opens upward and a hairline draws above each of the four dated rows.
- **The cellar club**: three monthly parcels (Pair, Board, Cellar) with photos, prices and join buttons, dealt out of one stack. On wide screens the three parcels start piled on the middle one, each tilted, and spread into their row with the scroll; on narrower screens each is dealt in from alternating sides.
- **Questions at the counter**: six questions in native details elements with hairlines, beside a heading. The heading rises and a hairline draws above each of the six questions; opening one turns its plus into a minus.
- **Come downstairs**: a text column with address, hours, phone, email and a message form, beside a shop photo cut into three sliding columns. Three columns showing thirds of one shop photo start offset by different amounts, some up and some down, and slide to meet as a single picture as the section nears mid-screen.
- **Footer**: footer with a one-line description, two link lists, a very wide wordmark and a base line.

## Design

![#f3f3f3](https://img.shields.io/badge/-%23f3f3f3-f3f3f3?style=flat-square) page ground of the first screen, counter, milk, cut, tastings, questions and footer sections, and the bar once scrolled  
![#0e0e0e](https://img.shields.io/badge/-%230e0e0e-0e0e0e?style=flat-square) text and button borders on light grounds, and the ground of the second screen, cellar, farms, club, visit and the labels  
![#5c5c5c](https://img.shields.io/badge/-%235c5c5c-5c5c5c?style=flat-square) intro paragraphs, tasting descriptions, seats, cut tip terms, answers and the footer base line on light grounds  
![#d3d3d3](https://img.shields.io/badge/-%23d3d3d3-d3d3d3?style=flat-square) hairlines on light grounds, the outlined ghost word and the grid rules of the first screen  
![#ffffff](https://img.shields.io/badge/-%23ffffff-ffffff?style=flat-square) text and outline buttons on black grounds, the label text, and the visit form's inputs  
![#a5a5a5](https://img.shields.io/badge/-%23a5a5a5-a5a5a5?style=flat-square) small text on black: label meta, step numbers, paragraphs on black, form labels and the milk cheese lists  
![#2e2e2e](https://img.shields.io/badge/-%232e2e2e-2e2e2e?style=flat-square) rules on black, the ground of club parcels and the cellar frame, and the placeholder behind photos

**Geist**: the only typeface: weight 300 for the headline, section titles and giant words at tight negative tracking, 400 for body text, labels, links and buttons, and 500 only for the wordmark in the bar (Google Fonts). Light grey bands alternate with black ones. The first screen is crossed by two vertical hairlines, and a black block grows from its bottom left corner. Counter panels stand at five different heights like a skyline, each with a black label of milk, age, name and price above a portrait photo. Section heads sit in a wide column beside a narrower intro. Milk bands alternate sides, while tastings, cut tips and questions are ruled rows.

## Questions

**Can a deli, butcher or farm shop use it instead of a cheese shop?**  
Yes, if the shop sells by weight from a counter and buys from named makers. Swap cheeses for hams, pies or loaves, turn the cellar steps into curing or baking, and the farm panels into suppliers. A shop with a long catalogue needs more pages than this one.

**Does the visit form send messages?**  
No. It checks that a name and a valid email are filled, shows a thank-you line and clears the fields, and nothing is sent. Connect Formspree or Netlify Forms with the steps in AGENTS.md, or delete the form and keep the email link. The tasting and club buttons open a mail program, not a checkout.

**What does it show in Firefox or with reduced motion?**  
Without CSS scroll-driven animations (Firefox today) or with reduced motion, the scenes rest: the first screen keeps its small black block, the cellar frame stays square on its first photo, the farms sit in a grid, the parcels in a row, and scrolling is the browser's own. In Firefox the headline still rises on load and the ghost word drifts.

## Is it the right base?

It suits a shop that buys from named makers and sells by weight, tastings or box; drinks and desserts fit the [bubble tea bar](https://8b.com/templates/chewsday/) template better. This is the light build: the same look and motion with no animation library and no script from a CDN, 29 KB of code gzipped against 75 KB and four more requests for the GSAP version. The weak spot is ordering: the visit form sends nothing, the club and tasting buttons open an email, and there is no cart.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, phone, email, form) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 122 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 113+ (it uses color-mix(), cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout (a load-in or a loop may still play); with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr, 96 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
