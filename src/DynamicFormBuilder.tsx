import React, { useContext, useState } from 'react';
import Select from "./components/select";
import Input from "./components/input";
import Button from "./components/button";
import { validateSchema } from './schema-validator';
import type { FieldConfig, IFormSchema } from './schema-validator/type';
import FormContext from './context/form.context';
import CodeBlock from './components/codeblock/codeblock';
import Label from './components/label';
import Radio from './components/radio/radio';


function SchemaParser(schemaText: string) {
    return new Promise<string | IFormSchema>((resolve, reject) => {
        try {
            const parsedResult = JSON.parse(schemaText);
            if (parsedResult) {
                resolve(parsedResult as IFormSchema);
            } else {
                reject("json is invalid");
            }
        } catch (error) {
            console.log("error --> ", error);
            reject("json is invalid");
        }
    });
}

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

        SchemaParser(text).then((parsedData) => {
            setIsSchemaValid(true);

            const schema = parsedData as IFormSchema;
            const _errors = validateSchema(schema, formState);
            const newErrorState: Record<string, string> = {};

            _errors.forEach((error) => {
                newErrorState[error.field] = error.message;
            });

            setParsedSchema(schema);
        }).catch((err) => {
            setIsSchemaValid(false);
        })
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
        switch (element.type) {
            case 'text':
                return (
                    <div className='m-2 mb-0' key={element.key}>
                        <Label
                            required={element.validation?.required}
                        >{element.label}</Label>
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
                        <Label
                            required={element.validation?.required}
                        >{element.label}</Label>
                        <Select
                            options={element.children || []}
                            value={formState[element.key] || ''}
                            onChange={(e) => handleInputChange(element.key, e.target.value)}
                        />
                        {errorState[element.key] && <span className="error-text">{errorState[element.key]}</span>}
                    </div>
                );

            case 'radio':
                return (
                    <div className='m-2 mb-0' key={element.key}>
                        <Label
                            required={element.validation?.required}
                        >{element.label}</Label>
                        <Radio
                            multiSelect={element.multiple}
                            options={element.children || []}
                            selectedValues={
                                formState[element.key] ? formState[element.key].split(",") : []
                            }
                            onChange={(selected) =>
                                handleInputChange(element.key, selected.join(","))
                            }
                        />
                        {errorState[element.key] && <span className="error-text">{errorState[element.key]}</span>}
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className='flex flex-col justify-center md:flex-row mt-5 child:m-3' >
            <div className='flex-1 max-w-[900px]'>
                <div className='flex justify-between '>
                    <h1 className='text-lg font-bold'>
                        Form Schema Editor
                    </h1>
                    <span className={`mr-3 text-white rounded-t-md px-2 ${isSchemaValid ? 'bg-green-500' : 'bg-red-500'}`}>
                        {isSchemaValid ? 'valid json' : 'invalid json'}
                    </span>
                </div>
                <CodeBlock
                    status={isSchemaValid ? 'valid' : 'invalid'}
                    text={schemaText}
                    onChange={handleSchemaTextChange}
                />
            </div>

            <div className='flex-col'>
                <h1 className='text-lg font-bold'>
                    Form Preview
                </h1>
                <form
                    className='flex-col max-w-md md:flex-row border-2 p-3'
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

                <div className='flex flex-col max-w-md'>
                    <div className='m-2 text-left'>
                        <h1 className='text-lg font-bold'>
                            Form State
                        </h1>

                        <table className="table-fixed w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="w-1/3 border border-gray-300 px-4 py-2 text-left">Key</th>
                                    <th className="w-2/3 border border-gray-300 px-4 py-2 text-left">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(formState).map((key) => (
                                    <tr key={key}>
                                        <td className="border border-gray-300 px-4 py-2">{key}</td>
                                        <td className="border border-gray-300 px-4 py-2">{formState[key]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {
                        Object.keys(errorState).length > 0 && (
                            <div className='m-2 text-left'>
                                <h1 className='text-lg font-bold'>
                                    Error State
                                </h1>

                                <table className="table-fixed w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="w-1/3 border border-gray-300 px-4 py-2 text-left">Key</th>
                                            <th className="w-2/3 border border-gray-300 px-4 py-2 text-left">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(errorState).map((key) => (
                                            <tr key={key}>
                                                <td className="border border-gray-300 px-4 py-2">{key}</td>
                                                <td className="border border-gray-300 px-4 py-2">{errorState[key]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    );
};

export default DynamicFormBuilder;
