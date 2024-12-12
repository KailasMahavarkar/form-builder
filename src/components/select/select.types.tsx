import { SelectHTMLAttributes } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options?: { value: string; label: string }[];
    size?: "sm" | "md" | "lg" | "xl";
    intent?: "primary" | "secondary" | "warning" | "danger";
    rounded?: "sm" | "md" | "lg" | "xl" | "full";
    hasFullWidth?: boolean;
};
