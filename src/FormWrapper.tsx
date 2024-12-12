import React, { useContext, useState } from 'react'
import Select from "./components/select";
import Input from "./components/input";
import Button from "./components/button";
import { type FieldConfig, validateSchema } from './schema-validator';
import FormContext from './context/form.context';
import CodeBlock from './components/codeblock/codeblock';
import Label from './components/label';

const DynamicForm = ({
    onSubmit
}: {
    onSubmit: (data: Record<string, string>) => void
}) => {
    const { parsedSchema, schemaText, setParsedSchema } = useContext(FormContext);
    const [formState, setFormState] = useState<Record<string, string>>({});
    const [errorState, setErrorState] = useState<Record<string, string>>({});


    const handleSchemaTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;

        // check if text is valid json
        try {
            const parsedData = JSON.parse(text);

            // schema is valid object
            if (parsedData.fields && parsedData.title) {
                setParsedSchema(parsedData);
            }

            // validate schema
            const _errors = validateSchema(parsedData, formState);

            // if errors are present, then map errors to formState
            if (_errors.length) {
                const _formState = { ...formState };
                const _errorState = { ...errorState };

                console.log("errors -->", _errors)

                _errors.forEach((error) => {
                    _errorState[error.field] = error.message;
                })
                setFormState(_formState);
                setErrorState(_errorState);
            }

            console.log("set error state -->", errorState)

        } catch (e: any) {
            console.error('Invalid json')
        }

    }

    const handleInputChange = (key: string, value: string) => {
        setFormState((prevData) => ({ ...prevData, [key]: value }))

        // validate schema
        const _errors = validateSchema(parsedSchema, formState);

        // errorState is object
        if (errorState[key]) {
            setErrorState((prevData) => {
                delete prevData[key];
                return prevData;
            })
        }

        // update error state
        // check if _errors has any errors related to current field
        const currentFieldErrors = _errors.filter((error) => error.field === key);

        if (currentFieldErrors.length) {
            setErrorState((prevData) => ({ ...prevData, [key]: currentFieldErrors[0].message }))
        }else{
            setErrorState((prevData) => {
                delete prevData[key];
                return prevData;
            });
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    }

    const renderSingleConfig = (element: FieldConfig) => {

        // set default value if not present
        if (!formState[element.key]) {
            setFormState((prevData) => ({ ...prevData, [element.key]: element.defaultValue || '' }))
        }


        switch (element.type) {
            case 'text':
                return (
                    <div className='m-2' key={element.key}>
                        <Label >{element.label}</Label>
                        <Input
                            intent={errorState[element.key] ? 'danger' : 'primary'}
                            value={formState[element.key]}
                            onChange={(e) => handleInputChange(element.key, e.target.value)}
                        />
                    </div>
                )
            case 'select':
                return (
                    <div className='m-2' key={element.key}>
                        <Label >{element.label}</Label>
                        <Select
                            options={element.children}
                            value={formState[element.key]}
                            onChange={(e) => handleInputChange(element.key, e.target.value)}
                        />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className='flex-col md:flex-row'>
            <CodeBlock
                status={"valid"}
                text={schemaText}
                onChange={handleSchemaTextChange}
            />

            <form onSubmit={handleSubmit}>
                {
                    parsedSchema?.fields?.map((currentConfig: FieldConfig) => {
                        return renderSingleConfig(currentConfig);
                    })
                }

                <div className='m-2'>
                    <Button
                        hasFullWidth
                        type='submit'>
                        submit form
                    </Button>
                </div>
            </form>
        </div>
    )
}



export default DynamicForm