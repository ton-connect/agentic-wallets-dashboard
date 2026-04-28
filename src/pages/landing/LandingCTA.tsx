/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Link } from 'react-router-dom';

import { trackLandingCtaClick } from '@/core/analytics/google-analytics';

export function LandingCTA() {
    return (
        <section id="get-started" className="py-12 sm:py-20">
            <div className="mx-auto max-w-[1240px] px-6">
                <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] px-5 py-10 text-center sm:px-8 sm:py-20">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Ready to give agents their own wallet?
                    </h2>

                    <div className="mt-6 flex flex-wrap justify-center gap-4 sm:mt-8">
                        <Link
                            to="/getting-started"
                            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-base font-semibold text-on-accent transition-colors hover:bg-amber-400"
                            onClick={() =>
                                trackLandingCtaClick({
                                    label: 'Create a wallet for your agent',
                                    destination: '/getting-started',
                                    section: 'get-started',
                                })
                            }
                        >
                            Create a wallet for your agent
                        </Link>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/[0.04]"
                            onClick={() =>
                                trackLandingCtaClick({
                                    label: 'Try dashboard',
                                    destination: '/dashboard',
                                    section: 'get-started',
                                })
                            }
                        >
                            Try dashboard
                        </Link>
                        <a
                            href="https://github.com/the-ton-tech/agentic-wallet-contract"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/[0.04]"
                            onClick={() =>
                                trackLandingCtaClick({
                                    label: 'Smart contracts on GitHub',
                                    destination: 'https://github.com/the-ton-tech/agentic-wallet-contract',
                                    section: 'get-started',
                                })
                            }
                        >
                            Smart contracts on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
