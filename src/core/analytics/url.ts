/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const CAMPAIGN_PARAM_KEYS = new Set([
    'dclid',
    'gbraid',
    'gclid',
    'utm_campaign',
    'utm_content',
    'utm_id',
    'utm_medium',
    'utm_source',
    'utm_term',
    'wbraid',
]);

function normalizeAnalyticsPathname(pathname: string): string {
    if (pathname.startsWith('/agent/')) {
        return '/agent/:id';
    }

    return pathname || '/';
}

function getSafeAnalyticsSearch(search: string): string {
    const params = new URLSearchParams(search);
    const safeParams = new URLSearchParams();

    for (const [key, value] of params.entries()) {
        const normalizedKey = key.toLowerCase();
        if (CAMPAIGN_PARAM_KEYS.has(normalizedKey) || normalizedKey.startsWith('utm_')) {
            safeParams.append(key, value);
        }
    }

    const serialized = safeParams.toString();
    return serialized ? `?${serialized}` : '';
}

export function getAnalyticsPath(pathname: string, search = ''): string {
    return `${normalizeAnalyticsPathname(pathname)}${getSafeAnalyticsSearch(search)}`;
}

export function getAnalyticsLocation(origin: string, pathname: string, search = ''): string {
    return `${origin}${getAnalyticsPath(pathname, search)}`;
}

export function getCurrentAnalyticsPath(): string {
    return getAnalyticsPath(window.location.pathname, window.location.search);
}

