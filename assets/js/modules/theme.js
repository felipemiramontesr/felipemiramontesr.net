/**
 * @fileoverview Theme management module.
 * Handles Dark/Light mode switching and persistence.
 */

import { STORAGE_KEYS, UI_CONFIG } from './constants.js';

/**
 * Initializes the theme based on saved preferences and attaches listeners.
 * @param {HTMLElement} body - The document body element.
 * @returns {void}
 */
export function initTheme(body) {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  if (saved === 'light') {
    body.classList.add('theme-light');
    updateIcons(true);
  } else {
    updateIcons(false);
  }

  // Attach listeners to ALL toggle buttons (Desktop + Mobile)
  const btns = document.querySelectorAll('.theme-toggle-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleTheme(body);
    });
  });
}

/**
 * Toggles the application theme, saves state, and updates icons.
 * @param {HTMLElement} body - The document body element.
 * @returns {string} The current theme ('light' or 'dark').
 */
export function toggleTheme(body) {
  console.log('[DEBUG] toggleTheme CALLED');
  body.classList.toggle('theme-light');
  const isLight = body.classList.contains('theme-light');
  const theme = isLight ? 'light' : 'dark';

  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  updateIcons(isLight);

  return theme;
}

/**
 * Updates the icons of all theme toggle buttons.
 * @param {boolean} isLight - Whether light mode is active.
 */
function updateIcons(isLight) {
  const btns = document.querySelectorAll('.theme-toggle-btn i');
  btns.forEach(icon => {
    if (isLight) {
      icon.classList.replace('fa-sun', 'fa-moon');
    } else {
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  });

  const btnElements = document.querySelectorAll('.theme-toggle-btn');
  btnElements.forEach(btn => {
    btn.setAttribute('aria-label', isLight ? UI_CONFIG.THEME_LABELS.DARK : UI_CONFIG.THEME_LABELS.LIGHT);
  });
}

/**
 * Returns the appropriate label for the theme toggle button.
 * @param {boolean} isCurrentlyLight - Whether the light theme is active.
 * @returns {string} The localized label.
 */
export function getThemeLabel(isCurrentlyLight) {
  return isCurrentlyLight ? UI_CONFIG.THEME_LABELS.DARK : UI_CONFIG.THEME_LABELS.LIGHT;
}
