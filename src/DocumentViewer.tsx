const DocumentationViewer = () => {
    return (
        <div className="documentation-viewer p-5 border border-gray-300 rounded-lg text-left">
            <h1 className="text-2xl font-bold mb-4">Dynamic Form Schema Documentation</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Schema Structure</h2>
                <p>The schema defines the structure and behavior of the form. It includes a title for the form and an array of fields that dictate the type and validation of each input.</p>

                <pre className="bg-gray-100 p-4 rounded overflow-auto">
                    {`const formSchema: IFormSchema = {
    title: "User Registration",
    fields: [
        {
            id: "username",
            type: "text",
            label: "Username",
            key: "username",
            validation: {
                required: true,
                minLength: 3,
                maxLength: 20,
            },
        },
        {
            id: "gender",
            type: "radio",
            label: "Gender",
            key: "gender",
            children: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
            ],
            multiple: false,
        },
        {
            id: "country",
            type: "select",
            label: "Country",
            key: "country",
            children: [
                { value: "india", label: "India" },
                { value: "usa", label: "USA" },
            ],
        },
    ],
};`}
                </pre>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Top-Level Schema Properties</h2>
                <table className="table-auto w-full border border-collapse border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Property</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">title</td>
                            <td className="border px-4 py-2">string</td>
                            <td className="border px-4 py-2">The title of the form.</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">fields</td>
                            <td className="border px-4 py-2">FieldConfig[]</td>
                            <td className="border px-4 py-2">Array of field configurations.</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Field Types</h2>
                <h3 className="text-lg font-bold mt-4">Text Field</h3>
                <table className="table-auto w-full border border-collapse border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Property</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">type</td>
                            <td className="border px-4 py-2">'text'</td>
                            <td className="border px-4 py-2">Specifies the field type.</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">pattern</td>
                            <td className="border px-4 py-2">string?</td>
                            <td className="border px-4 py-2">Regex pattern to validate the input value.</td>
                        </tr>
                    </tbody>
                </table>

                <h3 className="text-lg font-bold mt-4">Dropdown Field</h3>
                <table className="table-auto w-full border border-collapse border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Property</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">type</td>
                            <td className="border px-4 py-2">'select'</td>
                            <td className="border px-4 py-2">Specifies the field type.</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">children</td>
                            <td className="border px-4 py-2">
                                
                                </td>
                            <td className="border px-4 py-2">Dropdown options.</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <p className="mt-6">By adhering to this schema structure, you can seamlessly create dynamic forms with consistent behavior.</p>
        </div>
    );
};

export default DocumentationViewer;