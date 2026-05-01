class FormGroup {
    constructor(fieldsConfig) {
        this.fields = {};
        this.fieldsConfig = fieldsConfig;
    }

    render() {
        const fragment = document.createDocumentFragment();

        this.fieldsConfig.forEach(config => {
            const field = new InputField(config);
            const element = field.render();
            this.fields[config.name] = field;
            fragment.appendChild(element);
        });

        return fragment;
    }

    getField(name) {
        return this.fields[name] || null;
    }

    validateAll() {
        const results = {};
        let allValid = true;

        Object.keys(this.fields).forEach(name => {
            const field = this.fields[name];
            const result = field.validate();
            results[name] = result;
            if (!result.valid) {
                allValid = false;
            }
        });

        return { allValid, results };
    }

    resetAll() {
        Object.keys(this.fields).forEach(name => {
            this.fields[name].reset();
        });
    }

    getValues() {
        const values = {};
        Object.keys(this.fields).forEach(name => {
            values[name] = this.fields[name].getValue();
        });
        return values;
    }
}