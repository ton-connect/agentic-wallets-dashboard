/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArrowRight } from 'lucide-react';

function WalletHierarchySVG() {
    return (
        <svg viewBox="0 0 400 360" fill="none" className="mx-auto h-auto w-full max-w-md" aria-hidden="true">
            {/* Master node — central, prominent */}
            <rect x="140" y="24" width="120" height="52" rx="12" stroke="white" strokeWidth="1.5" />
            <text x="200" y="48" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="system-ui">
                Your Wallet
            </text>
            <text x="200" y="64" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" opacity="0.3">
                EQ...abc
            </text>

            {/* Branching paths — curves not straight lines */}
            <path d="M170 76 C170 120 72 120 72 156" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
            <path d="M200 76 C200 110 200 130 200 156" stroke="white" strokeWidth="1" strokeOpacity="0.35" />
            <path d="M230 76 C230 120 328 120 328 156" stroke="white" strokeWidth="1" strokeOpacity="0.2" />

            {/* Animated dots traveling down paths */}
            <circle r="2" fill="#f59e0b" opacity="0.8">
                <animateMotion dur="3s" repeatCount="indefinite" path="M200 76 C200 110 200 130 200 156" />
            </circle>
            <circle r="1.5" fill="white" opacity="0.3">
                <animateMotion dur="4s" repeatCount="indefinite" path="M170 76 C170 120 72 120 72 156" begin="1s" />
            </circle>
            <circle r="1.5" fill="white" opacity="0.3">
                <animateMotion dur="4s" repeatCount="indefinite" path="M230 76 C230 120 328 120 328 156" begin="2s" />
            </circle>

            {/* Center wallet — highlighted */}
            <rect x="140" y="156" width="120" height="64" rx="12" stroke="white" strokeWidth="1" />
            <text x="156" y="174" fill="#f59e0b" fontSize="8" fontWeight="600" fontFamily="system-ui">
                AGENT
            </text>
            <text x="200" y="192" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui">
                Trader
            </text>
            <text x="200" y="208" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" opacity="0.5">
                50 TON
            </text>

            {/* Left sub-wallet — dimmer */}
            <rect x="12" y="156" width="120" height="64" rx="12" stroke="white" strokeWidth="1" strokeOpacity="0.25" />
            <text x="28" y="174" fill="#f59e0b" fontSize="8" fontWeight="600" fontFamily="system-ui" opacity="0.3">
                AGENT
            </text>
            <text x="72" y="192" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui" opacity="0.35">
                Rebalancer
            </text>
            <text x="72" y="208" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" opacity="0.2">
                120 TON
            </text>

            {/* Right sub-wallet — dimmer */}
            <rect x="268" y="156" width="120" height="64" rx="12" stroke="white" strokeWidth="1" strokeOpacity="0.25" />
            <text x="284" y="174" fill="#f59e0b" fontSize="8" fontWeight="600" fontFamily="system-ui" opacity="0.3">
                AGENT
            </text>
            <text x="328" y="192" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui" opacity="0.35">
                Payouts
            </text>
            <text x="328" y="208" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" opacity="0.2">
                200 TON
            </text>

            {/* Withdraw dashed line going back up to master wallet */}
            <path d="M214 150 L214 84" stroke="white" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3" />
            <polygon points="214,80 210,88 218,88" fill="white" fillOpacity="0.25" />
            <text x="222" y="120" fill="white" fontSize="8" fontFamily="monospace" opacity="0.3">
                withdraw
            </text>

            {/* Bottom status line */}
            <line x1="60" y1="248" x2="340" y2="248" stroke="white" strokeWidth="1" strokeOpacity="0.06" />
            <text x="200" y="268" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" opacity="0.15">
                on-chain · permissionless · self-custody
            </text>
        </svg>
    );
}

export function LandingHero() {
    return (
        <section className="relative overflow-hidden border-b border-white/[0.06]">
            <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:pt-32">
                <div className="flex flex-col gap-8">
                    <div>
                        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-amber-500">
                            Agentic Wallets on TON
                        </p>
                        <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                            Self-custody wallets for autonomous&nbsp;agents
                        </h1>
                    </div>

                    <p className="max-w-lg text-lg leading-relaxed text-neutral-400">
                        Create a wallet for your agent in 3 steps. User keeps the master key. Agent keeps the operator
                        key. On-chain, permissionless, no vendor lock-in.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#for-developers"
                            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-amber-400"
                        >
                            For Developers
                            <ArrowRight size={16} />
                        </a>
                        <a
                            href="#for-users"
                            className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.04]"
                        >
                            For Users
                        </a>
                    </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                    <WalletHierarchySVG />
                </div>
            </div>
        </section>
    );
}
