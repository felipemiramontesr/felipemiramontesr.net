/**
 * @fileoverview UI and DOM manipulation module.
 * Handles rendering of dynamic components like skills and menus.
 */

/**
 * Renders a skill icon with fallback logic.
 * @param {HTMLElement} container - The icon container element.
 * @param {Object} skill - The skill object from SKILLS constant.
 * @returns {void}
 */
export function renderSkillIcon(container, skill) {
    const iconColor = skill.color || 'var(--accent)';

    if (skill.si) {
        const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${skill.si}.svg`;
        const iconSpan = document.createElement('span');
        iconSpan.className = 'skill-ico-img';

        // Use mask to apply specific hex color to the monochromatic SVG
        iconSpan.style.maskImage = `url(${iconUrl})`;
        iconSpan.style.webkitMaskImage = `url(${iconUrl})`;
        iconSpan.style.maskRepeat = 'no-repeat';
        iconSpan.style.webkitMaskRepeat = 'no-repeat';
        iconSpan.style.maskSize = 'contain';
        iconSpan.style.webkitMaskSize = 'contain';
        iconSpan.style.maskPosition = 'center';
        iconSpan.style.webkitMaskPosition = 'center';
        iconSpan.style.backgroundColor = iconColor;

        iconSpan.setAttribute('aria-hidden', 'true');

        // Fallback icon logic if needed
        container.appendChild(iconSpan);
        return;
    }

    const i = document.createElement('i');
    i.className = skill.fallback || "fa-solid fa-code";
    i.style.color = iconColor;
    container.appendChild(i);
}

/**
 * Generates the star rating HTML for a skill.
 * @param {number} rating - Proficiency level from 1 to 5.
 * @returns {HTMLElement} Container with star icons.
 */
export function generateStars(rating) {
    const starsDiv = document.createElement('div');
    starsDiv.className = 'skill-stars';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.className = 'fa-solid fa-star';
        if (i > rating) {
            star.classList.add('star-empty');
        }
        starsDiv.appendChild(star);
    }
    return starsDiv;
}

/**
 * Converts a star rating (1-5) to an experience years string (e.g., '10+').
 * @param {number} rating - Proficiency level from 1 to 5.
 * @returns {string} - The experience string (e.g. '10+', '8+', '2+').
 */
export function getExperienceYears(rating) {
    const yearsMap = { 5: '10+', 4: '8+', 3: '6+', 2: '4+', 1: '2+' };
    return yearsMap[rating] || '1+';
}

/**
 * Toggles a menu state in the UI.
 * @param {Object} elements - UI elements as an object.
 * @param {HTMLElement} elements.menu - The menu container.
 * @param {HTMLElement} elements.toggle - The toggle button.
 * @param {HTMLElement} elements.chevron - The chevron icon.
 * @param {boolean} forceClose - If true, force closes the menu.
 * @returns {void}
 */
export function toggleMenuState({ menu, toggle, chevron }, forceClose = false) {
    const isOpen = !forceClose && !menu.classList.contains('open');

    menu.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen.toString());
    chevron.className = isOpen ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';

    if (isOpen) {
        /**
         * Closes menu on Escape key.
         * @param {KeyboardEvent} e 
         */
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                toggleMenuState({ menu, toggle, chevron }, true);
                window.removeEventListener('keydown', handleEscape);
            }
        };
        window.addEventListener('keydown', handleEscape);
    }
}
