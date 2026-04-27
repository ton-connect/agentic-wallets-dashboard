/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const useCases = [
    {
        title: 'Trading Bot',
        description:
            'Give your trading bot its own wallet. It trades autonomously with capped risk. You see every transaction and can pull funds back anytime.',
        flow: ['Install bot', 'Bot creates wallet', 'Fund 50 TON', 'Bot trades', 'Withdraw'],
    },
    {
        title: 'DeFi Agent',
        description:
            'Staking, farming, rebalancing — each strategy gets its own isolated wallet. One agent misbehaves, the rest are untouched.',
        flow: ['Create wallets', 'Distribute funds', 'Agents operate', 'Monitor', 'Rebalance'],
    },
    {
        title: 'Server Payouts',
        description:
            'Automate payments from a dedicated wallet. Your server signs with the operator key. No seed phrases on servers, no exposed master keys.',
        flow: ['Create wallet', 'Get keypair', 'Send payouts', 'Monitor', 'Top up'],
    },
];

export function LandingUseCases() {
    return (
        <section id="use-cases" className="border-b border-white/[0.06] py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Use cases</h2>
                    <p className="mt-4 text-neutral-400">One primitive. Many applications.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {useCases.map((uc) => (
                        <div
                            key={uc.title}
                            className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">{uc.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{uc.description}</p>
                            </div>

                            {/* Visual flow */}
                            <div className="mt-6 border-t border-white/[0.06] pt-5">
                                <div className="flex items-center gap-1">
                                    {uc.flow.map((step, i) => (
                                        <div key={i} className="flex items-center gap-1">
                                            <span
                                                className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] ${
                                                    i === 0
                                                        ? 'border border-white/[0.1] text-neutral-300'
                                                        : 'text-neutral-600'
                                                }`}
                                            >
                                                {step}
                                            </span>
                                            {i < uc.flow.length - 1 && (
                                                <svg
                                                    viewBox="0 0 8 8"
                                                    className="h-2 w-2 shrink-0 text-neutral-700"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M2 4h4M4.5 2.5L6 4L4.5 5.5"
                                                        stroke="currentColor"
                                                        strokeWidth="1"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
