"use client";

import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
    code: string;
    language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
    return (
        <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} p-4 rounded-lg overflow-x-auto text-sm`} style={style}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
}
