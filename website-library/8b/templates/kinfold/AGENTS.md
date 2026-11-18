# AGENTS.md: genealogy website template

One-page website for a genealogy or family history research service that hands clients a bound folder. One file, `index.html`, with inline CSS and scripts, no JavaScript libraries: the scroll motion is CSS scroll-driven animations plus a small inline motion kit; no build step, and none is needed for copy, colour or photo edits. A GSAP build of the same page is `index.gsap.html` (GSAP 3.13.0, ScrollTrigger, Lenis 1.3.4 from jsDelivr): edit one of the two, not both.

## Files
Edit these files, not a page fetched by URL (that arrives as a summary).
```bash
curl -LO https://raw.githubusercontent.com/8bsite/genealogy-website-template/main/index.html
curl -LO https://raw.githubusercontent.com/8bsite/genealogy-website-template/main/AGENTS.md
curl -LO https://raw.githubusercontent.com/8bsite/genealogy-website-template/main/LICENSE
curl -LO https://raw.githubusercontent.com/8bsite/genealogy-website-template/main/CREDITS.md
```
Upload `index.html`, LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation).
- The motion parts `motion-gate` (head: sets `data-8b-live` on `<html>` only with scroll-driven animation support and no reduced motion), `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items` groups, `data-8b-off`, `data-8b-enter`): the CSS and the kit read them. Items ordered by `--i` follow their group; counts the CSS fixes are listed under Known limits (`data-8b-fixed` marks such a group).
- Selectors the scripts use:
  - `section-script:tabs`: `.tabs__tab` `data-8b-section`
  - `section-script:case`: `.case__chart` `.case__person` `.case__dot`
  - `section-script:letters`: `data-8b-motion` `.letters__track`
  - `section-script:contact`: `.contact__form` `.contact__status` `.contact__copy` `data-copy` `data-done` `data-sent`
  - `scene-script:reading-window`: `.archives__frame` `.archives__ledger` `.archives__name`
  - `scene-script:thread`: `.method__slips`
  - `scene-script:fee-slip`: `.fees__body` `.fees__item` `.fees__name` `.fees__amount`
- The pedigree chart is read by index: the first entry is the client, then two parents for each entry in order (entries 2n+1 and 2n+2), and the generation of a line comes from its position. section-script:case draws the connecting lines from that order, and scene:generations times each generation from the entry's --i (1 + 2 + 4 + 8 entries). Keep fifteen entries or rework the generations in both.
- The four portraits start the people scene joined in one block: the start offsets are inline variables on each li of .people__grid (--people-div-people-stamp-translate-from and its -2, -m and -2-m variants), set for four columns on wide screens and two on phones. Keep four portraits in this order, or the block does not close.
- The method thread is an SVG path that scene-script:thread draws from the positions of the four slips, and each slip straightens on a range timed from its --i; the fee slip is built by scene-script:fee-slip from each .fees__item's .fees__name and .fees__amount, so keep those classes.
- The huge words pressed into the sheets ("Origins", "Method", "Folder", "Lineage", "People", "Visit", "Asked", "Prices", "Write" and "Yours") are text with CSS depth: change them in the HTML and keep them short.
- The tab colours are four paper variables in :root; the tabs, the sheets, the badges and the letter slips follow them.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`): `--color-1` #0d0d0d (the black desk behind the sheets, with a faint grain, and the stamp mask colour), `--color-2` #e6ebed (pale paper sheets, pale index tabs, text on the dark desk and button labels), `--color-3` #d4dce5 (blue paper sheets and tabs, and the fill of the button hover panel), `--color-4` #cbcfc6 (sage paper sheets and tabs, the ink bars under the archive items and the link hover highlight), `--color-5` #c5b9c4 (mauve paper sheets and tabs, and the highlight behind a question on hover), `--color-6` #1b1b1b (text on the paper, buttons, rules, chart dots and lines, the thread and dark step badges), `--color-7` #474747 (small grey text on paper: chart details and open entries, photo captions, the towns under the letters and form placeholders), `--color-8` #f6f8f9 (the paper slips (method steps, visit card, reply note, fee slip), the Story folder panel and tab, the reading window outline and the light edge of the pressed words); body text needs 4.5:1 contrast.
- With reduced motion the page must read in full.
- Keep the header comment and `<meta name="generator">`. Keep the "Design: 8B" footer link unless the site owner asks to remove it.

## Replace
- `data-8b-placeholder` (og-image, favicon, email, phone, form): real value in, attribute out; no value, remove the row (no image: drop `og:image`, set `twitter:card` to `summary`).
- Open a case button on the first screen: now #contact (the enquiry form); owner's target: your enquiry or booking page, or keep #contact once the form is connected.
- See what's in a folder link on the first screen: now #folder; owner's target: keep as is.
- Book a visit link in the reading room section: now #contact; owner's target: your visit booking page or an appointment form.
- Email address and the copy button in the contact section: now a mailto link to hello@kinfold.example; the button copies the address; owner's target: your enquiry address.
- Phone link in the contact section: now tel:+441904000000; owner's target: your office phone number.
- The form in `#contact` (fields `scope`, `name`, `email`, `message`) sends nothing; `section-script:contact` handles its submit in the page (read it before you connect a service). Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` first. Netlify: `data-netlify="true"` and a hidden `form-name`. Or delete it and the script.
- The name Kinfold (any letter case); the favicon letter and colours in `<link rel="icon">`.
- Photos (12, Unsplash: opening 2, archives 1, folder 4, people 4, room 1): `src`, no `srcset`/`sizes`, `width`/`height` to the ratio, `alt`, CREDITS.md.
- `<title>`, meta description, og tags.

