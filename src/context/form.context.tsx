import { createContext } from 'react';
import { IFormSchema } from '../schema-validator';

type FormContextType = {
    formState: Record<string, string>;
    setFormState: (data: Record<string, string>) => void;
    schemaText: string;
    setSchemaText: (schemaText: string) => void;
    parsedSchema: IFormSchema;
    setParsedSchema: (parsedSchema: IFormSchema) => void;
}



const FormContext = createContext<FormContextType>({
    formState: {},
    setFormState: () => { },
    schemaText: '',
    setSchemaText: () => { },
    parsedSchema: {
        title: '',
        fields: [],
    },
    setParsedSchema: () => { },
});

export default FormContext;