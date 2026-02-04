import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { initCookieBanner } from '../assets/js/cookies-core.js';
import { STORAGE_KEYS } from '../assets/js/modules/constants.js';

describe('Cookie Consent Logic', () => {
  let dom;
  let document;

  beforeEach(() => {
    // Clear storage
    localStorage.clear();

    dom = new JSDOM(`<!DOCTYPE html><body></body>`, {
      url: 'http://localhost/',
    });

    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
    global.localStorage = {
      getItem: vi.fn((key) => dom.window.localStorage.getItem(key)),
      setItem: vi.fn((key, val) => dom.window.localStorage.setItem(key, val)),
      clear: vi.fn(() => dom.window.localStorage.clear())
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    initCookieBanner(); // Reset internal state if needed (module scope)
    document.body.innerHTML = '';
  });

  it('should display banner if no preference is stored', () => {
    initCookieBanner();
    const banner = document.querySelector('.cookie-banner');
    expect(banner).not.toBeNull();
    expect(banner.querySelector('#rejectCookies')).not.toBeNull(); // Check for reject button existence
  });

  it('should NOT display banner if accepted (true)', () => {
    localStorage.setItem(STORAGE_KEYS.COOKIES, 'true');
    initCookieBanner();
    const banner = document.querySelector('.cookie-banner');
    expect(banner).toBeNull();
  });

  it('should NOT display banner if rejected (false)', () => {
    localStorage.setItem(STORAGE_KEYS.COOKIES, 'false');
    initCookieBanner();
    const banner = document.querySelector('.cookie-banner');
    expect(banner).toBeNull();
  });

  it('should set storage to "true" on Accept', async () => {
    initCookieBanner();
    const btn = document.querySelector('#acceptCookies');
    btn.click();

    expect(global.localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEYS.COOKIES, 'true');

    // Check removal (transition delay)
    const banner = document.querySelector('.cookie-banner');
    expect(banner.style.opacity).toBe('0');
  });

  it('should set storage to "false" on Reject', () => {
    initCookieBanner();
    const btn = document.querySelector('#rejectCookies');
    btn.click();

    expect(global.localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEYS.COOKIES, 'false');
  });
});
