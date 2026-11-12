# WCI '27 website redesign plan

Status: draft for review. The sample homepage is in `prototype/` (open `prototype/index.html`, or run `python3 -m http.server -d prototype 8080`).

## 1. Decisions so far

| Decision | Choice |
| --- | --- |
| Stack | **Astro**, static output, deployed to GitHub Pages through the existing Actions workflow. Replaces VitePress. |
| Logo | The WCI '27 logo SVG, with a white wordmark on dark backgrounds. |
| Missing content | Every must-have section gets built. Anything without real info says **"announcing soon"**. Nothing is made up. |
| Visual direction | **Sunset rings + festival type.** The logo's concentric sunset bands rising behind huge stacked type. Clean: no stickers, badges, or decorative circles (per your feedback). |

## 2. Visual system

**Palette** (taken from the logo):

| Token | Hex | Used for |
| --- | --- | --- |
| dusk | `#121833` | Main background |
| dusk-2 | `#1b2450` | Event-day schedule section, dividers |
| ocean / tide / sky | `#24477a` / `#2589b8` / `#2bb5e3` | Outer sunset rings; sky is the "sea" band, venue section, and footer |
| plum / rose / coral | `#7a3d6b` / `#c2566f` / `#f06b7a` | Inner rings; coral fills the Extras section |
| sun | `#ff9d4d` | Main buttons, the year, the sun |
| paper | `#fff4e6` | Light section (team road) for long reading |

**Type:** Archivo (one variable family). Headlines use the extra-wide, black-weight setting in all caps for the festival-poster look. Body text uses the normal width. In production it will be self-hosted through `@fontsource-variable/archivo`, not loaded from Google.

**Signature moments:**
- Hero: the sunset starts half above the horizon, then sinks slowly into the sea as you scroll (slow at first, then faster). It rises again in the footer ("See you in Tacoma").
- Live countdown to doors opening (8:30 AM PDT, July 10, 2027).
- One festival marquee (dates, venue, city, season) running along the sea band at the bottom of the hero, so it shows on the first screen.
- The Extras section is styled like a festival lineup, with tiered type sizes.
- Everything turns static for visitors who prefer reduced motion.

**Section rhythm:** dark → sea-blue band → dark with photos → paper (road) → navy (event day) → full-width photo → coral lineup → dark quick links → sky-blue venue → split volunteer/sponsor → sunrise footer. Each color owns a whole section; it's never just an accent.

## 3. Site map

Every item from the "[2027] Website Must Haves" doc, mapped to a page. ✅ = content exists today · 🔜 = "announcing soon" placeholder until real info arrives.

### `/` Home (the sample)
- Hero: name, dates, venue, countdown, Apply ✅
- About WCI ✅ · format, fields, stream, awards summary ✅
- Road to Tacoma (team steps) ✅, plus links to the deadline 🔜 and refund policy 🔜
- Event-day schedule preview ✅
- Extras lineup 🔜
- Quick links: livestream ✅, schedule ✅, FTC Events / match schedule / judging schedule / venue map / manual / merch 🔜
- Venue + health & safety ✅ · food trucks 🔜
- Volunteer ✅ / Sponsor 🔜
- Contact footer ✅ · Google Voice number 🔜

### `/event` Event details
- Full schedule ✅ (needs Day 2, see open questions)
- Competition format + alliance/playoff format ✅ · WCI Competition Manual link 🔜
- Awards ✅ · link to the awards section of the manual 🔜 · special awards 🔜
- Venue: address, embedded map, parking ✅
- Food trucks & pizza pre-orders 🔜
- Health & safety: 911, nearest ER (MultiCare Allenmore), nearest urgent care (Franciscan at St. Joseph) ✅, shown on one annotated map