## Ask the owner for
All demo text, never to be invented:
- Service claims: tracing a family through parish registers, census returns and passenger lists, a bound folder, about eight weeks for most families, nothing on the chart until two independent records agree (opening, method, meta description).
- Archive coverage: the 1700s in England and Wales, patchier Ireland and Scotland before about 1820, the National Archives at Kew, county record offices, paid indexes, record agents in Nigeria, Jamaica, Poland, Italy and India (method, questions).
- Fees: £480 about three weeks, £1,250 about eight weeks, from £2,900 four to six months, a third when the case opens and the rest when the folder is ready, a refund if a line runs out early (fees, questions).
- Folder contents: a fold-out chart, an index of names, copies with transcriptions, source notes, marked period plans, a 20 to 40 page written story, a digital copy (folder).
- The worked case: Ruth Marr, a grandmother's photograph, nine weeks, eleven ancestors across four generations, the names, dates and places of fifteen chart entries (case, opening).
- Researchers: four names with specialties and "sixty years in record offices between them, from Truro to Inverness"; the portraits are stock photos of real people (people).
- Client letters: five quotes with names and towns (letters); replace with real letters and ask permission.
- Reading room: "1 Example Lane, York YO1 0AA", Tuesday to Saturday 10 till 4, by appointment, scanning while you wait (room, contact).
- Reply promise: a reply within two working days (contact).
- DNA policy: no kits sold, results from the big testing companies read alongside the paper trail (questions).
- Contact placeholders: hello@kinfold.example, 01904 000 000, and the example name and email address in the form placeholders (contact).
- Company line "Kinfold Research Ltd, York" and "Member of the Register of Qualified Genealogists" (footer): the second names a real register, so state only a membership the owner holds.

## Known limits
- The folder tabs and the copy button need JavaScript; without it all four folder panels show one under another, the copy button does nothing, the family tree has no connecting lines and the Cover tab stays marked, and the form sends nothing either way until you connect a service.
- The email copy button needs the clipboard API, which is available only on secure (https) pages.
- With scroll motion on, the family tree stage sticks through a 250vh track, which can feel long on short screens.
- The scenes are written for fixed counts: fifteen chart entries, four method slips and four portraits (data-8b-fixed on each list).
- Without CSS scroll-driven animations (Firefox today) or with reduced motion, the entrances, the scroll scenes and the smooth wheel are off: the tree stands finished in normal flow with its lines, there is no ledger magnifier or method thread, the fees are a plain list without the turning slip and the letters wrap into a grid. Hovers still run.
- The index tabs are the only fixed navigation (the footer repeats eight section links): there is no wordmark or menu, and the tab labels are small (11px, vertical on wide screens).

## Check
375 and 1440 px, reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean; `data-8b-placeholder` and Kinfold left only in class names.
