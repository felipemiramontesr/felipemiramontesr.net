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
  // initScrollReveal removed (unused)
  initDownloadMenu,
  initSkillsToggle,
} from './modules/ui.js';
import { initCookieBanner } from './cookies-core.js';
import './sw-reset.js';

import { initContactForm } from './modules/contact.js';

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
  // initScrollReveal(); // DISABLED: Load all content immediately

  // Debug Download Menu
  initDownloadMenu();

  // 4. Initialize Cookie Banner
  initCookieBanner();

  // 5. Initialize Contact Form
  initContactForm();

  // 6. Initialize ARCHON Dashboard Modal
  const viewBtn = document.getElementById('viewDashboardBtn');
  const modal = document.getElementById('archonModal');
  const closeBtn = document.getElementById('closeArchonModal');
  if (viewBtn && modal && closeBtn) {
    viewBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    });
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    });
  }
});
