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
        <section id="dashboard" className="py-12 sm:py-20">
            <div className="mx-auto max-w-[1240px] px-6">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-6 text-center sm:mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Control all wallets from a single dashboard
                        </h2>
                    </div>

                    <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-neutral-400 sm:text-lg">
                        <span className="md:whitespace-nowrap">
                            When an agent creates a wallet linked to your address, it appears in your dashboard.
                        </span>
                        <br />
                        Fund, monitor, withdraw or revoke in one tap
                    </p>

                    <div className="mt-6 flex justify-center sm:mt-8">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-base font-semibold text-on-accent transition-colors hover:bg-amber-400"
                        >
                            View dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
