/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
    className?: string;
}

export function CodeBlock({ code, language, title, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] ${className ?? ''}`}>
            {(title || language) && (
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
                        {title ?? language}
                    </span>
                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 text-[10px] text-neutral-600 transition-colors hover:text-neutral-300"
                    >
                        {copied ? (
                            <>
                                <Check size={12} className="text-emerald-500" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy size={12} />
                                Copy
                            </>
                        )}
                    </button>
                </div>
            )}
            <pre className="overflow-x-auto p-4">
                <code className="font-mono text-[13px] leading-relaxed text-neutral-300">
                    {code}
                </code>
            </pre>
            {!title && !language && (
                <button
                    onClick={handleCopy}
                    className="absolute right-3 top-3 inline-flex items-center gap-1.5 text-[10px] text-neutral-600 transition-colors hover:text-neutral-300"
                >
                    {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                </button>
            )}
        </div>
    );
}
