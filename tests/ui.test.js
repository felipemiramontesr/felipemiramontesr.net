import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateStars,
  toggleMenuState,
  renderSkillIcon,
  getExperienceYears,
} from '../assets/js/modules/ui.js';

describe('UI Module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('getExperienceYears', () => {
    it('should return correct years string for known ratings', () => {
      expect(getExperienceYears(5)).toBe('10+');
      expect(getExperienceYears(4)).toBe('8+');
      expect(getExperienceYears(3)).toBe('6+');
      expect(getExperienceYears(2)).toBe('4+');
      expect(getExperienceYears(1)).toBe('2+');
    });

    it('should return default 1+ for unknown ratings', () => {
      expect(getExperienceYears(0)).toBe('1+');
      expect(getExperienceYears(6)).toBe('1+');
      expect(getExperienceYears(undefined)).toBe('1+');
    });
  });

  describe('generateStars', () => {
    it('should generate correct number of stars', () => {
      const rating = 3;
      const starsDiv = generateStars(rating);

      const totalStars = starsDiv.querySelectorAll('.fa-star');
      const emptyStars = starsDiv.querySelectorAll('.star-empty');

      expect(totalStars.length).toBe(5);
      expect(emptyStars.length).toBe(2);
    });

    it('should generate all filled stars for rating 5', () => {
      const starsDiv = generateStars(5);
      const emptyStars = starsDiv.querySelectorAll('.star-empty');
      expect(emptyStars.length).toBe(0);
    });
  });

  describe('toggleMenuState', () => {
    it('should toggle menu classes and accessibility attributes', () => {
      const menu = document.createElement('div');
      const toggle = document.createElement('button');
      const chevron = document.createElement('i');

      const elements = { menu, toggle, chevron };

      // Initial state: closed -> Open
      toggleMenuState(elements);
      expect(menu.classList.contains('open')).toBe(true);
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      expect(chevron.className).toBe('fa-solid fa-chevron-down');

      // Toggle again: Open -> Close
      toggleMenuState(elements);
      expect(menu.classList.contains('open')).toBe(false);
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(chevron.className).toBe('fa-solid fa-chevron-up');
    });

    it('should force close the menu when flag is provided', () => {
      const menu = document.createElement('div');
      menu.classList.add('open');
      const toggle = document.createElement('button');
      const chevron = document.createElement('i');

      toggleMenuState({ menu, toggle, chevron }, true);
      expect(menu.classList.contains('open')).toBe(false);
    });
  });

  describe('renderSkillIcon', () => {
    it('should render a span with mask-image for simple-icons', () => {
      const container = document.createElement('div');
      const skill = { name: 'PHP', si: 'php' };

      renderSkillIcon(container, skill);
      const span = container.querySelector('.skill-ico-img');
      expect(span).not.toBeNull();
      // Check if maskImage style is set (handling jsdom potentially prefixes or standard)
      const style = span.style.maskImage || span.style.webkitMaskImage;
      expect(style).toContain('simple-icons');
    });

    it('should render font-awesome fallback if no simple-icon slug provided', () => {
      const container = document.createElement('div');
      const skill = { name: 'Custom', fallback: 'fa-solid fa-code' };

      renderSkillIcon(container, skill);
      const icon = container.querySelector('i');
      expect(icon).not.toBeNull();
      expect(icon.classList.contains('fa-code')).toBe(true);
    });
  });
});
