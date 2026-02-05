import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for fonts/images
    await page.waitForLoadState('networkidle');
  });

  test('Homepage Desktop', async ({ page }) => {
    // Force desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page).toHaveScreenshot('homepage-desktop.png');
  });

  test('Homepage Mobile', async ({ page }) => {
    // Force mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });

  test('Dark Mode Rendering', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    // Toggle to dark mode if not default, or verify default dark
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page).toHaveScreenshot('homepage-dark.png');
  });

  test('Critical Breakpoint: 1024px (Mobile/Tablet Max)', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await expect(page).toHaveScreenshot('homepage-1024px.png');
  });

  test('Critical Breakpoint: 1025px (Tablet Transition)', async ({ page }) => {
    await page.setViewportSize({ width: 1025, height: 800 });
    await expect(page).toHaveScreenshot('homepage-1025px.png');
  });

  test('Critical Breakpoint: 1510px (Mobile UI Max)', async ({ page }) => {
    await page.setViewportSize({ width: 1510, height: 800 });
    await expect(page).toHaveScreenshot('homepage-1510px.png');
  });

  test('Critical Breakpoint: 1511px (Desktop UI Start)', async ({ page }) => {
    await page.setViewportSize({ width: 1511, height: 800 });
    await expect(page).toHaveScreenshot('homepage-1511px.png');
  });
});
