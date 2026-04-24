/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Link } from 'react-router-dom';

import type { AgentWallet } from '@/features/agents';
import { formatUiAmountFixed } from '@/features/agents/lib/amount';

export function AgentStatsBar({ agents, activeAgents, totalBalanceTon }: { agents: AgentWallet[]; activeAgents: AgentWallet[]; totalBalanceTon: string }) {
    const revokedCount = agents.length - activeAgents.length;

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <Stat label={activeAgents.length === 1 ? 'agent active' : 'agents active'} value={String(activeAgents.length)} />
                <Separator />
                <Stat label="Total balance" value={`${formatUiAmountFixed(totalBalanceTon, 2)} TON`} />
                {revokedCount > 0 && (
                    <>
                        <Separator />
                        <span className="text-sm text-neutral-600">{revokedCount} revoked</span>
                    </>
                )}
            </div>

            <Link
                to="/create"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-200 transition-colors hover:border-white/[0.16] hover:bg-white/[0.08] hover:text-white sm:w-auto"
            >
                Create new wallet
            </Link>
        </div>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <span className="text-sm text-neutral-500">
            <span className="font-semibold text-white">{value}</span>{' '}
            {label}
        </span>
    );
}

function Separator() {
    return <span className="h-3 w-px bg-white/[0.08]" />;
}
