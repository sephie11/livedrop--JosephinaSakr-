# Storefront (apps/storefront)

Run instructions for the Week 4 assignment scaffold.

Install dependencies

```powershell
cd apps/storefront
pnpm install
```

Run dev server

```powershell
pnpm dev
```

Build

```powershell
pnpm build
```

Run tests

```powershell
pnpm test
```

Notes
- This project uses a local ground-truth matcher for the Ask Support panel. If you later enable a live LLM fallback, add an `OPENAI_API_KEY` in a `.env` file and include a `.env.example`.
- The app expects the mock catalog at `public/mock-catalog.json` and stores orders in `localStorage` under `sf-orders`.
