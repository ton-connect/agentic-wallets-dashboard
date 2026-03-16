/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ReactNode } from 'react';

const pillars: { title: string; description: string; icon: ReactNode }[] = [
    {
        title: 'Isolation',
        description:
            "Each agent gets a separate on-chain wallet. A bug in one agent doesn't touch your other wallets.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="h-5 w-5" aria-hidden="true">
                <rect x="4" y="4" width="17" height="17" rx="4" stroke="#f59e0b" strokeWidth="1.2" />
                <rect x="27" y="4" width="17" height="17" rx="4" stroke="white" strokeWidth="1.2" strokeOpacity="0.35" />
                <rect x="4" y="27" width="17" height="17" rx="4" stroke="white" strokeWidth="1.2" strokeOpacity="0.35" />
                <rect x="27" y="27" width="17" height="17" rx="4" stroke="white" strokeWidth="1.2" strokeOpacity="0.15" />
                <circle cx="12.5" cy="12.5" r="2" fill="#f59e0b" opacity="0.6" />
            </svg>
        ),
    },
    {
        title: 'Self-custody',
        description:
            'Agent owns the operator key, you own the master key. Keys never live on a platform server.',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="h-5 w-5" aria-hidden="true">
                <circle cx="14" cy="16" r="7" stroke="#f59e0b" strokeWidth="1.2" />
                <line x1="21" y1="16" x2="36" y2="16" stroke="#f59e0b" strokeWidth="1.2" />
                <line x1="32" y1="16" x2="32" y2="21" stroke="#f59e0b" strokeWidth="1.2" />
                <line x1="28" y1="16" x2="28" y2="20" stroke="#f59e0b" strokeWidth="1.2" />
                <circle cx="34" cy="34" r="5" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                <line x1="29" y1="34" x2="18" y2="34" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                <line x1="22" y1="34" x2="22" y2="30" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                <line x1="18" y1="22" x2="30" y2="30" stroke="white" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="2 2" />
            </svg>
        ),
    },
    {
        title: 'Control',
        description: 'Withdraw funds or revoke access. One tap. On-chain. The owner always wins.',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M24 8V24" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" />
                <path
                    d="M34 14C37.3 17.3 38 22 36 26C34 30 30 33 24 33C18 33 14 30 12 26C10 22 10.7 17.3 14 14"
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeOpacity="0.5"
                />
                <line x1="10" y1="42" x2="38" y2="42" stroke="white" strokeWidth="1" strokeOpacity="0.15" />
            </svg>
        ),
    },
];

export function LandingValueProps() {
    return (
        <section className="border-b border-white/[0.06] py-12 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-start gap-8 sm:gap-16 lg:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
                                Trust & Security
                            </p>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                No middleware. No platform keys.
                            </h2>
                        </div>

                        <p className="text-base leading-relaxed text-neutral-400">
                            Everything lives on-chain where you can verify it. Contract code, SDK, and
                            dashboard — all open source. Verify everything, trust nothing.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        {pillars.map((pillar) => (
                            <div key={pillar.title} className="flex items-start gap-4">
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                                    {pillar.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-neutral-200">{pillar.title}</p>
                                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">{pillar.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
