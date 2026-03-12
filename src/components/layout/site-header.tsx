/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { WalletButton } from '@/components/shared/wallet-button';

type NavItem = {
    label: string;
    href: string;
};

const sectionNavItems: NavItem[] = [
    { label: 'What is it?', href: '#what-is-it' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'For Developers', href: '#for-developers' },
    { label: 'For Users', href: '#for-users' },
    { label: 'FAQ', href: '#faq' },
];

const MOBILE_MENU_ANIMATION_MS = 240;

export function SiteHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const { pathname } = useLocation();
    const isLandingPage = pathname === '/';

    const navItems = useMemo(() => {
        const normalizedSectionLinks = sectionNavItems.map((item) => ({
            ...item,
            href: isLandingPage ? item.href : `/${item.href}`,
        }));

        return [...normalizedSectionLinks, { label: 'Dashboard', href: '/dashboard' }];
    }, [isLandingPage]);

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
        if (!header) {
            return undefined;
        }

        const root = document.documentElement;
        const syncHeaderHeight = () => {
            root.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
        };

        syncHeaderHeight();

        const resizeObserver = new ResizeObserver(syncHeaderHeight);
        resizeObserver.observe(header);
        window.addEventListener('resize', syncHeaderHeight);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', syncHeaderHeight);
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 isolate border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-md"
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
                <Link to="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
                    <AgentLogo />
                    <span className="hidden md:inline">Agentic Wallets</span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm text-neutral-400 transition-colors hover:text-white"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:block">
                    {isLandingPage ? (
                        <Link
                            to="/getting-started"
                            className="inline-flex items-center rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-400"
                        >
                            Get started
                        </Link>
                    ) : (
                        <WalletButton variant="header" />
                    )}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    {isLandingPage ? (
                        <Link
                            to="/getting-started"
                            className="inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-400"
                        >
                            Get started
                        </Link>
                    ) : (
                        <WalletButton variant="header" />
                    )}
                    <button
                        type="button"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation"
                    >
                        <Menu
                            size={18}
                            className={`absolute transition-all duration-200 ease-out ${mobileOpen ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`}
                        />
                        <X
                            size={18}
                            className={`absolute transition-all duration-200 ease-out ${mobileOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                        />
                    </button>
                </div>
            </div>

            {mobileMenuVisible && (
                <div className="absolute inset-x-0 top-full md:hidden">
                    <nav
                        id="mobile-navigation"
                        className={`h-[calc(100dvh-var(--site-header-height))] overflow-y-auto border-t border-white/[0.06] bg-[#050505] px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 pointer-events-none opacity-0'}`}
                    >
                        <div className="flex flex-col gap-5">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-[17px] text-neutral-300 transition-colors hover:text-white"
                                    onClick={closeMobileMenu}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

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
