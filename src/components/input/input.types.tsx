import type { InputHTMLAttributes } from "react";

export const sizeEnum = {
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
} as const;


export const intentEnum = {
    primary: "primary",
    secondary: "secondary",
    warning: "warning",
    danger: "danger",
} as const;

export const inputTypeEnum = {
    text: "text",
    password: "password",
    email: "email",
    number: "number",
    tel: "tel",
    search: "search",
} as const;

export const roundedEnum = {
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    full: "full",
} as const;


// InputProps interface, omitting 'size' from InputHTMLAttributes
export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    size?: typeof sizeEnum[keyof typeof sizeEnum]; // Overrides size prop
    intent?: typeof intentEnum[keyof typeof intentEnum];
    disabled?: boolean;
    dataTestId?: string;
    type?: typeof inputTypeEnum[keyof typeof inputTypeEnum];
    rounded?: typeof sizeEnum[keyof typeof sizeEnum];
    hasFullWidth?: boolean;
    placeholder?: string;
}