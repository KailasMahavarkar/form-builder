type BaseFieldType = {
    id: string;
    type: string;
    label: string;
    key: string;
    validation?: ValidatorConfig;
    defaultValue?: string;
};


type TextFieldType = BaseFieldType & {
    type: 'text';
    pattern?: string;
};

type DropDownFieldType = BaseFieldType & {
    type: 'select';
    children: { value: string; label: string }[];
};

type RadioFieldType = BaseFieldType & {
    type: 'radio';
    children: { value: string; label: string }[];
    multiple: boolean;
};

type SelectFieldType = BaseFieldType & {
    type: 'select';
    children: { value: string; label: string }[];
}


export type FieldConfig = TextFieldType | DropDownFieldType | RadioFieldType | SelectFieldType;

export type ValidatorConfig = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
};

export interface IFormSchema {
    title: string;
    fields: FieldConfig[];
}


function validateSchema(schema: IFormSchema, data: Record<string, unknown>) {
    const errors: { message: string; field: string }[] = [];

    schema.fields.forEach((field) => {
        const value = data[field.key] || field.defaultValue || ''

        // Required field validation
        if (field.validation?.required && (value === undefined || value === null || value === '')) {
            errors.push({ message: 'Field is required', field: field.key });
            return; // Skip further checks if the field is required but missing
        }

        // Length validation (combines minLength and maxLength checks)
        if (field.validation?.minLength || field.validation?.maxLength) {
            const minLength = field.validation.minLength || 0;
            const maxLength = field.validation.maxLength || Infinity;

            if (!isLengthValid(value || '', minLength, maxLength)) {
                if (value.length <= minLength) {
                    errors.push({ message: 'Field is too short', field: field.key });
                } else if (value.length >= maxLength) {
                    errors.push({ message: 'Field is too long', field: field.key });
                }
            }
        }

        // Pattern validation
        if (field.validation?.pattern) {
            const pattern = new RegExp(field.validation.pattern);
            if (!pattern.test(value || '')) {
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