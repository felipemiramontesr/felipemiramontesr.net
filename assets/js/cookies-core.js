/**
 * @fileoverview Core logic for the cookie consent banner.
 * (ES Module Version)
 */

import { STORAGE_KEYS } from './modules/constants.js';

/**
 * Initializes the cookie banner if consent hasn't been granted.
 */
export function initCookieBanner() {
  if (localStorage.getItem(STORAGE_KEYS.COOKIES) === 'true') {
    return;
  }

  // Check if we are already on the policy page (Robust check: URL OR Title)
  const urlCheck = window.location.href.toLowerCase().includes('cookies');
  const titleCheck = document.title && document.title.toLowerCase().includes('cookies');

  const isOnPolicyPage = urlCheck || titleCheck;

  console.log('[Cookies] Check. Page:', isOnPolicyPage);

  // V126: English Translation
  const policyLink = isOnPolicyPage
    ? `this privacy policy`
    : `my <a href="cookies.html" class="cookie-link">privacy policy</a>`;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-content">
      This website uses cookies to enhance your user experience. By continuing to browse, you agree to ${policyLink}.
    </div>
    <button class="cookie-btn" id="acceptCookies">
      Got it!
    </button>
  `;

  document.body.appendChild(banner);

  const btn = banner.querySelector('#acceptCookies');
  if (btn) {
    btn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEYS.COOKIES, 'true');

      banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(10px)';

      setTimeout(() => {
        banner.remove();
      }, 300);
    });
  }
}
