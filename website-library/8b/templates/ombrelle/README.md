# Free HTML restaurant website template with scroll animations and no libraries

Restaurant website template: a free one-page site for a brasserie, bistro or bar, with a menu in four courses, a bar card, five daily services, seating areas and a table booking form. The look is huge uppercase type on near-white, olive and night grounds. Its scroll motion runs on CSS with no JavaScript libraries, in one HTML file with an AGENTS.md, so an AI agent can adapt it to your own restaurant.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/restaurant-website-template/)** · **[Use this template](https://github.com/new?template_name=restaurant-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/restaurant-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/ombrelle/)**

<a href="https://8bsite.github.io/restaurant-website-template/"><img src="previews/desktop.png" alt="Restaurant website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/restaurant-website-template/"><img src="previews/phone.png" alt="Restaurant website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/restaurant-website-template/"><img src="previews/scroll.gif" alt="Restaurant website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/restaurant-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/restaurant-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/restaurant-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/restaurant-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Make it the site for <my restaurant: name, food, address, opening, kitchen and bar hours, dishes and prices, bar card, seats per area, booking rules, phone, email, Instagram>. Start with the name, address, hours, the four courses and the bar card. Set each --len number to its heading's character count. Motion is CSS scroll-driven animation plus an inline kit: keep the gate script in the head, the section ids, data-8b-section and data-8b-motion attributes and the classes AGENTS.md lists; add no animation library. Drop the supplier notes and quotes unless real. Never invent prices, hours, allergens, suppliers, reviews or contacts; ask me.
```

In a vibe coding session, this restaurant website template for [Claude Code in a terminal](https://8b.com/templates/for-claude-code/), Cursor or Codex starts with the facts only the owner has: name, address, opening hours, kitchen and bar hours, every dish and price, the allergen note, seat counts, booking rules and real contacts. The agent should ask for them, never invent them. Prices are data elements, so change the value and the visible number together, and name the currency in the note beside the menu heading. Reset each --len number to its heading's new character count, and remove the deliveries and quotes sections unless real suppliers and guests can fill them.

No agent? Click **[Use this template](https://github.com/new?template_name=restaurant-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: header: wordmark, five section links (Book a table last); compact bar on scroll up; phone menu overlay.
- **Ombrelle**: first screen: huge wordmark, full-bleed dish photo, Book a table; then the menus intro and a photo pair (demo: brasserie and bar). With a mouse the wheel scrolls smoothly; a blurred parasol shadow sways over the hero dish, and on scroll it slides across, warm light rises and the photo pair climbs at two speeds.
- **Lunch that runs into the evening**: olive full-width block: three-line justified heading and a short story. Tied to scroll, the olive field opens from a small circle to full screen as the heading lines slide in.
- **Ombrelle moments**: photo grid of six with a Follow us link (social feed). Photos open from a thin centre slit as they arrive; a parasol shadow drifts across two as you scroll.
- **Noon to midnight**: opening hours as a horizontal track of five services, ground going from day to night (demo: Lunch, Coffee hour, Aperitivo, Dinner, Last glass). Held in place, the five services slide sideways, the ground darkens from near-white through olive to night, and photos shift in their frames.
- **The brasserie card**: the menu: courses with dishes, short descriptions and prices, sticky course index and one photo. The heading slides in with your scroll, the photo opens from a slit, and except on phones the course index stays put.
- **This morning**: five ingredients or suppliers with photos and where each goes on the menu (demo: the day's deliveries). The five ingredient photos start as a tilted pile and deal out into a row, or a grid on phones, as you scroll.
- **After five**: dark bar section: drinks and small plates with prices, two bar photos. On the night ground the heading slides in with your scroll and both bar photos open from a slit.
- **Under the parasols**: seating areas with seat counts beside a drawn plan of the house, wide photo of the square. Tied to scroll, the twelve parasols spin open one after another, then the room, counter and back room draw in.
- **Said at the table**: three guest quotes set large, alternating sides. Each quote drifts in from its side and out the other as it passes, the guest's name moving against it.
- **Book a table**: booking form and the restaurant's details (address, hours, phone, email). The Book a table heading slides in sideways, tied to scroll, beside the booking form.
- **Footer**: night footer: four link columns, width-filling wordmark, copyright and the Design: 8B credit. The wordmark's letters start spread apart and close into the full-width name as the footer arrives.

## Design

![#f8f7f3](https://img.shields.io/badge/-%23f8f7f3-f8f7f3?style=flat-square) page background  
![#141412](https://img.shields.io/badge/-%23141412-141412?style=flat-square) text, buttons, rules  
![#999b69](https://img.shields.io/badge/-%23999b69-999b69?style=flat-square) olive: story field, aperitivo panel, phone menu  
![#1c1d15](https://img.shields.io/badge/-%231c1d15-1c1d15?style=flat-square) night: bar, footer, the day track's end  
![#5c5e33](https://img.shields.io/badge/-%235c5e33-5c5e33?style=flat-square) dark olive parasol stripes  
![#5b5b55](https://img.shields.io/badge/-%235b5b55-5b5b55?style=flat-square) warm grey descriptions and captions  
![#2c3019](https://img.shields.io/badge/-%232c3019-2c3019?style=flat-square) parasol shadow over photos  
![#f0a64a](https://img.shields.io/badge/-%23f0a64a-f0a64a?style=flat-square) amber light warming the hero photo

**Schibsted Grotesk**: the only typeface: regular-weight uppercase headings, tight; small tracked labels (Google Fonts). Uppercase headings are scaled to set widths, and the footer wordmark runs edge to edge. Corners are square, photos sit 8 pixels apart, menus run on thin rules with prices flush right, and a drawn plan shows the house with striped round parasols.

## Questions

**Can I use it for a cafe website that closes before dinner?**  
Yes. Cafe websites usually keep shorter hours, and the five services in the day section are plain HTML, so rename them and change their times. The noon to midnight hours also sit in the opening, the phone menu, the contact details, the footer, the page title and the meta description; AGENTS.md lists every place.

**Does the booking form take reservations?**  
No, not yet. The form asks for name, phone or email, date, time, guests, area and a note, checks the name, contact and date, then shows a thank-you line and sends nothing. Connect Formspree or Netlify Forms, or point the Book a table buttons at OpenTable, Resy, TheFork or SevenRooms. Edit the promise to confirm within the hour.

**How do I change the menu and the prices?**  
Edit the text in the four courses, each with three dishes, and in the two bar card groups. Every price is a data element, so update its value attribute and its visible number. If you rename or add a course, change its id and its link in the course index. To publish a PDF menu instead, point Explore the menus and the Menu links at the file.

## Is it the right base?

As a website template for restaurant owners, it fits when the kitchen keeps a daily rhythm and the room has areas worth showing: a terrace, a counter, a private room. A taproom that brews its own beer is closer to the [brewery](https://8b.com/templates/loud-kettle/) template. This is the light build: the same look and scroll behaviour with no animation library or script from a CDN, about 24 KB of code gzipped in one file against 73 KB and four extra requests for the GSAP version. It has no ordering or payment. The menu is the fifth section, after a held sideways track, so keep the Menu link in the header.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, social, phone, email, form) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 94 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 113+ (it uses color-mix(), cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout, while any load-in or looping animation still plays; with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.11 from jsDelivr, 84 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
