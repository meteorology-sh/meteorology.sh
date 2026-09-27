# meteorology.sh — Frontend

## What This Is

The Petrichor website, a static React SPA served from S3 and CloudFront at
[meteorology.sh](https://meteorology.sh). It has four routes: Home (`/`), About
(`/about`), Research (`/research`), and Contact (`/contact`). The home page shows live conditions over Austin,
fetched from the Open-Meteo API and stored in Redux. That fetch is the live data
integration pattern every future feature follows.

## Stack

| Tool          | Version | Notes                                                                              |
| ------------- | ------- | ---------------------------------------------------------------------------------- |
| React         | 19      | StrictMode always on                                                               |
| TypeScript    | 6       | `strict`, `verbatimModuleSyntax`, `erasableSyntaxOnly` — no `enum`, no `namespace` |
| Vite          | 8       | Path alias `@` → `src/`, manual vendor chunks                                      |
| React Router  | 7       | `createBrowserRouter`, data router                                                 |
| Redux Toolkit | 2       | `configureStore` + `createSlice`                                                   |
| Tailwind CSS  | 4       | Vite plugin — no `tailwind.config.js`                                              |
| DaisyUI       | 5       | Semantic component classes + theme tokens                                          |
| Vitest        | 4       | Unit tests, `.test.ts(x)` files in `src/tests/`                                    |
| Playwright    | 1       | E2E tests in `src/tests/e2e/`, run against the production build                    |

## Directory Structure

```
app/
  index.html               # Home page title, description, and Open Graph tags for crawlers
  public/                  # Copied as-is into dist/
    favicon.svg
    og-image.png           # 1200×630 social preview
    robots.txt / sitemap.xml
    llms.txt / llms-full.txt   # Written by hand; llms-full.txt mirrors every page heading
  src/
    app/                   # UI layer
      main.tsx             # Renders <RootProvider /> and nothing else
      App.tsx              # Layout shell: navbar, mobile drawer, footer, <Outlet />
      components/
        LandingPage.tsx    # Wordmark, statement, <Conditions />
        Conditions.tsx     # Live conditions card for Austin
        About.tsx          # Who / What / Why list
        Research.tsx       # Weatherman, Automata, Hyades sections
        Contact.tsx        # Three channel cards: GitHub, hello@, and the X account
      assets/              # Images + self-hosted woff2 fonts (with OFL licences)
      index.css            # Global entry: fonts, Tailwind, tokens, theme, base layer
      fonts.css            # @font-face for Archivo and IBM Plex Mono
      App.css              # wordmark, wordmark-hero, statement, mark
      tokens.css           # GENERATED — CSS variables + t-* type classes — do not edit
      theme.css            # GENERATED — Tailwind @theme + daisyUI themes — do not edit
    lib/                   # Infrastructure — not UI
      client/api.ts        # Plain async fetch functions (PascalCase names)
      client/analytics.ts  # Google tag loader + page_view reporter, live host only
      context/
        RootProvider.tsx   # Composes all providers — edit here to add one
        RouterProvider.tsx # Router config + per-route page meta at module scope
        StoreProvider.tsx  # Instantiates store once via useMemo
        DataProvider.tsx   # Renderless: fetches conditions → dispatches to Redux
      hooks/usePageMeta.ts # Sets document title + description from the route handle
      hooks/usePageView.ts # Reports a page_view to Google Analytics on every route
      store/
        store.ts           # makeStore() factory + inferred AppStore/RootState/AppDispatch
        hooks.ts           # useAppDispatch, useAppSelector, useAppStore (always use these)
        features/data.ts   # Redux slice: DataState, dataActions, default reducer export
      types/
        analytics.ts       # window.dataLayer + window.gtag declarations
        data.ts            # WeatherT (API response) + ConditionsT
        page.ts            # PageMetaT (route title + description)
    tests/
      data.test.ts         # Vitest unit tests
      e2e/                 # Playwright: fixtures.ts, layout, navigation, crawlers
  Dockerfiles/
    Dockerfile.local       # Dev: node:alpine, Vite dev server
    Dockerfile.prod        # Prod: multi-stage — Node build → nginx:stable-alpine
  nginx.conf               # SPA try_files fallback + gzip
  vite.config.ts           # Alias, plugins, manual vendor chunks, Vitest config, server host/HMR
  playwright.config.ts     # 3 desktop + 2 mobile projects against `yarn preview`
```

## Running the App

```bash
# Local dev (Vite HMR, source bind-mounted) — from the repo root
docker compose up

# Production build (nginx static serve) — from the repo root
docker compose -f docker-compose.prod.yaml up

# Deploy to S3 + CloudFront — from app/
yarn deploy
```

## Analytics

Google Analytics 4, property `G-EZ9EH6VS8H`. The tag is **not** in `index.html`. One
build artifact serves the live site, the nginx container, and the Playwright preview
server, so the gate is a runtime check on the hostname instead of a build flag.

`lib/client/analytics.ts` owns it:

- `IsMeasuredHost(hostname)` — pure predicate, true for `meteorology.sh` and
  `www.meteorology.sh`. Everything else is a developer environment.
- `LoadAnalytics()` — injects `gtag.js` once, on a measured host only, and configures
  the property with `send_page_view: false`.
- `TrackPageView(path, title)` — sends one `page_view` event.

`send_page_view` is off because gtag.js loads one time in a single page app. Every
landing, the first one included, is reported by `usePageView`, called once in `App`
beside `usePageMeta`. It takes the title from the route handle rather than
`document.title`, so the event does not depend on which effect ran first.

Off a measured host nothing loads: no request to `googletagmanager.com`, no
`window.dataLayer`. `e2e/analytics.test.ts` asserts that on every route.

## External API

Open-Meteo (`https://api.open-meteo.com/v1/forecast`) — no auth. `FetchWeather` requests
the `current` block at lat `30.26715`, lon `-97.74306` (Austin, TX). Units are Celsius,
knots, and inches. The fields are temperature, humidity, dew point, apparent temperature,
precipitation, cloud cover, MSL pressure, 10 m wind speed and direction, freezing level
height, and CAPE. One request fills the whole conditions card, so every row shares one
timestamp.

---

## Provider Composition

`main.tsx` renders exactly one thing: `<RootProvider />`.

```tsx
// main.tsx
createRoot(document.getElementById("root")!).render(<RootProvider />);
```

`RootProvider` composes all providers in a fixed order:

```tsx
// lib/context/RootProvider.tsx
export const RootProvider = () => (
  <StrictMode>
    <StoreProvider>
      <RouterProvider />
      <DataProvider />
    </StoreProvider>
  </StrictMode>
);
```

**The provider composition order is fixed.**
- `StoreProvider` is always the outermost application wrapper so every provider and component can access the store.
- `RouterProvider` and `DataProvider` are **siblings**, not nested. `RouterProvider` owns the entire visible UI tree. `DataProvider` is renderless (no children, no visible output).
- Add new providers as siblings inside `StoreProvider`, never as wrappers around `RouterProvider`.

---

## RouterProvider

The router config lives at **module scope** inside `RouterProvider.tsx`, not inside the component.

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,       // layout shell
    children: [
      { path: "/",         element: <LandingPage />, handle: home },
      { path: "/about",    element: <About />,       handle: about },
      { path: "/research", element: <Research />,    handle: research },
      { path: "/contact",  element: <Contact />,     handle: contact },
    ],
  },
]);

