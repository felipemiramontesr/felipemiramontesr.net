/**
 * @fileoverview Cookie Consent Module.
 * Logic for initializing and handling the cookie consent banner.
 */

import { STORAGE_KEYS } from './modules/constants.js';

/**
 * Initializes the cookie banner if consent hasn't been granted.
 * @returns {void}
 */
export function initCookieBanner() {
  if (localStorage.getItem(STORAGE_KEYS.COOKIES) === 'true') {
    return;
  }

  // Check if we are already on the policy page
  const isOnPolicyPage = window.location.pathname.includes('cookies.html');

  const policyLink = isOnPolicyPage
    ? `<strong class="cookie-link">política de uso</strong>`
    : `<a href="cookies.html" class="cookie-link">política de uso</a>`;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-content">
      Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas mi ${policyLink}.
    </div>
    <button class="cookie-btn" id="acceptCookies">
      Entendido
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

// Auto-initialize when used as a standard script, but export for tests
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initCookieBanner);
}
