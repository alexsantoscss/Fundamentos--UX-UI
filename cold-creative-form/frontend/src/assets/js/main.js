class ColdCreativeForm {
    constructor() {
        this.formGroup = null;
        this.submitButton = null;
        this.fieldsValidation = {};
        this.isSubmitting = false;
    }

    init() {
        this.loadPage();
    }

    loadPage() {
        const app = document.getElementById('app');
        fetch('src/pages/index.html')
            .then(response => response.text())
            .then(html => {
                app.innerHTML = html;
                this.onPageLoaded();
            })
            .catch(() => {
                app.innerHTML = '<p style="text-align:center;padding:48px;color:var(--text-muted);">Erro ao carregar a aplicação.</p>';
            });
    }

    onPageLoaded() {
        this.buildForm();
        this.bindFormSubmit();
    }

    buildForm() {
        const fieldsConfig = [
            {
                name: 'nome',
                id: 'nomeInput',
                type: 'text',
                label: 'Nome completo',
                validator: Validators.nome,
                onValidate: (name, result) => {
                    this.fieldsValidation[name] = result;
                }
            },
            {
                name: 'email',
                id: 'emailInput',
                type: 'email',
                label: 'Email',
                validator: Validators.email,
                onValidate: (name, result) => {
                    this.fieldsValidation[name] = result;
                }
            },
            {
                name: 'telefone',
                id: 'telefoneInput',
                type: 'tel',
                label: 'Telefone',
                mask: Masks.telefone,
                validator: Validators.telefone,
                onValidate: (name, result) => {
                    this.fieldsValidation[name] = result;
                }
            },
            {
                name: 'mensagem',
                id: 'mensagemInput',
                type: 'textarea',
                label: 'Mensagem',
                maxLength: 500,
                validator: Validators.mensagem,
                onValidate: (name, result) => {
                    this.fieldsValidation[name] = result;
                }
            }
        ];

        this.formGroup = new FormGroup(fieldsConfig);

        const nomeContainer = document.getElementById('nomeField');
        const emailContainer = document.getElementById('emailField');
        const telefoneContainer = document.getElementById('telefoneField');
        const mensagemContainer = document.getElementById('mensagemField');

        const renderedFields = this.formGroup.render();

        const fieldWrappers = renderedFields.querySelectorAll('.form-group');
        if (nomeContainer && fieldWrappers[0]) nomeContainer.appendChild(fieldWrappers[0]);
        if (emailContainer && fieldWrappers[1]) emailContainer.appendChild(fieldWrappers[1]);
        if (telefoneContainer && fieldWrappers[2]) telefoneContainer.appendChild(fieldWrappers[2]);
        if (mensagemContainer && fieldWrappers[3]) mensagemContainer.appendChild(fieldWrappers[3]);

        this.submitButton = new Button();
        const submitContainer = document.getElementById('submitButton');
        if (submitContainer) {
            submitContainer.appendChild(this.submitButton.render(() => this.handleSubmit()));
        }
    }

    bindFormSubmit() {
        const form = document.getElementById('smartForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    handleSubmit() {
        if (this.isSubmitting) return;

        const { allValid, results } = this.formGroup.validateAll();
        this.fieldsValidation = results;

        if (!allValid) {
            this.showGlobalFeedback('error', 'Corrija os campos destacados antes de enviar.');
            this.shakeInvalidFields();
            return;
        }

        this.isSubmitting = true;
        this.submitButton.setLoading();
        this.clearGlobalFeedback();

        setTimeout(() => {
            this.submitButton.setSuccess();
            this.showGlobalFeedback('success', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');

            setTimeout(() => {
                this.formGroup.resetAll();
                this.submitButton.setNormal();
                this.fieldsValidation = {};
                this.clearGlobalFeedback();
                this.isSubmitting = false;
            }, 3000);
        }, 1800);
    }

    shakeInvalidFields() {
        Object.keys(this.fieldsValidation).forEach(name => {
            const result = this.fieldsValidation[name];
            if (result && !result.valid) {
                const field = this.formGroup.getField(name);
                if (field && field.wrapper) {
                    field.wrapper.classList.add('shake');
                    field.wrapper.addEventListener('animationend', () => {
                        field.wrapper.classList.remove('shake');
                    }, { once: true });
                }
            }
        });
    }

    showGlobalFeedback(type, message) {
        const container = document.getElementById('formFeedback');
        if (!container) return;
        container.textContent = message;
        container.className = 'form-global-feedback';
        container.offsetHeight;
        container.classList.add(type);
    }

    clearGlobalFeedback() {
        const container = document.getElementById('formFeedback');
        if (!container) return;
        container.textContent = '';
        container.className = 'form-global-feedback';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = new ColdCreativeForm();
    form.init();
});