import { describe, it, expect, beforeEach } from 'vitest';

describe('Accessibility & Semantics (A11y)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main>
        <button id="themeToggle" aria-label="Cambiar tema">Tema</button>
        <button id="downloadToggle" aria-haspopup="true" aria-expanded="false">Descargar CV</button>
        <nav role="menu" id="downloadMenu" aria-label="Opciones de descarga">
           <a href="#" role="menuitem">PDF</a>
        </nav>
        <img src="test.jpg" alt="Profile" loading="lazy">
      </main>
    `;
  });

  it('should have critical ARIA labels', () => {
    const themeBtn = document.getElementById('themeToggle');
    expect(themeBtn.getAttribute('aria-label')).toBe('Cambiar tema');
  });

  it('should have correct semantic roles for interactive components', () => {
    const menu = document.getElementById('downloadMenu');
    expect(menu.getAttribute('role')).toBe('menu');

    const item = menu.querySelector('a');
    expect(item.getAttribute('role')).toBe('menuitem');
  });

  it('should use lazy loading for performance and A11y baseline', () => {
    const img = document.querySelector('img');
    expect(img.getAttribute('loading')).toBe('lazy');
  });
});
