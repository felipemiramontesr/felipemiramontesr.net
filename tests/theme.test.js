import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initTheme, toggleTheme, getThemeLabel } from '../assets/js/modules/theme.js';
import { STORAGE_KEYS, UI_CONFIG } from '../assets/js/modules/constants.js';

describe('Theme Module', () => {
    let body;

    beforeEach(() => {
        // Mocking localStorage
        vi.stubGlobal('localStorage', {
            getItem: vi.fn(),
            setItem: vi.fn(),
        });

        body = {
            classList: {
                add: vi.fn(),
                toggle: vi.fn(),
                contains: vi.fn(),
            }
        };
    });

    it('should initialize theme from localStorage', () => {
        localStorage.getItem.mockReturnValue('light');
        initTheme(body);
        expect(body.classList.add).toHaveBeenCalledWith('theme-light');
    });

    it('should toggle theme and save to localStorage', () => {
        body.classList.contains.mockReturnValue(true);
        const theme = toggleTheme(body);

        expect(body.classList.toggle).toHaveBeenCalledWith('theme-light');
        expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEYS.THEME, 'light');
        expect(theme).toBe('light');
    });

    it('should return correct theme labels', () => {
        expect(getThemeLabel(true)).toBe(UI_CONFIG.THEME_LABELS.DARK);
        expect(getThemeLabel(false)).toBe(UI_CONFIG.THEME_LABELS.LIGHT);
    });
});
