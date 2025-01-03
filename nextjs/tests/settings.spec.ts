import { test, expect } from "@playwright/test";
import { register, login } from "../test-helpers/misc";

test.describe("settings page", async () => {
    test("can change profile information", async ({ page }) => {
        // reset db
        await fetch("http://localhost:3000/api/reset", { method: "GET" });

        await register(page, "John", "Doe", "test@profile.org", "password123!");
        await page.goto("http://localhost:3000/settings");
        await expect(page).toHaveTitle("Settings - Study Tutor");

        await expect(page.locator("text=First Name")).toBeVisible();
        await expect(page.locator("text=Last Name")).toBeVisible();
        await expect(page.locator("text=Email")).toBeVisible();

        //Change name and email
        await page.fill('input[name="firstName"]', "Mike");
        await page.fill('input[name="lastName"]', "Sullivan");
        await page.fill('input[name="email"]', "mike@sullivan.com");

        await page.getByRole("button", { name: "Update Profile" }).click();

        await expect(page.locator('input[name="firstName"]')).toHaveValue("Mike");
        await expect(page.locator('input[name="lastName"]')).toHaveValue("Sullivan");
        await expect(page.locator('input[name="email"]')).toHaveValue("mike@sullivan.com");
    });

    test("can change password", async ({ page }) => {
        // reset db
        await fetch("http://localhost:3000/api/reset", { method: "GET" });

        await register(page, "John", "Doe", "test@password.org", "password123!");
        await page.goto("http://localhost:3000/settings");
        await expect(page).toHaveTitle("Settings - Study Tutor");

        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));

        await expect(page.locator("text=Current Password")).toBeVisible();
        await expect(page.locator("text=New Password")).toBeVisible();
        await expect(page.locator("text=Confirm Password")).toBeVisible();

        //Change password
        await page.fill('input[name="currentPassword"]', "password123!");
        await page.fill('input[name="newPassword"]', "newp123!");
        await page.fill('input[name="confirmedPassword"]', "newp123!");

        await page.getByRole("button", { name: "Change Password" }).click();
        await page.waitForSelector('button:has-text("Change Password")');

        //Check passwords fields are cleared
        await expect(page.locator('input[name="currentPassword"]')).toHaveValue("");
        await expect(page.locator('input[name="newPassword"]')).toHaveValue("");
        await expect(page.locator('input[name="confirmedPassword"]')).toHaveValue("");

        //Logout and login with new password
        await page.goto("http://localhost:3000/logout");
        await login(page, "test@password.org", "newp123!");
    });

    test("can change default cards", async ({ page }) => {
        // reset db
        await fetch("http://localhost:3000/api/reset", { method: "GET" });

        await register(page, "John", "Doe", "test@cards.org", "password123!");
        await page.goto("http://localhost:3000/settings");
        await expect(page).toHaveTitle("Settings - Study Tutor");

        await expect(page.locator("text=Default Amount of Flashcards")).toBeVisible();
        await expect(page.locator("text=Default Difficulty of FlashCards")).toBeVisible();

        //Decrease default amount of cards by one
        await page.getByRole("button", { name: "Decrease amount of cards" }).click();
        await expect(page.locator('input[name="cardsAmount"]')).toHaveValue("4");

        //Change default difficulty of cards
        await page.click("#difficulty");
        const options = page.locator('[role="option"]');
        await options.filter({ hasText: "Hard" }).click();
        await expect(page.locator("#difficulty")).toHaveText("Hard");

        await page.getByRole("button", { name: "Update Cards" }).click();

        //Check default amount of cards and difficulty are updated
        await page.reload();
        await expect(page.locator('input[name="cardsAmount"]')).toHaveValue("4");
        await expect(page.locator("#difficulty")).toHaveText("Hard");
    });
});
