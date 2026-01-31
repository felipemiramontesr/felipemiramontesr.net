import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initSkillsToggle } from '../assets/js/modules/ui.js';

describe('Collapsible Skills UI Logic', () => {
  beforeEach(() => {
    // Setup minimal DOM for skills toggle
    document.body.innerHTML = `
      <div id="skills">
        <div id="skillsToggle" aria-expanded="false"></div>
        <div id="skillsContent"></div>
      </div>
    `;
  });

  it('should toggle aria-expanded attribute on click', () => {
    initSkillsToggle();
    const toggle = document.getElementById('skillsToggle');
    const section = document.getElementById('skills');

    // First click -> Expand
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(section.classList.contains('expanded')).toBe(true);

    // Second click -> Collapse
    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(section.classList.contains('expanded')).toBe(false);
  });

  it('should toggle "open" class on content on click', () => {
    initSkillsToggle();
    const toggle = document.getElementById('skillsToggle');
    const content = document.getElementById('skillsContent');

    toggle.click();
    expect(content.classList.contains('open')).toBe(true);

    toggle.click();
    expect(content.classList.contains('open')).toBe(false);
  });
});
