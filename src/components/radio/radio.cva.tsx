import { cva } from "class-variance-authority";


export const radioCVA = cva(
    "flex items-center mb-2 m-2",
    {
        variants: {
            size: {
                sm: "text-sm",
                md: "text-base",
                lg: "text-lg",
            },
            disabled: {
                true: "opacity-50 cursor-not-allowed",
                false: "cursor-pointer",
            },
        },
        defaultVariants: {
            size: "md",
            disabled: false,
        },
    }
);

export const inputCVA = cva(
    "mr-2",
    {
        variants: {
            size: {
                sm: "w-4 h-4",
                md: "w-5 h-5",
                lg: "w-6 h-6",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);