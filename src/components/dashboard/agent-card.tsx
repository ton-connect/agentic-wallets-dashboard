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
import { Button } from '@/components/ui';
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
        <div className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-200 hover:border-[#0098EA]/20 hover:bg-[#0098EA]/[0.02] hover:shadow-[0_0_0_1px_rgba(0,152,234,0.08),0_8px_32px_rgba(0,0,0,0.25)] animate-slide-up">
            <Link to={`/agent/${agent.id}`} className="block flex-1 p-5">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <StatusDot status={agent.status} />
                        <div>
                            <h3 className="text-sm font-medium text-white">{agent.name}</h3>
                            <CopyableAddress address={agent.address} />
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-1.5">
                            {isZero && <AlertTriangle size={12} className="text-amber-500" />}
                            <span className="font-mono text-sm tabular-nums">{balanceStr} TON</span>
                        </div>
                        {isZero && <p className="mt-0.5 text-[10px] text-amber-500/70">Out of funds</p>}
                    </div>
                </div>
                <div className="mt-2.5">
                    <JettonBalances address={agent.address} compact network={network} />
                </div>
                <div className="mt-1.5">
                    <NftBalances address={agent.address} compact network={network} />
                </div>
            </Link>

            {!isRevoked && (
                <div className="flex items-center gap-2 border-t border-white/[0.04] px-5 py-3">
                    <Button variant="primary" size="sm" onClick={onFund}>
                        Fund
                    </Button>
                    <Button variant="secondary" size="sm" onClick={onWithdraw}>
                        Withdraw
                    </Button>
                    <Button variant="danger" size="sm" onClick={onRevoke} className="ml-auto">
                        Revoke
                    </Button>
                </div>
            )}

            {isRevoked && (
                <div className="border-t border-white/[0.04] px-5 py-3">
                    <p className="text-xs text-neutral-600">Operator deactivated. Agent can no longer transact.</p>
                </div>
            )}
        </div>
    );
}
