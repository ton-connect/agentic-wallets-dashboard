/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const footerColumns = [
    {
        title: 'Product',
        links: [
            { label: 'What is it?', href: '/#what-is-it' },
            { label: 'How it works?', href: '/#how-it-works' },
            { label: 'Use cases', href: '/#use-cases' },
            { label: 'Features', href: '/#features' },
            { label: 'Dashboard', href: '/#dashboard' },
            { label: 'FAQ', href: '/#faq' },
        ],
    },
    {
        title: 'Developers',
        links: [
            { label: 'MCP & CLI', href: 'https://github.com/ton-connect/kit/tree/main/packages/mcp' },
            { label: 'Contracts on GitHub', href: 'https://github.com/the-ton-tech/agentic-wallet-contract' },
            { label: 'Open dashboard', href: '/dashboard' },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'Telegram', href: 'https://t.me/ai_dev_wall' },
        ],
    },
];

export function SiteFooter() {
    return (
        <footer className="pb-6 pt-10 sm:pb-10 sm:pt-14 md:pt-16">
            <div className="mx-auto max-w-[1240px] border-t border-white/[0.05] px-6 pt-5 sm:pt-6 md:pt-8">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-10">
                    <div>
                        <span className="text-lg font-semibold tracking-tight">Agentic Wallets</span>
                        <p className="mt-3 text-sm text-neutral-600">
                            Self-custody wallets for autonomous agents on{'\u00a0'}TON.
                        </p>
                    </div>

                    {footerColumns.map((col) => (
                        <div key={col.title}>
                            <h4 className="mb-3 text-sm font-medium text-neutral-400">{col.title}</h4>
                            <ul className="flex flex-col gap-2.5">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-neutral-600 transition-colors hover:text-white"
                                            {...(link.href.startsWith('http')
                                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                                : {})}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-col items-center justify-between gap-4 pt-4 text-xs text-neutral-700 sm:mt-8 sm:flex-row sm:pt-6">
                    <p>&copy; {new Date().getFullYear()} Agentic Wallets. Built on The Open Network.</p>
                </div>
            </div>
        </footer>
    );
}