### `/teams` Team info
- Application: link ✅, deadline/timeline 🔜, refund policy 🔜, how to pay ✅ ($50, extra robots $35, secure processor only)
- Quick links (same data as the home page)
- Team information packet 🔜
- Event logistics: schedule link ✅, parking & load-in ✅ (partial), venue maps 🔜, pit info (bring / don't bring / pit size) 🔜

### `/teams/list` Meet the Teams
- Scrollable grid of team photos and logos, like Bordie Blast and FTC Premier EU. Each team shows its number, name, logo, and photo, with the FIRST default logo as a fallback.
- The 2027 list doesn't exist yet. Until it does, the page shows "Teams announced as they're accepted". The 2026 list and logos already in the repo can move to an archive section.

### `/volunteer`
- Sign-up form ✅ · volunteer packet 🔜 · parking & check-in ✅ (partial) · volunteer schedule ✅ (7:30 AM arrival) · role descriptions 🔜

### `/sponsors`
- Presenting sponsor 🔜 · event sponsors 🔜
- Become a sponsor: opportunities + sponsor packet 🔜. "Sponsor now" is an email link at first, then a payment/pledge link (the Cheddar Up idea from the doc) once you pick a processor.

### `/travel`
- Getting there: airports (SEA), ferries, Amtrak Tacoma Dome, transit 🔜 (we write this from public info and you check it)
- Hotels 🔜 · nearby restaurants map 🔜 · attractions & tours 🔜
- International teams: US State Department visa link ✅ · contact for help or an invitation letter (westcoastinvitationalftc@gmail.com) ✅

### `/extras`
- Team social, parades, demo teams, alumni/senior photo, robot photo booth, theme days, coffee with mentors, alumni banquet, student ambassadors 🔜
- Workshops: sign-up, current workshops, schedule 🔜

### `/contact`
- Discord ✅ · Instagram ✅ · email ✅ · Google Voice 🔜 · YouTube ✅ · WCI Board application ✅

### Redirects to keep (linked from outside)
`/apply`, `/board`, `/discord`, `/stream` stay as instant redirects driven by one links file.
`/volunteer` is currently a redirect to the form. It becomes the real Volunteers page, and the form moves to `/volunteer/signup`. **Check that nothing printed or posted points at the old `/volunteer` expecting the form.**

## 4. Content model (so next year is easy)

All season facts live in `src/data/`, not in page markup:

```
src/data/
  event.ts        dates, venue, doors-open time (countdown), season name, year
  links.ts        application / volunteer / board / discord / stream / FTC Events / merch (replaces public/constants.js)
  schedule.ts     per-day list of { time, label, highlight }
  teams.ts        { number, name, logo, photo, city }
  sponsors.ts     { name, tier, logo, url }
  extras.ts       { name, status: "soon" | "confirmed", description, time }
  travel.ts       airports, hotels, restaurants, attractions
  soon.ts         one place to flip a section from "announcing soon" to live
```

Rolling the site over to 2028 means editing `event.ts` and swapping the data files.

## 5. Technical plan

- **Astro 5**, no UI framework. Small vanilla scripts for the countdown, nav, and scroll effects. Pages ship close to zero JS.
- **Images:** the WCI '25 photos are converted from HEIC, then `astro:assets` produces responsive WebP/AVIF. Target: hero loads in under 1s on 4G.
- **Fonts:** self-hosted Archivo variable, preloaded, `font-display: swap`.
- **Maps:** a static, styled venue map that links out to Google Maps (no heavy iframe on the home page). The `/event` page gets one embedded map.
- **Accessibility:** WCAG 2.2 AA. Keyboard navigation, visible focus, reduced motion respected, 4.5:1 text contrast. The marquee gets a pause control in production (WCAG 2.2.2).
- **SEO / sharing:** per-page titles and descriptions, a sunset-rings Open Graph image, and event schema.org JSON-LD (dates, location).
- **Deploy:** update `.github/workflows/deploy.yml` to build Astro (`npm run build`, output `dist/`). Delete `root/` and VitePress once everything is ported.

## 6. Build order

1. **Scaffold:** Astro project, tokens, fonts, base layout (nav + footer), redirects, data files, deploy workflow. Port the homepage from `prototype/`.
2. **Core pages:** Event, Team Info, Volunteer, Contact. These have the most real content.
3. **Meet the Teams:** grid + team detail, using the 2026 data as test content.
4. **Sponsors, Travel, Extras:** mostly "announcing soon" shells, filled in as info comes.
5. **Polish:** a full photo pass over the 105 WCI '25 shots, OG image, accessibility audit, performance check, final review.
6. **Cutover:** remove VitePress, merge to `main` (with your approval), check the live site.

## 7. Open questions for you

1. **Day 2 schedule.** The event is July 10–11, but the current schedule only covers one day. What happens on the 11th?
2. **Photo consent.** The WCI '25 photos show students. Does your event photo release cover using them on the public site?
3. **Volunteer URL.** Is it OK for `/volunteer` to become a page instead of a redirect to the form (see §3)?
4. Application deadline and refund policy wording, when ready.
5. 2027 FTC Events page code, livestream link, and merch store, when ready.
6. Google Voice number.
7. Sponsor packet, team packet, volunteer packet, and competition manual: will these be PDFs in the repo or Google Docs links?

## 8. Notes on the sample

- Real copy only. Every "Soon" tag marks a gap from the list above.
- Photos are from WCI '25 at Hazen High School and captioned that way, because the 2027 venue is different.
- The design detector flagged three things. I reviewed each and left them on purpose:
  - **"Cramped padding" on full-width sections:** a false positive. The screenshots show generous padding; the detector doesn't see the CSS-variable spacing.
  - **"Shape-assembled SVG":** the sunset rings are the logo's own geometry.
  - **The marquee:** a deliberate festival touch. It stops for reduced-motion users and gets a pause control in production.
- Screenshots: `.impeccable/review/desktop.png` and `mobile.png`.
