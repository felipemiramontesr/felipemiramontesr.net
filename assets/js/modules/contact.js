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

  // 2. 2FA Modal Elements
  const tfaModal = document.getElementById('twoFactorModal');
  const tfaForm = document.getElementById('twoFactorForm');
  const tfaInput = document.getElementById('verificationCode');
  const tfaFeedback = document.getElementById('verificationFeedback');
  const tfaVerifyBtn = document.getElementById('verifyBtn');
  const tfaResendBtn = document.getElementById('resendCodeBtn');
  const tfaCloseBtn = document.getElementById('closeTwoFactorModal');
  const emailDisplay = document.getElementById('verificationEmailDisplay');
  const emailDisplayEs = document.getElementById('verificationEmailDisplayEs');

  let activeEmail = '';
  let activeFormData = null;
  let countdownInterval = null;

  function startCountdown() {
    if (!tfaResendBtn) return;
    tfaResendBtn.disabled = true;
    let secondsLeft = 30;
    const isSpanish = document.documentElement.lang === 'es';

    const textSpan = tfaResendBtn.querySelector('.btn-text');
    if (textSpan) {
      textSpan.textContent = isSpanish ? `Reenviar (${secondsLeft}s)` : `Resend (${secondsLeft}s)`;
    }

    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(countdownInterval);
        tfaResendBtn.disabled = false;
        if (textSpan) textSpan.textContent = isSpanish ? 'Reenviar' : 'Resend';
      } else {
        if (textSpan) {
          textSpan.textContent = isSpanish
            ? `Reenviar (${secondsLeft}s)`
            : `Resend (${secondsLeft}s)`;
        }
      }
    }, 1000);
  }

  // Restrict 2FA input to digits only
  if (tfaInput) {
    tfaInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  // Modal close interaction
  const closeTfaModal = () => {
    if (tfaModal) tfaModal.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (tfaInput) tfaInput.value = '';
    if (tfaFeedback) {
      tfaFeedback.className = 'form-feedback';
      tfaFeedback.textContent = '';
    }
    if (countdownInterval) clearInterval(countdownInterval);

    // Restore main submit button
    btn.disabled = false;
    btn.classList.remove('loading');
    const textSpan = btn.querySelector('.btn-text');
    if (textSpan) {
      textSpan.textContent =
        document.documentElement.lang === 'es' ? 'Enviar Mensaje' : 'Send Message';
    }
  };

  if (tfaCloseBtn) tfaCloseBtn.addEventListener('click', closeTfaModal);
  if (tfaModal) {
    tfaModal.addEventListener('click', (e) => {
      if (e.target === tfaModal) closeTfaModal();
    });
  }

  // 3. Submit Logic: Send Verification Code (or send mail directly if no modal in DOM)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    feedback.className = 'form-feedback';
    feedback.textContent = '';

    const isSpanish = document.documentElement.lang === 'es';
    const text = isSpanish
      ? {
          sending: tfaModal ? 'Enviando código...' : 'Enviando...',
          success: tfaModal ? 'Código enviado a tu correo.' : '¡Mensaje enviado con éxito!',
          error: tfaModal
            ? 'Error al enviar el código de verificación.'
            : 'Error al enviar el mensaje. Inténtalo de nuevo.',
        }
      : {
          sending: tfaModal ? 'Sending code...' : 'Sending...',
          success: tfaModal
            ? 'Verification code sent to your email.'
            : 'Message sent successfully!',
          error: tfaModal ? 'Failed to send verification code.' : 'Failed to send message.',
        };

    // Loading State
    btn.disabled = true;
    btn.classList.add('loading');
    const originalBtnText = btn.querySelector('.btn-text').textContent;
    btn.querySelector('.btn-text').textContent = text.sending;

    // Collect Data
    const formData = new FormData(form);
    activeFormData = Object.fromEntries(formData.entries());
    activeFormData.lang = isSpanish ? 'es' : 'en';
    activeEmail = activeFormData.email;

    // Direct submission fallback if there is no modal in the DOM (e.g. testing)
    if (!tfaModal) {
      try {
        const response = await fetch('/assets/php/send_mail.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(activeFormData),
        });

        const result = await response.json();

        if (result.success) {
          feedback.textContent = text.success;
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
          throw new Error(text.error);
        }
      } catch (error) {
        console.error('Contact Form Error:', error);
        feedback.textContent = error.message || text.error;
        feedback.classList.add('error');
      } finally {
        // Restore Button
        btn.disabled = false;
        btn.classList.remove('loading');
        btn.querySelector('.btn-text').textContent = originalBtnText;
      }
      return;
    }

    // Normal 2FA Flow
    try {
      const response = await fetch('/assets/php/send_code.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activeFormData),
      });

      const result = await response.json();

      if (result.success) {
        feedback.textContent = text.success;
        feedback.classList.add('success');

        // Open 2FA modal
        if (emailDisplay) emailDisplay.textContent = activeEmail;
        if (emailDisplayEs) emailDisplayEs.textContent = activeEmail;
        document.body.classList.toggle('lang-es', isSpanish);
        tfaModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        startCountdown();
        if (tfaInput) tfaInput.focus();
      } else {
        throw new Error(result.error || text.error);
      }
    } catch (error) {
      console.error('2FA Send Code Error:', error);
      feedback.textContent = error.message || text.error;
      feedback.classList.add('error');
      // Restore Button on error
      btn.disabled = false;
      btn.classList.remove('loading');
      btn.querySelector('.btn-text').textContent = originalBtnText;
    }
  });

  // 4. Verify Code Form Logic
  if (tfaForm) {
    tfaForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (tfaFeedback) {
        tfaFeedback.className = 'form-feedback';
        tfaFeedback.textContent = '';
      }

      const isSpanish = document.documentElement.lang === 'es';
      const text = isSpanish
        ? {
            verifying: 'Verificando...',
            success: '¡Mensaje verificado y enviado con éxito!',
            error: 'Código inválido o expirado.',
          }
        : {
            verifying: 'Verifying...',
            success: 'Message verified and sent successfully!',
            error: 'Invalid or expired code.',
          };

      if (tfaVerifyBtn) {
        tfaVerifyBtn.disabled = true;
        const textSpan = tfaVerifyBtn.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = text.verifying;
      }

      try {
        const response = await fetch('/assets/php/verify_code.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: activeEmail,
            code: tfaInput ? tfaInput.value : '',
            lang: isSpanish ? 'es' : 'en',
          }),
        });

        const result = await response.json();

        if (result.success) {
          if (tfaFeedback) {
            tfaFeedback.textContent = text.success;
            tfaFeedback.classList.add('success');
          }
          form.reset();

          setTimeout(() => {
            closeTfaModal();
            // Collapse contact section
            if (toggle.getAttribute('aria-expanded') === 'true') {
              toggle.click();
            }
            feedback.textContent = '';
            feedback.classList.remove('success');
          }, 2000);
        } else {
          throw new Error(result.error || text.error);
        }
      } catch (error) {
        console.error('2FA Verify Code Error:', error);
        if (tfaFeedback) {
          tfaFeedback.textContent = error.message || text.error;
          tfaFeedback.classList.add('error');
        }

        if (tfaVerifyBtn) {
          tfaVerifyBtn.disabled = false;
          const textSpan = tfaVerifyBtn.querySelector('.btn-text');
          if (textSpan) textSpan.textContent = isSpanish ? 'Verificar y Enviar' : 'Verify & Send';
        }
      }
    });
  }

  // 5. Resend Code Button Logic
  if (tfaResendBtn) {
    tfaResendBtn.addEventListener('click', async () => {
      if (!activeFormData) return;

      if (tfaFeedback) {
        tfaFeedback.className = 'form-feedback';
        tfaFeedback.textContent = '';
      }

      const isSpanish = document.documentElement.lang === 'es';
      const textSpan = tfaResendBtn.querySelector('.btn-text');
      const originalText = textSpan ? textSpan.textContent : '';
      if (textSpan) textSpan.textContent = isSpanish ? 'Reenviando...' : 'Resending...';
      tfaResendBtn.disabled = true;

      try {
        const response = await fetch('/assets/php/send_code.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(activeFormData),
        });

        const result = await response.json();

        if (result.success) {
          if (tfaFeedback) {
            tfaFeedback.textContent = isSpanish
              ? 'Código reenviado con éxito.'
              : 'Verification code resent.';
            tfaFeedback.classList.add('success');
          }
          startCountdown();
        } else {
          throw new Error(result.error || (isSpanish ? 'Error al reenviar.' : 'Failed to resend.'));
        }
      } catch (error) {
        if (tfaFeedback) {
          tfaFeedback.textContent = error.message;
          tfaFeedback.classList.add('error');
        }
        tfaResendBtn.disabled = false;
        if (textSpan) textSpan.textContent = originalText;
      }
    });
  }
}
