/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'What is it?', href: '#what-is-it' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'For Developers', href: '#for-developers' },
    { label: 'For Users', href: '#for-users' },
    { label: 'Getting Started', href: '/getting-started' },
    { label: 'FAQ', href: '#faq' },
];

function AgentLogo() {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="26" height="26" rx="8" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
            <rect x="5" y="5" width="8" height="8" rx="2" fill="#f59e0b" fillOpacity="0.8" />
            <rect x="15" y="5" width="8" height="8" rx="2" fill="white" fillOpacity="0.15" />
            <rect x="5" y="15" width="8" height="8" rx="2" fill="white" fillOpacity="0.15" />
            <rect x="15" y="15" width="8" height="8" rx="2" fill="white" fillOpacity="0.08" />
        </svg>
    );
}

export function LandingHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <a href="#" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
                    <AgentLogo />
                    Agentic Wallets
                </a>

                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-neutral-400 transition-colors hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/getting-started"
                        className="rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-400"
                    >
                        Get Started
                    </a>
                </nav>

                <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {mobileOpen && (
                <nav className="flex flex-col gap-4 border-t border-white/[0.06] px-6 py-6 md:hidden">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-neutral-400 transition-colors hover:text-white"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/getting-started"
                        className="mt-2 inline-block rounded-full bg-amber-500 px-5 py-2 text-center text-sm font-medium text-black transition-colors hover:bg-amber-400"
                        onClick={() => setMobileOpen(false)}
                    >
                        Get Started
                    </a>
                </nav>
            )}
        </header>
    );
}
