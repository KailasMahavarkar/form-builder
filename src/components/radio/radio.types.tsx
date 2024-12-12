import { InputHTMLAttributes } from "react";

export type RadioPropTypes = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    options: { value: string; label: string }[];
    selectedValues: string[];
    onChange: (selected: string[]) => void;
    multiSelect?: boolean;
    className?: string;
    size?: "sm" | "md" | "lg";
};