import { describe, it, expect, beforeEach } from 'vitest';
import { generateStars } from '../assets/js/modules/ui.js';

describe('UI Module', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

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
