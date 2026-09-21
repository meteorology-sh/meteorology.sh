import { expect, test } from "./fixtures";

test("robots.txt points crawlers at the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");

  expect(response.headers()["content-type"]).toContain("text/plain");
  expect(await response.text()).toContain(
    "Sitemap: https://meteorology.sh/sitemap.xml"
  );
});

test("the sitemap lists every page", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  const sitemap = await response.text();

  expect(response.headers()["content-type"]).toContain("xml");
  for (const path of ["/", "/about", "/research"]) {
    expect(sitemap).toContain(`<loc>https://meteorology.sh${path}</loc>`);
  }
});

test("llms.txt points to the full text", async ({ request }) => {
  const response = await request.get("/llms.txt");

  expect(await response.text()).toContain(
    "(https://meteorology.sh/llms-full.txt)"
  );
});

// llms-full.txt is written by hand, so a heading that changes on the site
// fails here until the file catches up.
for (const path of ["/", "/about", "/research"]) {
  test(`llms-full.txt carries every heading on ${path}`, async ({
    page,
    request,
  }) => {
    const full = await (await request.get("/llms-full.txt")).text();
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const headings = await page
      .getByRole("main")
      .locator("h1, h2, h3")
      .allTextContents();

    expect(headings.length).toBeGreaterThan(0);
    for (const heading of headings) expect(full).toContain(heading.trim());
  });
}
