import { expect, Page } from "@playwright/test";

export const register = async (
    page: Page,
    firstName: string,
    lastName: string,
    email: string,
    password: string
) => {
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
    await page.fill("input[name=firstName]", firstName);
    await page.fill("input[name=lastName]", lastName);
    await page.fill("input[name=email]", email);
    await page.fill("input[name=password]", password);
    await registerButton.click();

    await expect(page.locator("#flashcardsButton")).toHaveCount(1);
    await expect(page.locator("#chatButton")).toHaveCount(1);
};

export const login = async (page: Page, email: string, password: string) => {
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
    await page.fill("input[name=email]", email);
    await page.fill("input[name=password]", password);
    await signInButton.click();

    await expect(page.locator("#flashcardsButton")).toHaveCount(1);
    await expect(page.locator("#chatButton")).toHaveCount(1);
};
