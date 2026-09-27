import { expect, test } from "./fixtures";

// The tests run against localhost, so the origin gate must hold: no page may
// load gtag.js. A regression here would count developer traffic as visitors.
for (const path of ["/", "/about", "/research", "/contact"]) {
  test(`no Google tag loads off the live site on ${path}`, async ({ page }) => {
    const tags: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("googletagmanager.com")) {
        tags.push(request.url());
      }
    });

    await page.goto(path);
    await page.waitForLoadState("networkidle");

    expect(tags).toEqual([]);
    expect(await page.evaluate(() => window.dataLayer)).toBeUndefined();
  });
}
