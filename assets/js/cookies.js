// Cookie Consent Logic
(function () {
  const STORAGE_KEY = 'cookieAdvice';

  function initCookieBanner() {
    // Check if already accepted
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      return;
    }

    // Create Banner Element
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas mi <a href="cookies.html" class="cookie-link">política de uso</a>.
      </div>
      <button class="cookie-btn" id="acceptCookies">
        Entendido
      </button>
    `;

    // Append to body
    document.body.appendChild(banner);

    // Event Listener
    const btn = banner.querySelector('#acceptCookies');
    btn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, 'true');

      // Animation out
      banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(10px)';

      setTimeout(() => {
        banner.remove();
      }, 300);
    });
  }

  // Run on load
  window.addEventListener('DOMContentLoaded', initCookieBanner);
})();
