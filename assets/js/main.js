/**
 * @fileoverview Main entry point for the application (Vite Module).
 *
 * REFACTOR NOTE (v170):
 * This file has been modernized to use ES Modules. It no longer contains
 * duplicated logic. It imports and initializes core modules.
 */

import { initTheme } from './modules/theme.js';
import {
  renderSkills,
  initScrollReveal,
  initDownloadMenu,
  initSkillsToggle,
} from './modules/ui.js';
import { initCookieBanner } from './cookies-core.js';
import './sw-reset.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme (Dark/Light)
  try {
    initTheme(document.body);
  } catch (e) {
    console.error('Theme Init Failed:', e);
  }

  // 2. Render Skills Grid
  // Check if element exists before rendering (exists on index, not always cookies)
  if (document.getElementById('skillsGrid')) {
    renderSkills();
    initSkillsToggle();
  }

  // 3. Initialize UI Interactions (Scroll Reveal, Download Menu)
  initScrollReveal();

  // Debug Download Menu
  initDownloadMenu();

  // 4. Initialize Cookie Banner
  initCookieBanner();
});
