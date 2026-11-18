# Free HTML interior design website template with scroll animations and no libraries

Interior design website template: one free HTML page for a small colour studio or decorator, with a tile mosaic opening, an A to Z glossary, six projects, four priced commissions, six house paints and a contact form. Flat periwinkle, pink and lime sit on near-white. The scroll motion runs on CSS alone, with no libraries.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE) ![one HTML file: no build](https://img.shields.io/badge/one%20HTML%20file-no%20build-orange) ![dependencies: none](https://img.shields.io/badge/dependencies-none-brightgreen)

**[Live demo](https://8bsite.github.io/interior-design-website-template/)** · **[Use this template](https://github.com/new?template_name=interior-design-website-template&template_owner=8bsite)** · **[Download ZIP](https://github.com/8bsite/interior-design-website-template/archive/refs/heads/main.zip)** · **[Template page on 8b.com](https://8b.com/templates/pervenche/)**

<a href="https://8bsite.github.io/interior-design-website-template/"><img src="previews/desktop.png" alt="Interior design website template: first screen on a desktop" width="76.1%"></a> <a href="https://8bsite.github.io/interior-design-website-template/"><img src="previews/phone.png" alt="Interior design website template: first screen on a phone" width="21.9%"></a>

<p align="center"><a href="https://8bsite.github.io/interior-design-website-template/"><img src="previews/scroll.gif" alt="Interior design website template: scrolling through the first sections" width="40%"></a><br><sub>Scroll animation</sub></p>

## Use it with Claude Code, Cursor or Codex

Download the four files into your project folder (`curl.exe` in Windows PowerShell):

```bash
curl -LO https://raw.githubusercontent.com/8bsite/interior-design-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/interior-design-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/interior-design-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/interior-design-website-template/main/CREDITS.md
```

Then fill in the angle brackets and give your agent this prompt:

```text
Read AGENTS.md, then edit index.html. Make this the site for <my interior studio: city, what I design, projects with town and year, packages with fixed prices, paints or palette, how a job runs in steps, opening hours, address, how clients reach me>. Replace the studio name, prices, project names, quotes and contacts first. Motion is CSS scroll-driven animation with the inline kit: keep the gate script, section ids, data-8b-section and data-8b-motion, four sittings and six paint cards; add no library. Never invent prices, hours, reviews or contacts; ask me.
```

An interior design website template for Claude Code needs the studio's own facts first: city, projects, the four prices, paints, hours, address and contacts. Hand index.html and AGENTS.md to [Claude Code in a terminal](https://8b.com/templates/for-claude-code/), Cursor or Codex and vibe code the rest. The demo's euro prices, quotes and project names are invented, so replace every one. The giant contact word needs its --len value, and its rising letters and the pink dot's hops are set in CSS for that word.

No agent? Click **[Use this template](https://github.com/new?template_name=interior-design-website-template&template_owner=8bsite)**, edit `index.html` on GitHub and turn on **Settings > Pages**.

## Sections and motion

- **Navigation**: top bar: four section links, a studio tagline, the Pervenche wordmark and a Menu button that opens a full-screen overlay. The bar hides when you scroll down and returns on scroll up, and below 820 px wide the Menu button opens a full-screen overlay.
- **Every room is a specimen**: first screen: a mosaic of colour tiles around the h1 "Every room is a specimen", a paragraph, a button, a photo and a See the rooms tile. On load the tiles fade in, the text tile fills with colour, its text rises and the sparkles pop, and the photo eases out of a slight zoom as you scroll; tiles that start below the first screen, mostly on phones, animate again as they scroll in, the photo opening from a small circle.
- **A room alphabet**: a sticky A to Z wall of letters beside a glossary of ten entries (demo: room terms such as Arch, Colour drench, Limewash). While the glossary scrolls past the sticky wall, a wave of width runs along the wall and each letter stretches and relaxes.
- **Rooms we have drawn**: six projects as photos with a name and a type, place and year (demo: a hair salon, an attic bedroom, a pâtisserie counter, a café front). The six photos float around the heading like loose prints, then fly into their hairline frames as you scroll.
- **Said in our rooms**: a periwinkle band with three client quotes on cards, a badge and a giant COLOUR FIRST word pair. The band's shapes turn into place as it rises, and on exit the two giant words part like a curtain.
- **Commissions**: a price sheet of four rows with a name, a line, Fixed or From and a price in a lime pill (demo: colour walk to whole-home). The head and rows rise into place, each rail draws from the left and each lime pill slides in from the right.
- **Six house paints**: six tall paint cards in a sticky deck, each leaving its rotated name as a spine (demo: Pervenche, Bonbon, Citron, Lilas, Craie, Encre). The section sticks and each paint card slides in over the previous one, leaving its rotated name as a spine.
- **We paint for the light you have**: a text column with four hours of the day beside a painted wall where a patch of sunlight crosses and night falls (demo: Morning, Noon, Evening, Night). A patch of sunlight crosses the wall as you scroll, the wall warms in the evening and goes dark at night when the lamp comes on.
- **Four sittings**: four rings that roll into one chain above four numbered meeting steps (demo: Walk, Draw, Sample, Paint). Four rings start stacked at the left and roll out to the right until they lock into one chain.
- **Questions people ask**: five questions and answers as native &lt;details&gt; items with a plus that turns into a cross. Each rule draws itself and the sparkle twinkles; the questions open without script.
- **B o n j o u r**: a closing frame with a giant "Bonjour" word, caption strip, a form and the studio details. The letters of the giant contact word rise out of their baselines in a scattered order, and a pink dot hops along them to land as the dot of the j.
- **Footer**: footer: brand and address, a Studio column of five links, an Elsewhere column with Instagram, Pinterest and email, a caption strip with the copyright and Design: 8B.

## Design

![#f6f6f9](https://img.shields.io/badge/-%23f6f6f9-f6f6f9?style=flat-square) page ground, navigation bar, and text on the periwinkle bands and the menu overlay  
![#5767c2](https://img.shields.io/badge/-%235767c2-5767c2?style=flat-square) body text and headings, hairline rules, the quote, price and sittings bands, the menu overlay and the daylight wall  
![#fbb3c9](https://img.shields.io/badge/-%23fbb3c9-fbb3c9?style=flat-square) glossary letter discs, the plus and ring tiles, the hover dot on buttons, one paint card, the open question icon  
![#dde833](https://img.shields.io/badge/-%23dde833-dde833?style=flat-square) the Commissions and form buttons, price pills, the opening text tile's fill, one paint card and the daylight lamp  
![#242b68](https://img.shields.io/badge/-%23242b68-242b68?style=flat-square) text on lime and pink surfaces, form text, the opening button, focus outlines and the darkest paint card

**Google Sans**: body text at weight 400, and uppercase spaced captions, buttons and form labels at weight 500. **Roboto Serif**: headings, wordmark, menu links and the giant words, at weight 500 in its narrowest width with the largest optical size; the A to Z wave stretches the letters (Google Fonts). Nine tiles of different sizes in a six-column mosaic open the page around the heading. Below, near-white sections alternate with full periwinkle bands for the client quotes with the price list, and for the four sittings. Headings are tall condensed serif; small uppercase sans captions sit under hairline rules. Several sections pair content with a sticky element: the glossary beside the sticky A to Z wall, and the paint cards stacked as a deck.

## Questions

**Where can I find free interior design website templates like this one?**  
This one is free: a single index.html under the MIT licence, with AGENTS.md. [The scroll motion here](https://8b.com/templates/animated/) is CSS, so the page loads no JavaScript library and no script from a CDN, only fonts from Google Fonts. The seven photos come from Unsplash and are credited in CREDITS.md. Replace them with your own work.

**Does the contact form send anything?**  
No. As shipped it checks the required fields and shows a thank-you line, but nothing leaves the page. Connect a service such as Formspree or Netlify Forms, or your own endpoint, and replace the demo email and phone, which are placeholders.

**Can I get a site like this without editing code?**  
Yes, in a different way. [8B's AI website builder](https://8b.com/) designs a new site from a sentence, and designing and restyling are free. Publishing with hosting and SSL, full HTML export and AI edits in chat are on Pro at $9 a month billed yearly. It also runs inside Claude and ChatGPT. It does not produce this template.

## Is it the right base?

Choose this as an interior design web template when you sell a method and fixed prices to private clients. This is the light build: the same look and behaviour, no animation library and no script from a CDN, about 33 KB of code gzipped in one file against 78 KB for the GSAP version. For whole buildings, the [architecture](https://8b.com/templates/midblock/) template fits better. The six paint cards assume you mix your own paints; cut them if not. The 8B builder is the no-code route.

## Before you publish

- Replace what is marked `data-8b-placeholder` (social preview image, favicon, form, email, phone, social) and the invented demo facts; [AGENTS.md](AGENTS.md) lists them.
- The form sends nothing yet: connect it to Formspree or Netlify Forms, or remove it.

## Tech

No JavaScript libraries: CSS scroll-driven animations and a small inline motion script with its own smooth wheel scrolling, 138 KB, no build step. Chrome and Edge 111+, Safari 16.2+, Firefox 121+ (it uses color-mix(), container query units, :has(), cascade layers, small/dynamic viewport units). Without scroll-driven animations (Firefox today) the scroll motion and the smooth wheel are off and each section shows its finished layout (a load-in or a loop may still play); with "reduce motion" on, the page is complete and nothing moves on its own (hover effects stay).

A GSAP build of the same page is [`index.gsap.html`](index.gsap.html): GSAP 3.13.0, ScrollTrigger, SplitText, Lenis 1.3.4 from jsDelivr, 125 KB; its scroll motion also plays in Firefox. Use one of the two files.

## License

MIT, see [LICENSE](LICENSE). Photos, fonts and libraries keep their own licences: [CREDITS.md](CREDITS.md). More free templates: [8b.com/templates](https://8b.com/templates/) · [github.com/8bsite](https://github.com/8bsite).
