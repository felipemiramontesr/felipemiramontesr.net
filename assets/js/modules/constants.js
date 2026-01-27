/** @type {Skill[]} */
export const SKILLS = [
  {
    name: 'PHP',
    url: 'https://www.php.net/',
    si: 'php',
    fallback: 'fa-brands fa-php',
    rating: 5,
    color: '#777BB4',
  },
  {
    name: 'MySQL',
    url: 'https://www.mysql.com/',
    si: 'mysql',
    fallback: 'fa-solid fa-database',
    rating: 4,
    color: '#4479A1',
  },
  {
    name: 'Node.js',
    url: 'https://nodejs.org/',
    si: 'nodedotjs',
    fallback: 'fa-brands fa-node-js',
    rating: 3,
    color: '#339933',
  },
  {
    name: 'REST',
    url: 'https://restfulapi.net/',
    si: null,
    fallback: 'fa-solid fa-gears',
    rating: 4,
    color: '#60A5FA',
  },
  {
    name: 'JSON',
    url: 'https://www.json.org/',
    si: 'json',
    fallback: 'fa-solid fa-code',
    rating: 5,
    color: '#000000',
  },
  {
    name: 'YAML',
    url: 'https://yaml.org/',
    si: 'yaml',
    fallback: 'fa-regular fa-file',
    rating: 4,
    color: '#CB171E',
  },
  {
    name: 'Twig',
    url: 'https://twig.symfony.com/',
    si: null,
    localIcon:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTTQuNTc0LDUuNDYzYy4yNjIuNCwyLjUtMS42MDgsNC40NTQtMS4xNjEsMi4wNjEuNDcyLDQuMDE0LDMuNzI0LDQuODQ4LDEzLjdhNDAuMTgsNDAuMTgsMCwwLDEsMy41NDEsMy42MXEuNTMuNjE0LDEuMDEzLDEuMjJhMTEuODQ3LDExLjg0NywwLDAsMSwuMjI5LTEuNCwxMi4zLDEyLjMsMCwwLDEsMS45ODEtNC40QTE5LjE1MSwxOS4xNTEsMCwwLDAsMTcuMjcyLDcuOWMtMS4wMy0xLjQ0NS00LjYtNi40NzgtOC41NDYtNS44NDNDNi4xODIsMi40NjUsNC4zLDUuMDU0LDQuNTc0LDUuNDYzWiIgZmlsbD0iIzYzYmY2YSIvPjxwYXRoIGQ9Ik0yNC40LDMwYy0uMzItMi41NjctLjQ0OC00Ljc2LS41LTYuNDQ5LS4wOTQtMy4yMzIuMS00LjU0MS45LTUuNzU2LjE5My0uMjk1LDEuMjg4LTEuOTc1LDIuNTgtMS44NjMsMS40NjYuMTI4LDIuMjEzLDIuNDE0LDIuMzYyLDIuMzM3LjE3NS0uMDktLjM2LTMuNTQzLTIuNTMyLTQuNDMxLTIuNi0xLjA2My02LjMxMiwyLjA3LTcuOCw1LjE1NGExMi4yMjMsMTIuMjIzLDAsMCwwLS44NTcsMi44MSwzMi41NTUsMzIuNTU1LDAsMCwwLS43MSw4LjJaIiBmaWxsPSIjNzRkNzRkIi8+PHBhdGggZD0iTTIuMjM4LDEzLjkzNWMuMTQ1LS40NDcsMi40NjgtLjI1OSw0LjU0LjI5MywyLjUsLjY2Niw3LDIuMzQ0LDExLjY1MSw4LjYwNkExMi41NDQsMTIuNTQ0LDAsMCwxLDIwLjI3OSwzMEgxMC4zODZhMjEuODc1LDIxLjg3NSwwLDAsMC0uMTc1LTQuNjIsMTQuOSwxNC45LDAsMCwwLTIuNDU5LTcuMTU4QzUuNDQxLDE1LjE1OSwyLjA1NSwxNC41LDIuMjM4LDEzLjkzNVoiIGZpbGw9IiM3OGRjNTAiLz48Y2lyY2xlIGN4PSIxNS41IiBjeT0iMjEuMyIgcj0iMS44IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMjAuMiIgY3k9IjIxLjMiIHI9IjEuOCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
    unmasked: true,
    fallback: 'fa-solid fa-code',
    rating: 5,
    color: '#999900',
  },
  {
    name: 'Composer',
    url: 'https://getcomposer.org/',
    si: 'composer',
    fallback: 'fa-solid fa-cube',
    rating: 4,
    color: '#885630',
  },
  {
    name: 'Drush',
    url: 'https://www.drush.org/',
    si: null,
    localIcon:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtbGFiZWw9IkRydXBhbCIgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0iIzAwNTk4ZSIgZD0iTTM4MyAxNTJhMTc1IDE3NSAwIDEgMS0yODEgMjAzIi8+PHBhdGggZmlsbD0iIzAwNzNiYSIgZD0iTTI0MyA5N3YtNDljMjYgMzEgNDAgNDcgODQgNjVjMjEgOSA0MCAyMSA1NiAzOGMxOSAyNSAyNyA5Ny05MSAxNjZzLTE1NSA3Mi0xOTAgMzhjLTQ0LTc5LTgtMTU5IDktMTgxIi8+PHBhdGggZmlsbD0iIzkzYzVlNCIgZD0iTTEyMiAxNjFjLTcxIDEwMiAxNDYtMjggMTE1LTU5IDI0LTE2IDYtNTIgNi01MlY4NiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMjEgMTA0YzQyIDctMTA0IDEwNS0xMDUgNzUgMC0xNSAyMy0zOCA0MC01MHM4Ny0yOSA4Ni03OUMyNDIgNTAgMjY2IDg4IDIyMSAxMDRtMSAxNzFjLTcwIDAtMTAwIDEwNi0xMCAxMDYgMzYgMCA4Ni00NyAxMTAtNDdzNDUgNDUgNjIgNDVjMzIgMCA1OC05NyAxMi05Ny0xOSAwLTU5IDQwLTc1IDM4QzI5MiAzMTYgMjY1IDI3NSAyMjIgMjc1bTIwIDE0MmMyNSAxOSA3OSAxNCAxMDMtNCA2LTUgMy0xNC0zLTktMTcgMTQtNzQgMTgtOTIgMkMyNDUgNDAxIDIzMSA0MDkgMjQyIDQxN200Mi0zMmM2LTUgMTEtMTMgMjYtMTNzMjAgMTEgMjMgMTQgOS0yIDYtOC02LTE3LTI4LTE3LTMwIDE0LTM0IDE3UzI3NSAzOTIgMjg0IDM4NSIvPjxwYXRoIHN0cm9rZT0iIzAwNDk3NSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSI0IiBkPSJNMTg2IDExM2MzMS0xNSA1My0yNCA1Ny02NSAyNiAzMSA0MCA0NyA4NCA2NWExNzUgMTc1IDAgMSAxLTE0MSAwIi8+PC9zdmc+',
    unmasked: true,
    fallback: 'fa-solid fa-terminal',
    rating: 4,
    color: '#0077C0',
  },
  {
    name: 'JavaScript',
    url: 'https://developer.mozilla.org/docs/Web/JavaScript',
    si: 'javascript',
    fallback: 'fa-brands fa-js',
    rating: 4,
    color: '#F7DF1E',
  },
  {
    name: 'HTML',
    url: 'https://developer.mozilla.org/docs/Web/HTML',
    si: 'html5',
    fallback: 'fa-brands fa-html5',
    rating: 5,
    color: '#E34F26',
  },
  {
    name: 'CSS',
    url: 'https://developer.mozilla.org/docs/Web/CSS',
    si: 'css3',
    fallback: 'fa-brands fa-css3-alt',
    rating: 4,
    color: '#1572B6',
  },
  {
    name: 'SASS',
    url: 'https://sass-lang.com/',
    si: 'sass',
    fallback: 'fa-brands fa-sass',
    rating: 4,
    color: '#CC6699',
  },
  {
    name: 'Chart.js',
    url: 'https://www.chartjs.org/',
    si: 'chartdotjs',
    fallback: 'fa-solid fa-chart-line',
    rating: 4,
    color: '#FF6384',
  },
  {
    name: 'Linux',
    url: 'https://www.linux.org/',
    si: 'linux',
    fallback: 'fa-brands fa-linux',
    rating: 4,
    color: '#000000',
  },
  {
    name: 'Apache',
    url: 'https://httpd.apache.org/',
    si: 'apache',
    fallback: 'fa-solid fa-server',
    rating: 4,
    color: '#D22128',
  },
  {
    name: 'NVM',
    url: 'https://github.com/nvm-sh/nvm',
    si: null,
    fallback: 'fa-solid fa-screwdriver-wrench',
    rating: 3,
    color: '#22D3EE',
  },
  {
    name: 'Gulp.js',
    url: 'https://gulpjs.com/',
    si: 'gulp',
    fallback: 'fa-solid fa-wand-magic-sparkles',
    rating: 3,
    color: '#CF4647',
  },
  {
    name: 'Drupal',
    url: 'https://www.drupal.org/',
    si: 'drupal',
    fallback: 'fa-brands fa-drupal',
    rating: 5,
    color: '#0077C0',
  },
  {
    name: 'Odoo',
    url: 'https://www.odoo.com/',
    si: 'odoo',
    fallback: 'fa-solid fa-briefcase',
    rating: 4,
    color: '#875A7B',
  },
  {
    name: 'Moodle',
    url: 'https://moodle.org/',
    si: 'moodle',
    fallback: 'fa-solid fa-book-open',
    rating: 3,
    color: '#F98012',
  },
  {
    name: 'PrestaShop',
    url: 'https://prestashop.com/',
    si: 'prestashop',
    fallback: 'fa-solid fa-cart-shopping',
    rating: 3,
    color: '#000000',
  },
  {
    name: 'VS Code',
    url: 'https://code.visualstudio.com/',
    si: null,
    localIcon:
      'data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjMuMTUgMi41ODdMMTguMjEuMjFhMS40OTQgMS40OTQgMCAwIDAtMS43MDUuMjlsLTkuNDYgOC42My00LjEyLTMuMTI4YS45OTkuOTk5IDAgMCAwLTEuMjc2LjA1N0wuMzU5IDcuMTY1YS45OTkuOTk5IDAgMCAwLS4wMTUgMS40MTNsNC4yMiA0LjIyLTQuMjIgNC4yMmEuOTk5Ljk5OSAwIDAgMCAuMDE1IDEuNDEzbDEuMjkgMS4wOTZhMSAxIDAgMCAwIDEuMjc0LjA1OGw0LjEyLTMuMTI4IDkuNDYgOC42M2ExLjQ5NCAxLjQ5NCAwIDAgMCAxLjcwNS4yOWw0Ljk0LTIuMzc3QTEuNSAxLjUgMCAwIDAgMjQgMjAuMDZWMy45MzlhMS41IDEuNSAwIDAgMC0uODUtMS4zNTJ6bS01LjE0NiAxNC44NTFMMTAuODU2IDEybDcuMTQ4LTUuNDM4djEwLjg3NXoiLz48L3N2Zz4=',
    fallback: 'fa-solid fa-code',
    rating: 5,
    color: '#007ACC',
  },
  {
    name: 'Trello',
    url: 'https://trello.com/',
    si: 'trello',
    fallback: 'fa-brands fa-trello',
    rating: 4,
    color: '#0079BF',
  },
];

/**
 * Storage keys for persistence.
 * @enum {string}
 */
export const STORAGE_KEYS = {
  THEME: 'cv_theme',
  COOKIES: 'cookieAdvice',
};

/**
 * UI labels and configuration.
 */
export const UI_CONFIG = {
  THEME_LABELS: {
    LIGHT: 'Light Theme',
    DARK: 'Dark Theme',
  },
};
