# gargimperialrealty

Premium architectural homepage built with Next.js App Router, TypeScript, Tailwind CSS, Motion for React, and Lucide React.

## Run

```sh
npm install
npm run dev
```

Visit `http://127.0.0.1:3000`. Production: `npm run build`; the static export is written to `out/`. Type validation: `npm run typecheck`.

## Source structure

- `src/app/page.tsx` composes the homepage sections as a Server Component.
- `src/app/about/page.tsx` provides the dedicated About Us route at `/about/`; `src/components/about/` contains its animated experience and scoped styles.
- `src/components/home/` contains each homepage section and its colocated stylesheet.
- `src/components/layout/` contains the shared brand, header, and footer.
- `src/components/site-visit/` owns enquiry state, the visit form, and project details. Its provider exposes stable actions to the section buttons without passing callbacks through the page.
- `src/components/ui/` contains the reusable native dialog.
- `src/components/motion/` contains shared reveal components and the scroll progress indicator.
- `src/hooks/` contains shared motion hooks; `src/data/` contains project, navigation, and masterplan content.
- `src/app/globals.css` contains shared tokens, resets, typography, and layout utilities. Component styles stay beside their components.

Add or reorder homepage sections in `src/app/page.tsx`. Keep section state inside its component; share only the visit and project-dialog actions through `SiteVisitProvider`.

## Content

- Global typography is configured in `src/app/fonts.ts` using `next/font/local`: Bodoni Moda for headings and italic accents, and Manrope for body text and controls. Font files and their licenses are in `public/fonts/`; no external font stylesheet is needed.

- Replace illustrative listings in `src/data/projects.ts` with approved inventory. Budget bands are demonstration categories, not prices. No pricing or legal approvals are claimed.
- Site-visit forms validate inputs and prepare a downloadable enquiry. They do not transmit data or confirm a booking. Connect an approved CRM or form endpoint before enabling real enquiry submission.
- Custom image assets are in `public/images/`. Generation prompts and provenance are recorded in `ASSET-PROMPTS.json`; all images were made with the built-in image generation tool. Architectural imagery and the masterplan are concept representations.
- Metadata is in `src/app/layout.tsx`. Search indexing is disabled for this illustrative preview; enable it after approved content and business details are supplied.
- Static hosting uses pre-optimized WebP assets through Next.js Image with its runtime optimization disabled. This allows deployment to any static hosting provider without an image server.

## Hero layering

The hero shows only the animated headline and architectural imagery, with navigation and the separate plot finder retained. It has an environment at z-index 0, the heading at 2, and the transparent architectural foreground at 3. Both architectural layers share image sizing, positioning, parallax, and scale animations. Once both images have loaded, the complete headline rises from behind the villa over 2.4 seconds. The PNG silhouette naturally reveals the letters as they move above the architecture; the foreground stays opaque and above the lettering throughout. The final heading position preserves readability with a slight roof overlap. Mobile uses its own typographic scale and position. Reduced-motion preferences show the final heading immediately; an image load error also falls back to a static heading.

## About scroll scene

`src/components/home/about-scene.tsx` and its scoped stylesheet implement a sticky architectural chapter. Scroll progress moves the headline upward from behind a matching transparent foreground, with a subtle shared camera movement on the two registered image layers. The section pins below the navigation for 255 viewport heights on desktop and 235 on mobile, then releases into the next section. The animated heading is the only visible text in the About scene. Scrolling backward reverses the reveal. Reduced-motion mode removes the extended scroll and pinning and shows the final composition immediately.

The new custom-generated environment and alpha cutout are optimized in `public/images/about-community.webp` and `public/images/about-community-foreground.webp`. Their built-in image generation prompts are recorded in `ABOUT-ASSET-PROMPTS.json`. These images depict an architectural concept, not verified properties.

## About Us page

The dedicated `/about/` page composes separate hero, story, principles, and journey components in `src/components/about/`. A wide architectural photograph introduces the page, followed by a paired image and story layout, an interactive principles section, and an open three-step journey. Typography uses natural letter spacing and sentence case, with no introductory section labels. Principles crossfade between mounted photographs and animate their accessible accordion panels. The page reuses the homepage's `HorizonCTA` component, including its architecture animation and existing enquiry dialog. Shared reveal behavior is in `about-reveal.tsx`; editable principles and journey copy is in `about-content.ts`. Motion includes subtle block entrances and hero image parallax. Reduced-motion preferences show static compositions and remove entrance effects. All imagery reuses the existing illustrative architectural assets; the copy does not introduce unverified company statistics, history, or team profiles.
