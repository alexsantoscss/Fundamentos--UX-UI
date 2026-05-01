const Validators = {
    nome(value) {
        if (!value || value.trim().length === 0) {
            return { valid: false, message: 'O nome é obrigatório.' };
        }
        if (value.trim().length < 2) {
            return { valid: false, message: 'O nome deve ter pelo menos 2 caracteres.' };
        }
        if (value.trim().length > 100) {
            return { valid: false, message: 'O nome deve ter no máximo 100 caracteres.' };
        }
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value.trim())) {
            return { valid: false, message: 'O nome contém caracteres inválidos.' };
        }
        return { valid: true, message: 'Nome válido!' };
    },

    email(value) {
        if (!value || value.trim().length === 0) {
            return { valid: false, message: 'O email é obrigatório.' };
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value.trim())) {
            return { valid: false, message: 'Insira um email válido (ex: nome@dominio.com).' };
        }
        if (value.trim().length > 254) {
            return { valid: false, message: 'O email é muito longo.' };
        }
        return { valid: true, message: 'Email válido!' };
    },

    telefone(value) {
        const digits = value.replace(/\D/g, '');
        if (digits.length === 0) {
            return { valid: false, message: 'O telefone é obrigatório.' };
        }
        if (digits.length < 11) {
            return { valid: false, message: 'Telefone incompleto. Formato: (XX) XXXXX-XXXX.' };
        }
        if (digits.length > 11) {
            return { valid: false, message: 'Telefone com muitos dígitos.' };
        }
        const ddd = parseInt(digits.slice(0, 2));
        if (ddd < 11 || ddd > 99) {
            return { valid: false, message: 'DDD inválido.' };
        }
        return { valid: true, message: 'Telefone válido!' };
    },

    mensagem(value) {
        if (!value || value.trim().length === 0) {
            return { valid: false, message: 'A mensagem é obrigatória.' };
        }
        if (value.trim().length < 10) {
            const restante = 10 - value.trim().length;
            return { valid: false, message: `Mínimo 10 caracteres. Faltam ${restante}.` };
        }
        if (value.trim().length > 500) {
            return { valid: false, message: 'A mensagem deve ter no máximo 500 caracteres.' };
        }
        return { valid: true, message: 'Mensagem válida!' };
    }
};