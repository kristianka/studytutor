import { test, expect } from "@playwright/test";

test.describe("authentication and authorization", async () => {
    test("frontpage shows landing page, not dashboard", async ({ page }) => {
        await page.goto("http://localhost:3000");
        await expect(page).toHaveTitle(/Study Tutor/);
        await expect(page).not.toHaveTitle(/Flashcards/);
    });

    test("redirects to login page if not logged in", async ({ page }) => {
        await page.goto("http://localhost:3000/flashcards");
        await expect(page).toHaveTitle(/Login/);

        await page.goto("http://localhost:3000/chat");
        await expect(page).toHaveTitle(/Login/);
    });

    test("creates a new user", async ({ page }) => {
        await page.goto("http://localhost:3000/register");

        await expect(page).toHaveTitle(/Register/);

        // Check if the register form is present
        await expect(page.locator("form")).toBeVisible();
        await expect(page.locator("input[name=firstName]")).toBeVisible();
        await expect(page.locator("input[name=lastName]")).toBeVisible();
        await expect(page.locator("input[name=email]")).toBeVisible();
        await expect(page.locator("input[name=password]")).toBeVisible();

        // Check if the "Register" button is present
        const registerButton = page.locator("button", { hasText: "Create an account" });
        await expect(registerButton).toBeVisible();

        // register
        await page.fill("input[name=firstName]", "Your");
        await page.fill("input[name=lastName]", "Name");
        await page.fill("input[name=email]", "your-email@example.com");
        await page.fill("input[name=password]", "your-password");
        await registerButton.click();
    });

    test("flash cards is viewable after logging in", async ({ page }) => {
        await page.goto("http://localhost:3000/login");

        await expect(page).toHaveTitle(/Login/);

        // Check if the login form is present
        await expect(page.locator("form")).toBeVisible();
        await expect(page.locator("input[name=email]")).toBeVisible();
        await expect(page.locator("input[name=password]")).toBeVisible();

        // Check if the "Sign in" button is present
        const signInButton = page.locator("button", { hasText: "Sign in" });
        await expect(signInButton).toBeVisible();

        // login
        await page.fill("input[name=email]", "your-email@example.com");
        await page.fill("input[name=password]", "your-password");
        await signInButton.click();

        // click on the flashcards link
        await page.click("#flashcardsButton");

        await expect(page).toHaveTitle(/Flash cards/);
    });

    test("chat is viewable after logging in", async ({ page }) => {
        await page.goto("http://localhost:3000/login");

        await expect(page).toHaveTitle(/Login/);

        // Check if the login form is present
        await expect(page.locator("form")).toBeVisible();
        await expect(page.locator("input[name=email]")).toBeVisible();
        await expect(page.locator("input[name=password]")).toBeVisible();

        // Check if the "Sign in" button is present
        const signInButton = page.locator("button", { hasText: "Sign in" });
        await expect(signInButton).toBeVisible();

        // login
        await page.fill("input[name=email]", "your-email@example.com");
        await page.fill("input[name=password]", "your-password");
        await signInButton.click();

        // click on the flashcards link
        await page.click("#chatButton");

        await expect(page).toHaveTitle(/Chat/);
    });
});
