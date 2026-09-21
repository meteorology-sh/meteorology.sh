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
