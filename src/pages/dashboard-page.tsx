/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useMemo, useState } from 'react';
import { useAddress } from '@ton/appkit-react';
import { useNavigate } from 'react-router-dom';

import { useAgents } from '@/features/agents';
import type { AgentWallet } from '@/features/agents';
import { ConnectPrompt } from '@/components/dashboard/connect-prompt';
import { EmptyState, LoadingState } from '@/components/dashboard/empty-state';
import { AgentStatsBar } from '@/components/dashboard/agent-stats-bar';
import { NotificationBanner } from '@/components/dashboard/notification-banner';
import { AgentCard } from '@/components/dashboard/agent-card';
import { FundModal } from '@/components/modals/fund-modal';
import { WithdrawModal } from '@/components/modals/withdraw-modal';
import { RevokeModal } from '@/components/modals/revoke-modal';
import { formatUnitsTrimmed } from '@/features/agents/lib/amount';
import { normalizeTonAddress } from '@/features/agents/lib/address';

function getAgentBalance(balanceMap: Record<string, bigint>, address: string): bigint | undefined {
    const normalized = normalizeTonAddress(address);
    if (normalized && balanceMap[normalized] != null) {
        return balanceMap[normalized];
    }
    return balanceMap[address];
}

export function DashboardPage() {
    const address = useAddress();
    const navigate = useNavigate();

    const {
        agents,
        activeAgents,
        newAgents,
        balancesByAddress,
        balancesReady,
        isLoading,
        refresh,
        collectionAddress,
        markAgentKnown,
        markAgentsKnown,
    } = useAgents();

    const [fundAgent, setFundAgent] = useState<AgentWallet | null>(null);
    const [withdrawAgent, setWithdrawAgent] = useState<AgentWallet | null>(null);
    const [revokeAgent, setRevokeAgent] = useState<AgentWallet | null>(null);

    const orderedAgents = useMemo(() => {
        return [...agents].sort((a, b) => {
            const aHasCreationDate = a.creationDateTimestamp != null;
            const bHasCreationDate = b.creationDateTimestamp != null;
            if (aHasCreationDate !== bHasCreationDate) {
                return aHasCreationDate ? -1 : 1;
            }
            if (aHasCreationDate && bHasCreationDate && a.creationDateTimestamp !== b.creationDateTimestamp) {
                return (b.creationDateTimestamp ?? 0) - (a.creationDateTimestamp ?? 0);
            }
            if (a.status !== b.status) {
                return a.status === 'active' ? -1 : 1;
            }
            if (a.isNew !== b.isNew) {
                return a.isNew ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
        });
    }, [agents]);

    const totalBalanceNano = useMemo(
        () =>
            activeAgents.reduce((acc, agent) => {
                if (agent.isPendingIndexing) {
                    return acc;
                }
                return acc + (getAgentBalance(balancesByAddress, agent.address) ?? 0n);
            }, 0n),
        [activeAgents, balancesByAddress],
    );
    const totalBalanceTon = formatUnitsTrimmed(totalBalanceNano, 9);

    if (!address) {
        return <ConnectPrompt />;
    }

    if (isLoading || !balancesReady) {
        return <LoadingState />;
    }

    if (agents.length === 0) {
        if (!collectionAddress) {
            return (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-5 text-sm text-amber-200">
                    Collection address is not configured for the current network. Switch network or set
                    `VITE_AGENTIC_COLLECTION_MAINNET`/`VITE_AGENTIC_COLLECTION_TESTNET`.
                </div>
            );
        }
        return <EmptyState />;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <AgentStatsBar agents={agents} totalBalanceTon={totalBalanceTon} />

            <NotificationBanner
                agents={newAgents}
                onView={(id) => {
                    markAgentKnown(id);
                    navigate(`/agent/${id}`);
                }}
                onRevoke={(id) => {
                    const agent = agents.find((a) => a.id === id) ?? null;
                    if (agent) {
                        markAgentKnown(id);
                        setRevokeAgent(agent);
                    }
                }}
                onMarkAllKnown={() => markAgentsKnown(newAgents.map((a) => a.id))}
            />

            <section>
                <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-neutral-500">Agents</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {orderedAgents.map((agent) => (
                        <AgentCard
                            key={agent.id}
                            agent={agent}
                            balanceNano={agent.isPendingIndexing ? undefined : getAgentBalance(balancesByAddress, agent.address)}
                            extrasEnabled={balancesReady}
                            onFund={() => {
                                markAgentKnown(agent.id);
                                setFundAgent(agent);
                            }}
                            onWithdraw={() => {
                                markAgentKnown(agent.id);
                                setWithdrawAgent(agent);
                            }}
                            onRevoke={() => {
                                markAgentKnown(agent.id);
                                setRevokeAgent(agent);
                            }}
                        />
                    ))}
                </div>
            </section>

            {fundAgent ? <FundModal agent={fundAgent} onClose={() => setFundAgent(null)} onSuccess={refresh} /> : null}
            {withdrawAgent ? (
                <WithdrawModal agent={withdrawAgent} onClose={() => setWithdrawAgent(null)} onSuccess={refresh} />
            ) : null}
            {revokeAgent ? <RevokeModal agent={revokeAgent} onClose={() => setRevokeAgent(null)} onSuccess={refresh} /> : null}
        </div>
    );
}
