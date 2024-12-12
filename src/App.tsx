import { IFormSchema, validateSchema } from './schema-validator';
import FormContext from './context/form.context';
import useForm from './hooks/useForm';
import FormWrapper from './FormWrapper';
import { useContext, useState } from 'react';


const config: IFormSchema = {
    title: "Dynamic Form Example",
    fields: [
        {
            id: "username",
            type: "text",
            label: "Username",
            key: "username",
            defaultValue: "Kailas",
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
            defaultValue: "male",
            children: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
            ],
            validation: {
                required: true
            },
        },
    ],
}


function App() {
    const [formState, setFormState] = useState<Record<string, string>>({});
    const [schemaText, setSchemaText] = useState<string>(JSON.stringify(config, null, 2));
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
            <FormWrapper 
                onSubmit={(data) => {
                    console.log(data);
                }}
            />
        </FormContext.Provider>
    )

}

export default App
