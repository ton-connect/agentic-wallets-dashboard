/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'What if the agent steals the money?',
        answer: 'The agent can only spend what you sent to its wallet. Your main wallet is completely separate and inaccessible to the agent. Worst case — you lose the funded amount, nothing more.',
    },
    {
        question: 'How do I disconnect an agent?',
        answer: 'One tap on "Revoke". The operator is deactivated and you can withdraw remaining funds. It\'s an atomic on-chain transaction — the agent can\'t spend between your withdrawal and deactivation.',
    },
    {
        question: 'Is this safe?',
        answer: 'Your master key is never shared with agents. The agent has its own operator key that can only spend from its own wallet. All logic is on-chain, open source, and verifiable. No servers, no middlemen.',
    },
    {
        question: 'How many agents can I connect?',
        answer: 'As many as you want. Each agent gets its own wallet with its own balance. You see and control all of them from one dashboard.',
    },
    {
        question: 'How do I integrate as a developer?',
        answer: 'Add @ton/mcp to your MCP client (Cursor, Claude Desktop, Windsurf, etc.) and ask your AI agent to "create agentic wallet". The agent handles key generation, deployment, and onboarding. See the GitHub repo for full docs.',
    },
];

export function LandingFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="border-b border-white/[0.06] py-24">
            <div className="mx-auto max-w-2xl px-6">
                <div className="mb-12 text-center">
                    <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
                        FAQ
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Common questions</h2>
                </div>

                <div className="flex flex-col divide-y divide-white/[0.06]">
                    {faqs.map((faq, i) => {
                        const isOpen = i === openIndex;
                        return (
                            <div key={i}>
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="flex w-full items-center justify-between py-5 text-left"
                                >
                                    <span className="pr-4 text-sm font-medium">{faq.question}</span>
                                    <ChevronDown
                                        size={16}
                                        className={`shrink-0 text-neutral-500 transition-transform ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                {isOpen && (
                                    <p className="pb-5 text-sm leading-relaxed text-neutral-400">{faq.answer}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
