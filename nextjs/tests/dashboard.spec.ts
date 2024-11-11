import { test, expect } from "@playwright/test";
import { register } from "../test-helpers/misc";

test.describe("dashboard page", async () => {
    test("can access dashboard page", async ({ page }) => {
        // reset db
        await fetch("http://localhost:3000/api/reset", { method: "GET" });

        await register(page, "John", "Doe", "test@dasboard.org", "password123!");
        await page.goto("http://localhost:3000/dashboard");
        await expect(page).toHaveTitle("Dashboard - Study Tutor");
    });

    test("can create a new flashcard", async ({ page }) => {
        // reset db
        await fetch("http://localhost:3000/api/reset", { method: "GET" });

        await register(page, "John", "Doe", "test@flashcard.org", "password123!");
        await page.goto("http://localhost:3000/dashboard");
        await expect(page).toHaveTitle("Dashboard - Study Tutor");

        await page.getByRole("button", { name: "New Flashcard" }).click();
        await expect(page).toHaveTitle("Flash cards - Study Tutor");
    });

    test("can go to study chat", async ({ page }) => {
        // reset db
        await fetch("http://localhost:3000/api/reset", { method: "GET" });

        await register(page, "John", "Doe", "test@flashcard.org", "password123!");
        await page.goto("http://localhost:3000/dashboard");
        await expect(page).toHaveTitle("Dashboard - Study Tutor");

        await page.getByRole("button", { name: "Go to Study Chat" }).click();
        await expect(page).toHaveTitle("Chat - Study Tutor");
    });
});
