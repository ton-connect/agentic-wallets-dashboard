/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ENV_GA_DEBUG_MODE, ENV_GA_MEASUREMENT_ID } from '@/core/configs/env';
import { getCurrentAnalyticsPath } from '@/core/analytics/url';

type AnalyticsParamValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsParamValue>;
type Gtag = (...args: unknown[]) => void;

interface PageViewInput {
    path: string;
    title: string;
    location: string;
}

interface LandingCtaClickInput {
    label: string;
    destination: string;
    section?: string;
}

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: Gtag;
    }
}

const GA_SCRIPT_ID = 'ga4-script';
let isInitialized = false;

function getMeasurementId(): string {
    return ENV_GA_MEASUREMENT_ID.trim();
}

function cleanParams(params: AnalyticsParams): Record<string, string | number | boolean> {
    return Object.fromEntries(
        Object.entries(params).filter(
            (entry): entry is [string, string | number | boolean] =>
                entry[1] !== null && entry[1] !== undefined && entry[1] !== '',
        ),
    );
}

function withGoogleAnalyticsParams(
    measurementId: string,
    params: AnalyticsParams,
): Record<string, string | number | boolean> {
    return cleanParams({
        send_to: measurementId,
        debug_mode: ENV_GA_DEBUG_MODE ? true : undefined,
        ...params,
    });
}

function ensureGoogleAnalytics(): string | null {
    const measurementId = getMeasurementId();
    if (!measurementId) {
        return null;
    }

    window.dataLayer = window.dataLayer ?? [];
    window.gtag =
        window.gtag ??
        function gtag() {
            window.dataLayer?.push(arguments);
        };

    if (!document.getElementById(GA_SCRIPT_ID)) {
        const script = document.createElement('script');
        script.id = GA_SCRIPT_ID;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
        document.head.appendChild(script);
    }

    if (!isInitialized) {
        window.gtag('js', new Date());
        window.gtag('config', measurementId, {
            send_page_view: false,
            debug_mode: ENV_GA_DEBUG_MODE ? true : undefined,
        });
        isInitialized = true;
    }

    return measurementId;
}

export function trackPageView({ path, title, location }: PageViewInput): void {
    const measurementId = ensureGoogleAnalytics();
    if (!measurementId) {
        return;
    }

    window.gtag?.('event', 'page_view', withGoogleAnalyticsParams(measurementId, {
        page_path: path,
        page_title: title,
        page_location: location,
    }));
}

export function trackEvent(name: string, params: AnalyticsParams = {}): void {
    const measurementId = ensureGoogleAnalytics();
    if (!measurementId) {
        return;
    }

    window.gtag?.('event', name, withGoogleAnalyticsParams(measurementId, params));
}

export function trackLandingCtaClick({ label, destination, section }: LandingCtaClickInput): void {
    trackEvent('landing_cta_click', {
        cta_label: label,
        cta_destination: destination,
        page_path: getCurrentAnalyticsPath(),
        section,
    });
}
