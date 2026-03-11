/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AppKit, Network } from '@ton/appkit';
import { TonConnectConnector } from '@ton/appkit';
import { THEME } from '@tonconnect/ui';

import { ENV_TON_API_KEY_MAINNET, ENV_TON_API_KEY_TESTNET } from '@/core/configs/env';

export const appKit = new AppKit({
    networks: {
        [Network.mainnet().chainId]: {
            apiClient: {
                key: ENV_TON_API_KEY_MAINNET,
            },
            // apiClient: new ApiClientTonApi({
            //     network: Network.mainnet(),
            //     apiKey: ENV_TON_API_KEY_MAINNET,
            //     minRequestIntervalMs: ENV_TON_API_MIN_REQUEST_INTERVAL_MS,
            // }),
        },
        [Network.testnet().chainId]: {
            apiClient: {
                key: ENV_TON_API_KEY_TESTNET,
            },
            // apiClient: new ApiClientTonApi({
            //     network: Network.testnet(),
            //     apiKey: ENV_TON_API_KEY_TESTNET,
            //     minRequestIntervalMs: ENV_TON_API_MIN_REQUEST_INTERVAL_MS,
            // }),
        },
    },
    connectors: [
        new TonConnectConnector({
            tonConnectOptions: {
                manifestUrl: 'https://tonconnect-sdk-demo-dapp.vercel.app/tonconnect-manifest.json',
                uiPreferences: {
                    theme: THEME.DARK,
                    borderRadius: 's',
                    colorsSet: {
                        [THEME.DARK]: {
                            connectButton: {
                                background: '#f59e0b',
                                foreground: '#000000',
                            },
                        },
                    },
                },
            },
        }),
    ],
});
