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
            { label: 'How It Works', href: '/#how-it-works' },
            { label: 'For Developers', href: '/#for-developers' },
            { label: 'For Users', href: '/#for-users' },
            { label: 'FAQ', href: '/#faq' },
        ],
    },
    {
        title: 'Developers',
        links: [
            { label: 'MCP & CLI', href: 'https://github.com/ton-connect/kit/tree/main/packages/mcp' },
            { label: 'Contracts', href: 'https://github.com/the-ton-tech/agentic-wallet-contract' },
            { label: 'Dashboard', href: '/dashboard' },
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
        <footer className="pb-16 pt-24 md:pt-28">
            <div className="mx-auto max-w-6xl border-t border-white/[0.05] px-6 pt-10 md:pt-12">
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <span className="text-lg font-semibold tracking-tight">Agentic Wallets</span>
                        <p className="mt-3 text-sm text-neutral-600">
                            Self-custody wallets for autonomous agents on TON.
                        </p>
                    </div>

                    {footerColumns.map((col) => (
                        <div key={col.title}>
                            <h4 className="mb-4 text-sm font-medium text-neutral-400">{col.title}</h4>
                            <ul className="flex flex-col gap-3">
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

                <div className="mt-12 pt-8 text-center text-xs text-neutral-700">
                    &copy; {new Date().getFullYear()} Agentic Wallets. Built on The Open Network.
                </div>
            </div>
        </footer>
    );
}
