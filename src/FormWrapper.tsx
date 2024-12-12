import React, { useCallback, useContext, useState } from 'react'
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


    const handleSchemaTextChange = useCallback((text: string) => {
        try {
            const parsedData = JSON.parse(text)

            if (parsedData.fields && parsedData.title) {
                setParsedSchema(parsedData)
            }

            const _errors = validateSchema(parsedData, formState)
            if (_errors.length) {
                const _errorState: Record<string, string> = {}
                _errors.forEach((error) => {
                    _errorState[error.field] = error.message
                })
                setErrorState(_errorState)
            }
        } catch (e) {
            console.error('Invalid JSON:', e)
        }
    }, [formState, setParsedSchema])

    const handleInputChange = useCallback((key: string, value: string) => {
        setFormState((prevData) => ({ ...prevData, [key]: value }))
        const _errors = validateSchema(parsedSchema, { ...formState, [key]: value })

        setErrorState((prevData) => {
            const newErrorState = { ...prevData }
            const currentFieldErrors = _errors.filter((error) => error.field === key)

            if (currentFieldErrors.length) {
                newErrorState[key] = currentFieldErrors[0].message
            } else {
                delete newErrorState[key]
            }

            return newErrorState
        })
    }, [parsedSchema, formState])

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formState)
    }, [formState, onSubmit])

    const renderSingleConfig = (element: FieldConfig) => {
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