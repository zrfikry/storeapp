This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API Client (DummyJSON Products)

- Product module now sources data from DummyJSON: https://dummyjson.com/docs/products
- Axios client lives at `src/lib/http.ts`, but product API calls use absolute DummyJSON URLs to avoid breaking other modules.
- Product module:
  - Types/DTOs: `src/modules/product/dto.ts` (kept stable; we map DummyJSON response to this shape)
  - API functions: `src/modules/product/api.ts`
    - getProducts: uses `/products` or `/products/search?q=` with `limit` and `skip` (mapped from `offset`)
    - getProduct: uses `/products/{id}`
    - createProduct, updateProduct, deleteProduct: not supported in this demo with DummyJSON and will throw
    - getProductsByCategory: uses `/products/category/{category}` (note: signature still accepts number for backward compatibility)
- Non-product APIs in `src/lib/api.ts` still reference the previous Platzi Fake Store and may not be used in this demo.
- Example usage is wired into `src/app/page.tsx` (server component) to render a small product grid.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Product Detail Page

- Path: `/products/[id]`
- Server component that fetches product data with `getProduct(id)` from `src/modules/product/api.ts`.
- Includes route-specific `loading.tsx` (skeleton) and `not-found.tsx` (404) for better UX.
- Product cards on the home page link to the detail page.

## Cart Feature (Redux Toolkit + redux-persist)

- State management migrated from React Context to Redux Toolkit.
- Persistence: Implemented with `redux-persist` in `src/store/index.ts` (SSR-safe). State rehydrates on the client via `PersistGate` in `src/app/Providers.tsx`.
- Cart slice: `src/modules/transaction/state/cartSlice.ts` (actions: add, remove, increase, decrease, setQty, clear).
- Facade hooks preserved for minimal changes:
  - `CartProvider`, `useCart`, `useCartActions` are still exported from `src/modules/transaction/context.tsx`, now backed by Redux.
- UI components:
  - `CartButton`, `CartDrawer`, `CartItemRow`, `AddToCartButton` in `src/modules/transaction/components/`.
- Integration:
  - App is wrapped globally with Redux Provider and `PersistGate` in `src/app/Providers.tsx`.

---

## Current Changes Overview

- Switched product data source to DummyJSON and added a mapping layer to preserve local DTOs.
- Implemented a server-rendered product detail page at `app/products/[slug]` with graceful 404 handling.
- Replaced React Context with Redux Toolkit for cart state; made the Redux Provider global.
- Extracted `CartHeaderControls` into its own component for clarity and reuse.
- Implemented SSR-safe persistence using `redux-persist` with a no-op storage on the server and Web Storage on the client.
- Added JSDoc summary comments to all functions, components, hooks and reducers across the modified codebase to improve maintainability and onboarding.
- Introduced a minimal i18n layer with locale JSON (English only) and replaced inline UI strings accordingly.

### Internationalization (i18n)
- Locale files live in `src/i18n/locales/` (currently only `en.json`).
- Use the helper `t(key)` from `src/i18n` in server or client code to fetch a string.
- A lightweight `I18nProvider` is wired globally in `src/app/Providers.tsx` for future multi-locale support.
- Example usage:
  - `t('home.latestProducts')`
  - `t('cart.empty')`

### Notable technical decisions
- Read-only Product API: Create/Update/Delete product endpoints throw explicit errors because DummyJSON does not persist mutations reliably for this demo.
- Persistence key: `app_cart_v1` retained for compatibility with previous local storage data.
- Image hosting: Added DummyJSON hosts to Next.js `images.remotePatterns` so external images display without additional config.

### Where to look
- Product API: `src/modules/product/api.ts`
- DTOs: `src/modules/product/dto.ts`
- Store & persistence: `src/store/index.ts`
- Cart slice: `src/modules/transaction/state/cartSlice.ts`
- Cart helpers: `src/modules/transaction/helpers.ts`
- Transaction UI: `src/modules/transaction/components/*`
- Providers: `src/app/Providers.tsx`
- i18n: `src/i18n/*`
- Pages/Layout: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/products/[slug]/page.tsx`
