/**
 * @fileoverview Application constants and configuration data.
 * This module centralizes all data-driven configurations to follow the DRY principle.
 */

/**
 * Technical skills data with icons and proficiency levels.
 * @typedef {Object} Skill
 * @property {string} name - Name of the technology.
 * @property {string} url - Official or reference URL.
 * @property {string|null} si - Simple Icons slug.
 * @property {string} fallback - FontAwesome class for fallback.
 * @property {number} rating - Proficiency rating from 1 to 5.
 * @property {string} color - Brand color hex code.
 */

/** @type {Skill[]} */
export const SKILLS = [
    { name: "PHP", url: "https://www.php.net/", si: "php", fallback: "fa-brands fa-php", rating: 5, color: "#777BB4" },
    { name: "MySQL", url: "https://www.mysql.com/", si: "mysql", fallback: "fa-solid fa-database", rating: 4, color: "#4479A1" },
    { name: "Node.js", url: "https://nodejs.org/", si: "nodedotjs", fallback: "fa-brands fa-node-js", rating: 3, color: "#339933" },
    { name: "REST", url: "https://restfulapi.net/", si: null, fallback: "fa-solid fa-gears", rating: 4, color: "#60A5FA" },
    { name: "JSON", url: "https://www.json.org/", si: "json", fallback: "fa-solid fa-code", rating: 5, color: "#000000" },
    { name: "YAML", url: "https://yaml.org/", si: "yaml", fallback: "fa-regular fa-file", rating: 4, color: "#CB171E" },
    { name: "Twig", url: "https://twig.symfony.com/", si: "twig", fallback: "fa-solid fa-code", rating: 5, color: "#999900" },
    { name: "Composer", url: "https://getcomposer.org/", si: "composer", fallback: "fa-solid fa-cube", rating: 4, color: "#885630" },
    { name: "Drush", url: "https://www.drush.org/", si: "drush", fallback: "fa-solid fa-terminal", rating: 4, color: "#0077C0" },
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

/**
 * Storage keys for persistence.
 * @enum {string}
 */
export const STORAGE_KEYS = {
    THEME: 'cv_theme',
    COOKIES: 'cookieAdvice'
};

/**
 * UI labels and configuration.
 */
export const UI_CONFIG = {
    THEME_LABELS: {
        LIGHT: 'Light Theme',
        DARK: 'Dark Theme'
    }
};
