// Compiles design/tokens.json into CSS.
//
//   node design/build-tokens.mjs
//
// Writes two identical copies: design/tokens.css for reference, and
// app/src/app/tokens.css for the app. The Docker build context is ./app and the dev
// bind mount is ./app:/usr/src/app, so nothing outside app/ is reachable at runtime.
// design/brand.html links the app copy directly, so the board and the app cannot diverge.
//
// Only the five brand colours are literal. Surfaces, rules and muted inks are derived
// with color-mix(in srgb) from ground and ink, at per-theme ratios chosen so each step
// clears its contrast floor on both grounds.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const t = JSON.parse(readFileSync(resolve(here, "tokens.json"), "utf8"));

const themeVars = (themeId) => [
  ...t.brand.tokens.map((c) => `  --${c.name}: ${c.value[themeId]};`),
  "",
  ...t.derived.tokens.map(
    (d) =>
      `  --${d.name}: color-mix(in srgb, var(--ink) ${Math.round(d.mix[themeId] * 100)}%, var(--ground));`
  ),
];

const typeClasses = t.type.groups.flatMap((group) => [
  `/* ${group.name} */`,
  ...group.styles.flatMap((s) => {
    const rules = [
      `  font-family: var(--font-${s.family || group.family});`,
      `  font-size: ${s.fontSize};`,
      `  line-height: ${s.lineHeight};`,
      `  font-weight: ${s.fontWeight};`,
    ];
    if (s.letterSpacing) rules.push(`  letter-spacing: ${s.letterSpacing};`);
    if (s.transform) rules.push(`  text-transform: ${s.transform};`);
    if (group.name === "Data") rules.push("  font-variant-numeric: tabular-nums;");
    return [`.t-${s.name} {`, ...rules, "}"];
  }),
  "",
]);

const [dark, light] = t.themes;

const css = [
  `/* ${t.name} design tokens — GENERATED from design/tokens.json by design/build-tokens.mjs.`,
  "   Do not edit by hand. Edit tokens.json and re-run the script.",
  `   ${t.brand.note} */`,
  "",
  ":root {",
  `  color-scheme: ${dark.scheme};`,
  ...themeVars(dark.id),
  "",
  ...t.spacing.tokens.map((s) => `  --${s.name}: ${s.value};`),
  "",
  ...t.radius.tokens.map((r) => `  --${r.name}: ${r.value};`),
  "",
  ...Object.entries(t.type.families).map(([k, f]) => `  --font-${k}: ${f.stack};`),
  "}",
  "",
  `/* ${light.name}. Follows the OS, or opt in with data-theme. */`,
  "@media (prefers-color-scheme: light) {",
  `  :root:not([data-theme="${dark.id}"]) {`,
  `    color-scheme: ${light.scheme};`,
  ...themeVars(light.id).map((l) => (l ? `  ${l}` : l)),
  "  }",
  "}",
  "",
  `[data-theme="${light.id}"] {`,
  `  color-scheme: ${light.scheme};`,
  ...themeVars(light.id),
  "}",
  "",
  `[data-theme="${dark.id}"] {`,
  `  color-scheme: ${dark.scheme};`,
  ...themeVars(dark.id),
  "}",
  "",
  "/* Type scale */",
  ...typeClasses,
].join("\n");

// --- colour maths, so the daisyUI theme blocks come from tokens.json too ------------

const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const mixHex = (a, b, p) => rgb2hex(hex2rgb(a).map((v, i) => v * p + hex2rgb(b)[i] * (1 - p)));
const luminance = (h) =>
  hex2rgb(h)
    .map((v) => (v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
    .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
// The readable foreground for a fill is whichever neutral the theme already owns.
const onColor = (fill, ground, ink) =>
  contrast(fill, ground) >= contrast(fill, ink) ? ground : ink;

const themeHexes = (themeId) => {
  const brand = Object.fromEntries(t.brand.tokens.map((c) => [c.name, c.value[themeId]]));
  const derived = Object.fromEntries(
    t.derived.tokens.map((d) => [d.name, mixHex(brand.ink, brand.ground, d.mix[themeId])])
  );
  return { ...brand, ...derived };
};

const daisyTheme = (theme) => {
  const c = themeHexes(theme.id);
  const on = (fill) => onColor(fill, c.ground, c.ink);
  return [
    `@plugin "daisyui/theme" {`,
    `  name: "${theme.id}";`,
    `  default: ${theme.default};`,
    `  prefersdark: ${theme.scheme === "dark"};`,
    `  color-scheme: ${theme.scheme};`,
    ``,
    `  --color-base-100: ${c.ground};`,
    `  --color-base-200: ${c.surface};`,
    `  --color-base-300: ${c["surface-raised"]};`,
    `  --color-base-content: ${c.ink};`,
    ``,
    `  --color-primary: ${c.primary};`,
    `  --color-primary-content: ${on(c.primary)};`,
    `  --color-secondary: ${c.secondary};`,
    `  --color-secondary-content: ${on(c.secondary)};`,
    `  --color-accent: ${c.accent};`,
    `  --color-accent-content: ${on(c.accent)};`,
    `  --color-neutral: ${c["surface-raised"]};`,
    `  --color-neutral-content: ${c.ink};`,
    ``,
    `  /* The palette has no status colour — status belongs in a word. These four slots`,
    `     are filled from the brand so a stray component cannot render off-brand. */`,
    `  --color-info: ${c.accent};`,
    `  --color-info-content: ${on(c.accent)};`,
    `  --color-success: ${c.accent};`,
    `  --color-success-content: ${on(c.accent)};`,
    `  --color-warning: ${c.secondary};`,
    `  --color-warning-content: ${on(c.secondary)};`,
    `  --color-error: ${c.secondary};`,
    `  --color-error-content: ${on(c.secondary)};`,
    ``,
    ...t.radius.tokens.map((r) => `  --${r.name}: ${r.value};`),
    `  --size-selector: 0.25rem;`,
    `  --size-field: 0.25rem;`,
    `  --border: 1px;`,
    `  --depth: 0;`,
    `  --noise: 0;`,
    `}`,
  ];
};

const themeCss = [
  `/* ${t.name} — GENERATED from design/tokens.json by design/build-tokens.mjs.`,
  "   Do not edit by hand. Maps the five brand colours onto Tailwind and daisyUI. */",
  "",
  '@plugin "daisyui";',
  "",
  "/* Tailwind utilities: bg-ground, text-ink-muted, border-hairline, font-mono … */",
  "@theme {",
  ...t.brand.tokens.map((c) => `  --color-${c.name}: ${c.value[t.themes[0].id]};`),
  ...t.derived.tokens.map(
    (d) => `  --color-${d.name}: ${mixHex(themeHexes(t.themes[0].id).ink, themeHexes(t.themes[0].id).ground, d.mix[t.themes[0].id])};`
  ),
  "",
  ...Object.entries(t.type.families).map(([k, f]) => `  --font-${k}: ${f.stack};`),
  "}",
  "",
  ...t.themes.flatMap((theme) => [...daisyTheme(theme), ""]),
].join("\n");

writeFileSync(resolve(here, "../app/src/app/theme.css"), themeCss);
console.log(`wrote ${resolve(here, "../app/src/app/theme.css")}`);

for (const target of ["tokens.css", "../app/src/app/tokens.css"]) {
  writeFileSync(resolve(here, target), css);
  console.log(`wrote ${resolve(here, target)}`);
}
