/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { SiteHeader } from '@/components/layout/site-header';

import {
    LandingHero,
    LandingProblem,
    LandingHowItWorks,
    LandingUseCases,
    LandingValueProps,
    LandingForUsers,
    LandingFAQ,
    LandingCTA,
    LandingFooter,
} from '.';

export function LandingPage() {
    return (
        <div className="min-h-screen bg-surface text-primary">
            <SiteHeader />
            <LandingHero />
            <LandingProblem />
            <LandingHowItWorks />
            <LandingUseCases />
            <LandingValueProps />
            <LandingForUsers />
            <LandingCTA />
            <LandingFAQ />
            <LandingFooter />
        </div>
    );
}
