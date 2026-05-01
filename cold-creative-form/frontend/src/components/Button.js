class Button {
    constructor() {
        this.element = null;
        this.spinner = null;
        this.checkIcon = null;
        this.textSpan = null;
    }

    render(onClick) {
        this.spinner = Utils.createElement('span', { className: 'btn-spinner' });
        this.checkIcon = Utils.createElement('span', { className: 'btn-check' }, '✓');
        this.textSpan = Utils.createElement('span', { className: 'btn-text-submit' }, 'Enviar Mensagem');

        const content = Utils.createElement('span', { className: 'btn-content' },
            this.spinner,
            this.checkIcon,
            this.textSpan
        );

        this.element = Utils.createElement('button', {
            className: 'btn-submit',
            type: 'submit',
            onClick: (e) => {
                e.preventDefault();
                if (onClick) onClick();
            }
        }, content);

        return this.element;
    }

    setLoading() {
        this.element.classList.add('loading');
        this.element.classList.remove('success-state');
    }

    setSuccess() {
        this.element.classList.remove('loading');
        this.element.classList.add('success-state');
    }

    setNormal() {
        this.element.classList.remove('loading', 'success-state');
    }

    disable() {
        this.element.disabled = true;
        this.element.style.opacity = '0.5';
        this.element.style.pointerEvents = 'none';
    }

    enable() {
        this.element.disabled = false;
        this.element.style.opacity = '1';
        this.element.style.pointerEvents = 'all';
    }
}