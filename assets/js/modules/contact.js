/**
 * @fileoverview Contact Form interactions.
 */

/**
 * Initializes the Contact Form section interactions.
 */
export function initContactForm() {
  const section = document.getElementById('contact');
  const toggle = document.getElementById('contactToggle');
  const content = document.getElementById('contactContent');
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const btn = document.getElementById('submitBtn');

  if (!section || !toggle || !content || !form) return;

  // 1. Toggle Logic
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    toggle.setAttribute('aria-expanded', nextState.toString());
    content.classList.toggle('open', nextState);
    section.classList.toggle('expanded', nextState);

    // Rotate chevron
    // Chevron rotation is handled by CSS (transform: rotate) based on aria-expanded
    // JS class swapping caused conflict. Removed.
  });

  // 2. Submit Logic
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset previous feedback
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    // Loading State
    btn.disabled = true;
    btn.classList.add('loading');
    const originalBtnText = btn.querySelector('.btn-text').textContent;
    btn.querySelector('.btn-text').textContent = 'Sending...';

    // Collect Data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/assets/php/send_mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        feedback.textContent = result.message || 'Message sent successfully!';
        feedback.classList.add('success');
        form.reset();

        // Close section after delay
        setTimeout(() => {
          if (toggle.getAttribute('aria-expanded') === 'true') {
            toggle.click();
          }
          feedback.textContent = '';
          feedback.classList.remove('success');
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Contact Form Error:', error);
      feedback.textContent = error.message || 'An error occurred. Please try again later.';
      feedback.classList.add('error');
    } finally {
      // Restore Button
      btn.disabled = false;
      btn.classList.remove('loading');
      btn.querySelector('.btn-text').textContent = originalBtnText;
    }
  });
}
