import { cva } from "class-variance-authority";

export const labelCVA = cva('block mb-2', {
    variants: {
        placement: {
            left: 'text-left',
            right: 'text-right',
        },
    },
    defaultVariants: {
        placement: 'left',
    },
});