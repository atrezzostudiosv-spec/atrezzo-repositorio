# Free HTML repair shop website template with scroll animations and no libraries

Repair shop website template: one free HTML file for a phone, laptop or console repair business, with a twelve-row diagnosis checklist, a price wall, refurbished stock, office pickups, repair by post and a booking form. The look is near-black and white with one electric blue, and the wordmark is drawn from rounded dashes. Its scroll motion runs on CSS with no JavaScript libraries, and an AGENTS.md lets an AI agent rewrite it for your shop.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/repair-shop-website-template/)** · **[Use this template](https://github.com/new?template_name=repair-shop-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/repair-shop-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/reflow/)**

<a href="https://8bsite.github.io/repair-shop-website-template/"><img src="previews/desktop.png" alt="Repair shop website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/repair-shop-website-template/"><img src="previews/phone.png" alt="Repair shop website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/repair-shop-website-template/"><img src="previews/scroll.gif" alt="Repair shop website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/repair-shop-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/repair-shop-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/repair-shop-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/repair-shop-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Turn it into the website for <my repair business: shop name, address, what I repair, opening hours, repair prices and bench times, part grades and warranty, refurbished stock, business pickups, repair by post terms, how customers book>. Replace the shop name and its dash wordmark first, then the price wall and contacts; keep each --m, --a and --b value in step with its printed time. Motion is CSS scroll-driven animation plus the inline motion kit: keep the gate script, the section ids and the data-8b-section, data-8b-motion and data-8b-split attributes; add no animation library. Never invent prices, warranty, hours, reviews or contacts; ask me.
```

Begin with the shop name and the dash wordmark: the demo's six letters are rounded dashes in the markup, not a font. Then rewrite the price wall, address, hours and contacts. Vibe coding this in Claude Code, Cursor or Codex works when the agent asks the owner for prices, warranty terms, the pickup route, postage terms and who wrote each review. Change the --m, --a and --b numbers that size the bars together with the printed times. As a computer repair shop website template it needs laptop checks in place of Face ID and camera flash; the list can change length, but the words twelve checks appear in four paragraphs.

No agent? Click **[Use this template](https://github.com/new?template_name=repair-shop-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: top bar: dash mark and name, opening hours, section links, Book a repair button; phone menu overlay.
- **Reflow: Phone and laptop repair, done at the window while you watch.**: two screens: a dash-built wordmark with headline and contact bar, then a staircase statement with three photos (demo: REFLOW, "Most broken things are fixable."). The mouse wheel scrolls smoothly; small uppercase lines spread word by word to full width. On the held first screen the dash wordmark stretches and floods white, then staircase words slide in over rising photos.
- **Fifteen minutes, free, out loud.**: service explainer: staircase heading, paragraph and a twelve-row checklist with results and a quote (demo: the free diagnosis). Held in place on tall desktop screens, a blue band steps down the twelve checks as you scroll, turning each from Queued to its result.
- **Price wall**: price list table grouped by device, each row with models, a time bar and a price (demo: Price wall). As each device group appears, its time bars draw from the left, and a blue selection sweeps over the cheaper-price promise.
- **Fixed at the window.**: how-we-work block: staircase heading over a wide photo cut into four strips, three columns of text (demo: "Fixed at the window."). Tied to scroll, four strips of the workshop photo slide from staggered heights into one picture.
- **Three grades of part. You choose, and the receipt names the one we fitted.**: comparison table of three options with four rows and an example price (demo: Original, Certified, Value parts). As the comparison table comes into view, the dash beside each row label draws in from the left.
- **Second life**: horizontal shelf of numbered products with photo, specs, price and a Reserve link (demo: five refurbished devices). The section holds and the shelf of five refurbished devices runs sideways as you scroll.
- **For offices and schools: we collect on a weekly route, leave a loan device for every one we take and invoice once a month.**: business offer with a weekly schedule drawn as bars on an hour grid (demo: office and school pickups, Monday to Friday). Tied to scroll, a blue cursor sweeps the hour grid; pickup bars it passes turn dark, the ones under it blue.
- **Post it.**: how it works: four steps under one dashed line and a button (demo: repair by post). The four dashes above the steps draw in from the left, one after another, as the steps come into view.
- **Reviews**: three customer quotes in large type, each with name and device. Tied to scroll, a blue selection box jumps word by word along each quote, as if someone were reading it.
- **Before you ask.**: questions and answers (native &lt;details&gt;).
- **Come to the bench.**: contact and booking: staircase heading, address, hours, phone and email, a photo and a booking form (placeholders). Tied to scroll, the heading grows from one small line into a big three-line staircase.
- **Footer**: dashed rule, one-line description, address, contact and page links, copyright and the Design: 8B credit. The dashed rule that opens the footer draws in dash after dash as it appears.

## Design

![#0e0e0e](https://img.shields.io/badge/-%230e0e0e-0e0e0e?style=flat-square) near-black grained sections  
![#f5f5f5](https://img.shields.io/badge/-%23f5f5f5-f5f5f5?style=flat-square) off-white sections, headings  
![#d0d0d0](https://img.shields.io/badge/-%23d0d0d0-d0d0d0?style=flat-square) text on dark, wordmark  
![#8e8e8e](https://img.shields.io/badge/-%238e8e8e-8e8e8e?style=flat-square) muted text on dark  
![#575757](https://img.shields.io/badge/-%23575757-575757?style=flat-square) muted text on light  
![#0000ff](https://img.shields.io/badge/-%230000ff-0000ff?style=flat-square) electric blue highlights  
![#1b1b1b](https://img.shields.io/badge/-%231b1b1b-1b1b1b?style=flat-square) hairlines on dark  
![#e2e2e2](https://img.shields.io/badge/-%23e2e2e2-e2e2e2?style=flat-square) hairlines, form panel

**Instrument Sans**: headings and body, very large and tight. **TikTok Sans**: condensed uppercase labels and buttons (Google Fonts). A four-column grid where near-black and off-white sections take turns. Headings step across the columns like a staircase. Rounded dashes are the motif: they build the wordmark and mark buttons, time bars, steps and the footer rule. Electric blue is kept for highlights, and most photos sit in barely rounded tiles.

## Questions

**Is this a cell phone repair website template or does it cover laptops too?**  
It covers both. The price wall has three groups: five phone repairs, five laptop repairs and three for tablets and consoles. The twelve diagnosis checks lean towards phones, with Face ID and Cameras and flash among them, so a laptop-only shop should rename a few. The demo prices are in pounds with VAT included, so change the currency and the tax wording too.

**How do I change the prices and bench times?**  
Edit the cells of the HTML table in the prices section. Each dash bar takes its length from a --m value in minutes, where 180 is the full three hour scale, so change --m together with the printed time. Rows can be added or removed freely. The note under the table about water damage and data recovery is plain text.

**Does the booking form send anything?**  
No, not yet. Pressing Book a slot only runs a check on the name and contact fields, then prints the thank-you or the error text next to the button; no request leaves the page. To receive bookings, connect Formspree or Netlify Forms, or delete the form with its script and keep the email link. Rewrite the promised confirmation within the hour as well.

## Is it the right base?

It fits where a visible price list and a bench customers can watch decide the sale. This is the light build: the same look and the same scroll behaviour for the visitor, with no animation library and no script from a CDN, so it downloads 29 KB of code gzipped in one file where the GSAP version needs 77 KB and four extra requests. A shop that quotes every job by hand may prefer the live calculator in the [print studio](https://8b.com/templates/dotdrum/) template. As a repair service template it is built for enquiries, not stock or payments: the form sends nothing yet, and every Reserve link jumps to booking.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, phone, email, form) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 119 KB, no build step. Chrome and Edge 108+, Safari 16+, Firefox 110+ (it uses container query units, cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout, while any load-in or looping animation still plays; with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.27 from jsDelivr, 109 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
