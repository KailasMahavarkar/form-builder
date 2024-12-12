import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { borderCVA } from "../codeblock/codeblock.cva";

const CodeBlock = ({
    status,
    text,
    onChange,
}: {
    status: "maybe" | "valid" | "invalid";
    text: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
    return (
        <div
            className={borderCVA({
                status,
                className: "rounded-t-lg",
            })}
        >
            <CodeEditor
                value={text}
                language="json"
                placeholder="Enter your JSON here"
                onChange={onChange}
                padding={15}
                className="font-mono bg-dracula"
                style={{
                    fontSize: 14,
                    backgroundColor: "#282a36",
                    color: "#f8f8f2",
                }}
            />
        </div>
    )
};

export default CodeBlock;
