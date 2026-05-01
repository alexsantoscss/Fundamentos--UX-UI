class InputField {
    constructor(config) {
        this.config = config;
        this.element = null;
        this.wrapper = null;
        this.input = null;
        this.label = null;
        this.charCount = null;
        this.feedback = new FeedbackMessage();
    }

    render() {
        const isTextarea = this.config.type === 'textarea';
        const inputTag = isTextarea ? 'textarea' : 'input';

        this.input = Utils.createElement(inputTag, {
            type: isTextarea ? undefined : (this.config.type || 'text'),
            className: 'input-field',
            id: this.config.id,
            name: this.config.name,
            placeholder: this.config.label,
            rows: isTextarea ? '4' : undefined
        });

        this.label = Utils.createElement('label', {
            className: 'input-label',
            htmlFor: this.config.id
        }, this.config.label);

        this.wrapper = Utils.createElement('div', {
            className: `input-wrapper ${isTextarea ? 'textarea-wrapper' : ''}`
        },
            this.input,
            this.label
        );

        if (this.config.showSuccessIcon !== false) {
            const successIcon = Utils.createElement('span', {
                className: 'input-icon success-icon'
            }, '✓');
            this.wrapper.appendChild(successIcon);
        }

        const errorIcon = Utils.createElement('span', {
            className: 'input-icon error-icon'
        }, '✕');
        this.wrapper.appendChild(errorIcon);

        if (this.config.maxLength) {
            this.input.setAttribute('maxlength', this.config.maxLength);
            this.charCount = Utils.createElement('span', { className: 'input-char-count' }, '0');
            this.wrapper.appendChild(this.charCount);
        }

        this.feedback.create();

        this.element = Utils.createElement('div', { className: 'form-group' },
            this.wrapper,
            this.feedback.element
        );

        this.bindEvents();

        return this.element;
    }

    bindEvents() {
        this.input.addEventListener('focus', () => {
            this.label.classList.add('floating');
        });

        this.input.addEventListener('blur', () => {
            if (this.input.value === '') {
                this.label.classList.remove('floating');
            }
        });

        if (this.config.mask) {
            this.config.mask(this.input);
        }

        if (this.config.validator) {
            const debouncedValidate = Utils.debounce(() => {
                const value = this.input.value;
                const result = this.config.validator(value);
                this.setValidationState(result);
                if (this.config.onValidate) {
                    this.config.onValidate(this.config.name, result);
                }
            }, 300);

            this.input.addEventListener('input', debouncedValidate);
            this.input.addEventListener('masked', debouncedValidate);
            this.input.addEventListener('blur', debouncedValidate);
        }

        if (this.charCount && this.config.maxLength) {
            this.input.addEventListener('input', () => {
                const length = this.input.value.length;
                this.charCount.textContent = `${length}/${this.config.maxLength}`;
                if (length >= this.config.maxLength * 0.9) {
                    this.charCount.classList.add('warning');
                } else {
                    this.charCount.classList.remove('warning');
                }
            });
        }
    }

    setValidationState(result) {
        this.wrapper.classList.remove('error', 'success');

        if (!result || result.valid === undefined) {
            this.feedback.hide();
            return;
        }

        if (result.valid) {
            this.wrapper.classList.add('success');
            this.feedback.show('success', result.message);
        } else {
            this.wrapper.classList.add('error');
            this.feedback.show('error', result.message);
        }
    }

    getValue() {
        return this.input ? this.input.value : '';
    }

    setValue(value) {
        if (this.input) {
            this.input.value = value;
            this.label.classList.add('floating');
        }
    }

    validate() {
        if (!this.config.validator) return { valid: true };
        const value = this.input.value;
        const result = this.config.validator(value);
        this.setValidationState(result);
        return result;
    }

    reset() {
        if (this.input) {
            this.input.value = '';
            this.label.classList.remove('floating');
        }
        this.wrapper.classList.remove('error', 'success');
        this.feedback.hide();
        if (this.charCount) {
            this.charCount.textContent = '0';
            this.charCount.classList.remove('warning');
        }
    }
}