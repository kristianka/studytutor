import { test, expect } from "@playwright/test";
import { register, login } from "../test-helpers/misc";

test.describe("authentication and authorization", async () => {
    test.beforeEach(async () => {
        await fetch("http://localhost:3000/api/reset", { method: "GET" });
    });

    test("frontpage shows landing page, not dashboard", async ({ page }) => {
        await page.goto("http://localhost:3000");
        await expect(page).toHaveTitle(/Study Tutor/);
        await expect(page.locator("#flashcardsButton")).toHaveCount(0);
        await expect(page.locator("#chatButton")).toHaveCount(0);
    });

    test("redirects to login page if not logged in", async ({ page }) => {
        await page.goto("http://localhost:3000/flashcards");
        await expect(page).toHaveTitle(/Login/);

        await page.goto("http://localhost:3000/chat");
        await expect(page).toHaveTitle(/Login/);
    });

    test("creates a new user", async ({ page }) => {
        await register(page, "John", "Doe", "test@bruhmail.org", "password123!");
    });

    test("flash cards is viewable after logging in", async ({ page }) => {
        await register(page, "John", "Doe", "test@bruhmail.org", "password123!");
        await page.goto("http://localhost:3000/logout");
        await login(page, "test@bruhmail.org", "password123!");

        await page.click("#flashcardsButton");
        await expect(page).toHaveTitle(/Flash cards/);
    });

    test("chat is viewable after logging in", async ({ page }) => {
        await register(page, "John", "Doe", "test@bruhmail.org", "password123!");
        await page.goto("http://localhost:3000/logout");
        await login(page, "test@bruhmail.org", "password123!");

        await page.click("#chatButton");
        await expect(page).toHaveTitle(/Chat/);
    });
});
