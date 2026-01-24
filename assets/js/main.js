/**
 * @fileoverview Main entry point for the application.
 * Monolithic version for robust local/offline execution (No ES Modules).
 */

// ==========================
// 1. CONSTANTS (Inline)
// ==========================

const SKILLS = [
  { name: "PHP", url: "https://www.php.net/", si: "php", fallback: "fa-brands fa-php", rating: 5, color: "#777BB4" },
  { name: "MySQL", url: "https://www.mysql.com/", si: "mysql", fallback: "fa-solid fa-database", rating: 4, color: "#4479A1" },
  { name: "Node.js", url: "https://nodejs.org/", si: "nodedotjs", fallback: "fa-brands fa-node-js", rating: 3, color: "#339933" },
  { name: "REST", url: "https://restfulapi.net/", si: null, fallback: "fa-solid fa-gears", rating: 4, color: "#60A5FA" },
  { name: "JSON", url: "https://www.json.org/", si: "json", fallback: "fa-solid fa-code", rating: 5, color: "#000000" },
  { name: "YAML", url: "https://yaml.org/", si: "yaml", fallback: "fa-regular fa-file", rating: 4, color: "#CB171E" },
  { name: "Twig", url: "https://twig.symfony.com/", si: null, fallback: "fa-solid fa-code", rating: 5, color: "#999900" },
  { name: "Composer", url: "https://getcomposer.org/", si: "composer", fallback: "fa-solid fa-cube", rating: 4, color: "#885630" },
  { name: "Drush", url: "https://www.drush.org/", si: null, fallback: "fa-solid fa-terminal", rating: 4, color: "#0077C0" },
  { name: "JavaScript", url: "https://developer.mozilla.org/docs/Web/JavaScript", si: "javascript", fallback: "fa-brands fa-js", rating: 4, color: "#F7DF1E" },
  { name: "HTML", url: "https://developer.mozilla.org/docs/Web/HTML", si: "html5", fallback: "fa-brands fa-html5", rating: 5, color: "#E34F26" },
  { name: "CSS", url: "https://developer.mozilla.org/docs/Web/CSS", si: "css3", fallback: "fa-brands fa-css3-alt", rating: 4, color: "#1572B6" },
  { name: "SASS", url: "https://sass-lang.com/", si: "sass", fallback: "fa-brands fa-sass", rating: 4, color: "#CC6699" },
  { name: "Chart.js", url: "https://www.chartjs.org/", si: "chartdotjs", fallback: "fa-solid fa-chart-line", rating: 4, color: "#FF6384" },
  { name: "Linux", url: "https://www.linux.org/", si: "linux", fallback: "fa-brands fa-linux", rating: 4, color: "#FCC624" },
  { name: "Apache", url: "https://httpd.apache.org/", si: "apache", fallback: "fa-solid fa-server", rating: 4, color: "#D22128" },
  { name: "NVM", url: "https://github.com/nvm-sh/nvm", si: null, fallback: "fa-solid fa-screwdriver-wrench", rating: 3, color: "#22D3EE" },
  { name: "Gulp.js", url: "https://gulpjs.com/", si: "gulp", fallback: "fa-solid fa-wand-magic-sparkles", rating: 3, color: "#CF4647" },
  { name: "Drupal", url: "https://www.drupal.org/", si: "drupal", fallback: "fa-brands fa-drupal", rating: 5, color: "#0077C0" },
  { name: "Odoo", url: "https://www.odoo.com/", si: "odoo", fallback: "fa-solid fa-briefcase", rating: 4, color: "#875A7B" },
  { name: "Moodle", url: "https://moodle.org/", si: "moodle", fallback: "fa-solid fa-book-open", rating: 3, color: "#F98012" },
  { name: "PrestaShop", url: "https://prestashop.com/", si: "prestashop", fallback: "fa-solid fa-cart-shopping", rating: 3, color: "#DF0067" },
  { name: "VS Code", url: "https://code.visualstudio.com/", si: "visualstudiocode", fallback: "fa-solid fa-code", rating: 5, color: "#007ACC" },
  { name: "Trello", url: "https://trello.com/", si: "trello", fallback: "fa-brands fa-trello", rating: 4, color: "#0079BF" }
];

const STORAGE_KEYS = { THEME: 'cv_theme', COOKIES: 'cookieAdvice' };
const UI_CONFIG = { THEME_LABELS: { LIGHT: 'Light Theme', DARK: 'Dark Theme' } };

// ==========================
// 2. THEME MODULE (Inline)
// ==========================

function initTheme(body) {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  if (saved === 'light') body.classList.add('theme-light');
}

function toggleTheme(body) {
  body.classList.toggle('theme-light');
  const isLight = body.classList.contains('theme-light');
  localStorage.setItem(STORAGE_KEYS.THEME, isLight ? 'light' : 'dark');
  return isLight ? 'light' : 'dark';
}

function getThemeLabel(isCurrentlyLight) {
  return isCurrentlyLight ? UI_CONFIG.THEME_LABELS.DARK : UI_CONFIG.THEME_LABELS.LIGHT;
}

// ==========================
// 3. UI MODULE (Inline)
// ==========================