export const RouterProvider = () => <ReactRouter router={router} />;
```

- `App` is the layout shell. It renders `<Outlet />` where child routes appear.
- Use `NavLink` (not `Link`) for navigation so active state is available.
- Add new routes as children of the root `App` entry.
- Every route carries a `handle` of type `PageMetaT` (`{ title, description }`),
  declared as a module-scope constant above the router. `usePageMeta()`, called once in
  `App`, writes the deepest match's handle into `document.title` and the meta
  description. Titles follow `Petrichor — <Page>`.
- `index.html` carries the home page's title, description, and Open Graph tags for
  crawlers that do not run JavaScript. Keep it in step with the `home` handle.
- `App.tsx` also renders `<ScrollRestoration />`, so every navigation opens at the top.

---

## DataProvider — Renderless Side-Effect Provider

A `DataProvider` fetches external data and syncs it into Redux. It renders no UI.

```tsx
// lib/context/DataProvider.tsx
const ConditionsContext = createContext<ConditionsT | undefined>(undefined);

export const DataProvider = () => {
  const conditions: ConditionsT | undefined = useAppSelector(
    (state) => state.data.conditions
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      const weather = await FetchWeather();
      dispatch(dataActions.conditions(weather.current));
    };

    if (!conditions) {
      fetch();                            // guard: skip if already loaded
    }
  }, [conditions, dispatch]);

  return <ConditionsContext.Provider value={conditions} />;  // no children
};
```

**Pattern rules:**
- The provider reads from and writes to Redux — it does not manage local state for shared data.
- The `useEffect` guard (`if (!data) fetch()`) prevents redundant fetches on re-renders.
- Returning `<Context.Provider value={...} />` with no children makes the context available without wrapping the UI tree.
- One `DataProvider` per data domain; add new ones as siblings in `RootProvider`.

---

## Redux Store

### Store factory

The store is created via `makeStore()`, not as a singleton. **Types are always inferred from the factory, never written by hand.**

```ts
// lib/store/store.ts
export const makeStore = () =>
  configureStore({ reducer: { data } });

