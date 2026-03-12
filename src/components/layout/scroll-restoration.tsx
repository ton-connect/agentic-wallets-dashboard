/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollRestoration() {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            return;
        }

        const element = document.getElementById(hash.slice(1));

        if (element) {
            element.scrollIntoView({ block: 'start' });
            return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname, hash]);

    return null;
}