function renderSkillIcon(container, skill) {
  const iconColor = skill.color || 'var(--accent)';

  if (skill.si) {
    const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${skill.si}.svg`;
    const iconSpan = document.createElement('span');
    iconSpan.className = 'skill-ico-img';

    // Use mask to apply specific hex color to the monochromatic SVG
    iconSpan.style.maskImage = `url(${iconUrl})`;
    iconSpan.style.webkitMaskImage = `url(${iconUrl})`;
    iconSpan.style.maskRepeat = 'no-repeat';
    iconSpan.style.webkitMaskRepeat = 'no-repeat';
    iconSpan.style.maskSize = 'contain';
    iconSpan.style.webkitMaskSize = 'contain';
    iconSpan.style.maskPosition = 'center';
    iconSpan.style.webkitMaskPosition = 'center';
    iconSpan.style.backgroundColor = iconColor;

    iconSpan.setAttribute('aria-hidden', 'true');
    container.appendChild(iconSpan);
    return;
  }

  const i = document.createElement('i');
  i.className = skill.fallback || "fa-solid fa-code";
  i.style.color = iconColor;
  container.appendChild(i);
}

function generateStars(rating) {
  const starsDiv = document.createElement('div');
  starsDiv.className = 'skill-stars';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.className = 'fa-solid fa-star';
    if (i > rating) star.classList.add('star-empty');
    starsDiv.appendChild(star);
  }
  return starsDiv;
}

function toggleMenuState({ menu, toggle, chevron }, forceClose = false) {
  const isOpen = !forceClose && !menu.classList.contains('open');
  menu.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen.toString());
  chevron.className = isOpen ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';

  if (isOpen) {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        toggleMenuState({ menu, toggle, chevron }, true);
        window.removeEventListener('keydown', handleEscape);
      }
    };
    window.addEventListener('keydown', handleEscape);
  }
}

// ==========================
// 4. MAIN APP LOGIC
// ==========================

// Version logic (Desktop vs Mobile)
const themeBtns = document.querySelectorAll('.theme-toggle-btn');
if (themeBtns.length > 0) {
  const body = document.body;

  // Init state
  initTheme(body);

  const updateAllIcons = () => {
    const isLight = body.classList.contains('theme-light');
    themeBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) icon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    });
  };

  // Run init sync
  updateAllIcons();

  // Attach events to ALL found buttons
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleTheme(body);
      updateAllIcons();
    });
  });
}

// Year update
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString();

// Floating Menu
const downloadToggle = document.getElementById('downloadToggle');
const downloadMenu = document.getElementById('downloadMenu');
const downloadChevron = document.getElementById('downloadChevron');
const floatingWrap = document.querySelector('.floating-wrap');

if (downloadToggle && downloadMenu && downloadChevron && floatingWrap) {
  const menuElements = { menu: downloadMenu, toggle: downloadToggle, chevron: downloadChevron };
  downloadToggle.addEventListener('click', (e) => {
    if (e) e.preventDefault();
    toggleMenuState(menuElements);
  });
  document.addEventListener('click', (e) => {
    if (downloadMenu.classList.contains('open') && !floatingWrap.contains(e.target)) {
      toggleMenuState(menuElements, true);
    }
  });
}

// Skills Rendering (Robust)
const grid = document.getElementById('skillsGrid');
if (grid) {
  try {
    if (typeof SKILLS !== 'undefined' && Array.isArray(SKILLS) && SKILLS.length > 0) {
      grid.innerHTML = ''; // Clear container to prevent duplicates
      SKILLS.forEach((skill) => {
        const card = document.createElement('a');
        card.className = 'skill-card';
        card.href = skill.url;
        card.target = '_blank';
        card.rel = 'noopener';

        // V61 Interaction Data
        const yearsMap = { 5: '10+', 4: '8+', 3: '6+', 2: '4+', 1: '2+' };
        const years = yearsMap[skill.rating] || '1+';
        card.setAttribute('data-years', `${years} Years`);

        const iconBox = document.createElement('div');
        iconBox.className = 'skill-ico';
        renderSkillIcon(iconBox, skill);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'skill-info';

        const nameRow = document.createElement('div');
        nameRow.className = 'skill-name';
        nameRow.innerHTML = `<span>${skill.name}</span><i class="fa-solid fa-arrow-up-right-from-square skill-link-ico"></i>`;

        infoDiv.appendChild(nameRow);
        infoDiv.appendChild(generateStars(skill.rating));

        card.appendChild(iconBox);
        card.appendChild(infoDiv);
        grid.appendChild(card);
      });
      console.log('Skills rendered successfully (Monolith):', SKILLS.length);
    } else {
      console.error('SKILLS data missing in Monolith');
    }
  } catch (err) {
    console.error('Error rendering skills:', err);
  }
}

// ==========================
// 5. COOKIE MODULE (Inline)
// ==========================

function initCookieBanner() {
  if (localStorage.getItem(STORAGE_KEYS.COOKIES) === 'true') return;

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

  document.body.appendChild(banner);

  const btn = banner.querySelector('#acceptCookies');
  if (btn) {
    btn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEYS.COOKIES, 'true');
      banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(10px)';
      setTimeout(() => banner.remove(), 300);
    });
  }
}

// Auto-init cookies
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initCookieBanner);
}
