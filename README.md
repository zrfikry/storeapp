# Simple Store

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zrfikry/)

A minimal e‑commerce demo built with modern web tooling. It showcases a product grid and detail pages sourced from the DummyJSON Products API, a Redux‑powered cart with persistence, light/dark theming, and a small i18n layer.

## Tech Stack
- Next.js 15 (App Router, server and client components)
- React 19 + TypeScript
- Tailwind CSS v4
- Redux Toolkit for state management
- redux-persist for client-side persistence (SSR-safe setup)
- Axios for HTTP requests
- Lineicons React for icons
- Minimal i18n with locale JSON (English)
- ESLint (flat config) with:
  - eslint:recommended
  - next/core-web-vitals + next/typescript
  - import/order sorting, no duplicates
  - stylistic rules: no semicolons, single quotes

## Requirements
- Node.js 18+ (recommended LTS) and npm

## Getting Started
1) Install dependencies
```bash
npm install
```

2) Run the development server
```bash
npm run dev
```
Then open http://localhost:3000

3) Build for production
```bash
npm run build
```

4) Start the production server (after build)
```bash
npm start
```

5) Lint the project
```bash
npm run lint
# auto-fix many issues
npm run lint -- --fix
```

No environment variables are required for this demo.

## Features Overview
- Products from DummyJSON (read-only)
  - Mapping layer translates DummyJSON payloads to local DTOs
  - getProducts and getProduct in `src/modules/product/api.ts`
- Product detail pages at `/products/[slug]`
- Shopping cart
  - Redux Toolkit slice in `src/modules/transaction/state/cartSlice.ts`
  - Persisted with redux-persist (`src/store/index.ts`) via a safe storage strategy for SSR
  - UI components in `src/modules/transaction/components/*`
- Theming
  - Light/Dark theme controlled by a Redux slice (`src/modules/common/state/themeSlice.ts`)
  - ThemeProvider syncs classes on `<html>` to work with Tailwind’s `dark:` variant
  - Switch-style ThemeToggle with Lineicons
- i18n
  - English messages in `src/i18n/locales/en.json`
  - Simple `t(key)` helper usable on server and client

## Project Structure Highlights
- Product API: `src/modules/product/api.ts`
- Store: `src/store/index.ts`
- Cart slice: `src/modules/transaction/state/cartSlice.ts`
- Cart helpers: `src/modules/transaction/helpers.ts`
- Transaction UI: `src/modules/transaction/components/*`
- Theme: `src/modules/common/state/themeSlice.ts`, `src/modules/common/components/ThemeProvider.tsx`, `src/modules/common/components/ThemeToggle.tsx`
- Common UI: `src/modules/common/components/Card.tsx`, `src/modules/common/components/Button.tsx`
- i18n: `src/i18n/*`
- App shell: `src/app/layout.tsx`, `src/app/Providers.tsx`, `src/app/page.tsx`, `src/app/products/[slug]/page.tsx`

## Notes & Decisions
- Data source: https://dummyjson.com/docs/products
  - Create/Update/Delete are intentionally not implemented (DummyJSON does not persist writes)
- Images: DummyJSON hosts are whitelisted in `next.config.ts`
- ESLint: flat config in `eslint.config.mjs` includes import sorting and style rules

## Troubleshooting
- If you see ESLint style errors (semicolons, quotes, import order), run `npm run lint -- --fix`.
- On first load, a light theme is applied by default; Redux + Persist will remember your last choice.
