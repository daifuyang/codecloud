<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `pnpm dlx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# codecloaud — Enterprise Site SSR Template

TanStack Start (React, file-router) SSR template scaffolded for building an
enterprise marketing website (企业官网).

## Project Identity

- **Name**: `codecloaud`
- **Purpose**: SSR template for an enterprise corporate site
- **Stack**: React 19 + TanStack Start (file-router) + Vite 8 + Tailwind 4 +
  TypeScript 6
- **Package manager**: pnpm 9

## Scaffold Provenance

### TanStack CLI command (exact)

```bash
npx -y @tanstack/cli@latest create my-tanstack-app \
  --agent \
  --package-manager pnpm \
  --tailwind
```

> Note: the `--tailwind` flag is **deprecated and ignored** by the current CLI
> (Tailwind v4 is always enabled in TanStack Start scaffolds). It is kept in the
> command for compatibility with older CLI versions.

The CLI was run inside `/tmp/tanstack-scratch/` to keep the target directory
clean. The generated `my-tanstack-app` was moved to
`/home/orangepi/workspace/projects/websites/codecloaud` and `package.json`'s
`name` field was renamed from `my-tanstack-app` → `codecloaud`. All other
generated files (lockfile, .cta.json, routeTree.gen.ts, AGENTS.md) are from
the CLI unmodified.

### TanStack Intent commands run

```bash
# Install Intent skills into this project (overwrites AGENTS.md with the
# skill-loading block at the top — keep that block intact).
npx -y @tanstack/intent@latest install

# Enumerate available skills (used to discover current patterns before any
# architectural / library change).
npx -y @tanstack/intent@latest list
```

`AGENTS.md` was rewritten during `intent install` to inject the skill-loading
guidance. Subsequent edits keep that `<!-- intent-skills:start -->` block at
the top of the file.

### Useful Intent skill loaders (run on demand)

| Topic                              | Command                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| Start / Router / RSC overview      | `pnpm dlx @tanstack/intent@latest load @tanstack/react-start#react-start`                        |
| React Server Components            | `pnpm dlx @tanstack/intent@latest load @tanstack/react-start#react-start/server-components`      |
| Migration from Next.js App Router  | `pnpm dlx @tanstack/intent@latest load @tanstack/react-start#lifecycle/migrate-from-nextjs`      |
| Router bundler plugin              | `pnpm dlx @tanstack/intent@latest load @tanstack/router-plugin#router-plugin`                    |
| Route tree / data loading / SSR    | `pnpm dlx @tanstack/intent@latest load @tanstack/router-core#router-core`                        |
| SSR streaming / head management    | `pnpm dlx @tanstack/intent@latest load @tanstack/router-core#router-core/ssr`                    |
| Data loading & loaders             | `pnpm dlx @tanstack/intent@latest load @tanstack/router-core#router-core/data-loading`          |
| Auth & route guards                | `pnpm dlx @tanstack/intent@latest load @tanstack/router-core#router-core/auth-and-guards`        |
| Server functions (`createServerFn`)| `pnpm dlx @tanstack/intent@latest load @tanstack/start-client-core#start-core/server-functions` |
| Middleware                         | `pnpm dlx @tanstack/intent@latest load @tanstack/start-client-core#start-core/middleware`        |
| Server routes / API endpoints      | `pnpm dlx @tanstack/intent@latest load @tanstack/start-client-core#start-core/server-routes`    |
| Execution model / env safety       | `pnpm dlx @tanstack/intent@latest load @tanstack/start-client-core#start-core/execution-model`   |
| Deployment (Vercel / CF / Node)    | `pnpm dlx @tanstack/intent@latest load @tanstack/start-client-core#start-core/deployment`       |
| Auth server primitives             | `pnpm dlx @tanstack/intent@latest load @tanstack/start-client-core#start-core/auth-server-primitives` |

## Stack & Integrations

