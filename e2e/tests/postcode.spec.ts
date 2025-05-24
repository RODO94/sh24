// @ts-check
import { test, expect } from "@playwright/test";
import { submitAPostcode } from "./helpers";

test.describe("Postcode validation", () => {
  test("page loads and there's an inputbox", async ({ page }) => {
    // Testing healthcheck
    await page.goto("http://localhost:5173/");
    const inputBox = page.getByRole("textbox", { name: "Enter a postcode" });
    expect(inputBox).toBeVisible();
  });

  test("a user submitting a correct postcode", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await submitAPostcode(page, "SE1 7QD");

    const responseMessage = page.getByRole("heading", { name: "Success" });

    await expect(responseMessage).toBeVisible();
  });

  test("a user submitting a allow list postcode", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await submitAPostcode(page, "SH24 1AA");

    const responseMessage = page.getByRole("heading", { name: "Success" });

    await expect(responseMessage).toBeVisible();
  });

  test("a user submitting a postcode outwith allowed service areas", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/");
    await submitAPostcode(page, "E2 6PP");

    const responseMessage = page.getByRole("heading", { name: "Error" });

    await expect(responseMessage).toBeVisible();
  });

  test("a user submitting an bad postcode", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await submitAPostcode(page, "BAD");

    const responseMessage = page.getByRole("heading", { name: "Error" });

    await expect(responseMessage).toBeVisible();
  });
});
