class FeedbackMessage {
    constructor() {
        this.element = null;
    }

    create() {
        this.element = Utils.createElement('div', { className: 'feedback-message' });
        return this.element;
    }

    show(type, message) {
        if (!this.element) return;
        this.element.className = 'feedback-message';
        this.element.innerHTML = '';

        const icon = type === 'error' ? '⚠️' : '✅';
        const iconSpan = Utils.createElement('span', { className: 'feedback-icon' }, icon);
        const textSpan = Utils.createElement('span', {}, message);

        this.element.appendChild(iconSpan);
        this.element.appendChild(textSpan);

        this.element.classList.add(type);
        this.element.offsetHeight;
        this.element.classList.add('visible');
    }

    hide() {
        if (!this.element) return;
        this.element.classList.remove('visible', 'error', 'success');
        this.element.innerHTML = '';
    }
}