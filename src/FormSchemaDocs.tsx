import React, { useState } from 'react'

type AccordionItemProps = {
    title: string;
    children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                className="flex justify-between items-center w-full py-4 px-6 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium">{title}</span>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            {isOpen && (
                <div className="p-6 bg-gray-50">
                    {children}
                </div>
            )}
        </div>
    );
};

export default function FormSchemaDocs() {
    return (
        <div className="container mx-auto px-4 py-8 text-lg ">
            <h1 className="text-3xl font-bold mb-6">Form Schema Documentation</h1>
            <p className="mb-6">
                This document describes the TypeScript types used to define a form schema in our system.
                The schema allows for the creation of dynamic forms with various field types and validation rules.
            </p>

            <div className="space-y-4">

                <AccordionItem title="Usage Example">
                    <p className="mb-4">Here's an example of how you might use these types to define a form schema:</p>
                    <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto">
                        <code>{`{
    "title": "User Registration",
    "fields": [
        {
            "id": "1",
            "type": "text",
            "label": "Full Name",
            "key": "fullName",
            "validation": {
                "required": true,
                "minLength": 2,
                "maxLength": 50
            }
        },
        {
            "id": "2",
            "type": "select",
            "label": "Country",
            "key": "country",
            "children": [
                {
                    "value": "us",
                    "label": "United States"
                },
                {
                    "value": "ca",
                    "label": "Canada"
                },
                {
                    "value": "uk",
                    "label": "United Kingdom"
                }
            ]
        },
        {
            "id": "3",
            "type": "radio",
            "label": "Gender",
            "key": "gender",
            "multiple": false,
            "children": [
                {
                    "value": "male",
                    "label": "Male"
                },
                {
                    "value": "female",
                    "label": "Female"
                },
                {
                    "value": "other",
                    "label": "Other"
                }
            ]
        }
    ]
}`}</code>
                    </pre>
                    <p className="mt-4">This schema defines a form with a text input for full name, a dropdown for country selection, and a radio button group for gender selection.</p>
                </AccordionItem>

                <AccordionItem title="Base Field Type">
                    <p className="mb-4">All field types extend from the <code className="bg-gray-200 p-1 rounded">BaseFieldType</code>, which includes common properties for all fields.</p>
                    <pre className="bg-black text-white p-4 rounded-lg  overflow-x-auto">
                        <code>{`type BaseFieldType = {
    id: string;
    type: string;
    label: string;
    key: string;
    validation?: ValidatorConfig;
};`}</code>
                    </pre>
                    <ul className="list-disc pl-6 mt-4">
                        <li><code className="bg-gray-200 p-1 rounded">id</code>: A unique identifier for the field</li>
                        <li><code className="bg-gray-200 p-1 rounded">type</code>: The type of the field (e.g., 'text', 'select', 'radio')</li>
                        <li><code className="bg-gray-200 p-1 rounded">label</code>: The display label for the field</li>
                        <li><code className="bg-gray-200 p-1 rounded">key</code>: A key to identify the field in form data</li>
                        <li><code className="bg-gray-200 p-1 rounded">validation</code>: Optional validation rules for the field</li>
                    </ul>
                </AccordionItem>

                <AccordionItem title="Field Types">
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Text Field</h3>
                            <p className="mb-2">Used for single-line text input.</p>
                            <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto">
                                <code>{`type TextFieldType = BaseFieldType & {
    type: 'text';
    pattern?: string;
};`}</code>
                            </pre>
                            <ul className="list-disc pl-6 mt-4">
                                <li><code className="bg-gray-200 p-1 rounded">pattern</code>: Optional regex pattern for text validation</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Dropdown Field</h3>
                            <p className="mb-2">Used for dropdown selection inputs.</p>
                            <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto">
                                <code>{`type DropDownFieldType = BaseFieldType & {
    type: 'select';
    children: { value: string; label: string }[];
};`}</code>
                            </pre>
                            <ul className="list-disc pl-6 mt-4">
                                <li><code className="bg-gray-200 p-1 rounded">children</code>: An array of options, each with a value and label</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Radio Field</h3>
                            <p className="mb-2">Used for radio button inputs.</p>
                            <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto">
                                <code>{`type RadioFieldType = BaseFieldType & {
    type: 'radio';
    children: { value: string; label: string }[];
    multiple: boolean;
};`}</code>
                            </pre>
                            <ul className="list-disc pl-6 mt-4">
                                <li><code className="bg-gray-200 p-1 rounded">children</code>: An array of options, each with a value and label</li>
                                <li><code className="bg-gray-200 p-1 rounded">multiple</code>: Indicates if multiple selections are allowed</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Select Field</h3>
                            <p className="mb-2">Used for select inputs (similar to dropdown).</p>
                            <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto">
                                <code>{`type SelectFieldType = BaseFieldType & {
    type: 'select';
    children: { value: string; label: string }[];
}`}</code>
                            </pre>
                            <ul className="list-disc pl-6 mt-4">
                                <li><code className="bg-gray-200 p-1 rounded">children</code>: An array of options, each with a value and label</li>
                            </ul>
                        </div>
                    </div>
                </AccordionItem>

                <AccordionItem title="Validator Configuration">
                    <p className="mb-4">The <code className="bg-gray-200 p-1 rounded">ValidatorConfig</code> type defines possible validation rules for fields.</p>
                    <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto">
                        <code>{`type ValidatorConfig = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
};`}</code>
                    </pre>
                    <ul className="list-disc pl-6 mt-4">
                        <li><code className="bg-gray-200 p-1 rounded">required</code>: Indicates if the field is mandatory</li>
                        <li><code className="bg-gray-200 p-1 rounded">minLength</code>: Minimum length for text input</li>
                        <li><code className="bg-gray-200 p-1 rounded">maxLength</code>: Maximum length for text input</li>
                        <li><code className="bg-gray-200 p-1 rounded">min</code>: Minimum value for number input</li>
                        <li><code className="bg-gray-200 p-1 rounded">max</code>: Maximum value for number input</li>
                        <li><code className="bg-gray-200 p-1 rounded">pattern</code>: Regex pattern for text validation</li>
                    </ul>
                </AccordionItem>

                <AccordionItem title="Form Schema">
                    <p className="mb-4">The <code className="bg-gray-200 p-1 rounded">IFormSchema</code> interface defines the overall structure of a form.</p>
                    <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto">
                        <code>{`interface IFormSchema {
    title: string;
    fields: FieldConfig[];
}`}</code>
                    </pre>
                    <ul className="list-disc pl-6 mt-4">
                        <li><code className="bg-gray-200 p-1 rounded">title</code>: The title of the form</li>
                        <li><code className="bg-gray-200 p-1 rounded">fields</code>: An array of field configurations (can be any of the defined field types)</li>
                    </ul>
                </AccordionItem>


            </div>
        </div>
    )
}
