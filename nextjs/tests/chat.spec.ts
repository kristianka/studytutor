import { test, expect, BrowserContext, Page } from "@playwright/test";
import { register, login } from "../test-helpers/misc";

let context: BrowserContext;
let page: Page;
let threadId: string;

test.describe("Chat Page", () => {
    test.beforeAll(async ({ browser }) => {
        await fetch("http://localhost:3000/api/reset", { method: "GET" });

        context = await browser.newContext();
        page = await context.newPage();

        await register(page, "John", "Doe", "test@bruhmail.org", "password123!");
        await page.goto("http://localhost:3000/logout");
        await login(page, "test@bruhmail.org", "password123!");

        await page.goto("http://localhost:3000/chat");
    });

    test.beforeEach(async () => {
        await page.goto("http://localhost:3000/chat");
    });

    test("should load the Chat page", async () => {
        await expect(page).toHaveURL("http://localhost:3000/chat");
        await expect(page.locator("text=New Thread")).toBeVisible();
    });

    test("should create a new thread and send a message", async () => {
        await page.click("text=New Thread");

        const newThread = page.locator("ul > li").first();
        await expect(newThread).toBeVisible();

        threadId = (await newThread.getAttribute("data-thread-id"))!;
        console.log(`Created thread ID: ${threadId}`);

        await newThread.click();

        await page.fill('textarea[name="message"]', "Hello, this is a test message.");

        await page.click('button:has-text("Send")');

        await expect(page.locator("text=Hello, this is a test message.")).toBeVisible();
    });

    test("should delete a thread", async () => {
        await page.click("text=New Thread");

        const newThread = page.locator("ul > li").first();
        await expect(newThread).toBeVisible();

        await newThread.locator('button:has-text("Delete")').click();

        const deleteConfirmation = page.locator("#confirm-delete-button");
        await expect(deleteConfirmation).toBeVisible();

        await deleteConfirmation.click();

        await page.waitForTimeout(1000);

        await expect(page.locator("ul > li").first()).not.toBeVisible();
    });

    test.afterAll(async () => {
        await fetch("http://localhost:3000/api/reset", { method: "GET" });

        await context.close();
    });
});
