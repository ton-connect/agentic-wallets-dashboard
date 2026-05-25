/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Address } from '@ton/core';

import {
    ENV_TON_API_KEY_MAINNET,
    ENV_TON_API_KEY_TESTNET,
    ENV_TON_API_PROVIDER,
} from '@/core/configs/env';

export type NftInterfacesMap = Record<string, string[]>;

const BULK_CHUNK_SIZE = 100;

function toBounceableAddress(address: string): string | null {
    try {
        return Address.parse(address).toString();
    } catch {
        return null;
    }
}

function getTonApiBaseUrl(chainId: string | undefined | null): string {
    return String(chainId) === '-3' ? 'https://testnet.tonapi.io' : 'https://tonapi.io';
}

function getTonApiKey(chainId: string | undefined | null): string {
    return String(chainId) === '-3' ? ENV_TON_API_KEY_TESTNET : ENV_TON_API_KEY_MAINNET;
}

/**
 * Recreates the SBT enrichment that walletkit's tonapi client did before 1.0.0-alpha.1:
 * fetches contract interfaces for a batch of NFT addresses via `/v2/blockchain/accounts/_bulk`
 * so that `nft-trust.ts#hasSbtInterface` can detect soulbound tokens.
 *
 * No-op for toncenter (its NFT mapper already populates interfaces in `addressBook`).
 */
export async function fetchNftInterfaces(
    chainId: string | undefined | null,
    addresses: string[],
): Promise<NftInterfacesMap> {
    if (ENV_TON_API_PROVIDER !== 'tonapi' || addresses.length === 0) {
        return {};
    }

    const uniqueAddresses = Array.from(new Set(addresses));
    const baseUrl = getTonApiBaseUrl(chainId);
    const apiKey = getTonApiKey(chainId);
    const result: NftInterfacesMap = {};

    for (let i = 0; i < uniqueAddresses.length; i += BULK_CHUNK_SIZE) {
        const chunk = uniqueAddresses.slice(i, i + BULK_CHUNK_SIZE);
        let response: Response;
        try {
            response = await fetch(`${baseUrl}/v2/accounts/_bulk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ account_ids: chunk }),
            });
        } catch {
            continue;
        }

        if (!response.ok) {
            continue;
        }

        const data = (await response.json()) as {
            accounts?: Array<{ address?: string; interfaces?: string[] }>;
        };

        for (const account of data.accounts ?? []) {
            const bounceable = account.address ? toBounceableAddress(account.address) : null;
            if (!bounceable) continue;
            result[bounceable] = account.interfaces ?? [];
        }
    }

    return result;
}

export function mergeAddressBookInterfaces<T extends { interfaces?: string[] } | undefined>(
    base: Record<string, T> | undefined,
    interfaces: NftInterfacesMap,
): Record<string, { interfaces?: string[] }> {
    const merged: Record<string, { interfaces?: string[] }> = {};
    if (base) {
        for (const [addr, entry] of Object.entries(base)) {
            merged[addr] = { ...(entry ?? {}) };
        }
    }
    for (const [addr, ifaces] of Object.entries(interfaces)) {
        merged[addr] = { ...(merged[addr] ?? {}), interfaces: ifaces };
    }
    return merged;
}