export type AppStore   = ReturnType<typeof makeStore>;
export type RootState  = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
```

`StoreProvider` instantiates it once with `useMemo`:

```tsx
const store: AppStore = useMemo(() => makeStore(), []);
```

### Typed hooks

**Always use the typed wrappers — never import `useDispatch`/`useSelector` directly.**

```ts
// lib/store/hooks.ts
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
```

### Slice conventions

```ts
// lib/store/features/data.ts
type DataState = {
  string: string | undefined;
  conditions: ConditionsT | undefined;
};

const initialState: DataState = {
  string: "PETRICHOR",
  conditions: undefined,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    conditions: (state, action: PayloadAction<ConditionsT>) => {
      return { ...state, conditions: action.payload };  // spread, don't mutate
    },
  },
});

export const dataActions = dataSlice.actions;   // named export
export default dataSlice.reducer;               // default export
```

- State shape is an explicit named type (`DataState`), not inferred.
- **Reducers use spread returns (`return { ...state, field }`) — do not mutate `state` in place.**
- Actions are namespaced under `dataActions` and exported as a named export.
- The reducer is the default export; add it to `store.ts`'s `reducer` map.

---

## API Client

Client functions live in `lib/client/`. They are **plain async functions, not hooks.**

```ts
// lib/client/api.ts
export const FetchWeather = async (): Promise<WeatherT> => {
  const params = new URLSearchParams({
    latitude: "30.26715",
    longitude: "-97.74306",
    current: ["temperature_2m", /* ... */ "cape"].join(","),
    temperature_unit: "celsius",
    wind_speed_unit: "kn",
    precipitation_unit: "inch",
  });
  const response = await fetch(`https://...?${params}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) console.error(await response.text());

  const data: WeatherT = await response.json();
  return data;
};
```

- Use `URLSearchParams` for query strings.
- Use `fetch` directly (no axios).
- **Guard non-OK responses:** `if (!response.ok) console.error(await response.text())`.
- Return the typed response; the caller (a `DataProvider`) handles dispatch.
- Function names are `PascalCase`.
- Open each function with a doc comment that says what it returns and why.

---

## Types

Types live in `lib/types/`. External API response shapes are typed explicitly with a `T` suffix. Types the UI
uses are derived from the response type, not redeclared.

```ts
// lib/types/data.ts
export type WeatherT = {
  current: { time: string; interval: number; temperature_2m: number; /* ... */ };
  current_units: { temperature_2m: "°F" | "°C"; /* ... */ };
  // ...
};

/** The current conditions, as the readout shows them. */
export type ConditionsT = WeatherT["current"];
```

```ts
// lib/types/page.ts
export type PageMetaT = { title: string; description: string };
```

---

## Component Conventions

### Control flow

**Use early-return guards before the main render. Never use ternaries for loading/empty states at the top level.**

```tsx
export const About = () => {
  const string = useAppSelector((state) => state.data.string);

  if (!string) return;      // guard — returns undefined (renders nothing)

  return <>About</>;
};
```

Data that the design shows as a placeholder is the exception. `Conditions` renders
before the fetch lands: each value falls back to an em dash and the status reads
`WAITING`, then `LIVE`. Keep that card's layout stable instead of guarding it away.

### Static content

Page copy that repeats a shape (the About facts, the reading rows) lives in a
module-scope array and renders with `.map`. Formatting helpers (`Intl.NumberFormat`
instances, `heading()`) sit at module scope beside the component that uses them.

### Consuming the store

Components read from Redux directly via `useAppSelector`. Don't thread props down for data that lives in the store.

```tsx
const value = useAppSelector((state) => state.data.fieldName);
```

### Layout shell (App.tsx)

`App.tsx` is only for layout chrome: the navbar, the mobile drawer, and the footer. It renders `<Outlet />` for child routes. Keep it under 150 lines.

- Navigation links come from one `routes` array, shared by the header menu and the drawer.
- Header links show at `md` (768px) and up; below that a daisyUI `drawer` takes over.
- The drawer's checkbox is controlled by React state (`drawerOpen`), hidden from the tab
  order and the accessibility tree. The menu buttons and every drawer link drive it.

---

## Import Ordering

Group imports with a single-line comment label. Order:

```tsx
// React
// Router
// Hooks
// Redux
// Store
// Client
// Types
// Styles
// Providers
// Components
// Assets
```

Use only the groups that apply. No blank lines between items within a group; one blank line between groups.

Cross-module imports use the `@/` alias. Same-folder imports use relative paths.

Verify import order conforms to this grouping before committing.

---

## Styling — Tailwind v4 + daisyUI + Petrichor tokens

- Tailwind is loaded as a Vite plugin; there is no `tailwind.config.js`.
- `tokens.css` and `theme.css` are **generated** from `design/tokens.json` by
  `node design/build-tokens.mjs`. Never edit them by hand. See `design/README.md`.
- Two daisyUI themes: `operations` (dark, the default, set on `<html data-theme>`)
  and `paper` (light).
- Use daisyUI semantic classes for components (`btn`, `navbar`, `drawer`, `menu`,
  `card`, `table`, `list`, `mockup-window`, `status`).
- Layout uses Tailwind utility classes (`flex`, `grid`, `max-w-5xl`, `px-4 sm:px-8`).
- **Use token colours — never hardcode colours.** The palette is five colours:
  `ground`, `ink`, `primary`, `accent`, `secondary`. Derived tokens cover the rest:
  `bg-base-200`, `text-ink-muted`, `text-ink-faint`, `border-hairline`, `border-border`.
  There are no status colours. Status is a word (`LIVE`, `WAITING`).
- **Type comes from the `t-*` classes (generated into `tokens.css`)**, not ad hoc sizes:
  `t-display-*`, `t-heading`, `t-subheading`, `t-body-md`, `t-body`, `t-body-sm`, `t-label`,
  `t-data`, `t-data-l`, `t-coord`. `App.css` adds `statement`, `wordmark`, `wordmark-hero`.
- Two families: Archivo for display and interface, IBM Plex Mono (`t-data`, `t-coord`)
  for every number a person acts on. Both are self-hosted woff2 files in
  `assets/fonts/`; `index.html` preloads the latin Archivo file.

```html
<div class="card border border-hairline bg-base-200">
  <h3 class="t-heading">Austin, Texas</h3>
  <p class="t-body text-ink-muted">Muted body text on a raised surface.</p>
  <span class="t-data text-accent">36.2</span>
</div>
```

---

## Testing — Vitest + Playwright

Unit tests run via `yarn test` (Vitest). End-to-end tests run via `yarn e2e` (Playwright).

**Where tests live:** unit tests go in `src/tests/`, e2e tests in `src/tests/e2e/`, all
with the `.test.ts` / `.test.tsx` suffix. Do not co-locate tests next to source files.
Vitest excludes `src/tests/e2e/**`.

```
src/tests/
  analytics.test.ts        # the measured-host gate
  data.test.ts             # data slice reducer cases
  e2e/
    fixtures.ts            # test + expect, auto-stubbed Open-Meteo, isNarrow()
    layout.test.ts         # headings, titles, no sideways scroll, header vs drawer
    navigation.test.ts     # scroll to top, drawer open/close
    crawlers.test.ts       # robots.txt, sitemap.xml, llms.txt, llms-full.txt
    analytics.test.ts      # no Google tag loads off the live host
```

**Testing trophy (guides test investment):**
- **Static analysis** (TypeScript + ESLint) — already configured, catches errors at compile time.
- **Unit tests** (Vitest) — pure logic, reducers, selectors. Fast, no DOM needed.
- **Integration tests** (React Testing Library + Vitest) — render real components with a real store, assert on what the user sees. Not installed yet; add `@testing-library/react` when a component grows logic worth testing this way.
- **E2E tests** (Playwright) — full browser against the production build. Covers every route on three desktop engines and two phones.

**Unit conventions** (`vite.config.ts` sets `environment: "jsdom"`, `globals: true`):
- Plain `describe` / `it` / `expect` — no imports needed.
- Each `it` tests exactly one behavior; keep assertions focused.
- Pure functions: pass input directly, assert on return value — no mocks, no store setup.
- Redux slices: call the reducer directly (`reducer(initialState, action)`) — do not mount a store.

**E2E conventions:**
- Import `test` and `expect` from `./fixtures`, never from `@playwright/test`. The
  fixture stubs `api.open-meteo.com` on every page, so tests never reach the network.
- Playwright builds and serves the app itself (`yarn build && yarn preview` on :4173).
- Use `isNarrow(viewport?.width)` with `test.skip` for tests that only apply to one side
  of the `md` breakpoint.
- Query by role and accessible name (`getByRole("heading", { level: 1, name })`).
- `crawlers.test.ts` checks that `llms-full.txt` contains every `h1`–`h3` in `<main>` on
  each route. Change a heading and you must update `public/llms-full.txt`.

All tests must pass (`yarn test` and `yarn e2e`) before committing.

---

## ESLint & Formatting

**ESLint rules to respect:**
- `max-lines: 150` (blank lines and comments excluded) — split files before hitting this.
- `react-hooks/recommended` — exhaustive deps, rules of hooks.
- `react-refresh/only-export-components` — don't mix component and non-component exports in the same file unless using `allowConstantExport`.

**TypeScript compiler enforcement:**
- `noUnusedLocals` and `noUnusedParameters` — no dead variables.
- `erasableSyntaxOnly` — no `enum`, no `namespace`.

**Prettier (enforced, not optional):**
- 80-char print width, 2-space indent, double quotes, semicolons, trailing commas (ES5), always-parens for arrow functions.

**Before committing**, run `yarn run lint` and `yarn run format` to catch violations.

---

## Ecosystem Defaults That Do Not Apply Here

These conventions contradict standard patterns from Redux Toolkit, TypeScript, or common tutorials. This project intentionally diverges:

- **Spread returns, not Immer mutations.** RTK docs encourage `state.field = value` — this project requires `return { ...state, field: value }`.
- **No `createAsyncThunk`.** RTK's standard async pattern is not used. Async work lives in DataProviders calling plain client functions.
- **No `enum` or `namespace`.** Use `type` unions instead. `erasableSyntaxOnly` enforces this at compile time.
- **`fetch`, not axios.** Client functions use the Fetch API directly.
- **No analytics snippet in `index.html`.** The Google tag is injected at runtime by
  `LoadAnalytics()` so developer environments never load it.
- **No Helmet or head manager.** Page titles and descriptions come from route `handle`s via `usePageMeta`.
- **Typed hooks only.** Never import `useSelector` or `useDispatch` from `react-redux` — always use `useAppSelector` / `useAppDispatch`.

---

## Adding a Feature — Checklist

1. **Type** — add the response/domain type to `lib/types/`.
2. **Client** — add a fetch function to `lib/client/api.ts`.
3. **Slice** — add a new slice under `lib/store/features/`, register it in `store.ts`.
4. **DataProvider** — add a new `*Provider` in `lib/context/` (or extend an existing one) to fetch and dispatch; register it as a sibling in `RootProvider`.
5. **Component** — add it under `app/components/`; read from the store with `useAppSelector`; guard with early returns before rendering. Load the `voice` skill before writing its copy.
6. **Tests** — reducer cases in `src/tests/`; stub any new external API in `e2e/fixtures.ts`.

## Adding a Page — Checklist

1. **Component** — add the page under `app/components/` with exactly one `h1`.
2. **Route** — add it to `RouterProvider.tsx` with a `PageMetaT` handle (`Petrichor — <Page>`).
3. **Nav** — add it to the `routes` array in `App.tsx`.
4. **Crawlers** — add the URL to `public/sitemap.xml`, a line to `public/llms.txt`, and the page text to `public/llms-full.txt`.
5. **Tests** — add the route to the lists in `e2e/layout.test.ts` and `e2e/crawlers.test.ts`.
