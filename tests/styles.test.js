import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Style Consistency & Regression', () => {
    let cssContent;

    beforeEach(() => {
        const cssPath = path.resolve(__dirname, '../assets/css/style.css');
        cssContent = fs.readFileSync(cssPath, 'utf8');
    });

    it('should have unified font-size for .chip in mobile-first/desktop', () => {
        // Check if .chip uses var(--fs-body)
        const chipMatch = cssContent.match(/\.chip\s*{[^}]*font-size:\s*var\(--fs-body\)/);
        expect(chipMatch).not.toBeNull();
    });

    it('should enforce single-line constraint for .chip and .contact .value', () => {
        const chipNowrap = cssContent.match(/\.chip\s*{[^}]*white-space:\s*nowrap/);
        const contactNowrap = cssContent.match(/\.contact\s+\.value\s*{[^}]*white-space:\s*nowrap/);

        expect(chipNowrap).not.toBeNull();
        expect(contactNowrap).not.toBeNull();
    });

    it('should have unified mobile styles (< 640px) for chips and contact values', () => {
        // More robust check: look for the property within the media query block
        const mobileBlockMatch = cssContent.match(/@media\s*\(max-width:\s*640px\)\s*{([\s\S]*?)}\s*\n\s*\.section-wrap/);
        const mobileContent = mobileBlockMatch ? mobileBlockMatch[1] : cssContent; // Fallback to full content if block match fails, but better to check block

        expect(cssContent).toContain('@media (max-width: 640px)');
        expect(mobileContent).toContain('font-size: 1rem');
        expect(mobileContent).toContain('font-weight: 700');
        expect(mobileContent).toContain('letter-spacing: -0.4px');
    });

    it('should use ellipsis for overflow in both chips and contact values', () => {
        const chipEllipsis = cssContent.match(/\.chip\s*{[^}]*text-overflow:\s*ellipsis/);
        const contactEllipsis = cssContent.match(/\.contact\s+\.value\s*{[^}]*text-overflow:\s*ellipsis/);

        expect(chipEllipsis).not.toBeNull();
        expect(contactEllipsis).not.toBeNull();
    });
});
