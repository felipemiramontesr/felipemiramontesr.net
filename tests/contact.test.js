import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { initContactForm } from '../assets/js/modules/contact.js';

describe('Contact Form Logic', () => {
    let dom;
    let document;
    let form;
    let feedback;
    let btn;
    let toggle;

    beforeEach(() => {
        dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en"> <!-- Default EN -->
      <body>
        <div id="contact" class="glass-card contact-section">
            <button id="contactToggle" aria-expanded="false"></button>
            <div id="contactContent">
                <form id="contactForm">
                    <input name="name" value="Test User" />
                    <button id="submitBtn" type="submit">
                        <span class="btn-text">Send Message</span>
                    </button>
                    <div id="formFeedback"></div>
                </form>
            </div>
        </div>
      </body>
      </html>
    `, { url: 'http://localhost/' });

        document = dom.window.document;
        global.document = document;
        global.window = dom.window;
        global.FormData = dom.window.FormData;

        // Element Refs
        form = document.getElementById('contactForm');
        feedback = document.getElementById('formFeedback');
        btn = document.getElementById('submitBtn');
        toggle = document.getElementById('contactToggle');

        // Mock Fetch
        global.fetch = vi.fn();

        // Init Logic
        initContactForm();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should show "Sending..." button state on submit (English)', async () => {
        // Mock successful response
        global.fetch.mockResolvedValue({
            json: () => Promise.resolve({ success: true, message: 'Server says OK' }),
        });

        // Detect state WHILE sending
        const submitPromise = new Promise(resolve => {
            form.addEventListener('submit', () => {
                // Immediate check after listener fires
                expect(btn.disabled).toBe(true);
                expect(btn.classList.contains('loading')).toBe(true);
                expect(document.querySelector('.btn-text').textContent).toBe('Sending...');
                resolve();
            });
        });

        form.dispatchEvent(new dom.window.Event('submit'));
        await submitPromise;
    });

    it('should translate feedback to Spanish if lang="es"', async () => {
        // Switch to Spanish
        document.documentElement.lang = 'es';

        global.fetch.mockResolvedValue({
            json: () => Promise.resolve({ success: true }), // Server msg ignored
        });

        await form.dispatchEvent(new dom.window.Event('submit'));

        // Wait for microtasks
        await new Promise(process.nextTick);

        expect(feedback.textContent).toBe('¡Mensaje enviado con éxito!');
        expect(feedback.classList.contains('success')).toBe(true);
    });

    it('should translate error message to Spanish if lang="es" and server fails', async () => {
        document.documentElement.lang = 'es';

        global.fetch.mockResolvedValue({
            json: () => Promise.resolve({ success: false }), // Logic throws local error
        });

        await form.dispatchEvent(new dom.window.Event('submit'));
        await new Promise(process.nextTick);

        expect(feedback.textContent).toBe('Error al enviar el mensaje. Inténtalo de nuevo.');
        expect(feedback.classList.contains('error')).toBe(true);
    });

    it('should prioritize local EN string over server string', async () => {
        // Default EN
        global.fetch.mockResolvedValue({
            json: () => Promise.resolve({ success: true, message: 'Server Hardcoded Message' }),
        });

        await form.dispatchEvent(new dom.window.Event('submit'));
        await new Promise(process.nextTick);

        expect(feedback.textContent).toBe('Message sent successfully!'); // Matches JS local string
        expect(btn.classList.contains('loading')).toBe(false);
    });
});
