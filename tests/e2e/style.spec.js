import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get absolute file URL
const getFileUrl = (filename) => {
  const absPath = path.resolve(process.cwd(), filename);
  return 'file:///' + absPath.replace(/\\/g, '/');
};

test.describe('Visual Style Checks', () => {
  test('Cookies Page: Light Mode Visuals', async ({ page }) => {
    // Set Viewport to Desktop (to see desktop controls)
    await page.setViewportSize({ width: 1600, height: 900 });

    // Go to Cookies Page
    await page.goto(getFileUrl('cookies.html'));

    // Toggle to Light Mode (Default is Dark)
    // We assume the button exists. Just click it.
    // However, if logic remembers theme in localStorage, we might be in Light already if persisted?
    // Let's force clear storage first or check class.

    // Clear storage to reset to Dark Default
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Click toggle to go Light
    // Logic: Desktop toggle might be hidden on mobile view, but tests run Desktop Chrome (1280px+) by default.
    // Toggle button is .theme-toggle-btn. There might be two (mobile/desktop).
    // Click the visible one.
    const toggle = page.locator('.theme-toggle-btn').first();
    await toggle.click();

    // Wait for animation/theme application
    await page.waitForTimeout(500);

    // Assert Body has .theme-light
    await expect(page.locator('body')).toHaveClass(/theme-light/);

    // CHECK 1: Cookie Banner Transparency
    const banner = page.locator('.cookie-banner');
    await expect(banner).toBeVisible();

    // Compute styles
    const bgColor = await banner.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // rgba(255, 255, 255, 0.35)
    // Browsers might return standard rgba format.
    console.log('Banner BG Color:', bgColor);
    // Flexible assertion (allow small float diffs if needed, or exact string)
    // Expect: rgba(255, 255, 255, 0.35)
    expect(bgColor).toBe('rgba(255, 255, 255, 0.35)');

    // CHECK 2: "Got it!" Button Text Color
    const btn = page.locator('#acceptCookies');
    const btnColor = await btn.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    console.log('Button Text Color:', btnColor);
    // Expect Black: rgb(0, 0, 0)
    expect(btnColor).toBe('rgb(0, 0, 0)');
  });
});
