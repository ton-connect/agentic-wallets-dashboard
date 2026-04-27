/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function DashboardMockup() {
    return (
        <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            {/* Notification banner */}
            <div className="flex flex-wrap items-center gap-2 border-b border-amber-500/10 bg-amber-500/[0.04] px-4 py-2.5">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span className="min-w-0 flex-1 text-[10px] text-amber-500/70 [overflow-wrap:anywhere]">
                    New agent wallet detected — &quot;NFT Sniper&quot;
                </span>
                <div className="flex gap-1.5 sm:ml-auto">
                    <span className="rounded border border-white/[0.06] px-1.5 py-0.5 text-[8px] text-neutral-500">
                        View
                    </span>
                    <span className="rounded border border-white/[0.06] px-1.5 py-0.5 text-[8px] text-neutral-500">
                        Revoke
                    </span>
                </div>
            </div>

            {/* Aggregated header */}
            <div className="border-b border-white/[0.06] px-5 py-4">
                <p className="text-[10px] uppercase tracking-wider text-neutral-600">Total agent balance</p>
                <p className="mt-1 font-mono text-xl font-semibold tracking-tight">57.2 TON</p>
                <p className="mt-0.5 text-[10px] text-neutral-600">3 agents active</p>
            </div>

            {/* Agent list */}
            <div className="flex flex-col">
                {[
                    { name: 'DeFi Trader', balance: '45.2', txs: '14 txs today', status: 'active' },
                    { name: 'NFT Sniper', balance: '12.0', txs: '2 txs today', status: 'active' },
                    { name: 'Rebalancer', balance: '0', txs: 'idle', status: 'empty' },
                ].map((agent, i) => (
                    <div
                        key={agent.name}
                        className={`flex items-center justify-between gap-3 px-5 py-3.5 ${
                            i < 2 ? 'border-b border-white/[0.04]' : ''
                        }`}
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <div
                                className={`h-2 w-2 rounded-full ${
                                    agent.status === 'active' ? 'bg-emerald-500' : 'bg-neutral-700'
                                }`}
                            />
                            <div className="min-w-0">
                                <span className="block truncate text-sm text-neutral-300">{agent.name}</span>
                                <span className="block text-[10px] text-neutral-600">{agent.txs}</span>
                            </div>
                        </div>
                        <span className="shrink-0 font-mono text-xs text-neutral-500">{agent.balance} TON</span>
                    </div>
                ))}
            </div>

            {/* Actions bar */}
            <div className="flex items-center gap-2 border-t border-white/[0.06] px-5 py-3">
                <div className="rounded-md border border-white/[0.08] px-3 py-1 text-[10px] text-neutral-500">Fund</div>
                <div className="rounded-md border border-white/[0.08] px-3 py-1 text-[10px] text-neutral-500">
                    Withdraw
                </div>
                <div className="rounded-md border border-white/[0.08] px-3 py-1 text-[10px] text-neutral-500">
                    Revoke
                </div>
            </div>
        </div>
    );
}

export function LandingForUsers() {
    return (
        <section id="for-users" className="border-b border-white/[0.06] py-12 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-start gap-8 sm:gap-16 lg:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
                                For Users
                            </p>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                See all your agents. Control every wallet.
                            </h2>
                        </div>

                        <p className="max-w-md text-base leading-relaxed text-neutral-400">
                            When an agent creates a wallet linked to your address, you see it in your dashboard.
                            Fund it with what you&apos;re comfortable risking. Withdraw or revoke in one tap.
                        </p>

                        <div className="flex flex-col gap-3 text-sm text-neutral-400">
                            <div className="flex items-start gap-3">
                                <span className="mt-[9px] h-px w-4 shrink-0 bg-amber-500/40" />
                                Your main wallet is never exposed to agents
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-[9px] h-px w-4 shrink-0 bg-amber-500/40" />
                                See every transaction in real time
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-[9px] h-px w-4 shrink-0 bg-amber-500/40" />
                                Unexpected activity? Revoke instantly
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-amber-400"
                            >
                                Try Dashboard
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <DashboardMockup />
                    </div>
                </div>
            </div>
        </section>
    );
}
