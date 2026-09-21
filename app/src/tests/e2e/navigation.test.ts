import { expect, isNarrow, test } from "./fixtures";

for (const name of ["About", "Research"]) {
  test(`${name} opens at the top of the page`, async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    await page.getByRole("main").getByRole("link", { name }).click();

    await expect(page).toHaveURL(`/${name.toLowerCase()}`);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });
}

test("the drawer closes after a link is followed", async ({
  page,
  viewport,
}) => {
  test.skip(!isNarrow(viewport?.width), "The drawer is for narrow screens");

  await page.goto("/");
  await page.getByLabel("Open menu").click();

  const drawer = page.locator(".drawer-side");
  await drawer.getByRole("link", { name: "Research" }).click();

  await expect(page).toHaveURL("/research");
  await expect(page.locator("#drawer-id")).not.toBeChecked();
  await expect(drawer.getByRole("link", { name: "Research" })).toBeHidden();
});
