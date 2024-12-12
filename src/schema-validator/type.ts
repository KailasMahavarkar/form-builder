// base type for field
type BaseFieldType = {
    id: string;
    type: string;
    label: string;
    key: string;
    validation?: ValidatorConfig;
};

// for text field (input type text)
type TextFieldType = BaseFieldType & {
    type: 'text';
    pattern?: string;
};

// for dropdown field
type DropDownFieldType = BaseFieldType & {
    type: 'select';
    children: { value: string; label: string }[];
};

// for radio field
type RadioFieldType = BaseFieldType & {
    type: 'radio';
    children: { value: string; label: string }[];
    multiple: boolean;
};

// for select field
type SelectFieldType = BaseFieldType & {
    type: 'select';
    children: { value: string; label: string }[];
}

// unified type for all field types
export type FieldConfig = TextFieldType | DropDownFieldType | RadioFieldType | SelectFieldType;

// type for validation
export type ValidatorConfig = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
};

export interface IFormSchema {
    title: string;
    fields: FieldConfig[];
}
