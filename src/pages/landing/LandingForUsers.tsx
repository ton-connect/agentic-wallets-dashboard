/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const dashboardWallets = [
    {
        name: 'Trading Bot',
        detail: '24.8 TON - Active',
    },
    {
        name: 'DeFi Agent',
        detail: '12.0 TON - Monitoring',
    },
    {
        name: 'Payment Agent',
        detail: '6.5 TON - Scheduled',
    },
];

export function LandingForUsers() {
    return (
        <section id="dashboard" className="border-b border-white/[0.06] py-12 sm:py-24">
            <div className="mx-auto max-w-[1240px] px-6">
                <div className="grid items-center gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] xl:gap-16">
                    <div className="flex flex-col items-center gap-6 text-center xl:items-start xl:text-left">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Control all wallets from a single dashboard
                            </h2>
                        </div>

                        <p className="max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
                            <span className="md:whitespace-nowrap">
                                When an agent creates a wallet linked to your address, it appears in your dashboard.
                            </span>
                            <br />
                            Fund, monitor, withdraw or revoke in one tap
                        </p>

                        <div className="pt-2">
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-base font-semibold text-on-accent transition-colors hover:bg-amber-400"
                            >
                                View dashboard
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                            <span className="text-sm font-semibold text-neutral-200">Agent wallets</span>
                            <span className="text-xs text-amber-500">Dashboard</span>
                        </div>
                        <div className="divide-y divide-white/[0.06]">
                            {dashboardWallets.map((wallet) => (
                                <div
                                    key={wallet.name}
                                    className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-neutral-200">{wallet.name}</p>
                                        <p className="mt-1 text-xs text-neutral-500">{wallet.detail}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['Fund', 'Monitor', 'Revoke'].map((action) => (
                                            <span
                                                key={action}
                                                className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-neutral-400"
                                            >
                                                {action}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
