/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArrowRight, MessageSquare, Terminal } from 'lucide-react';

const configCommand = 'npx @ton/mcp@alpha';


export function LandingForDevelopers() {
    return (
        <section id="for-developers" className="border-b border-white/[0.06] py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-start gap-16 lg:grid-cols-2">
                    {/* Left: config + prompt examples */}
                    <div className="flex flex-col gap-4">
                        {/* Setup */}
                        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
                                <Terminal size={12} className="text-neutral-600" />
                                <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
                                    Add to your MCP client
                                </span>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-4">
                                <span className="font-mono text-xs text-amber-500/60">$</span>
                                <code className="font-mono text-sm text-neutral-200">{configCommand}</code>
                            </div>
                            <div className="border-t border-white/[0.04] px-5 py-3">
                                <p className="text-[10px] text-neutral-700">
                                    Cursor · Claude Desktop · Windsurf · any MCP-compatible client
                                </p>
                            </div>
                        </div>

                        {/* First action */}
                        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
                                <MessageSquare size={12} className="text-neutral-600" />
                                <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
                                    Then ask your AI agent
                                </span>
                            </div>
                            <div className="px-5 py-4">
                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 font-mono text-xs text-amber-500">&gt;</span>
                                    <span className="text-sm font-medium text-neutral-200">
                                        Create agentic wallet
                                    </span>
                                </div>
                                <p className="mt-2 pl-5 text-xs text-neutral-600">
                                    The agent handles keys, opens the dashboard, and walks you through setup.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: copy */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
                                For Developers
                            </p>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Build with agentic wallets
                            </h2>
                        </div>

                        <p className="text-base leading-relaxed text-neutral-400">
                            Add one config block to your MCP client. Ask your agent
                            to <span className="text-neutral-300">create agentic wallet</span> and
                            follow the instructions. Your AI agent gets TON wallet capabilities —
                            transfers, swaps, sub-wallet deploys, NFTs. User keeps the
                            master key, agent keeps the operator key.
                        </p>

                        <p className="text-xs leading-relaxed text-amber-500/60">
                            Developer preview — contracts are not yet audited. Use testnet for experimentation.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <a
                                href="https://github.com/ton-connect/kit/tree/main/packages/mcp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-amber-400"
                            >
                                Get started
                                <ArrowRight size={14} />
                            </a>
                            <a
                                href="https://github.com/the-ton-tech/agentic-wallet-contract"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.04]"
                            >
                                Contracts on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
