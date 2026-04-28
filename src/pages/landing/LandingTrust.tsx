/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const trustPoints = [
    {
        number: '01',
        label: 'On-chain contracts',
        description: 'Every wallet is a real smart contract. Verifiable. Auditable. No server to trust.',
    },
    {
        number: '02',
        label: 'Self-custody keys',
        description: 'Operator key compromised — owner revokes. Owner key is never shared with agents.',
    },
    {
        number: '03',
        label: 'Atomic revoke',
        description:
            "Revoke = withdraw all funds + deactivate operator. One transaction. Agent can't spend in between.",
    },
    {
        number: '04',
        label: 'Open source',
        description: 'Contract code, SDK, and dashboard — all open. Verify everything, trust nothing.',
    },
];

export function LandingTrust() {
    return (
        <section className="border-b border-white/[0.06] py-24">
            <div className="mx-auto max-w-[1240px] px-6">
                <div className="mb-16 text-center">
                    <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
                        Trust & Security
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        No middleware. No platform keys.
                    </h2>
                    <p className="mt-4 text-neutral-400">
                        Everything lives on-chain where you can verify it.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    {trustPoints.map((point) => (
                        <div
                            key={point.label}
                            className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                        >
                            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-3">
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10 font-mono text-[10px] font-bold text-amber-500">
                                    {point.number}
                                </span>
                                <span className="text-sm font-semibold text-neutral-200">
                                    {point.label}
                                </span>
                            </div>
                            <div className="px-5 py-4">
                                <p className="text-sm leading-relaxed text-neutral-400">
                                    {point.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
