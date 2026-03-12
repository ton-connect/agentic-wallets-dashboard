/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function runWithoutSmoothScroll(callback: () => void) {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlBehavior = html.style.scrollBehavior;
    const previousBodyBehavior = body.style.scrollBehavior;
    let resetFrameId = 0;
    let restoreFrameId = 0;

    const restore = () => {
        html.style.scrollBehavior = previousHtmlBehavior;
        body.style.scrollBehavior = previousBodyBehavior;
    };

    html.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';

    callback();

    resetFrameId = window.requestAnimationFrame(() => {
        callback();
        restoreFrameId = window.requestAnimationFrame(restore);
    });

    return () => {
        window.cancelAnimationFrame(resetFrameId);
        window.cancelAnimationFrame(restoreFrameId);
        restore();
    };
}

export function ScrollRestoration() {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        if (!hash) {
            return runWithoutSmoothScroll(() => {
                window.scrollTo({ top: 0, left: 0 });
            });
        }

        const element = document.getElementById(hash.slice(1));

        if (element) {
            element.scrollIntoView({
                block: 'start',
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth',
            });
            return;
        }

        return runWithoutSmoothScroll(() => {
            window.scrollTo({ top: 0, left: 0 });
        });
    }, [pathname, hash]);

    return null;
}
