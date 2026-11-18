# Free HTML farm delivery website template with scroll animations and no libraries

Farm delivery website template: one free HTML file for an organic veg box scheme that delivers by postcode, with this week's box, the growers, a one-day delivery timeline, six promises, a box builder with a live price, recipes and a postcode check. Lime green, near-black and white; scroll motion is CSS, no JavaScript library.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/farm-delivery-website-template/)** · **[Use this template](https://github.com/new?template_name=farm-delivery-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/farm-delivery-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/furrow/)**

<a href="https://8bsite.github.io/farm-delivery-website-template/"><img src="previews/desktop.png" alt="Farm delivery website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/farm-delivery-website-template/"><img src="previews/phone.png" alt="Farm delivery website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/farm-delivery-website-template/"><img src="previews/scroll.gif" alt="Farm delivery website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/farm-delivery-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/farm-delivery-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/farm-delivery-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/farm-delivery-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Make this the site for <my box scheme: what I sell, growers, box sizes and prices, extras, delivery areas with postcode prefixes and days, returns, certifier, contacts>. Replace the vegetables, growers, prices and area rows first. Keep the section ids, the gate script in the head, the classes AGENTS.md lists and the data-8b, data-price, data-fit, data-label, data-prefix and data-day attributes, set the footer --len, and add no animation library. Never invent prices, certification, delivery days or contacts; ask me.
```

Vibe coding this farm delivery website template for Claude Code or Cursor goes fastest when the agent gets the facts only the farm has: growers and farms, box sizes and prices, extras, delivery areas and days, certifier and licence numbers, crate policy, phone hours. Replace the seven vegetables, four growers and six area rows first. Keep the section ids and the classes AGENTS.md lists, and set the footer wordmark's --len to the new name's letter count. The [terminal steps with Claude Code](https://8b.com/templates/for-claude-code/) cover this in more detail.

No agent? Click **[Use this template](https://github.com/new?template_name=farm-delivery-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: wordmark, six links and a Start a box button; a menu icon opens a full-screen overlay with seven links and the button. The bar hides when you scroll down past 80 px and returns on scroll up, in every browser and with reduced motion on.
- **Every box starts as a row in somebody's field.**: one statement as the h1 over a full-screen field photo, with a short paragraph, a button and a link on a card. On load the heading and the lime card rise into place and the photo settles from a slight zoom; nothing here is tied to scroll.
- **In the box this week**: this week's seven vegetables as a table of rows with farm, cut day and a small photo, laid out like a field that swings up to face the reader. The list starts tipped back 60 degrees (48 on phones) and swings flat as it scrolls in, while each photo opens upward from its slot.
- **Twenty-seven growers. Four of them filled this box.**: four grower cards that stack like crates: each holds under the header while the next slides over it. Each card sticks 84 px below the top of the screen while the next slides over it; the covered card shrinks, moves up and darkens.
- **One day, from the row to your door**: one delivery day as five steps that travel sideways while the section is pinned; the ground runs from pale dawn through lime to near-black dusk. Held (CSS sticky): the five steps travel sideways while the section background runs from a pale lime tint through lime to near-black; a small inline script measures how far the track travels.
- **The box comes back.**: a crate photo beside a panel about returnable crates, with a grid of dots that fills as it scrolls. The dot grid fills column by column as it crosses the screen, and the heading rises line by line.
- **The asterisk is the promise, not the small print.**: six promises read one at a time while a six-armed asterisk assembles and turns. The asterisk turns 120 degrees over the list and each arm grows as its promise nears the middle, while the promise being read is full strength and the rest are dimmed.
- **Choose a box. Change it any week.**: a box builder: size, frequency and extras with a live price. The heading rises on arrival; the total and the label under it change as you pick a size, a frequency or extras.
- **Cook the box**: four recipe cards that arrive as a fanned stack and are dealt into the grid. The four cards start fanned in one stack, centred over the first row, and are dealt out to their places as it scrolls in; the inline script measures each card's start.
- **Questions, answered plainly**: six questions and answers (native &lt;details&gt;) with an email link. A rule draws across above each question, and the star turns 60 degrees when one opens.
- **Do our vans come down your lane?**: a barn photo behind a card that asks for a postcode, lists six delivery areas and gives contacts. The lime sheet starts as the whole section and contracts into the card, uncovering the barn photo, which settles from a zoom.
- **Footer**: dot row, call to action, page links, contacts, a furrow rule, the wordmark across the width and small print. The dot row fills from left to right and the rule above the wordmark draws across.

## Design

![#c9e36b](https://img.shields.io/badge/-%23c9e36b-c9e36b?style=flat-square) nav bar and menu overlay, growers and promises grounds, the lime cards (opening, box builder, contact), the footer button and wordmark, the star on near-black buttons  
![#131512](https://img.shields.io/badge/-%23131512-131512?style=flat-square) text, rules, the near-black buttons, grower and returns panels, recipes and footer grounds, selected choices, the last colour of the day section  
![#ffffff](https://img.shields.io/badge/-%23ffffff-ffffff?style=flat-square) box, boxes and questions grounds, the day and recipe cards, the promises asterisk, text on near-black  
![#c4c7be](https://img.shields.io/badge/-%23c4c7be-c4c7be?style=flat-square) secondary text and rules on dark grounds, footer headings and small print, the returns and footer dot grids  
![#5c6257](https://img.shields.io/badge/-%235c6257-5c6257?style=flat-square) secondary text on white: leads, farm lines in the box rows, notes, times, recipe meta, answers, the field placeholder

**Host Grotesk**: the only typeface: regular-weight headings with tight tracking, medium card titles and links, semibold buttons, a bold nav logo and footer wordmark (Google Fonts). Full-width colour blocks follow one another: a photo ground, white, lime, a pale lime tint, near-black, lime, white, near-black, white, then a photo under a lime card. Most headings sit in a two-column head beside a short lead. Lists are square-cornered rows or cards; box rows are split by 1px near-black rules. The only curves are the pills, the round menu buttons and the dot grids; the six-armed asterisk returns as a three-bar star on buttons and questions.

## Questions

**Does the box builder or the postcode check take real orders?**  
No. The builder adds the size and ticked extras into a total, and the Check button reads the leading letters of a postcode against six area rows, then shows a delivery day or a no. Neither sends anything. Connect them to your checkout or Formspree, and edit each row's data-prefix and data-day. Numeric ZIP codes need a rewrite.

**Where is the farm delivery website design prompt, and how do I use it?**  
Below the short prompt sits a longer farm delivery website design prompt for any AI tool. With the template, put index.html and AGENTS.md in an empty folder with the curl lines in AGENTS.md, and have the agent read it first. Give it the files, not the page address. Bolt opens the repository from [the veg box card on its page](https://8b.com/templates/for-bolt/).

**Can I get a site like this without editing code?**  
Yes, with [8B's AI website builder](https://8b.com/). You describe the site in a sentence and its engine designs a new site, its own design and not this template. Designing and restyling are free; hosting with SSL, full HTML export and AI edits in chat are on Pro at $9 a month billed yearly. It also runs inside Claude and ChatGPT.

## Is it the right base?

As a farm shop website template it is right when customers order a recurring box and need to know whether you reach them. A flower grower that sells by the stem fits the [florist](https://8b.com/templates/moth-marigold/) template better. A shop with a basket and card payment needs more: the builder adds up a price but takes no payment. This build keeps the look and motion with no script from a CDN: 26 KB of code gzipped against 73 KB and four more requests for the GSAP version.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, form, email, phone) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 99 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 121+ (it uses color-mix(), :has(), cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout (a load-in or a loop may still play); with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr, 86 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
