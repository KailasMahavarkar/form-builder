import React, { useContext, useState } from 'react';
import Select from "./components/select";
import Input from "./components/input";
import Button from "./components/button";
import { validateSchema } from './schema-validator';
import type { FieldConfig } from './schema-validator/type';
import FormContext from './context/form.context';
import CodeBlock from './components/codeblock/codeblock';
import Label from './components/label';


const DynamicFormBuilder = ({
    onSubmit
}: {
    onSubmit: (data: Record<string, string>) => void
}) => {
    const { parsedSchema, schemaText, setParsedSchema } = useContext(FormContext);
    const [formState, setFormState] = useState<Record<string, string>>({});
    const [errorState, setErrorState] = useState<Record<string, string>>({});
    const [isSchemaValid, setIsSchemaValid] = useState<boolean>(true);


    // handle schema text change
    // parse the schema and validate it
    const handleSchemaTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        try {
            // try to parse the JSON if it fails, we don't update the schema
            const parsedData = JSON.parse(text);

            if (parsedData.fields && parsedData.title) {
                setParsedSchema(parsedData);
            }

            // validate the schema with the current form state
            const _errors = validateSchema(parsedData, formState);
            const newErrorState: Record<string, string> = {};

            _errors.forEach((error) => {
                newErrorState[error.field] = error.message;
            });

            setErrorState(newErrorState);
            setIsSchemaValid(_errors.length === 0);
        } catch (err) {
            console.error('Invalid JSON schema:', err);
            setIsSchemaValid(false);
        }
    };

    const handleInputChange = (key: string, value: string) => {

        // update the form state with new value
        setFormState((prevData) => ({ ...prevData, [key]: value }));

        // check if the field has any validation errors
        const _errors = validateSchema(parsedSchema, { ...formState, [key]: value });
        const currentFieldErrors = _errors.filter((error) => error.field === key);

        setErrorState((prevErrors) => {
            const newErrorState = { ...prevErrors };

            if (currentFieldErrors.length) {
                newErrorState[key] = currentFieldErrors[0].message;
            } else {
                delete newErrorState[key];
            }
            return newErrorState;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const _errors = validateSchema(parsedSchema, formState);

        if (_errors.length) {
            const newErrorState: Record<string, string> = {};

            _errors.forEach((error) => {
                newErrorState[error.field] = error.message;
            });

            setErrorState(newErrorState);
        } else {
            onSubmit(formState);
        }
    };

    const renderSingleConfig = (element: FieldConfig) => {
        if (!formState[element.key] && element.defaultValue) {
            setFormState((prevData) => ({ ...prevData, [element.key]: element.defaultValue || '' }));
        }

        switch (element.type) {
            case 'text':
                return (
                    <div className='m-2 mb-0' key={element.key}>
                        <Label>{element.label}</Label>
                        <Input
                            intent={errorState[element.key] ? 'danger' : 'primary'}
                            value={formState[element.key] || ''}
                            onChange={(e) => handleInputChange(element.key, e.target.value)}
                        />
                        {errorState[element.key] && <span className="error-text">{errorState[element.key]}</span>}
                    </div>
                );
            case 'select':
                return (
                    <div className='m-2 mb-0' key={element.key}>
                        <Label>{element.label}</Label>
                        <Select
                            options={element.children || []}
                            value={formState[element.key] || ''}
                            onChange={(e) => handleInputChange(element.key, e.target.value)}
                        />
                        {errorState[element.key] && <span className="error-text">{errorState[element.key]}</span>}
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className='flex child:flex-1 child:m-5' >
            <div>
                <span>
                    <h1 className='text-lg font-bold'>
                        Form Schema Editor
                    </h1>
                </span>
                <CodeBlock
                    status={isSchemaValid ? 'valid' : 'invalid'}
                    text={schemaText}
                    onChange={handleSchemaTextChange}
                />
            </div>

            <div>

                <div>
                    <h1 className='text-lg font-bold'>
                        Form Preview
                    </h1>
                    <form
                        className='flex-col md:flex-row border-2 p-3'
                        onSubmit={handleSubmit}>
                        <h1 className='text-lg font-bold '>
                            {parsedSchema?.title}
                        </h1>
                        {parsedSchema?.fields?.map((currentConfig: FieldConfig) =>
                            renderSingleConfig(currentConfig)
                        )}

                        <div className='m-2'>
                            <Button hasFullWidth type='submit'>
                                Submit Form
                            </Button>
                        </div>
                    </form>
                </div>

                <div className='flex'>
                    <div className='m-2 text-left'>
                        <h1 className='text-lg font-bold'>
                            Form State
                        </h1>
                        <pre>{JSON.stringify(formState, null, 2)}</pre>
                    </div>

                    <div className='m-2 text-left'>
                        <h1 className='text-lg font-bold'>
                            Error State
                        </h1>
                        <pre>{JSON.stringify(errorState, null, 2)}</pre>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default DynamicFormBuilder;
