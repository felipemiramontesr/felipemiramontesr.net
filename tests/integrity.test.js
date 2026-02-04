import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

describe('Structural Integrity Tests', () => {
  // Read the REAL index.html file
  const htmlPath = path.resolve(__dirname, '../index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  it('should have exactly one <header class="hero">', () => {
    const headers = doc.querySelectorAll('header.hero');
    expect(headers.length).toBe(1);
  });

  it('should have exactly one <footer>', () => {
    const footers = doc.querySelectorAll('footer');
    expect(footers.length).toBe(1);
  });

  it('header.hero should be a direct child of body', () => {
    const header = doc.querySelector('header.hero');
    expect(header.parentElement.tagName).toBe('BODY');
  });

  it('should not have duplicate IDs', () => {
    const allElements = doc.querySelectorAll('[id]');
    const seenIds = new Set();
    const duplicates = [];

    allElements.forEach((el) => {
      const id = el.id;
      if (seenIds.has(id)) {
        duplicates.push(id);
      }
      seenIds.add(id);
    });

    expect(duplicates).toEqual([]);
  });

  it('should link to existing CSS files', () => {
    const links = doc.querySelectorAll('link[rel="stylesheet"]');
    links.forEach((link) => {
      let href = link.getAttribute('href');
      // Remove query params (e.g. ?v=v3005)
      href = href.split('?')[0];

      if (href.startsWith('http')) return; // Ignore external CDNs

      const fullPath = path.resolve(__dirname, '../', href);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  it('should link to existing JS module', () => {
    const script = doc.querySelector('script[type="module"][src^="assets/js/main.js"]');
    expect(script).not.toBeNull();

    let src = script.getAttribute('src');
    src = src.split('?')[0];
    const fullPath = path.resolve(__dirname, '../', src);
    expect(fs.existsSync(fullPath)).toBe(true);
  });
});
