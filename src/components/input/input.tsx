import React from "react";
import inputCVA from "./input.cva";
import { twMerge } from "tailwind-merge";
import { InputProps } from "./input.types";
import { makeDTI } from "../utils";

const Input: React.FC<InputProps> = ({
    dataTestId = '',
    disabled = false,
    intent = "primary",
    size = "md",
    type = "text",
    defaultValue = "",
    rounded = "md",
    hasFullWidth = false,
    value,
    placeholder = "",
    ...otherProps
}) => {
    const dti = makeDTI("input", dataTestId);

    return (
        <input
            placeholder={placeholder}
            type={type}
            value={value || defaultValue}
            disabled={disabled}
            className={
                twMerge(
                    inputCVA({
                        intent,
                        size,
                        disabled,
                        rounded,
                        hasFullWidth,
                    })
                )
            }
            data-test-id={dti()}
            {...otherProps}
        />
    )
}

export default Input