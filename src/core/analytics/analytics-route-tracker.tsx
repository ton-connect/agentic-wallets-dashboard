/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { trackPageView } from '@/core/analytics/google-analytics';
import { getAnalyticsLocation, getAnalyticsPath } from '@/core/analytics/url';

let lastTrackedPageViewKey = '';

export function AnalyticsRouteTracker() {
    const { pathname, search } = useLocation();

    useEffect(() => {
        const path = getAnalyticsPath(pathname, search);
        const location = getAnalyticsLocation(window.location.origin, pathname, search);
        const key = `${path}|${location}`;

        if (key === lastTrackedPageViewKey) {
            return;
        }

        lastTrackedPageViewKey = key;
        trackPageView({
            path,
            location,
            title: document.title,
        });
    }, [pathname, search]);

    return null;
}

