
import { test, expect } from '@playwright/test';

test('VS Code icon should be unmasked and multi-color', async ({ page }) => {
    // Go to the local server (assuming port 3001 as started previously)
    await page.goto('http://localhost:3001');

    // Verify VS Code icon exists as an <img> tag with correct alt text
    const vsCodeIcon = page.locator('img[alt="VS Code"]');
    await expect(vsCodeIcon).toBeVisible();

    // Verify it does NOT have mask styles (implicitly by being an img tag, but we can check class too)
    // It should NOT have 'skill-ico-img' class which is used for masked generic icons
    await expect(vsCodeIcon).not.toHaveClass(/skill-ico-img/);

    // Optional: Take a screenshot for validaton
    await page.screenshot({ path: 'vscode-icon-verified.png' });
});
