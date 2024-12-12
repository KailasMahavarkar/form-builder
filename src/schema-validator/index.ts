import { IFormSchema } from "./type";

function validateSchema(schema: IFormSchema, data: Record<string, unknown>) {
    const errors: { message: string; field: string }[] = [];

    schema.fields.forEach((field) => {
        const value = data[field.key] || ''

        // required field validation
        if (field.validation?.required && (value === undefined || value === null || value === '')) {
            errors.push({ message: 'Field is required', field: field.key });
            return;
        }

        // length validation
        if (field.validation?.minLength || field.validation?.maxLength) {
            const minLength = field.validation.minLength || 0;
            const maxLength = field.validation.maxLength || Infinity;

            const stringValue = String(value || '');
            if (!isLengthValid(stringValue, minLength, maxLength)) {
                if (stringValue.length <= minLength) {
                    errors.push({ message: 'Field is too short', field: field.key });
                } else if (stringValue.length >= maxLength) {
                    errors.push({ message: 'Field is too long', field: field.key });
                }
            }
        }

        // pattern validation
        if (field.validation?.pattern) {
            const pattern = new RegExp(field.validation.pattern);
            if (!pattern.test(String(value || ''))) {
                errors.push({ message: 'Field does not match pattern', field: field.key });
            }
        }
    });

    return errors;
}

function isLengthValid(value: string, minLength: number, maxLength: number): boolean {
    return value.length >= minLength && value.length <= maxLength;
}

export { validateSchema };