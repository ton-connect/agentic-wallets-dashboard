/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Link } from 'react-router-dom';
import { useNetwork } from '@ton/appkit-react';
import { AlertTriangle } from 'lucide-react';

import type { AgentWallet } from '@/features/agents';
import { StatusDot } from '@/components/shared/status-dot';
import { CopyableAddress } from '@/components/shared/copyable-address';
import { JettonBalances } from '@/components/shared/jetton-balances';
import { NftBalances } from '@/components/shared/nft-balances';
import { formatUnitsFixed } from '@/features/agents/lib/amount';

interface AgentCardProps {
    agent: AgentWallet;
    balanceNano?: bigint;
    onFund?: () => void;
    onWithdraw?: () => void;
    onRevoke?: () => void;
}

export function AgentCard({ agent, balanceNano, onFund, onWithdraw, onRevoke }: AgentCardProps) {
    const network = useNetwork();
    const balanceStr = balanceNano != null ? formatUnitsFixed(balanceNano, 9, 2) : '—';
    const isZero = balanceNano === 0n;
    const isRevoked = agent.status === 'revoked';

    return (
        <div className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.1] hover:bg-white/[0.03] animate-slide-up">
            <Link to={`/agent/${agent.id}`} className="block flex-1">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <StatusDot status={agent.status} />
                        <div>
                            <h3 className="text-sm font-medium">{agent.name}</h3>
                            <CopyableAddress address={agent.address} />
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-1.5">
                            {isZero && <AlertTriangle size={12} className="text-neutral-400" />}
                            <span className="font-mono text-sm tabular-nums">{balanceStr} TON</span>
                        </div>
                        {isZero && <p className="mt-0.5 text-[10px] text-neutral-500">Out of funds</p>}
                    </div>
                </div>
                <div className="mt-2">
                    <JettonBalances address={agent.address} compact network={network} />
                </div>
                <div className="mt-1.5">
                    <NftBalances address={agent.address} compact network={network} />
                </div>
            </Link>

            {!isRevoked && (
                <div className="mt-auto flex items-center gap-2 border-t border-white/[0.04] pt-3">
                    <button
                        onClick={onFund}
                        className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
                    >
                        Fund
                    </button>
                    <button
                        onClick={onWithdraw}
                        className="rounded-full border border-white/[0.1] px-4 py-1.5 text-xs text-neutral-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                    >
                        Withdraw
                    </button>
                    <button
                        onClick={onRevoke}
                        className="ml-auto rounded-full border border-red-500/25 bg-red-500/10 px-4 py-1.5 text-xs text-red-300 transition-colors hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-200"
                    >
                        Revoke
                    </button>
                </div>
            )}

            {isRevoked && (
                <div className="mt-auto border-t border-white/[0.04] pt-3">
                    <p className="text-xs text-neutral-600">Operator deactivated. Agent can no longer transact.</p>
                </div>
            )}
        </div>
    );
}
