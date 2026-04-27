/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function ProblemIllustration() {
    return (
        <svg viewBox="0 0 320 260" fill="none" className="mx-auto h-auto w-full max-w-xs" aria-hidden="true">
            {/* Central wallet — under pressure */}
            <rect x="110" y="80" width="100" height="52" rx="10" stroke="currentColor" strokeWidth="1.5" />
            <text
                x="160"
                y="104"
                textAnchor="middle"
                fill="currentColor"
                fontSize="10"
                fontWeight="600"
                fontFamily="system-ui"
            >
                Your Wallet
            </text>
            <text x="160" y="120" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0.4">
                $10,000
            </text>

            {/* Agents reaching in — arrows pointing AT the wallet */}
            {/* Top-left agent */}
            <circle cx="40" cy="30" r="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
            <text x="40" y="34" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.3">
                Bot
            </text>
            <line x1="54" y1="42" x2="112" y2="82" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
            <polygon points="112,82 104,78 106,86" fill="currentColor" fillOpacity="0.15" />

            {/* Top-right agent */}
            <circle cx="280" cy="30" r="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
            <text x="280" y="34" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.3">
                AI
            </text>
            <line x1="266" y1="42" x2="208" y2="82" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
            <polygon points="208,82 214,78 216,86" fill="currentColor" fillOpacity="0.15" />

            {/* Left agent */}
            <circle cx="20" cy="106" r="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
            <text x="20" y="110" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.3">
                App
            </text>
            <line x1="36" y1="106" x2="110" y2="106" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
            <polygon points="110,106 102,102 102,110" fill="currentColor" fillOpacity="0.15" />

            {/* Right agent */}
            <circle cx="300" cy="106" r="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
            <text x="300" y="110" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.3">
                API
            </text>
            <line x1="284" y1="106" x2="210" y2="106" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
            <polygon points="210,106 218,102 218,110" fill="currentColor" fillOpacity="0.15" />

            {/* Bottom agent */}
            <circle cx="160" cy="200" r="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
            <text x="160" y="204" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.3">
                DeFi
            </text>
            <line x1="160" y1="184" x2="160" y2="132" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
            <polygon points="160,132 156,140 164,140" fill="currentColor" fillOpacity="0.15" />

            {/* Danger label */}
            <text x="160" y="248" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0.1">
                all agents → one wallet → one key
            </text>
        </svg>
    );
}

export function LandingProblem() {
    return (
        <section id="what-is-it" className="border-b border-white/[0.06] py-12 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-center gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-amber-500">
                            The Problem
                        </p>
                        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                            AI agents can interact with services.{' '}
                            <span className="text-neutral-500">
                                But they can&apos;t hold money without holding your&nbsp;keys.
                            </span>
                        </h2>
                        <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-400">
                            AI agents are becoming users of digital services — paying for APIs,
                            interacting with DeFi protocols, communicating with other agents. But
                            today, every transaction stops and waits for you to press a button.
                        </p>
                        <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-400">
                            In the Telegram and TON ecosystem, agents need a building block that
                            gives them access to funds and services — without requiring your keys.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <ProblemIllustration />
                    </div>
                </div>
            </div>
        </section>
    );
}
