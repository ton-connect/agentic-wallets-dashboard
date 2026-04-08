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
    LandingValueProps,
    LandingForDevelopers,
    LandingForUsers,
    LandingFAQ,
    LandingCTA,
    LandingFooter,
} from '.';

export function LandingPage() {
    return (
        <div className="min-h-screen bg-[#08080A] text-white">
            <SiteHeader />
            <LandingHero />
            <LandingProblem />
            <LandingHowItWorks />
            <LandingValueProps />
            <LandingForDevelopers />
            <LandingForUsers />
            <LandingFAQ />
            <LandingCTA />
            <LandingFooter />
        </div>
    );
}
