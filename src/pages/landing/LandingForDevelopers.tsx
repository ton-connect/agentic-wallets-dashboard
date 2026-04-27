/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Copy } from 'lucide-react';

export const configCommand = 'npx skills add ton-connect/kit/packages/mcp';

export function DeveloperInstructions({
    copied,
    onCopy,
}: {
    copied: boolean;
    onCopy: () => void;
}) {
    return (
        <div className="min-w-0 h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-2">
                <div className="flex h-9 items-center gap-2 border-b border-border bg-surface-1 px-4">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/10" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/10" />
                </div>
                <div className="flex flex-1 items-start justify-between gap-4 bg-surface px-5 py-5">
                    <div className="flex min-w-0 items-start gap-3 sm:items-center">
                        <span className="font-mono text-xs text-accent">$</span>
                        <code className="min-w-0 whitespace-normal break-all font-mono text-xs leading-relaxed text-primary sm:truncate sm:text-sm">
                            {configCommand}
                        </code>
                    </div>
                    <button
                        type="button"
                        onClick={onCopy}
                        aria-label={copied ? 'Copied' : 'Copy command'}
                        title={copied ? 'Copied' : 'Copy command'}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-neutral-500 transition-colors hover:border-white/[0.14] hover:text-neutral-200"
                    >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function LandingForDevelopers() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(configCommand);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };

    return (
        <section id="for-developers" className="border-b border-white/[0.06] py-12 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-start gap-8 sm:gap-16 lg:grid-cols-2">
                    <div className="hidden lg:block">
                        <DeveloperInstructions copied={copied} onCopy={handleCopy} />
                    </div>

                    {/* Right: copy */}
                    <div className="min-w-0 flex flex-col gap-6">
                        <div>
                            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
                                How it works?
                            </p>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Get started
                            </h2>
                        </div>

                        <p className="text-base leading-relaxed text-neutral-400">
                            5 simple steps and 0 lines of code. Operate: Agent autonomously
                            executes transactions using its own key. Monitor: Monitor all
                            transactions and wallets from a single dashboard.
                        </p>

                        <div className="lg:hidden">
                            <DeveloperInstructions copied={copied} onCopy={handleCopy} />
                        </div>

                        <p className="text-xs leading-relaxed text-amber-500/60">
                            Add TON MCP skills to Cursor, Claude Desktop, Windsurf, Codex and others.
                        </p>

                        <div className="flex items-center gap-3 sm:flex-wrap">
                            <Link
                                to="/getting-started"
                                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-amber-400"
                            >
                                Give your AI agent a wallet
                                <ArrowRight size={14} />
                            </Link>
                            <a
                                href="https://github.com/the-ton-tech/agentic-wallet-contract"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.04]"
                            >
                                <span className="sm:hidden">Monitor</span>
                                <span className="hidden sm:inline">Monitor</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
