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
  await page.getByRole("button", { name: "Open menu" }).click();

  const drawer = page.locator(".drawer-side");
  await drawer.getByRole("link", { name: "Research" }).click();

  await expect(page).toHaveURL("/research");
  await expect(page.locator("#drawer-id")).not.toBeChecked();
  await expect(drawer.getByRole("link", { name: "Research" })).toBeHidden();
});

test("the overlay closes the drawer", async ({ page, viewport }) => {
  test.skip(!isNarrow(viewport?.width), "The drawer is for narrow screens");

  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open menu" });
  await expect(menu).toHaveAttribute("aria-expanded", "false");

  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");

  // The drawer panel covers the overlay's left edge, so click its right side.
  const overlay = page.getByRole("button", { name: "Close menu" });
  const box = (await overlay.boundingBox())!;
  await page.mouse.click(box.x + box.width - 10, box.y + box.height / 2);

  await expect(page.locator("#drawer-id")).not.toBeChecked();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});
