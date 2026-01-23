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
 */

/** @type {Skill[]} */
export const SKILLS = [
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
