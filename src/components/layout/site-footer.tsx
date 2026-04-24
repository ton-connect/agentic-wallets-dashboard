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
            { label: 'General info', href: 'https://ton.org/dev/agentic-wallets' },
            { label: 'Documentation', href: 'https://docs.ton.org/ecosystem/ai/wallets' },
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
        <footer className="pb-8 pt-12 sm:pb-16 sm:pt-20">
            <div className="mx-auto max-w-6xl px-6">
                {/* Top accent line */}
                <div className="mb-10 h-px bg-gradient-to-r from-transparent via-[#0098EA]/20 to-transparent sm:mb-14" />

                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <FooterLogo />
                            <span className="text-sm font-semibold tracking-tight">Agentic Wallets</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                            Self-custody wallets for autonomous agents on TON.
                        </p>
                    </div>

                    {footerColumns.map((col) => (
                        <div key={col.title}>
                            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600">
                                {col.title}
                            </h4>
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

                <div className="mt-10 pt-6 text-center text-xs text-neutral-700 sm:mt-14 sm:pt-8">
                    &copy; {new Date().getFullYear()} Agentic Wallets. Built on The Open Network.
                </div>
            </div>
        </footer>
    );
}

function FooterLogo() {
    return (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="26" height="26" rx="8" stroke="white" strokeWidth="1" strokeOpacity="0.1" />
            <rect x="5" y="5" width="8" height="8" rx="2" fill="#0098EA" fillOpacity="0.7" />
            <rect x="15" y="5" width="8" height="8" rx="2" fill="#0098EA" fillOpacity="0.2" />
            <rect x="5" y="15" width="8" height="8" rx="2" fill="#0098EA" fillOpacity="0.12" />
            <rect x="15" y="15" width="8" height="8" rx="2" fill="white" fillOpacity="0.05" />
        </svg>
    );
}
