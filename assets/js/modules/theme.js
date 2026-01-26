/**
 * @fileoverview Theme management module.
 * Handles Dark/Light mode switching and persistence.
 */

import { STORAGE_KEYS, UI_CONFIG } from './constants.js';

/**
 * Initializes the theme based on saved preferences.
 * @param {HTMLElement} body - The document body element.
 * @returns {void}
 */
export function initTheme(body) {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  if (saved === 'light') {
    body.classList.add('theme-light');
  }
}

/**
 * Toggles the application theme and saves the state.
 * @param {HTMLElement} body - The document body element.
 * @returns {string} The current theme ('light' or 'dark').
 */
export function toggleTheme(body) {
  body.classList.toggle('theme-light');
  const isLight = body.classList.contains('theme-light');
  const theme = isLight ? 'light' : 'dark';
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  return theme;
}

/**
 * Returns the appropriate label for the theme toggle button.
 * @param {boolean} isCurrentlyLight - Whether the light theme is active.
 * @returns {string} The localized label.
 */
export function getThemeLabel(isCurrentlyLight) {
  return isCurrentlyLight ? UI_CONFIG.THEME_LABELS.DARK : UI_CONFIG.THEME_LABELS.LIGHT;
}
