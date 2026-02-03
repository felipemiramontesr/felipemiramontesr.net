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

  // V130: Bilingual Logic
  const isSpanish = document.documentElement.lang === 'es';

  const text = isSpanish
    ? {
      policyLinkSelf: `esta política de privacidad`,
      policyLinkOther: `mi <a href="../cookies.html" class="cookie-link">política de privacidad</a>`, // Access via relative path from /es/
      message: `Este sitio web utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas`,
      button: `¡Entendido!`,
    }
    : {
      policyLinkSelf: `this privacy policy`,
      policyLinkOther: `my <a href="cookies.html" class="cookie-link">privacy policy</a>`,
      message: `This website uses cookies to enhance your user experience. By continuing to browse, you agree to`,
      button: `Got it!`,
    };

  // Determine correct link based on current page AND language context
  let policyLinkHTML = '';
  if (isOnPolicyPage) {
    policyLinkHTML = text.policyLinkSelf;
  } else {
    // If we are in /es/, the link should point to ../cookies.html (which is the English one... wait, no).
    // If we are in /es/, we want to link to /es/cookies.html.
    // However, simplest way for consistent linking:
    // If isSpanish, assume we are in /es/ directory or want Spanish cookies.
    // If we are at root (en), we want "cookies.html".
    // If we are at /es/ (es), we want "cookies.html" (relative to /es/) OR "es/cookies.html" (relative to root).
    // Let's rely on relative paths or absolute.
    // Safer:
    const linkTarget = isSpanish ? 'cookies.html' : 'cookies.html';
    // If I am in /es/index.html, "cookies.html" resolves to /es/cookies.html. CORRECT.
    // If I am in /index.html, "cookies.html" resolves to /cookies.html. CORRECT.

    policyLinkHTML = isSpanish
      ? `mi <a href="cookies.html" class="cookie-link">política de privacidad</a>`
      : `my <a href="cookies.html" class="cookie-link">privacy policy</a>`;
  }

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-content">
      ${text.message} ${policyLinkHTML}.
    </div>
    <button class="cookie-btn" id="acceptCookies">
      ${text.button}
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
