document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    document.getElementById('go-to-register').addEventListener('click', () => {
        UIController.toggleForms('login-section', 'register-section');
    });

    document.getElementById('go-to-login').addEventListener('click', () => {
        UIController.toggleForms('register-section', 'login-section');
    });

    const validateInput = (input, type) => {
        let isValid = true;
        Validation.clearError(input);

        if (!input.value.trim()) {
            Validation.setError(input, 'Campo obrigatório');
            return false;
        }

        if (type === 'email' && !Validation.isEmail(input.value)) {
            Validation.setError(input, 'Email inválido');
            isValid = false;
        }

        if (type === 'password' && !Validation.minLength(input.value, 6)) {
            Validation.setError(input, 'Mínimo 6 caracteres');
            isValid = false;
        }

        if (type === 'confirm') {
            const pass = document.getElementById('reg-password').value;
            if (input.value !== pass) {
                Validation.setError(input, 'Senhas não conferem');
                isValid = false;
            }
        }

        return isValid;
    };

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const type = input.id.includes('email') ? 'email' : 
                         input.id.includes('confirm') ? 'confirm' :
                         input.id.includes('password') ? 'password' : 'text';
            validateInput(input, type);
        });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email');
        const pass = document.getElementById('login-password');

        if (validateInput(email, 'email') && validateInput(pass, 'password')) {
            UIController.setLoading('login-btn', true);
            setTimeout(() => {
                UIController.setLoading('login-btn', false);
                UIController.showSuccess();
            }, 2000);
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name');
        const email = document.getElementById('reg-email');
        const pass = document.getElementById('reg-password');
        const confirm = document.getElementById('reg-confirm');

        const isNameVal = validateInput(name, 'text');
        const isEmailVal = validateInput(email, 'email');
        const isPassVal = validateInput(pass, 'password');
        const isConfirmVal = validateInput(confirm, 'confirm');

        if (isNameVal && isEmailVal && isPassVal && isConfirmVal) {
            UIController.setLoading('register-btn', true);
            setTimeout(() => {
                UIController.setLoading('register-btn', false);
                UIController.showSuccess();
            }, 2000);
        }
    });
});