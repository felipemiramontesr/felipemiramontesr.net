// ==========================================
// V108: Module -> Standard Script Conversion
// (Required for local file:// testing)
// ==========================================

// Inline Constant (formerly imported)
const STORAGE_KEYS = {
  THEME: 'cv_theme',
  COOKIES: 'cookieAdvice'
};

/**
 * Initializes the cookie banner if consent hasn't been granted.
 * @returns {void}
 */
function initCookieBanner() {
  if (localStorage.getItem(STORAGE_KEYS.COOKIES) === 'true') {
    return;
  }

  // Check if we are already on the policy page (Robust check: URL OR Title)
  const urlCheck = window.location.href.toLowerCase().includes('cookies');
  const titleCheck = document.title && document.title.toLowerCase().includes('cookies');

  const isOnPolicyPage = urlCheck || titleCheck;

  console.log('[Cookies] V108 (Standard Script) Check. URL:', window.location.href, 'Title:', document.title, 'Detected:', isOnPolicyPage);

  // V109: Grammar fix ('mi' vs 'esta')
  const policyLink = isOnPolicyPage
    ? `esta política de uso`
    : `mi <a href="cookies.html" class="cookie-link">política de uso</a>`;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-content">
      Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas ${policyLink}.
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

// Auto-initialize logic
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initCookieBanner);
  } else {
    // DOM already ready
    initCookieBanner();
  }
}

// Export for Vitest/JEST (Conditional to not break browser)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { initCookieBanner };
}
