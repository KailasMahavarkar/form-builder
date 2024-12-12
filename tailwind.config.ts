const childrenSupport = ({ addVariant }) => {
    addVariant("child", "& > *");
    addVariant("child-hover", "& > *:hover");
};


const config = {
    content: [
        "./src/**/*.tsx",
        "./src/components/**/*.tsx",
    ],
    plugins: [childrenSupport],
};

export default config;
