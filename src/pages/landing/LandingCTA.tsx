/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArrowRight } from 'lucide-react';

export function LandingCTA() {
    return (
        <section id="get-started" className="border-b border-white/[0.06] py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] px-8 py-20 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Ready to give agents their own wallet?
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-neutral-400">
                        Self-custody. On-chain. Permissionless. Start building with agentic wallets today.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            href="/getting-started"
                            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-amber-400"
                        >
                            Start Building
                            <ArrowRight size={16} />
                        </a>
                        <a
                            href="/dashboard"
                            className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.04]"
                        >
                            Try Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
