/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { WalletButton } from '@/components/shared/wallet-button';

function NetworkIllustration() {
    // Same proportions as the original illustration, with TON blue accents
    const lineLeft  = "M110 96 C110 130 60 130 60 152";
    const lineMid   = "M140 96 C140 120 140 135 140 152";
    const lineRight = "M170 96 C170 130 220 130 220 152";

    return (
        <svg viewBox="0 0 280 200" fill="none" className="mx-auto h-auto w-full max-w-xs" aria-hidden="true">
            {/* Subtle glow behind wallet node */}
            <ellipse cx="140" cy="68" rx="52" ry="24" fill="#0098EA" fillOpacity="0.06" />

            {/* Wallet node */}
            <rect x="90" y="40" width="100" height="56" rx="12"
                stroke="#0098EA" strokeWidth="1.2" strokeOpacity="0.45"
                fill="#0098EA" fillOpacity="0.04" />
            <text x="140" y="64" textAnchor="middle"
                fill="white" fontSize="10" fontWeight="600" fontFamily="system-ui" opacity="0.8">
                Your Wallet
            </text>
            <text x="140" y="80" textAnchor="middle"
                fill="#0098EA" fontSize="8" fontFamily="monospace" opacity="0.55">
                Connect to start
            </text>

            {/* Connection lines */}
            <path d={lineLeft}  stroke="#0098EA" strokeWidth="1"   strokeOpacity="0.2" />
            <path d={lineMid}   stroke="#0098EA" strokeWidth="1.2" strokeOpacity="0.3" />
            <path d={lineRight} stroke="#0098EA" strokeWidth="1"   strokeOpacity="0.2" />

            {/* Animated dots travelling down the lines */}
            <circle r="2" fill="#0098EA" opacity="0.75">
                <animateMotion dur="3s" repeatCount="indefinite" path={lineMid} />
            </circle>
            <circle r="1.5" fill="#0098EA" opacity="0.45">
                <animateMotion dur="4s" repeatCount="indefinite" path={lineLeft} begin="1s" />
            </circle>
            <circle r="1.5" fill="#0098EA" opacity="0.45">
                <animateMotion dur="4s" repeatCount="indefinite" path={lineRight} begin="2s" />
            </circle>

            {/* Agent nodes */}
            {([60, 140, 220] as const).map((x, i) => (
                <g key={x}>
                    <rect x={x - 30} y="152" width="60" height="32" rx="8"
                        stroke="#0098EA" strokeWidth="1" strokeOpacity="0.22"
                        strokeDasharray={i === 1 ? undefined : "4 3"}
                        fill="#0098EA" fillOpacity={i === 1 ? 0.04 : 0.01} />
                    <text x={x} y="172" textAnchor="middle"
                        fill="white" fontSize="7" fontFamily="monospace"
                        opacity={i === 1 ? 0.45 : 0.22}>
                        agent
                    </text>
                </g>
            ))}
        </svg>
    );
}

export function ConnectPrompt() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 animate-fade-in">
            <NetworkIllustration />
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Connect your wallet</h2>
                <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-neutral-500">
                    Connect your TON wallet to see and manage agent wallets linked to your address.
                </p>
            </div>
            <WalletButton />
        </div>
    );
}
