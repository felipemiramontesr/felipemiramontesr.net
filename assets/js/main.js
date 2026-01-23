console.log("V26 - Deep Typography Cleanup");
// Tema (persistente)
(function () {
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  const key = 'cv_theme';

  // Default es Dark (sin clase). Si guardado es 'light', activamos modo claro.
  const saved = localStorage.getItem(key);
  if (saved === 'light') body.classList.add('theme-light');

  function syncThemeLabel() {
    const label = btn.querySelector('span');
    if (!label) return;
    // Si está en light, mostramos opción de ir a Dark.
    label.textContent = body.classList.contains('theme-light') ? 'Dark Theme' : 'Light Theme';
  }
  syncThemeLabel();

  btn.addEventListener('click', () => {
    body.classList.toggle('theme-light');
    const isLight = body.classList.contains('theme-light');
    localStorage.setItem(key, isLight ? 'light' : 'dark');
    syncThemeLabel();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();

// Menú flotante de descarga (solo escritorio; en móvil no aparece)
(function () {
  const toggle = document.getElementById('downloadToggle');
  const menu = document.getElementById('downloadMenu');
  const chev = document.getElementById('downloadChevron');
  const wrap = document.querySelector('.floating-wrap');

  if (!toggle || !menu || !chev || !wrap) return;

  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    chev.className = 'fa-solid fa-chevron-up';
  }
  function openMenu() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    chev.className = 'fa-solid fa-chevron-down';
  }

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (menu.classList.contains('open')) closeMenu();
    else openMenu();
  });

  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('open')) return;
    if (!wrap.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ==========================================================
   Skills: íconos garantizados
   - Prefiere Simple Icons (oficial).
   - Si no existe, usa FontAwesome (nunca queda vacío).
   ========================================================== */
(function () {
  const skills = [
    { name: "PHP", url: "https://www.php.net/", si: "php", fallback: "fa-brands fa-php", rating: 5 },
    { name: "MySQL", url: "https://www.mysql.com/", si: "mysql", fallback: "fa-solid fa-database", rating: 4 },
    { name: "Node.js", url: "https://nodejs.org/", si: "nodedotjs", fallback: "fa-brands fa-node-js", rating: 3 },
    { name: "REST", url: "https://restfulapi.net/", si: null, fallback: "fa-solid fa-gears", rating: 4 },
    { name: "JSON", url: "https://www.json.org/", si: "json", fallback: "fa-solid fa-code", rating: 5 },
    { name: "YAML", url: "https://yaml.org/", si: "yaml", fallback: "fa-regular fa-file", rating: 4 },
    { name: "Twig", url: "https://twig.symfony.com/", si: "twig", fallback: "fa-solid fa-code", rating: 5 },
    { name: "Composer", url: "https://getcomposer.org/", si: "composer", fallback: "fa-solid fa-cube", rating: 4 },
    { name: "Drush", url: "https://www.drush.org/", si: "drush", fallback: "fa-solid fa-terminal", rating: 4 },

    { name: "JavaScript", url: "https://developer.mozilla.org/docs/Web/JavaScript", si: "javascript", fallback: "fa-brands fa-js", rating: 4 },
    { name: "HTML", url: "https://developer.mozilla.com/docs/Web/HTML", si: "html5", fallback: "fa-brands fa-html5", rating: 5 },
    { name: "CSS", url: "https://developer.mozilla.org/docs/Web/CSS", si: "css3", fallback: "fa-brands fa-css3-alt", rating: 4 },
    { name: "SASS", url: "https://sass-lang.com/", si: "sass", fallback: "fa-brands fa-sass", rating: 4 },
    { name: "Chart.js", url: "https://www.chartjs.org/", si: "chartdotjs", fallback: "fa-solid fa-chart-line", rating: 4 },

    { name: "Linux", url: "https://www.linux.org/", si: "linux", fallback: "fa-brands fa-linux", rating: 4 },
    { name: "Apache", url: "https://httpd.apache.org/", si: "apache", fallback: "fa-solid fa-server", rating: 4 },
    { name: "NVM", url: "https://github.com/nvm-sh/nvm", si: null, fallback: "fa-solid fa-screwdriver-wrench", rating: 3 },

    { name: "Gulp.js", url: "https://gulpjs.com/", si: "gulp", fallback: "fa-solid fa-wand-magic-sparkles", rating: 3 },

    { name: "Drupal", url: "https://www.drupal.org/", si: "drupal", fallback: "fa-brands fa-drupal", rating: 5 },
    { name: "Odoo", url: "https://www.odoo.com/", si: "odoo", fallback: "fa-solid fa-briefcase", rating: 4 },
    { name: "Moodle", url: "https://moodle.org/", si: "moodle", fallback: "fa-solid fa-book-open", rating: 3 },
    { name: "PrestaShop", url: "https://prestashop.com/", si: "prestashop", fallback: "fa-solid fa-cart-shopping", rating: 3 },

    { name: "VS Code", url: "https://code.visualstudio.com/", si: "visualstudiocode", fallback: "fa-solid fa-code", rating: 5 },
    { name: "Trello", url: "https://trello.com/", si: "trello", fallback: "fa-brands fa-trello", rating: 4 }
  ];

  const grid = document.getElementById('skillsGrid');

  function renderIcon(container, skill) {
    if (skill.si) {
      // Mantenemos JSDeliver estático para evitar 404s del proxy.
      // El color se aplica vía filtro CSS (.skill-ico img) en style.css
      const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${skill.si}.svg`;
      const img = document.createElement('img');
      img.src = iconUrl;
      img.alt = skill.name;
      img.className = 'skill-ico-img';
      img.setAttribute('aria-hidden', 'true');

      img.onerror = () => {
        // Fallback total si JSDeliver fallara (extremadamente raro)
        container.innerHTML = '';
        const i = document.createElement('i');
        i.className = skill.fallback || "fa-solid fa-code";
        container.appendChild(i);
      };
      container.appendChild(img);
      return;
    }

    const i = document.createElement('i');
    i.className = skill.fallback || "fa-solid fa-code";
    i.style.color = 'var(--accent)';
    container.appendChild(i);
  }

  skills.forEach((s) => {
    const a = document.createElement('a');
    a.className = 'skill-card';
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener';

    const iconBox = document.createElement('div');
    iconBox.className = 'skill-ico';
    renderIcon(iconBox, s);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'skill-info';

    const nameRow = document.createElement('div');
    nameRow.className = 'skill-name';
    nameRow.innerHTML = `<span>${s.name}</span>`;

    // Star generation
    const starsDiv = document.createElement('div');
    starsDiv.className = 'skill-stars';
    const rating = s.rating || 0;
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('i');
      star.className = 'fa-solid fa-star';
      if (i > rating) {
        star.classList.add('star-empty');
      }
      starsDiv.appendChild(star);
    }

    infoDiv.appendChild(nameRow);
    infoDiv.appendChild(starsDiv);

    a.appendChild(iconBox);
    a.appendChild(infoDiv); // Changed structure slightly to group name and stars

    // Removed the arrow icon as it might clutter with stars, or I can add it back if needed.
    // The previous code had: <i class="fa-solid fa-arrow-up-right-from-square skill-link-ico"></i> in nameRow
    // I will add it back to nameRow to keep consistency but perhaps floating right.
    // Actually, looking at the previous code, it was inside nameRow.

    // Re-adding the link icon
    const linkIcon = document.createElement('i');
    linkIcon.className = 'fa-solid fa-arrow-up-right-from-square skill-link-ico';
    nameRow.appendChild(linkIcon);

    grid.appendChild(a);
  });
})();
