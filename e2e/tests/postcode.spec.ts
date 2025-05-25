// @ts-check
import { test, expect } from "@playwright/test";
import { submitAPostcode } from "./helpers";

test.describe("Postcode validation", () => {
  test("a user submitting a correct postcode", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await submitAPostcode(page, "SE1 7QD");

    const responseMessage = page.getByRole("heading", { name: "Success" });

    await expect(responseMessage).toBeVisible();
  });

  test("a user submitting an bad postcode", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await submitAPostcode(page, "BAD");

    const responseMessage = page.getByRole("heading", { name: "Error" });

    await expect(responseMessage).toBeVisible();
  });

  test("form is keyboard accessible", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await page.keyboard.press("Tab");
    const input = page.getByRole("textbox", { name: "Enter a postcode" });
    await expect(input).toBeFocused();

    await page.keyboard.type("SE1 7QD");
    await page.keyboard.press("Enter");

    await expect(page.getByRole("heading", { name: "Success" })).toBeVisible();
  });
});
