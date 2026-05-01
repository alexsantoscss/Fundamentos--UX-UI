const Masks = {
    telefone(inputElement) {
        let previousValue = '';

        const applyMask = () => {
            const currentValue = inputElement.value;
            const digits = currentValue.replace(/\D/g, '').slice(0, 11);

            let formatted = '';
            if (digits.length > 0) {
                formatted = '(' + digits.slice(0, 2);
            }
            if (digits.length > 2) {
                formatted += ') ' + digits.slice(2, 7);
            }
            if (digits.length > 7) {
                formatted += '-' + digits.slice(7, 11);
            }

            if (formatted !== currentValue) {
                inputElement.value = formatted;
                previousValue = formatted;
            }
        };

        inputElement.addEventListener('input', (e) => {
            const cursorPosition = inputElement.selectionStart;
            const oldLength = inputElement.value.length;

            applyMask();

            const newLength = inputElement.value.length;
            if (newLength > oldLength && cursorPosition === oldLength) {
                const newCursorPosition = cursorPosition + (newLength - oldLength);
                inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
            } else {
                inputElement.setSelectionRange(cursorPosition, cursorPosition);
            }

            inputElement.dispatchEvent(new Event('masked', { bubbles: true }));
        });

        inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && inputElement.value.endsWith(' ')) {
                inputElement.value = inputElement.value.slice(0, -1);
                e.preventDefault();
            }
        });
    }
};