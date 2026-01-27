import { describe, it, expect, beforeEach } from 'vitest';
import { renderSkillIcon } from '../assets/js/modules/ui.js';

describe('Skill Icon Rendering Logic', () => {
  let container;

  beforeEach(() => {
    // Set up a clean DOM element for each test
    document.body.innerHTML = '<div id="icon-container"></div>';
    container = document.getElementById('icon-container');
  });

  it('renders a masked icon correctly when localIcon is present and unmasked is false', () => {
    const skill = {
      name: 'Test Skill',
      localIcon:
        'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMiAyTDQgNXY2YzAgNS4yNSAzLjUgMTAuMjUgOCAxMiA0LjUtMS43NSA4LTYuNzUgOC0xMlY1bC04LTN6Ii8+PC9zdmc+',
      color: '#FF0000',
    };

    renderSkillIcon(container, skill);

    const iconSpan = container.querySelector('.skill-ico-img');
    expect(iconSpan).not.toBeNull();
    expect(iconSpan.style.maskImage).toContain(
      'url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMiAyTDQgNXY2YzAgNS4yNSAzLjUgMTAuMjUgOCAxMiA0LjUtMS43NSA4LTYuNzUgOC0xMlY1bC04LTN6Ii8+PC9zdmc+)'
    );
    expect(iconSpan.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('renders a standard img tag when unmasked is true', () => {
    const skill = {
      name: 'Unmasked Skill',
      localIcon:
        'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMiAyTDQgNXY2YzAgNS4yNSAzLjUgMTAuMjUgOCAxMiA0LjUtMS43NSA4LTYuNzUgOC0xMlY1bC04LTN6Ii8+PC9zdmc+',
      unmasked: true,
    };

    renderSkillIcon(container, skill);

    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.src).toBe(skill.localIcon);
    expect(img.alt).toBe(skill.name);
  });
});
