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

import { AgentLogo } from '@/components/layout/agent-logo';
import { WalletButton } from '@/components/shared/wallet-button';
import { trackLandingCtaClick } from '@/core/analytics/google-analytics';

type NavItem = {
    label: string;
    href: string;
    sectionId?: string;
};

const sectionNavItems: NavItem[] = [
    { label: 'What is it?', href: '#what-is-it', sectionId: 'what-is-it' },
    { label: 'How it works?', href: '#how-it-works', sectionId: 'how-it-works' },
    { label: 'Use cases', href: '#use-cases', sectionId: 'use-cases' },
    { label: 'Features', href: '#features', sectionId: 'features' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'FAQ', href: '#faq', sectionId: 'faq' },
];

const MOBILE_MENU_ANIMATION_MS = 240;
const DASHBOARD_HREF = '/dashboard';
const HEADER_SCROLL_ELEVATE_PX = 8;

export function SiteHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [headerElevated, setHeaderElevated] = useState(false);
    const [activeHref, setActiveHref] = useState<string | null>(null);
    const headerRef = useRef<HTMLElement>(null);
    const { pathname, hash } = useLocation();
    const isLandingPage = pathname === '/';

    const navItems = useMemo(
        () =>
            sectionNavItems.map((item) => ({
                ...item,
                href:
                    item.href.startsWith('/')
                        ? item.href
                        : isLandingPage
                          ? item.href
                          : `/${item.href}`,
            })),
        [isLandingPage],
    );

    const closeMobileMenu = () => setMobileOpen(false);
    const trackHeaderCta = (label: string, destination: string) => {
        if (!isLandingPage) {
            return;
        }

        trackLandingCtaClick({
            label,
            destination,
            section: 'header',
        });
    };

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
        if (pathname === DASHBOARD_HREF || pathname.startsWith('/agent/') || pathname === '/create') {
            setActiveHref(DASHBOARD_HREF);
            return;
        }

        if (!isLandingPage) {
            setActiveHref(null);
            return;
        }

        if (hash) {
            setActiveHref(hash);
        }

        const sectionIds = sectionNavItems
            .map((item) => item.sectionId)
            .filter((sectionId): sectionId is string => Boolean(sectionId));

        const syncActiveSection = () => {
            const headerHeight = headerRef.current?.offsetHeight ?? 73;
            const scrollAnchor = window.scrollY + headerHeight + 32;

            let currentSectionId: string | null = null;

            for (const sectionId of sectionIds) {
                const section = document.getElementById(sectionId);
                if (!section) {
                    continue;
                }

                if (section.offsetTop <= scrollAnchor) {
                    currentSectionId = sectionId;
                }
            }

            setActiveHref(currentSectionId ? `#${currentSectionId}` : null);
        };

        syncActiveSection();
        window.addEventListener('scroll', syncActiveSection, { passive: true });
        window.addEventListener('resize', syncActiveSection);

        return () => {
            window.removeEventListener('scroll', syncActiveSection);
            window.removeEventListener('resize', syncActiveSection);
        };
    }, [hash, isLandingPage, pathname]);

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', mobileOpen);

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [mobileOpen]);

    useEffect(() => {
        const updateHeaderElevated = () => {
            setHeaderElevated(window.scrollY > HEADER_SCROLL_ELEVATE_PX || mobileOpen);
        };

        updateHeaderElevated();
        window.addEventListener('scroll', updateHeaderElevated, { passive: true });
        window.addEventListener('resize', updateHeaderElevated);

        return () => {
            window.removeEventListener('scroll', updateHeaderElevated);
            window.removeEventListener('resize', updateHeaderElevated);
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

    const headerChrome = headerElevated
        ? 'border-border bg-surface-header backdrop-blur-md'
        : 'border-transparent bg-transparent backdrop-blur-none';

    return (
        <header
            ref={headerRef}
            className={`sticky top-0 z-50 isolate border-b text-primary motion-reduce:transition-none transition-[background-color,backdrop-filter,border-color] duration-200 ease-out ${headerChrome}`}
        >
            <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-4">
                <Link to="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
                    <AgentLogo />
                    <span className="hidden min-[1040px]:inline">Agentic Wallets</span>
                </Link>

                <nav className="hidden items-center gap-8 min-[1040px]:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`text-sm transition-colors hover:text-primary ${activeHref === item.href ? 'text-primary' : 'text-tertiary'}`}
                            onClick={() => {
                                if (item.href === DASHBOARD_HREF) {
                                    trackHeaderCta(item.label, item.href);
                                }
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 min-[1040px]:flex">
                    {isLandingPage ? (
                        <Link
                            to="/getting-started"
                            className="inline-flex items-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
                            onClick={() => trackHeaderCta('Get started', '/getting-started')}
                        >
                            Get started
                        </Link>
                    ) : (
                        <WalletButton variant="header" />
                    )}
                </div>

                <div className="flex items-center gap-2 min-[1040px]:hidden">
                    {isLandingPage ? (
                        <Link
                            to="/getting-started"
                            className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
                            onClick={() => trackHeaderCta('Get started', '/getting-started')}
                        >
                            Get started
                        </Link>
                    ) : (
                        <WalletButton variant="header" />
                    )}
                    <button
                        type="button"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-1 transition-colors hover:bg-surface-3"
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
                <div className="absolute inset-x-0 top-full min-[1040px]:hidden">
                    <nav
                        id="mobile-navigation"
                        className={`h-[calc(100dvh-var(--site-header-height))] overflow-y-auto border-t border-border bg-surface px-6 py-6 shadow-[0_24px_80px_var(--card-shadow)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 pointer-events-none opacity-0'}`}
                    >
                        <div className="flex flex-col gap-5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className={`text-[17px] transition-colors hover:text-primary ${activeHref === item.href ? 'text-primary' : 'text-secondary'}`}
                                    onClick={() => {
                                        if (item.href === DASHBOARD_HREF) {
                                            trackHeaderCta(item.label, item.href);
                                        }
                                        closeMobileMenu();
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
