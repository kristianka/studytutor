import { test, expect } from "@playwright/test";
import { register, login } from "../test-helpers/misc";

test.describe("authentication and authorization", async () => {
    test.beforeEach(async () => {
        await fetch("http://localhost:3000/api/reset", { method: "GET" });
    });

    test("can change profile information", async ({ page }) => {
        await register(page, "John", "Doe", "test@profile.org", "password123!");
        await page.goto("http://localhost:3000/logout");
        await login(page, "test@profile.org", "password123!");

        await page.goto("http://localhost:3000/settings");
        await expect(page).toHaveTitle("Settings - Study Tutor");

        await expect(page.getByLabel("First Name")).toBeVisible();
        await expect(page.getByLabel("Last Name")).toBeVisible();
        await expect(page.getByLabel("Email")).toBeVisible();

        // Change name and email
        await page.getByLabel("First Name").fill("Mike");
        await page.getByLabel("Last Name").fill("Sullivan");
        await page.getByLabel("Email").fill("mike@sullivan.com");

        await page.getByRole("button", { name: "Update Profile" }).click();

        //Check name and email are updated
        //await expect(page.getByLabel("First Name")).toHaveText("Mike");
        //await expect(page.getByLabel("Last Name")).toHaveText("Sullivan");
        //await expect(page.getByLabel("Email")).toHaveText("mike@sullivan.com");
    });
{/*
    test("can change password", async ({ page }) => {
        await register(page, "John", "Doe", "test@change.org", "password123!");
        await page.goto("http://localhost:3000/logout");
        await login(page, "test@change.org", "password123!");

        await page.goto("http://localhost:3000/settings");
        await expect(page).toHaveTitle("Settings - Study Tutor");

        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
        const currentPassVisible = await page.isVisible('label:has-text("Current Password")');
        expect(currentPassVisible).toBe(true);
        const newPassVisible = await page.isVisible('label:has-text("New Password")');
        expect(newPassVisible).toBe(true);
        const confirmPassVisible = await page.isVisible('label:has-text("Confirm Password")');
        expect(confirmPassVisible).toBe(true);
        await page.fill('input[name="currentPassword"]', "password123!");
        await page.fill('input[name="newPassword"]', "newp123!");
        await page.fill('input[name="confirmedPassword"]', "newp123!");

        await page.getByRole("button", { name: "Change Password" }).click();
        await page.waitForSelector('button:has-text("Change Password")');

        const currentPasswordValue = await page.inputValue('input[name="currentPassword"]');
        expect(currentPasswordValue).toBe("");
        const newPasswordValue = await page.inputValue('input[name="newPassword"]');
        expect(newPasswordValue).toBe("");
        const confirmPasswordValue = await page.inputValue('input[name="confirmedPassword"]');
        expect(confirmPasswordValue).toBe("");

        await page.goto("http://localhost:3000/logout");
        await login(page, "test@bruhmail.org", "newp123!");
    });
*/}
});
