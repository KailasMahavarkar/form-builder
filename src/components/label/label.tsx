import React, { LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
    placement?: 'left' | 'right';
    children: React.ReactNode;
};

const Label: React.FC<LabelProps> = ({ children, placement = 'left', htmlFor, className, ...rest }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`block mb-2 ${placement === 'left' ? 'text-left' : 'text-right'} ${className}`}
            {...rest}
        >
            {children}
        </label>
    );
};

export default Label;
