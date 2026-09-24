/* Builds the profile pictures and social headers in this folder.
 *
 *   node design/artifacts/build.mjs
 *
 * Every colour comes from design/tokens.json. The type is the shipped Archivo
 * and IBM Plex Mono woff2, inlined so the render does not wait on a network
 * request. Pages are laid out in HTML and photographed by headless Chrome, so
 * an asset here is set with the same stylesheet rules as the site. */

import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");

/* The rendered files are not committed, so every run makes the folders it
   writes into. The intermediate HTML goes to a temporary directory. */
for (const dir of ["avatars", "headers", "svg"]) {
  await mkdir(join(here, dir), { recursive: true });
}
const work = await mkdtemp(join(tmpdir(), "petrichor-artifacts-"));

const tokens = JSON.parse(await readFile(join(root, "design/tokens.json"), "utf8"));
const colour = (name, theme) =>
  tokens.brand.tokens.find((t) => t.name === name).value[theme];

const fonts = join(root, "app/src/app/assets/fonts");
const inline = async (file) =>
  `url(data:font/woff2;base64,${await readFile(join(fonts, file), "base64")}) format("woff2")`;

const face = `
@font-face {
  font-family: "Archivo";
  font-weight: 400 700;
  src: ${await inline("archivo-latin.woff2")};
}
@font-face {
  font-family: "IBM Plex Mono";
  font-weight: 400;
  src: ${await inline("ibm-plex-mono-latin.woff2")};
}`;

/* The placeholder bolt, one path, straight out of design/logos. */
const BOLT = "M18.5 2 L6.5 18.5 H13.5 L12 30 L25.5 12.5 H18 Z";
const bolt = (fill, size) =>
  `<svg viewBox="0 0 32 32" width="${size}" height="${size}" aria-hidden="true"><path d="${BOLT}" fill="${fill}"/></svg>`;

const page = (w, h, ground, body) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  ${face}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${w}px; height: ${h}px; overflow: hidden; }
  body { background: ${ground}; font-family: "Archivo", sans-serif;
         -webkit-font-smoothing: antialiased; }
  .sheet { width: ${w}px; height: ${h}px; position: relative; }
