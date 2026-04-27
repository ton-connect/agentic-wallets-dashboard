/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function WalletIllustration({ animate }: { animate?: boolean }) {
    return (
        <svg viewBox="0 0 280 200" fill="none" className="mx-auto h-auto w-full max-w-xs" aria-hidden="true">
            <rect x="90" y="40" width="100" height="56" rx="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <text
                x="140"
                y="64"
                textAnchor="middle"
                fill="currentColor"
                fontSize="10"
                fontWeight="600"
                fontFamily="system-ui"
                opacity="0.7"
            >
                Your Wallet
            </text>
            <text x="140" y="80" textAnchor="middle" fill="var(--accent-default)" fontSize="8" fontFamily="monospace" opacity="0.7">
                connected
            </text>

            <path d="M110 96 C110 130 60 130 60 152" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
            <path d="M140 96 C140 120 140 135 140 152" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
            <path d="M170 96 C170 130 220 130 220 152" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

            {animate && (
                <>
                    <circle r="2" fill="var(--accent-default)" opacity="0.8">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M140 96 C140 120 140 135 140 152" />
                    </circle>
                    <circle r="1.5" fill="currentColor" opacity="0.4">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M110 96 C110 130 60 130 60 152" begin="1s" />
                    </circle>
                    <circle r="1.5" fill="currentColor" opacity="0.4">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M170 96 C170 130 220 130 220 152" begin="2s" />
                    </circle>
                </>
            )}

            {[60, 140, 220].map((x) => (
                <g key={x}>
                    <rect
                        x={x - 30}
                        y="152"
                        width="60"
                        height="32"
                        rx="8"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeOpacity="0.2"
                        strokeDasharray="4 4"
                    />
                    <text
                        x={x}
                        y="172"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="7"
                        fontFamily="monospace"
                        opacity="0.3"
                    >
                        agent
                    </text>
                </g>
            ))}
        </svg>
    );
}

export function LoadingState() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 animate-fade-in">
            <WalletIllustration animate />
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Looking for your wallets...</h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-400">
                    Checking on-chain data for agentic wallets linked to your address.
                </p>
            </div>
            <div className="flex h-9 items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-amber-500" />
            </div>
        </div>
    );
}

export function EmptyState() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 animate-fade-in">
            <WalletIllustration />
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">No agents connected</h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-400">
                    Get started in two steps:
                </p>
            </div>
            <div className="h-9">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 text-sm">
                    <div className="flex items-start gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-500/10 font-mono text-[10px] font-bold text-amber-500">
                            1
                        </span>
                        <div>
                            <p className="text-neutral-300">Install TON skills</p>
                            <code className="mt-1 block font-mono text-xs text-neutral-500">
                                $ npx skills add ton-connect/kit/packages/mcp
                            </code>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-500/10 font-mono text-[10px] font-bold text-amber-500">
                            2
                        </span>
                        <div>
                            <p className="text-neutral-300">Ask your AI agent</p>
                            <p className="mt-1 font-mono text-xs text-neutral-500">
                                &gt; Create agentic wallet
                            </p>
                        </div>
                    </div>
                </div>

                <a
                    href="/"
                    className="text-sm text-neutral-500 transition-colors hover:text-white"
                >
                    Learn more
                </a>
            </div>
            </div>
        </div>
    );
}
