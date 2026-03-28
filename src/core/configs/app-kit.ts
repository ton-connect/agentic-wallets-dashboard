/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ApiClientTonApi, ApiClientToncenter, AppKit, Network } from '@ton/appkit';
import { TonConnectConnector } from '@ton/appkit';
import { THEME } from '@tonconnect/ui';

import {
    ENV_TON_API_KEY_MAINNET,
    ENV_TON_API_KEY_TESTNET,
    ENV_TON_API_MIN_REQUEST_INTERVAL_MS,
    ENV_TON_API_PROVIDER,
} from '@/core/configs/env';

function createApiClient(network: Network) {
    const isTestnet = network.chainId === Network.testnet().chainId;
    const apiKey = isTestnet ? ENV_TON_API_KEY_TESTNET : ENV_TON_API_KEY_MAINNET;
    const minRequestIntervalMs = ENV_TON_API_MIN_REQUEST_INTERVAL_MS;

    if (ENV_TON_API_PROVIDER === 'tonapi') {
        return new ApiClientTonApi({
            network,
            apiKey,
            minRequestIntervalMs,
        });
    }

    return new ApiClientToncenter({
        network,
        endpoint: isTestnet ? 'https://testnet.toncenter.com' : 'https://toncenter.com',
        apiKey,
        minRequestIntervalMs,
    });
}

export const appKit = new AppKit({
    networks: {
        [Network.mainnet().chainId]: {
            apiClient: createApiClient(Network.mainnet()),
        },
        [Network.testnet().chainId]: {
            apiClient: createApiClient(Network.testnet()),
        },
    },
    connectors: [
        new TonConnectConnector({
            tonConnectOptions: {
                manifestUrl: 'https://agents.ton.org/tonconnect-manifest.json',
                uiPreferences: {
                    theme: THEME.DARK,
                    borderRadius: 's',
                    colorsSet: {
                        [THEME.DARK]: {
                            connectButton: {
                                background: '#C4FF89',
                                foreground: '#0A1A00',
                            },  
                        },
                    },
                },
            },
        }),
    ],
});
