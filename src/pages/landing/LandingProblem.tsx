/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { WalletHierarchySVG } from './LandingHero';

export function LandingProblem() {
    return (
        <section id="what-is-it" className="py-12 sm:py-20">
            <div className="mx-auto max-w-[1240px] px-6">
                <div className="grid items-center gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
                            What is it?
                        </p>
                        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                            Total privacy with complete control
                        </h2>
                        <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg">
                            Before, AI agents required either full access to your on-chain
                            assets or manual approval for each transaction.
                        </p>
                        <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg">
                            Now, you hold the master key to your main wallet, while your
                            agent holds the operator key to an isolated wallet. You set
                            the limits for the Agentic Wallet and add funds –– so the
                            agent can sign transactions autonomously
                        </p>
                        <div className="mt-6">
                            <Link
                                to="/getting-started"
                                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-base font-semibold text-on-accent transition-colors hover:bg-amber-400"
                            >
                                Give your AI agent a wallet
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <WalletHierarchySVG />
                    </div>
                </div>
            </div>
        </section>
    );
}
