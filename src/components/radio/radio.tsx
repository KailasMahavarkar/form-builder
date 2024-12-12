import { twMerge } from "tailwind-merge";
import inputCVA from "../input/input.cva";
import { RadioPropTypes } from "./radio.types";
import { radioCVA } from "./radio.cva";

const Radio: React.FC<RadioPropTypes> = ({
    options,
    selectedValues,
    onChange,
    multiSelect = false,
    className = "",
    size = "md",
    disabled = false,
    ...rest
}) => {
    const handleChange = (value: string) => {
        if (multiSelect) {
            if (selectedValues.includes(value)) {
                onChange(selectedValues.filter((item) => item !== value));
            } else {
                onChange([...selectedValues, value]);
            }
        } else {
            onChange([value]);
        }
    };



    return (
        <div className={twMerge("flex w-4 h-4 ", className)}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className={twMerge(
                        radioCVA({
                            size,
                            disabled,
                        })
                    )}
                >
                    <input
                        {...rest}
                        type={multiSelect ? "checkbox" : "radio"}
                        checked={selectedValues.includes(option.value)}
                        onChange={() => handleChange(option.value)}
                        disabled={disabled}
                        className={twMerge(
                            inputCVA({
                                size,
                            })
                        )}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};


export default Radio