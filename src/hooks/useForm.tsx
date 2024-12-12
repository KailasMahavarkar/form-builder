import { useContext } from 'react'
import FormContext from '../context/form.context';

const validationSchema = (schemaText: string, formState: Record<string, string | number | boolean>) => {
    // try to validate JSON
    const localErrors: { message: string; field: string }[] = [];

    try {
        const object = JSON.parse(schemaText);

        object.fields.forEach((field) => {
            const value = formState[field.key] || field.defaultValue || eval(`data.${field.key}`);

            // Required field validation
            if (field.validation?.required && (value === undefined || value === null || value === '')) {
                localErrors.push({ message: 'Field is required', field: field.key });
                return; // Skip further checks if the field is required but missing
            }

            // Length validation (combines minLength and maxLength checks)
            if (field.validation?.minLength || field.validation?.maxLength) {
                const minLength = field.validation.minLength || 0;
                const maxLength = field.validation.maxLength || Infinity;

                if (!isLengthValid(value || '', minLength, maxLength)) {
                    if (value.length < minLength) {
                        localErrors.push({ message: 'Field is too short', field: field.key });
                    } else if (value.length > maxLength) {
                        localErrors.push({ message: 'Field is too long', field: field.key });
                    }
                }
            }

            // Pattern validation
            if (field.validation?.pattern) {
                const pattern = new RegExp(field.validation.pattern);
                if (!pattern.test(value || '')) {
                    localErrors.push({ message: 'Field does not match pattern', field: field.key });
                }
            }
        });
    } catch (e) {
        console.error(e);
    }

    return localErrors;
};

const useForm = () => {
    const { schemaText, setSchemaText, formState, setFormState } = useContext(FormContext);

    return {
        formState,
        setFormState,
        schemaText,
        setSchemaText,
        validationSchema,
    }
}


// Helper function to validate length of a string
function isLengthValid(value: string, minLength: number, maxLength: number): boolean {
    return value.length >= minLength && value.length <= maxLength;
}

export default useForm

