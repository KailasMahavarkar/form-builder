import FormContext from './context/form.context';
import DynamicFormBuilder from './DynamicFormBuilder';
import { useState } from 'react';
import { IFormSchema } from './schema-validator/type';
import FormSchemaDocs from './FormSchemaDocs';

const config: IFormSchema = {
    title: "Dynamic Form Example",
    fields: [
        {
            id: "username",
            type: "text",
            label: "Username",
            key: "username",
            validation: {
                required: true,
                minLength: 3,
                maxLength: 20
            },
        },
        {
            id: "gender",
            type: "select",
            label: "Gender",
            key: "gender",
            children: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
            ],
            validation: {
                required: true
            },
        },
        {
            id: 'occupation',
            type: 'radio',
            key: 'occupation',
            label: 'Occupation',
            children: [
                { label: 'Employed', value: 'employed' },
                { label: 'Student', value: 'student' },
                { label: 'Business', value: 'business' }
            ],
            multiple: true
        }
    ],
}


function App() {
    const [formState, setFormState] = useState<Record<string, string>>({});
    const [schemaText, setSchemaText] = useState<string>(JSON.stringify(config, null, 4));
    const [parsedSchema, setParsedSchema] = useState<IFormSchema>(config);

    return (
        <FormContext.Provider
            value={{
                formState,
                setFormState,
                schemaText,
                setSchemaText,
                parsedSchema,
                setParsedSchema
            }}
        >
            <DynamicFormBuilder
                onSubmit={(data) => {
                    console.log(data);
                }}
            />

            <div className="flex items-center justify-center  ">
                <FormSchemaDocs />
            </div>
        </FormContext.Provider>
    )

}

export default App
