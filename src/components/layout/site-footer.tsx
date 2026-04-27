/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Monitor, Moon, Sun } from 'lucide-react';

import { useTheme } from '@/core/theme/theme-provider';
import type { ThemeMode } from '@/core/theme/theme';

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

const themeOptions: { mode: ThemeMode; label: string; icon: typeof Monitor }[] = [
    { mode: 'auto', label: 'Auto', icon: Monitor },
    { mode: 'light', label: 'Light', icon: Sun },
    { mode: 'dark', label: 'Dark', icon: Moon },
];

export function SiteFooter() {
    return (
        <footer className="pb-8 pt-12 sm:pb-16 sm:pt-24 md:pt-28">
            <div className="mx-auto max-w-6xl border-t border-white/[0.05] px-6 pt-6 sm:pt-10 md:pt-12">
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

                <div className="mt-8 flex flex-col items-center justify-between gap-4 pt-6 text-xs text-neutral-700 sm:mt-12 sm:flex-row sm:pt-8">
                    <p>&copy; {new Date().getFullYear()} Agentic Wallets. Built on The Open Network.</p>
                    {/* <ThemeSwitch /> */}
                </div>
            </div>
        </footer>
    );
}

function ThemeSwitch() {
    const { mode, setMode } = useTheme();

    return (
        <div
            className="inline-flex rounded-full border border-border bg-surface-1 p-1"
            aria-label="Theme"
            role="group"
        >
            {themeOptions.map(({ mode: optionMode, label, icon: Icon }) => {
                const isActive = mode === optionMode;

                return (
                    <button
                        key={optionMode}
                        type="button"
                        onClick={() => setMode(optionMode)}
                        className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-colors ${
                            isActive
                                ? 'bg-accent text-on-accent'
                                : 'text-tertiary hover:bg-surface-3 hover:text-primary'
                        }`}
                        aria-pressed={isActive}
                        aria-label={`${label} theme`}
                        title={`${label} theme`}
                    >
                        <Icon size={14} aria-hidden="true" />
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}
