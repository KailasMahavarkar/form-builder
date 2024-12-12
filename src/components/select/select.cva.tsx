import { cva } from "class-variance-authority";

const selectCVA = cva([
    "text-black",
    "w-full",
    "border",
    "border-2",
    "outline-none",
    "disabled:bg-slate-50",
    "disabled:text-slate-500",
    "disabled:border-slate-200",
    "disabled:shadow-none",
    "invalid:border-pink-500",
    "invalid:text-pink-600",
    "focus:invalid:border-pink-500",
    "focus:invalid:ring-pink-500",
    "focus:outline-none",
    "vertical-align-middle",
    "pl-5",
    "appearance-none",
    "bg-no-repeat",
    "pr-10"
], {
    variants: {
        intent: {
            primary: "border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            secondary: "border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
            warning: "border-yellow-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500",
            danger: "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500",
        },
        size: {
            sm: "p-1 pl-4 pr-8",
            md: "p-2 pl-4 pr-8",
            lg: "p-3 pl-4 pr-8",
            xl: "p-4 pl-4 pr-8",
        },
        hasFullWidth: {
            true: "w-full",
        },
        disabled: {
            true: "border-gray-300 bg-gray-100 text-gray-100 cursor-not-allowed",
        },
        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        }
    },
    compoundVariants: [],
    defaultVariants: {
        intent: "primary",
        size: "md",
        hasFullWidth: false,
        disabled: false,
        rounded: "md",
    },
});

export default selectCVA;
