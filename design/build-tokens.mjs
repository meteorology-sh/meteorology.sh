// Generates tokens.css from tokens.json — the one source of truth for Petrichor's palette,
// type scale, spacing and radii. Writes two copies: one here for reference, one inside
// app/src/app/ because the Docker build context is ./app and cannot reach this directory.
//
//   node design/build-tokens.mjs
//
// Type styles compile to `.t-<name>` classes. The `t-` prefix keeps them clear of Tailwind
// utilities and DaisyUI component classes (`.label` collides otherwise).

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(resolve(here, "tokens.json"), "utf8"));

const themes = tokens.color.themes.map((t) => t.id);
const [first] = themes;
const valueFor = (token, theme) =>
  typeof token.value === "string" ? token.value : (token.value[theme] ?? token.value[first]);

const colorsFor = (theme) => [
  ...tokens.color.tokens.map((t) => `  --${t.name}: ${valueFor(t, theme)};`),
  ...tokens.shadow.tokens.map((t) => `  --${t.name}: ${valueFor(t, theme)};`),
];

const scales = [
  ...tokens.spacing.tokens.map((t) => `  --${t.name}: ${t.value};`),
  "",
  ...tokens.radius.tokens.map((t) => `  --${t.name}: ${t.value};`),
  "",
  ...Object.entries(tokens.type.families).map(([key, stack]) => `  --font-${key}: ${stack};`),
];

const typeClasses = tokens.type.groups.flatMap((group) => [
  `/* ${group.name} */`,
  ...group.styles.flatMap((style) => {
    const rules = [
      `  font-family: var(--font-${style.family || group.family});`,
      `  font-size: ${style.fontSize};`,
      `  line-height: ${style.lineHeight};`,
      `  font-weight: ${style.fontWeight};`,
    ];
    if (style.letterSpacing && style.letterSpacing !== "0") {
      rules.push(`  letter-spacing: ${style.letterSpacing};`);
    }
    if (style.fontStyle && style.fontStyle !== "normal") {
      rules.push(`  font-style: ${style.fontStyle};`);
    }
    if (group.name === "Data") rules.push("  font-variant-numeric: tabular-nums;");
    if (style.name === "subheading" || style.name === "label") {
      rules.push("  text-transform: uppercase;");
    }
    return [`.t-${style.name} {`, ...rules, "}"];
  }),
  "",
]);

const css = [
  "/* Petrichor design tokens — GENERATED from design/tokens.json by design/build-tokens.mjs.",
  "   Do not edit by hand: edit tokens.json and re-run the script.",
  "   Operations (dark) is the primary theme and the un-stamped default. */",
  "",
  ":root {",
  "  color-scheme: dark;",
  ...colorsFor("dark"),
  "",
  ...scales,
  "}",
  "",
  "/* Paper — printed research and the press kit. Follows the OS, or opt in with data-theme. */",
  "@media (prefers-color-scheme: light) {",
  '  :root:not([data-theme="dark"]):not([data-theme="operations"]) {',
  "    color-scheme: light;",
  ...colorsFor("light").map((line) => `  ${line}`),
  "  }",
  "}",
  "",
  '[data-theme="light"], [data-theme="paper"] {',
  "  color-scheme: light;",
  ...colorsFor("light"),
  "}",
  "",
  '[data-theme="dark"], [data-theme="operations"] {',
  "  color-scheme: dark;",
  ...colorsFor("dark"),
  "}",
  "",
  "/* Type scale */",
  ...typeClasses,
].join("\n");

for (const target of ["tokens.css", "../app/src/app/tokens.css"]) {
  writeFileSync(resolve(here, target), css);
  console.log(`wrote ${resolve(here, target)}`);
}
