/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DeveloperInstructions, configCommand } from './LandingForDevelopers';

const steps = [
    {
        number: '01',
        title: 'Add MCP skills',
        description:
            'Add TON MCP skills to Cursor, Claude Desktop, Windsurf, Codex and others.',
    },
    {
        number: '02',
        title: 'Create Wallet',
        description:
            'Ask your AI agent to create an agentic wallet.',
    },
    {
        number: '03',
        title: 'Fund Wallet',
        description:
            'Transfer funds from your main wallet to the agent’s wallet.',
    },
    {
        number: '04',
        title: 'Operate',
        description:
            'Agent autonomously executes transactions using its own key.',
    },
    {
        number: '05',
        title: 'Monitor',
        description:
            'Monitor all transactions and wallets from a single dashboard.',
    },
];

type Step = (typeof steps)[number];

function StepCard({ step }: { step: Step }) {
    return (
        <div className="h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10 font-mono text-[10px] font-bold text-amber-500">
                    {step.number}
                </span>
                <span className="text-sm font-semibold text-neutral-200">
                    {step.title}
                </span>
            </div>
            <div className="px-5 py-4">
                <p className="text-sm leading-relaxed text-neutral-400">
                    {step.description}
                </p>
            </div>
        </div>
    );
}

export function LandingHowItWorks() {
    const [copied, setCopied] = useState(false);
    const [firstStep, ...remainingSteps] = steps;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(configCommand);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };

    return (
        <section id="how-it-works" className="border-b border-white/[0.06] py-12 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-6 text-center sm:mb-12">
                    <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
                        Get started
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        5 simple steps and 0 lines of code
                    </h2>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                    {firstStep && <StepCard step={firstStep} />}
                    <DeveloperInstructions copied={copied} onCopy={handleCopy} />
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {remainingSteps.map((step) => (
                        <StepCard key={step.number} step={step} />
                    ))}
                </div>

                <div className="mt-6 flex justify-center sm:mt-8">
                    <Link
                        to="/getting-started"
                        className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-amber-400"
                    >
                        Give your AI agent a wallet
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
