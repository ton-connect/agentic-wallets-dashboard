/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const principles = [
    {
        title: 'Self-custody.',
        description:
            'The user holds the master key. The agent operates with its own operator key — your seed phrase is never shared or exposed.',
    },
    {
        title: 'Control.',
        description:
            'Each agent gets its own isolated wallet. You set its limits and monitor activity via a dashboard –– where you can revoke access at any time.',
    },
    {
        title: 'Adaptable.',
        description:
            'Works with any AI agent — Claude, ChatGPT, OpenClaw, Cursor and others. Share the link with the AI agent of your choice and let it do the rest.',
    },
];

export function LandingValueProps() {
    return (
        <section id="features" className="border-b border-white/[0.06] py-12 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-6 text-center sm:mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Core principles
                    </h2>
                </div>

                <ul className="mx-auto flex max-w-4xl list-disc flex-col gap-5 pl-5 text-base leading-relaxed text-neutral-500 marker:text-amber-500 sm:gap-6">
                    {principles.map((principle) => (
                        <li key={principle.title} className="pl-1">
                            <span className="font-semibold text-neutral-200">{principle.title}</span>{' '}
                            {principle.description}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
