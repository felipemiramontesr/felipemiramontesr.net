/**
 * @fileoverview Main entry point for the application.
 * Orchestrates module initialization and event handling.
 */

import { SKILLS } from './modules/constants.js';
import { initTheme, toggleTheme, getThemeLabel } from './modules/theme.js';
import { renderSkillIcon, generateStars, toggleMenuState } from './modules/ui.js';

console.error("App Version: v34 (STICKY FIX)");

// Theme Initialization & Event Handling
const themeToggleBtn = document.getElementById('themeToggle');
const yearSpan = document.getElementById('year');

if (themeToggleBtn) {
  initTheme(document.body);

  const updateLabel = () => {
    const label = themeToggleBtn.querySelector('span');
    if (label) {
      label.textContent = getThemeLabel(document.body.classList.contains('theme-light'));
    }
  };

  updateLabel();

  const handleThemeToggle = () => {
    toggleTheme(document.body);
    updateLabel();
  };

  themeToggleBtn.addEventListener('click', handleThemeToggle);
  themeToggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleThemeToggle();
    }
  });
}

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

// Download Floating Menu
const downloadToggle = document.getElementById('downloadToggle');
const downloadMenu = document.getElementById('downloadMenu');
const downloadChevron = document.getElementById('downloadChevron');
const floatingWrap = document.querySelector('.floating-wrap');

if (downloadToggle && downloadMenu && downloadChevron && floatingWrap) {
  const menuElements = { menu: downloadMenu, toggle: downloadToggle, chevron: downloadChevron };

  const handleDownloadToggle = (e) => {
    if (e) e.preventDefault();
    toggleMenuState(menuElements);
  };

  downloadToggle.addEventListener('click', handleDownloadToggle);
  downloadToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleDownloadToggle(e);
    }
  });

  document.addEventListener('click', (e) => {
    if (downloadMenu.classList.contains('open') && !floatingWrap.contains(e.target)) {
      toggleMenuState(menuElements, true);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenuState(menuElements, true);
  });
}

// Skills Grid Rendering
const grid = document.getElementById('skillsGrid');

if (grid) {
  SKILLS.forEach((skill) => {
    const card = document.createElement('a');
    card.className = 'skill-card';
    card.href = skill.url;
    card.target = '_blank';
    card.rel = 'noopener';

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
}
