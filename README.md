# Kurma

Kurma storefront built with Next.js, React, TypeScript, and Tailwind CSS.

## Development

Run npm ci, then npm run dev. Open http://localhost:3000.

## Project structure

- app/: Routes, root layout, global styles, and favicon.
- components/cart/: Shopping cart drawer.
- components/home/: Homepage sections.
- components/layout/: Shared navigation and footer.
- lib/: Shared utilities.
- public/images/brand/: Brand artwork.
- public/images/community/: Customer portraits.
- public/images/hero/: Hero photography.
- public/images/product/: Kurma product photography (MDF box, marble box, 5 fragrance boxes, brass turtle stand, medallion, pocket square, bookmark).
- public/images/textures/: Background textures.

Reference public assets with /images/<folder>/<filename>. Keep only images used
by the app in public/; design references and temporary screenshots do not belong
there. Shared UI primitives can be added with the existing components.json
configuration when needed.

## Checks

Run npm run lint, npx tsc --noEmit, and npm run build.

The production build uses next/font/google and needs access to Google Fonts.
