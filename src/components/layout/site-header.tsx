/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { WalletButton } from '@/components/shared/wallet-button';

type NavItem = {
    label: string;
    href: string;
    external?: boolean;
};

const navItems: NavItem[] = [
    { label: 'Get started', href: '/getting-started' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Read more', href: 'https://ton.org/dev/agentic-wallets', external: true },
    { label: 'Docs', href: 'https://docs.ton.org/ecosystem/ai/wallets', external: true},
];

const MOBILE_MENU_ANIMATION_MS = 240;

export function SiteHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const { pathname } = useLocation();

    const closeMobileMenu = () => setMobileOpen(false);

    useEffect(() => {
        if (mobileOpen) {
            setMobileMenuVisible(true);
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            setMobileMenuVisible(false);
        }, MOBILE_MENU_ANIMATION_MS);

        return () => window.clearTimeout(timeoutId);
    }, [mobileOpen]);

    useEffect(() => {
        closeMobileMenu();
    }, [pathname]);

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', mobileOpen);
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [mobileOpen]);

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return undefined;

        const root = document.documentElement;
        const syncHeaderHeight = () => {
            root.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
        };

        syncHeaderHeight();
        const resizeObserver = new ResizeObserver(syncHeaderHeight);
        resizeObserver.observe(header);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const activeHref =
        pathname === '/dashboard' || pathname.startsWith('/agent/') || pathname === '/create'
            ? '/dashboard'
            : pathname === '/getting-started'
              ? '/getting-started'
              : null;

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 isolate border-b border-white/[0.06] bg-[#06090E]/85 backdrop-blur-md"
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
                <Link to="/dashboard" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
                    <AgentLogo />
                    <span className="hidden md:inline">Agentic Wallets</span>
                    <AlphaBadge />
                </Link>

                <nav className="hidden items-center gap-7 md:flex">
                    {navItems.map((item) =>
                        item.external ? (
                            <a
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-neutral-500 transition-colors hover:text-white"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`relative text-sm transition-colors hover:text-white ${
                                    activeHref === item.href ? 'text-white' : 'text-neutral-500'
                                }`}
                            >
                                {item.label}
                                {activeHref === item.href && (
                                    <span className="absolute -bottom-[17px] inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0098EA]/60 to-transparent" />
                                )}
                            </Link>
                        )
                    )}
                </nav>

                <div className="hidden md:block">
                    <WalletButton variant="header" />
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <WalletButton variant="header" />
                    <button
                        type="button"
                        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation"
                    >
                        <Menu
                            size={16}
                            className={`absolute transition-all duration-200 ease-out ${mobileOpen ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`}
                        />
                        <X
                            size={16}
                            className={`absolute transition-all duration-200 ease-out ${mobileOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                        />
                    </button>
                </div>
            </div>

            {mobileMenuVisible && (
                <div className="absolute inset-x-0 top-full md:hidden">
                    <nav
                        id="mobile-navigation"
                        className={`h-[calc(100dvh-var(--site-header-height))] overflow-y-auto border-t border-white/[0.06] bg-[#06090E] px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 pointer-events-none opacity-0'}`}
                    >
                        <div className="flex flex-col gap-5">
                            {navItems.map((item) =>
                                item.external ? (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[17px] text-neutral-400 transition-colors hover:text-white"
                                        onClick={closeMobileMenu}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className={`text-[17px] transition-colors hover:text-white ${
                                            activeHref === item.href ? 'text-white' : 'text-neutral-400'
                                        }`}
                                        onClick={closeMobileMenu}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

function AlphaBadge({ className = '' }: { className?: string }) {
    return (
        <span className={`rounded-full border border-[#0098EA]/30 bg-[#0098EA]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#0098EA] ${className}`}>
            Alpha
        </span>
    );
}

function AgentLogo() {
    return (
        <span className="inline-flex shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="26" height="26" rx="8" stroke="white" strokeWidth="1" strokeOpacity="0.15" />
                <rect x="5" y="5" width="8" height="8" rx="2" fill="#0098EA" fillOpacity="0.9" />
                <rect x="15" y="5" width="8" height="8" rx="2" fill="#0098EA" fillOpacity="0.25" />
                <rect x="5" y="15" width="8" height="8" rx="2" fill="#0098EA" fillOpacity="0.15" />
                <rect x="15" y="15" width="8" height="8" rx="2" fill="white" fillOpacity="0.06" />
            </svg>
        </span>
    );
}
