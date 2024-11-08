import { test, expect } from "@playwright/test";
import { register, login } from "../test-helpers/misc";

test.describe("flash cards page", async () => {
    test("flash cards is viewable after logging in", async ({ page }) => {
        // reset db
        await fetch("http://localhost:3000/api/reset", { method: "GET" });

        await register(page, "John", "Doe", "test@bruhmail.org", "password123!");
        await page.goto("http://localhost:3000/flashcards");

        await expect(page).toHaveTitle(/Flash cards/);
        await expect(page.locator("text=New card")).toBeVisible();
        await expect(page.locator("text=No cards found.")).toBeVisible();
    });

    test("flash cards can be created and played", async ({ page }) => {
        // reset db
        await fetch("http://localhost:3000/api/reset", { method: "GET" });

        await register(page, "John", "Doe", "test@bruhmail.org", "password123!");
        await page.goto("http://localhost:3000/flashcards");

        await expect(page).toHaveTitle(/Flash cards/);
        await expect(page.locator("text=New card")).toBeVisible();
        await expect(page.locator("text=No cards found.")).toBeVisible();

        await expect(page.locator("input[name=flashcardsTopic]")).toBeVisible();
        await expect(page.locator("input[name=flashcardsAmount]")).toBeVisible();
        // await expect(page.locator("input[name=flashcardsDifficulty]")).toBeVisible();

        const startButton = page.locator("button", { hasText: "Start" });
        await expect(startButton).toBeVisible();

        await page.fill("input[name=flashcardsTopic]", "React types");
        await page.fill("input[name=flashcardsAmount]", "1");
        // can't test the difficulty easily because it's a dropdown menu, default is "easy"
        await startButton.click();

        // wait for the flash cards to load
        await page.waitForURL("http://localhost:3000/flashcards/play?session=**");

        // flash cards load
        await expect(page.locator("id=flashcard-0")).toBeVisible();
        await expect(page.locator("id=flashcard-1")).toBeVisible();
        await expect(page.locator("id=flashcard-2")).toBeVisible();

        // click each choice
        await page.locator("id=flashcard-0").click();
        await page.locator("id=flashcard-1").click();
        await page.locator("id=flashcard-2").click();

        // Check if "quiz complete" text appears after completing the quiz
        await expect(page.locator("text=Quiz complete")).toBeVisible();
    });

    test("flash cards history is displayed", async ({ page }) => {
        // no resetting db this time but login
        await login(page, "test@bruhmail.org", "password123!");
        await page.goto("http://localhost:3000/flashcards");

        await expect(page.locator("text=React types")).toBeVisible();
    });

    test("flash card history link works", async ({ page }) => {
        // no resetting db this time but login
        await login(page, "test@bruhmail.org", "password123!");
        await page.goto("http://localhost:3000/flashcards");

        await expect(page.locator("text=React types")).toBeVisible();
        await page.getByRole("button", { name: "Study" }).click();

        // wait for the flash cards to load
        await page.waitForURL("http://localhost:3000/flashcards/play?session=**");

        // flash cards load
        await expect(page.locator("id=flashcard-0")).toBeVisible();
        await expect(page.locator("id=flashcard-1")).toBeVisible();
        await expect(page.locator("id=flashcard-2")).toBeVisible();
    });

    test("flash card can be deleted", async ({ page }) => {
        // no resetting db this time but login
        await login(page, "test@bruhmail.org", "password123!");
        await page.goto("http://localhost:3000/flashcards");

        await expect(page.locator("text=React types")).toBeVisible();
        await page.getByRole("button", { name: "Open menu" }).click();
        await page.getByRole("menuitem", { name: "Delete" }).click();
        await page.getByRole("button", { name: "Delete" }).click();

        await expect(page.locator("text=No cards found.")).toBeVisible();
    });
});
