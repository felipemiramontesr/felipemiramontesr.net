import { test, expect } from '@playwright/test';

test.describe('Cookie Banner Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate first to establish origin
    await page.goto('/');

    // Then clear state
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    // Reload to ensure clean state
    await page.reload();
  });

  test('Banner should be visible and have correct styles', async ({ page }) => {
    const banner = page.locator('.cookie-banner');
    await expect(banner).toBeVisible();

    // Check Accept Button (Cyan)
    const acceptBtn = page.locator('#acceptCookies');
    await expect(acceptBtn).toHaveText(/Accept|Aceptar/);
    await expect(acceptBtn).toHaveCSS('background-color', 'rgb(34, 211, 238)'); // Cyan #22d3ee

    // Check Reject Button (Red)
    const rejectBtn = page.locator('#rejectCookies');
    await expect(rejectBtn).toHaveText(/Reject|Rechazar/);
    await expect(rejectBtn).toHaveCSS('background-color', 'rgb(239, 68, 68)'); // Red #ef4444

    // Check Privacy Link (Cyan, No Underline)
    const link = page.locator('.cookie-banner a');
    await expect(link).toHaveCSS('color', 'rgb(34, 211, 238)');
    await expect(link).toHaveCSS('text-decoration-line', 'none');
  });

  test('Rejecting cookies should hide banner and save preference', async ({ page }) => {
    // Click Reject
    await page.locator('#rejectCookies').click({ force: true });

    // Banner should fade out
    await expect(page.locator('.cookie-banner')).not.toBeVisible();

    // Reload to verify persistence
    await page.reload();
    await expect(page.locator('.cookie-banner')).not.toBeVisible();

    // Check localStorage
    const stored = await page.evaluate(() => localStorage.getItem('cookieAdvice'));
    expect(stored).toBe('false');
  });

  test('Accepting cookies should hide banner and save preference', async ({ page }) => {
    // Click Accept
    await page.locator('#acceptCookies').click({ force: true });

    // Banner should fade out
    await expect(page.locator('.cookie-banner')).not.toBeVisible();

    // Check localStorage
    const stored = await page.evaluate(() => localStorage.getItem('cookieAdvice'));
    expect(stored).toBe('true');
  });
});
