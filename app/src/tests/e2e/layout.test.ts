import { expect, isNarrow, test } from "./fixtures";

const routes = [
  { path: "/", heading: "Petrichor", title: "Petrichor — Make it Rain" },
  { path: "/about", heading: "meteorology.sh", title: "Petrichor — About" },
  { path: "/research", heading: "Research", title: "Petrichor — Research" },
  { path: "/contact", heading: "Contact", title: "Petrichor — Contact" },
];

for (const route of routes) {
  test.describe(route.path, () => {
    test("renders its heading", async ({ page }) => {
      await page.goto(route.path);

      await expect(
        page.getByRole("heading", { level: 1, name: route.heading })
      ).toBeVisible();
    });

    test("sets its title", async ({ page }) => {
      await page.goto(route.path);

      await expect(page).toHaveTitle(route.title);
    });

    test("never scrolls sideways", async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      );

      expect(overflow).toBe(0);
    });
  });
}

test("shows the header links on wide screens only", async ({
  page,
  viewport,
}) => {
  await page.goto("/");

  const links = page.getByRole("navigation");
  const menu = page.getByRole("button", { name: "Open menu" });

  if (isNarrow(viewport?.width)) {
    await expect(links).toBeHidden();
    await expect(menu).toBeVisible();
    return;
  }

  await expect(links).toBeVisible();
  await expect(menu).toBeHidden();
});
