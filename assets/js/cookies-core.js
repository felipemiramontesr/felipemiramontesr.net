/**
 * @fileoverview Core logic for the cookie consent banner.
 * (ES Module Version)
 */

import { STORAGE_KEYS } from './modules/constants.js';

/**
 * Initializes the cookie banner if consent hasn't been granted.
 */
export function initCookieBanner() {
  // Check if ANY preference is stored (true=accepted, false=rejected)
  if (localStorage.getItem(STORAGE_KEYS.COOKIES)) {
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
        acceptBtn: `Aceptar`,
        rejectBtn: `Rechazar`,
      }
    : {
        policyLinkSelf: `this privacy policy`,
        policyLinkOther: `my <a href="cookies.html" class="cookie-link">privacy policy</a>`,
        message: `This website uses cookies to enhance your user experience. By continuing to browse, you agree to`,
        acceptBtn: `Accept`,
        rejectBtn: `Reject`,
      };

  // Determine correct link based on current page AND language context
  let policyLinkHTML = '';
  if (isOnPolicyPage) {
    policyLinkHTML = text.policyLinkSelf;
  } else {
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
    <div class="cookie-actions">
        <button class="cookie-btn cookie-reject" id="rejectCookies">
        ${text.rejectBtn}
        </button>
        <button class="cookie-btn cookie-accept" id="acceptCookies">
        ${text.acceptBtn}
        </button>
    </div>
  `;

  document.body.appendChild(banner);

  const acceptBtn = banner.querySelector('#acceptCookies');
  const rejectBtn = banner.querySelector('#rejectCookies');

  const closeBanner = () => {
    banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(10px)';
    setTimeout(() => banner.remove(), 300);
  };

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEYS.COOKIES, 'true');
      closeBanner();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEYS.COOKIES, 'false');
      closeBanner();
    });
  }
}
