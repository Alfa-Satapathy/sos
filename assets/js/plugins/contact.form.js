(function () {
    'use strict';

    var form = document.getElementById('contact-form');
    var formMessages = document.getElementById('form-messages');

    if (!form || !formMessages) {
        return;
    }

    var submitButton = form.querySelector('button[type="submit"]');
    var defaultSuccessMessage = 'Thank you. Your message has been sent successfully.';
    var defaultErrorMessage = 'Your message could not be sent right now. Please try again.';

    function setMessage(type, message) {
        formMessages.classList.remove('success', 'error');
        formMessages.classList.add(type);
        formMessages.textContent = message;
    }

    function setSubmittingState(isSubmitting) {
        if (!submitButton) {
            return;
        }

        submitButton.disabled = isSubmitting;
        submitButton.setAttribute('aria-busy', String(isSubmitting));
    }

    function buildFormData() {
        return new FormData(form);
    }

    async function submitForm(event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setSubmittingState(true);
        setMessage('success', 'Sending your message...');

        try {
            var response = await fetch(form.action, {
                method: form.method || 'POST',
                body: buildFormData(),
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            var responseText = (await response.text()).trim();

            if (!response.ok) {
                throw new Error(responseText || defaultErrorMessage);
            }

            setMessage('success', responseText || defaultSuccessMessage);
            form.reset();
        } catch (error) {
            setMessage('error', error.message || defaultErrorMessage);
        } finally {
            setSubmittingState(false);
        }
    }

    form.addEventListener('submit', submitForm);
})();