Captured from `.cta.json` (the CLI's own manifest of what was generated):

| Setting           | Value         |
| ----------------- | ------------- |
| `framework`       | `react`       |
| `mode`            | `file-router` |
| `typescript`      | `true`        |
| `tailwind`        | `true` (v4)   |
| `packageManager`  | `pnpm`        |
| `git`             | `true`        |
| `install`         | `true`        |
| `intent`          | `true`        |
| `includeExamples` | `true`        |
| `routerOnly`      | `false`       |
| `chosenAddOns`    | `[]`          |

### Runtime dependencies

- `@tanstack/react-router`, `@tanstack/react-router-devtools`,
  `@tanstack/react-router-ssr-query` — file-router-based routing with
  type-safe params, search, and loaders
- `@tanstack/react-start` — SSR framework on top of the router
- `@tanstack/router-plugin`, `@tanstack/router-cli` — bundler plugin +
  `tsr generate` for `routeTree.gen.ts`
- `@tanstack/react-devtools`, `@tanstack/devtools-vite` — in-browser
  devtools panel; **stripped from production builds** by the plugin
- `@tailwindcss/vite` + `tailwindcss` v4 + `@tailwindcss/typography`
- `react` 19, `react-dom` 19
- `lucide-react` — icon set used by the example components

### Dev dependencies

- `vite` 8, `@vitejs/plugin-react` 6, `typescript` 6
- `vitest` 4, `@testing-library/react`, `@testing-library/dom`, `jsdom`
  (the `test` script is wired up; no example tests were generated)
- `@types/node`, `@types/react`, `@types/react-dom`

### Scripts (do not edit without a reason)

```jsonc
{
  "dev":              "vite dev --port 3000",
  "generate-routes":  "tsr generate",          // regenerate routeTree.gen.ts
  "build":            "vite build",
  "preview":          "vite preview",
  "test":             "vitest run"
}
```

## Environment Variables

The scaffold currently uses **no runtime environment variables**. Any `import.meta.env.*`
or `process.env.*` reference in app code must use the `VITE_` prefix to be inlined
into the client bundle (per Intent's execution-model guidance).

When you add real env vars later, document them here with their purpose, prefix,
and whether they are server-only, client-exposed (`VITE_`), or both. Place actual
values in `.env` / `.env.local` (git-ignored by `.gitignore`).

## File Layout (generated, preserve unless a clear reason)

```
codecloaud/
├── AGENTS.md                # this file
├── .cta.json                # CLI manifest — record of what was scaffolded
├── .gitignore
├── .tanstack/               # CLI scratch / cache
├── .vscode/
├── README.md                # CLI-generated, generic
├── index.html               # not present — Vite + Start plugin manages HTML
├── node_modules/
├── package.json             # name renamed to "codecloaud"
├── pnpm-lock.yaml
├── public/                  # static assets served as-is
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── ThemeToggle.tsx
│   ├── routes/
│   │   ├── __root.tsx       # HTML shell, head meta, theme bootstrap
│   │   ├── about.tsx        # example route — remove for blank template
│   │   └── index.tsx        # example landing — replace with enterprise home
│   ├── routeTree.gen.ts     # GENERATED — never edit by hand
│   ├── router.tsx           # createRouter() factory + Register declaration
│   └── styles.css           # Tailwind v4 entry + design tokens
├── tsconfig.json
├── tsr.config.json          # { "target": "react" }
└── vite.config.ts           # devtools + tailwindcss + tanstackStart + react
```

### Notes on the example content

The CLI was invoked with `--agent`, which makes `includeExamples: true`. The
generated `Header`, `Footer`, `ThemeToggle`, `about.tsx`, and the demo copy in
`routes/index.tsx` are **demo scaffolding**, not part of the requested blank
template. Two valid paths:

1. **Erase and rewrite**: delete the demo components and routes, keep only
   `__root.tsx`, `router.tsx`, `styles.css`. Then add your own pages
   (`/`, `/about`, `/products`, `/contact`, `/blog`, ...).
2. **Strip demo copy only**: keep the components and `__root.tsx` skeleton,
   overwrite the demo content with enterprise branding.

Either way, regenerate routes after adding new files:

```bash
pnpm generate-routes   # or just `pnpm dev` — the plugin runs it on save
```

## Architectural Decisions

- **File-router** chosen over code-based routing so new marketing pages are
  drop-in files under `src/routes/`. The TanStack Router plugin handles
  code-splitting automatically.
- **Tailwind v4** via `@tailwindcss/vite` — no `postcss.config.*`,
  no `tailwind.config.ts`. Design tokens live as CSS variables under
  `:root` in `src/styles.css` and as `@theme {}` overrides.
- **TypeScript strict** is on by default (CLI default). Keep it that way —
  the whole point of TanStack Router is the inferred types in `Register`.
- **No global state library** — the blank starter has none. Add
  `@tanstack/react-query` only when a real caching need appears
  (the deps already pull in `@tanstack/react-router-ssr-query` as a
  routing/query interop helper).
- **No auth provider** — add when a protected area is actually required;
  load `@tanstack/router-core#router-core/auth-and-guards` and
  `@tanstack/start-client-core#start-core/auth-server-primitives` first.
- **Devtools are dev-only** — the Vite plugin removes them from production
  builds (verified in the build output above).

## Deployment

The project ships only a Vite build; there is no platform adapter wired up.
For an enterprise site the most common targets and what to add:

| Target              | What to add                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------ |
| Vercel              | Vercel auto-detects Vite. Set build cmd `pnpm build`, output `dist/`. No adapter needed.   |
| Cloudflare Workers  | Add the `@tanstack/start` Workers entry per `start-core/deployment` skill, set `wrangler.toml`. |
| Netlify             | Add a Netlify adapter; load `start-core/deployment` for exact config.                      |
| Node.js / Docker    | Run `pnpm build` then `node dist/server/server.js` behind a reverse proxy.                 |
| Bun / Railway       | Same as Node; Bun runs the server build directly.                                          |

Before going live: enable ISR / static prerendering for the marketing pages
(see `start-core/deployment`) so the homepage and `/about` can be served as
HTML from the edge.

## Known Gotchas

1. **`pnpm install` is interactive on first run** in a fresh clone because
   pnpm wants to confirm replacing a directory with a newer lockfile.
   Pre-seed by piping `yes | pnpm install`, or use `pnpm install --frozen-lockfile`
   in CI.
2. **`routeTree.gen.ts` is generated.** If you add or rename files under
   `src/routes/` while the dev server is not running, regenerate manually
   with `pnpm generate-routes` before typechecking.
3. **The `--tailwind` flag is deprecated.** Tailwind is already on; passing
   the flag prints a warning but otherwise no-ops.
4. **`@tanstack/devtools-vite` removes devtools from production builds.**
   Don't try to keep them — they'll get tree-shaken and you'll waste time
   debugging a missing panel.
5. **`import.meta.env.*` only inlines `VITE_`-prefixed vars** into the
   client. Server-only secrets must stay on the server side via
   `createServerFn` / `createIsomorphicFn` (load
   `start-core/execution-model` before adding server-only logic).
6. **Head metadata**: routes that need SEO meta should define `head:` in
   their `createFileRoute(...)` options (see `__root.tsx` for the pattern).
   For per-page `<title>`, prefer `head:` over hand-writing `<title>` tags
   in the component.
7. **`.cta.json`** is a record of what the CLI produced — do not edit it
   unless you are intentionally forking the template; CI tools and future
   `intent` runs may rely on it.

## Next Steps

Recommended order when turning this into a real 企业官网:

1. Replace `src/routes/index.tsx` content with the enterprise hero /
   brand statement. Keep the `head:` block for SEO.
2. Add `src/routes/about.tsx` (company intro), `/products.tsx`,
   `/contact.tsx`, `/news.tsx`. Regenerate routes.
3. Replace `src/components/Header.tsx` nav with the real IA, drop
   `ThemeToggle.tsx` if not needed.
4. Swap the colour tokens in `src/styles.css` (the `:root` block) for
   the company's brand palette.
5. Add a `src/lib/` for shared utilities (data fetching wrappers,
   formatters) and a `src/content/` for marketing copy in JSON/MDX.
6. When you need a backend (contact form, news CMS):
   - load `@tanstack/start-client-core#start-core/server-functions`
   - add a server-only module under `src/server/` (use
     `createServerOnlyFn` to keep secrets out of the client bundle)
7. For analytics / SEO meta / sitemap — load
   `@tanstack/start-client-core#start-core/deployment` and
   `@tanstack/router-core#router-core/ssr` to wire `HeadContent` and
   prerender routes.
8. Wire a deployment target (see Deployment table above).
9. Optional: add `@tanstack/react-query` once a real data-fetching need
   exists. Don't add it speculatively.

## Pointers

- TanStack Start docs: https://tanstack.com/start
- TanStack Router docs: https://tanstack.com/router
- Intent CLI / skills: https://github.com/TanStack/intent
- This project's CLI manifest: `codecloaud/.cta.json`
- Skills list: `pnpm dlx @tanstack/intent@latest list`