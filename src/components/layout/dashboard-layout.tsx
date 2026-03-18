/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ReactNode } from 'react';

import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

export function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-[#08080A] text-white">
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</main>
            <SiteFooter />
        </div>
    );
}