</style></head><body><div class="sheet">${body}</div></body></html>`;

/* The colour bar the home page shows: primary at half width, secondary and
   accent at a quarter each. */
const bar = (theme, height, width = "100%") => `
  <div style="display:flex; width:${width}; height:${height}px">
    <span style="flex:2; background:${colour("primary", theme)}"></span>
    <span style="flex:1; background:${colour("secondary", theme)}"></span>
    <span style="flex:1; background:${colour("accent", theme)}"></span>
  </div>`;

/* ink at 62% over ground is --ink-muted in the operations theme. */
const muted = (theme) =>
  `color-mix(in srgb, ${colour("ink", theme)} ${theme === "paper" ? 72 : 62}%, ${colour("ground", theme)})`;

const avatar = (size, theme) =>
  page(
    size,
    size,
    colour("ground", theme),
    `<div style="display:grid; place-items:center; width:100%; height:100%">
       ${bolt(colour("secondary", theme), Math.round(size * 0.7))}
     </div>`,
  );

const header = (w, h, theme, { tagline = true, domain = true } = {}) => {
  const band = Math.round(h * 0.09);
  /* A short cover has no room for a lead line, so the wordmark carries more of it. */
  const wordmark = Math.round(h * (h < 220 ? 0.2 : 0.155));
  const lead = Math.round(h * 0.055);
  const mono = Math.round(h * 0.042);
  return page(
    w,
    h,
    colour("ground", theme),
    `${bar(theme, band)}
     <div style="height:${h - band}px; display:flex; flex-direction:column;
                 align-items:center; justify-content:center; gap:${Math.round(h * 0.035)}px">
       <div style="display:flex; align-items:center; gap:${Math.round(h * 0.05)}px">
         ${bolt(colour("secondary", theme), Math.round(h * (h < 220 ? 0.28 : 0.21)))}
         <span style="font-size:${wordmark}px; line-height:1; font-weight:700;
                      letter-spacing:0.14em; text-transform:uppercase;
                      color:${colour("ink", theme)};
                      padding-left:0.14em; margin-right:-0.14em">Petrichor</span>
       </div>
       ${
         tagline
           ? `<p style="font-size:${lead}px; line-height:1.4; color:${muted(theme)}">the smell of rain</p>`
           : ""
       }
       ${
         domain
           ? `<p style="font-family:'IBM Plex Mono',monospace; font-size:${mono}px;
                        letter-spacing:0.06em; color:${colour("accent", theme)}">meteorology.sh</p>`
           : ""
       }
     </div>`,
  );
};

/* A header with no type on it, for a platform that prints its own name. The bar
   sits on the bottom edge: X lifts a banner under its own chrome, so the colour
   is the last thing in the frame. */
/* YouTube shows only a 1546x423 box in the middle of the image on a desktop,
   so that channel art puts everything, the colour bar included, inside it. */
const channelArt = (w, h, theme) => {
  const safeW = 1546;
  const safeH = 423;
  const band = Math.round(safeH * 0.09);
  return page(
    w,
    h,
    colour("ground", theme),
    `<div style="display:grid; place-items:center; width:100%; height:100%">
       <div style="width:${safeW}px; height:${safeH}px">
         ${bar(theme, band)}
         <div style="height:${safeH - band}px; display:flex; flex-direction:column;
                     align-items:center; justify-content:center; gap:${Math.round(safeH * 0.035)}px">
           <div style="display:flex; align-items:center; gap:${Math.round(safeH * 0.05)}px">
             ${bolt(colour("secondary", theme), Math.round(safeH * 0.21))}
             <span style="font-size:${Math.round(safeH * 0.155)}px; line-height:1; font-weight:700;
                          letter-spacing:0.14em; text-transform:uppercase;
                          color:${colour("ink", theme)};
                          padding-left:0.14em; margin-right:-0.14em">Petrichor</span>
           </div>
           <p style="font-size:${Math.round(safeH * 0.055)}px; line-height:1.4; color:${muted(theme)}">the smell of rain</p>
           <p style="font-family:'IBM Plex Mono',monospace; font-size:${Math.round(safeH * 0.042)}px;
                     letter-spacing:0.06em; color:${colour("accent", theme)}">meteorology.sh</p>
         </div>
       </div>
     </div>`,
  );
};

const plain = (w, h, theme) => {
  const band = Math.round(h * 0.22);
  return page(
    w,
    h,
    colour("ground", theme),
    `<div style="display:flex; flex-direction:column; justify-content:flex-end; width:100%; height:100%">
       ${bar(theme, band)}
     </div>`,
  );
};

const shots = [
  // Profile pictures. Square, and safe inside a circle crop.
  ["avatars/petrichor-avatar-1000.png", 1000, 1000, avatar(1000, "operations")],
  ["avatars/petrichor-avatar-512.png", 512, 512, avatar(512, "operations")],
  ["avatars/petrichor-avatar-400.png", 400, 400, avatar(400, "operations")],
  ["avatars/petrichor-avatar-paper-1000.png", 1000, 1000, avatar(1000, "paper")],
  ["avatars/petrichor-avatar-paper-400.png", 400, 400, avatar(400, "paper")],

  // Headers. Each one is the size the platform asks for.
  ["headers/header-x-1500x500.png", 1500, 500, header(1500, 500, "operations")],
  ["headers/header-linkedin-personal-1584x396.png", 1584, 396, header(1584, 396, "operations")],
  ["headers/header-linkedin-company-1128x191.png", 1128, 191,
    header(1128, 191, "operations", { tagline: false, domain: false })],
  ["headers/header-facebook-820x312.png", 820, 312, header(820, 312, "operations")],
  ["headers/header-github-1280x640.png", 1280, 640, header(1280, 640, "operations")],
  ["headers/header-youtube-2560x1440.png", 2560, 1440, channelArt(2560, 1440, "operations")],
  ["headers/banner-plain-1500x500.png", 1500, 500, plain(1500, 500, "operations")],
];

for (const [out, w, h, html] of shots) {
  const src = join(work, out.replace(/[/]/g, "-") + ".html");
  await writeFile(src, html);
  await run("google-chrome", [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    /* Chrome asks the desktop keyring for a cookie encryption key on a fresh
       profile. These keep a render from raising a credentials prompt. */
    "--password-store=basic",
    "--use-mock-keychain",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--virtual-time-budget=4000",
    `--user-data-dir=${join(work, "profile")}`,
    `--window-size=${w},${h}`,
    `--screenshot=${join(here, out)}`,
    `file://${src}`,
  ]);
  console.log(`${out}  ${w}x${h}`);
}

/* The two vector files. Both are geometry only, so they carry no font. */
const svgAvatar = (theme) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000" role="img" aria-label="Petrichor">
  <title>Petrichor</title>
  <rect width="1000" height="1000" fill="${colour("ground", theme)}"/>
  <path transform="translate(150 150) scale(21.875)" d="${BOLT}" fill="${colour("secondary", theme)}"/>
</svg>
`;

const svgBanner = (theme) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 500" width="1500" height="500" role="img" aria-label="Petrichor colour banner">
  <title>Petrichor colour banner</title>
  <rect width="1500" height="500" fill="${colour("ground", theme)}"/>
  <rect x="0" y="390" width="750" height="110" fill="${colour("primary", theme)}"/>
  <rect x="750" y="390" width="375" height="110" fill="${colour("secondary", theme)}"/>
  <rect x="1125" y="390" width="375" height="110" fill="${colour("accent", theme)}"/>
</svg>
`;

await writeFile(join(here, "svg/petrichor-avatar.svg"), svgAvatar("operations"));
await writeFile(join(here, "svg/petrichor-avatar-paper.svg"), svgAvatar("paper"));
await writeFile(join(here, "svg/banner-plain.svg"), svgBanner("operations"));
console.log("svg/petrichor-avatar.svg\nsvg/petrichor-avatar-paper.svg\nsvg/banner-plain.svg");

await rm(work, { recursive: true, force: true });
