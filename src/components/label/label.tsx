import React, { LabelHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import { labelCVA } from './label.cva';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
    VariantProps<typeof labelCVA> & {
        children: React.ReactNode;
        required?: boolean;
    };



const Label: React.FC<LabelProps> = ({ children, placement, htmlFor, className, ...rest }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={labelCVA({ placement, className })}
            {...rest}
        >
            {children}

            {
                rest.required && <span className="text-red-500">*</span>
            }
        </label>
    );
};

export default Label;
