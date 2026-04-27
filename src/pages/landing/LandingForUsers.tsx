/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LandingForUsers() {
    return (
        <section id="dashboard" className="border-b border-white/[0.06] py-12 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Control all wallets from a single dashboard
                        </h2>
                    </div>

                    <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                        <span className="md:whitespace-nowrap">
                            When an agent creates a wallet linked to your address, it appears in your dashboard.
                        </span>
                        <br />
                        Fund, monitor, withdraw or revoke in one tap
                    </p>

                    <div className="pt-2">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-amber-400"
                        >
                            View dashboard
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
