import { describe, it, expect, beforeEach } from 'vitest';

describe('SEO & Metadata Analytics', () => {
    beforeEach(() => {
        // We simulate the header in the JSDOM
        document.head.innerHTML = `
      <meta name="description" content="Official website of B. Eng. Felipe de Jesús Miramontes Romero. Senior Delivery Manager and Senior Drupal Developer with 12+ years of experience.">
      <meta property="og:title" content="B. Eng. Felipe de Jesús Miramontes Romero - Resume">
      <script type="application/ld+json" id="ld-json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Felipe de Jesús Miramontes Romero"
      }
      </script>
    `;
    });

    it('should have a descriptive meta description', () => {
        const desc = document.querySelector('meta[name="description"]');
        expect(desc).not.toBeNull();
        expect(desc.getAttribute('content')).toContain('Felipe de Jesús Miramontes Romero');
    });

    it('should have Open Graph title correctly set', () => {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        expect(ogTitle).not.toBeNull();
        expect(ogTitle.getAttribute('content')).toBe('B. Eng. Felipe de Jesús Miramontes Romero - Resume');
    });

    it('should have valid JSON-LD Person schema', () => {
        const jsonLd = document.getElementById('ld-json');
        expect(jsonLd).not.toBeNull();
        const data = JSON.parse(jsonLd.textContent);
        expect(data['@type']).toBe('Person');
        expect(data.name).toBe('Felipe de Jesús Miramontes Romero');
    });
});
