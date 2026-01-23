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
    if (skill.si) {
        const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${skill.si}.svg`;
        const img = document.createElement('img');
        img.src = iconUrl;
        img.alt = skill.name;
        img.className = 'skill-ico-img';
        img.setAttribute('aria-hidden', 'true');

        img.onerror = () => {
            container.innerHTML = '';
            const i = document.createElement('i');
            i.className = skill.fallback || "fa-solid fa-code";
            container.appendChild(i);
        };
        container.appendChild(img);
        return;
    }

    const i = document.createElement('i');
    i.className = skill.fallback || "fa-solid fa-code";
    i.style.color = 'var(--accent)';
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
}
