/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const steps = [
    {
        number: '01',
        title: 'Create',
        description:
            'Agent generates keys and deploys a wallet contract with your address as owner.',
    },
    {
        number: '02',
        title: 'Fund',
        description:
            "Top up the agent wallet with what you're comfortable risking. That's the spending limit.",
    },
    {
        number: '03',
        title: 'Operate',
        description:
            'Agent signs transactions with its own key, spends from its own balance. Autonomously.',
    },
];

export function LandingHowItWorks() {
    return (
        <section id="how-it-works" className="border-b border-white/[0.06] py-12 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-6 text-center sm:mb-12">
                    <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500">
                        How it works
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Three steps. No middleware.
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                        >
                            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-3">
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06] font-mono text-[10px] font-bold text-white">
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
                    ))}
                </div>
            </div>
        </section>
    );
}
