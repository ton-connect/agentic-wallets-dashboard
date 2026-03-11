/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Link } from 'react-router-dom';

import { WalletButton } from '@/components/shared/wallet-button';

export function DashboardHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-6">
                    <Link to="/dashboard" className="flex items-center gap-2.5">
                        <AgentLogo />
                        <span className="text-lg font-semibold tracking-tight">
                            Agentic Wallets
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-sm text-neutral-400 transition-colors hover:text-white"
                        >
                            About
                        </Link>
                        <Link
                            to="/create"
                            className="text-sm text-neutral-400 transition-colors hover:text-white"
                        >
                            Create
                        </Link>
                    </nav>
                </div>
                <WalletButton />
            </div>
        </header>
    );
}

function AgentLogo() {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="26" height="26" rx="8" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
            <rect x="5" y="5" width="8" height="8" rx="2" fill="#f59e0b" fillOpacity="0.8" />
            <rect x="15" y="5" width="8" height="8" rx="2" fill="white" fillOpacity="0.15" />
            <rect x="5" y="15" width="8" height="8" rx="2" fill="white" fillOpacity="0.15" />
            <rect x="15" y="15" width="8" height="8" rx="2" fill="white" fillOpacity="0.08" />
        </svg>
    );
}
