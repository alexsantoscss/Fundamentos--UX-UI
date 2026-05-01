const Validation = {
    isEmail: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    minLength: (value, min) => {
        return value.length >= min;
    },

    setError: (input, message) => {
        const group = input.parentElement;
        const errorDisplay = group.querySelector('.error-message');
        group.classList.add('error');
        errorDisplay.innerText = message;
    },

    clearError: (input) => {
        const group = input.parentElement;
        group.classList.remove('error');
    }
};