/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export function WalletHierarchySVG() {
    return (
        <svg viewBox="0 0 400 248" fill="none" className="mx-auto h-auto w-full max-w-md" aria-hidden="true">
            {/* Master node — central, prominent */}
            <rect x="140" y="24" width="120" height="52" rx="12" stroke="currentColor" strokeWidth="1.5" />
            <text x="200" y="52" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600" fontFamily="system-ui">
                Your Wallet
            </text>

            {/* Branching paths — curves not straight lines */}
            <path d="M170 76 C170 120 72 120 72 156" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
            <path d="M200 76 C200 110 200 130 200 156" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
            <path d="M230 76 C230 120 328 120 328 156" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

            {/* Dots along each branch — center accent, sides subtle */}
            <circle r="2" fill="var(--accent-default)" opacity="0.85">
                <animateMotion dur="5s" repeatCount="indefinite" path="M200 76 C200 110 200 130 200 156" />
            </circle>
            <circle r="1.5" fill="currentColor" opacity="0.2">
                <animateMotion dur="5.5s" repeatCount="indefinite" path="M170 76 C170 120 72 120 72 156" begin="0.8s" />
            </circle>
            <circle r="1.5" fill="currentColor" opacity="0.2">
                <animateMotion dur="5.5s" repeatCount="indefinite" path="M230 76 C230 120 328 120 328 156" begin="1.6s" />
            </circle>

            {/* Center wallet — highlighted (OpenClaw) */}
            <rect x="140" y="156" width="120" height="64" rx="12" stroke="currentColor" strokeWidth="1" />
            <text x="200" y="186" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="system-ui">
                OpenClaw
            </text>
            <text x="200" y="204" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="monospace" opacity="0.5">
                50 TON
            </text>

            {/* Left sub-wallet — dimmer (Claude) */}
            <rect x="12" y="156" width="120" height="64" rx="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
            <text x="72" y="186" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="system-ui" opacity="0.35">
                Claude
            </text>
            <text x="72" y="204" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="monospace" opacity="0.2">
                120 TON
            </text>

            {/* Right sub-wallet — dimmer (ChatGPT) */}
            <rect x="268" y="156" width="120" height="64" rx="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
            <text x="328" y="186" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="system-ui" opacity="0.35">
                ChatGPT
            </text>
            <text x="328" y="204" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="monospace" opacity="0.2">
                200 TON
            </text>

            {/* Withdraw dashed line going back up to master wallet */}
            <path d="M214 150 L214 84" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3" />
            <polygon points="214,80 210,88 218,88" fill="currentColor" fillOpacity="0.25" />
            <text x="222" y="120" fill="currentColor" fontSize="8" fontFamily="system-ui" opacity="0.35">
                Withdraw
            </text>
        </svg>
    );
}

export function LandingHero() {
    return (
        <section className="relative overflow-hidden">
            <div className="mx-auto flex max-w-[1240px] justify-center px-6 pb-12 pt-12 text-center sm:pb-24 sm:pt-20 lg:pt-32">
                <div className="flex max-w-4xl flex-col items-center gap-8">
                    <div>
                        <div>
                            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-5xl">
                                Agentic Wallets on TON
                            </h1>

                            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
                                Set up isolated self-custodial wallets for AI agents in 5 minutes and let them transact autonomously
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


