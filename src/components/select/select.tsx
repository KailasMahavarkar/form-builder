import React from "react";
import selectCVA from "./select.cva";
import type { SelectProps } from "./select.types";

const Select: React.FC<SelectProps> = ({
    children,
    options = [],
    size = "md",
    intent = "primary",
    rounded = "md",
    hasFullWidth = false,
    disabled = false,
    ...props
}) => {
    return (
        <select
            className={selectCVA({
                disabled,
                size: size as "sm" | "md" | "lg" | "xl",
                intent,
                rounded,
                hasFullWidth,
            })}
            disabled={disabled}
            {...props}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            {children}
        </select>
    );
};

export default Select;
