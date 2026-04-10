/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Spinner } from '@/components/ui';

function ConnectedIllustration({ animate }: { animate?: boolean }) {
    const lineLeft  = "M110 96 C110 130 60 130 60 152";
    const lineMid   = "M140 96 C140 120 140 135 140 152";
    const lineRight = "M170 96 C170 130 220 130 220 152";

    return (
        <svg viewBox="0 0 280 200" fill="none" className="mx-auto h-auto w-full max-w-xs" aria-hidden="true">
            <ellipse cx="140" cy="68" rx="52" ry="24" fill="#0098EA" fillOpacity="0.06" />

            <rect x="90" y="40" width="100" height="56" rx="12"
                stroke="#0098EA" strokeWidth="1.2" strokeOpacity="0.55"
                fill="#0098EA" fillOpacity="0.05" />
            <text x="140" y="64" textAnchor="middle"
                fill="white" fontSize="10" fontWeight="600" fontFamily="system-ui" opacity="0.8">
                Your Wallet
            </text>
            <text x="140" y="80" textAnchor="middle"
                fill="#0098EA" fontSize="8" fontFamily="monospace" opacity="0.75">
                connected
            </text>

            <path d={lineLeft}  stroke="#0098EA" strokeWidth="1"   strokeOpacity="0.2" />
            <path d={lineMid}   stroke="#0098EA" strokeWidth="1.2" strokeOpacity="0.3" />
            <path d={lineRight} stroke="#0098EA" strokeWidth="1"   strokeOpacity="0.2" />

            {animate && (
                <>
                    <circle r="2" fill="#0098EA" opacity="0.75">
                        <animateMotion dur="3s" repeatCount="indefinite" path={lineMid} />
                    </circle>
                    <circle r="1.5" fill="#0098EA" opacity="0.45">
                        <animateMotion dur="4s" repeatCount="indefinite" path={lineLeft} begin="0.8s" />
                    </circle>
                    <circle r="1.5" fill="#0098EA" opacity="0.45">
                        <animateMotion dur="4s" repeatCount="indefinite" path={lineRight} begin="2s" />
                    </circle>
                </>
            )}

            {([60, 140, 220] as const).map((x) => (
                <g key={x}>
                    <rect x={x - 30} y="152" width="60" height="32" rx="8"
                        stroke="#0098EA" strokeWidth="1" strokeOpacity="0.2"
                        strokeDasharray="4 3" fill="#0098EA" fillOpacity="0.015" />
                    <text x={x} y="172" textAnchor="middle"
                        fill="white" fontSize="7" fontFamily="monospace" opacity="0.25">
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
            <ConnectedIllustration animate />
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Looking for your wallets...</h2>
                <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-neutral-500">
                    Checking on-chain data for agentic wallets linked to your address.
                </p>
            </div>
            <Spinner className="h-6 w-6" />
        </div>
    );
}

export function EmptyState() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 animate-fade-in">
            <ConnectedIllustration />
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">No agents connected</h2>
                <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-neutral-500">
                    Get started in two steps:
                </p>
            </div>
            <div className="w-full max-w-xs rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="flex flex-col gap-5">
                    <Step number={1} label="Install TON skills">
                        <code className="mt-1.5 block font-mono text-xs text-neutral-500">
                            $ npx skills add ton-connect/kit/packages/mcp
                        </code>
                    </Step>
                    <div className="h-px bg-white/[0.04]" />
                    <Step number={2} label="Ask your AI agent">
                        <p className="mt-1.5 font-mono text-xs text-neutral-500">
                            &gt; Create agentic wallet
                        </p>
                    </Step>
                </div>
                <div className="mt-5 border-t border-white/[0.04] pt-4 text-center">
                    <a href="https://testing-builders.dev-internal.org/agents" className="text-xs text-neutral-600 transition-colors hover:text-white">
                        Learn more →
                    </a>
                </div>
            </div>
        </div>
    );
}

function Step({ number, label, children }: { number: number; label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#0098EA]/10 font-mono text-[10px] font-bold text-[#0098EA]">
                {number}
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-neutral-300">{label}</p>
                {children}
            </div>
        </div>
    );
}
