import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initCookieBanner } from '../assets/js/cookies-core.js';
import { STORAGE_KEYS } from '../assets/js/modules/constants.js';

describe('Cookie Module', () => {
    beforeEach(() => {
        // Reset DOM and Mock localStorage
        document.body.innerHTML = '';
        vi.stubGlobal('localStorage', {
            getItem: vi.fn(),
            setItem: vi.fn(),
        });
    });

    it('should not show banner if already accepted', () => {
        localStorage.getItem.mockReturnValue('true');
        initCookieBanner();
        expect(document.querySelector('.cookie-banner')).toBeNull();
    });

    it('should show banner and handle acceptance', () => {
        localStorage.getItem.mockReturnValue(null);
        initCookieBanner();

        const banner = document.querySelector('.cookie-banner');
        expect(banner).not.toBeNull();

        const btn = banner.querySelector('#acceptCookies');
        btn.click();

        expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEYS.COOKIES, 'true');
    });
});
