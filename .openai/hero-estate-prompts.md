# Reference hero assets

Mode: built-in imagegen edits.

Reference: user's `ChatGPT Image Oct 26, 2026, 07_07_31 PM.png`.

Saved masters:
- `public/images/hero-estate-background.png`
- `public/images/hero-estate-foreground.png` (transparent alpha, same canvas dimensions)

Web asset: `public/images/hero-estate-background.webp`, quality 95 WebP conversion.

The foreground PNG supplies the alpha mask for a second copy of the exact same background plate. This keeps the architecture registered while live HTML typography sits between layers.

## Background prompt

Use case: precise-object-edit
Asset type: full-bleed architectural background PNG for a premium real estate website hero.
Input image: edit target. The attached image is the EXACT visual reference, not a loose moodboard.
Primary request: create a clean photographic background plate by removing ONLY the website interface overlays from this reference. Preserve the original architectural scene, camera, composition, perspective, building design, landscaping, light, materials, and all object positions as faithfully as possible. Keep the elegant flat-roof limestone-and-timber glass clubhouse in the LOWER HALF, its roof highest point around 47% of canvas height, the forecourt, reflection pools, planted trees, warm interior lights, distant hills, pale blue sky, and softly out-of-focus leaves in the upper-left and lower-left corners.
Remove ALL website graphics: top navigation/header, brand logo and GARG IMPERIAL REALTY text, nav links, Book a Site Visit button, giant OWN YOUR LEGACY headline, the eyebrow PREMIUM PLOTS etc, the LAND FOR A BETTER TOMORROW side text and its vertical rule, the Explore Our Plots / Schedule a Site Visit buttons, and bottom benefit icons, text and separators. Seamlessly reconstruct the exact pale sky behind all removed headline and header content and the exact paved courtyard behind the removed buttons and bottom graphics. Leave the photographed right-hand stone wall engraving A LEGACY LIVES HERE in place as part of the architecture.
Composition: preserve this exact WIDE 16:9 composition, do not crop or zoom. Output a landscape 2048x1152 PNG, preserving all relative object positions. The top 45% center must remain clean pale blue sky for HTML headline and navigation. The clubhouse/roofline MUST stay at the same relative height and size as in the reference.
Constraints: no new typography, no logos, no interface, no watermarks, no extra buildings or redesign, no rearranging objects. This is an illustrative architectural concept.

## Foreground prompt

Use case: background-extraction
Asset type: precision-registered transparent foreground PNG for a layered website hero.
Input image: edit target, the clean clubhouse photographic background plate.
Primary request: REMOVE ONLY THE SKY by making it genuinely transparent. Keep absolutely every opaque foreground pixel in the same position: the full clubhouse, all roofs, stone walls, landscaping, trees, distant hills, paved courtyard, reflection pools and the out-of-focus leaves in the top-left and bottom-left. Preserve all foreground architecture, colors, perspective and fine edges exactly. Preserve the engraving on the right stone wall.
Critical registration constraints: output MUST keep the EXACT original full canvas 1672x941 pixels and original framing, with all retained subjects at precisely their original x/y coordinates. Do NOT crop tightly around the building, do not resize the subjects, do not zoom or reposition anything, do not redesign or relight. The output overlays the input pixel-for-pixel to place HTML lettering behind the roof. Keep the pale central sky above the roof TRANSPARENT, including sky seen through trees/branches. Retain delicate foliage alpha edges. All solid architecture and the entire courtyard to the bottom edge remain fully opaque.
Transparent background: true alpha, not a painted checkerboard, not white or black. No new text, graphics, backdrop, shadows, borders or new objects.

