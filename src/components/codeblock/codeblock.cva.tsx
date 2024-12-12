import { cva } from "class-variance-authority";

export const borderCVA = cva("border-4 border-solid", {
    variants: {
        status: {
            valid: "border-green-500",
            invalid: "border-red-500",
            maybe: "border-gray-500",
        },
    },
    defaultVariants: {
        status: "maybe",
    },
});

