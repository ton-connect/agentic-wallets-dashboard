/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { NFT } from '@ton/appkit';

import { ENV_AGENTIC_COLLECTION_MAINNET, ENV_AGENTIC_COLLECTION_TESTNET } from '@/core/configs/env';

type NftTrust = 'whitelist' | 'graylist' | 'blacklist' | 'none';

function readTrust(nft: NFT): NftTrust | undefined {
    const trust = nft.extra?.trust;
    if (trust === 'none' || trust === 'whitelist' || trust === 'graylist' || trust === 'blacklist') {
        return trust;
    }
    return undefined;
}

export function isAllowedNftTrust(nft: NFT): boolean {
    const trust = readTrust(nft);
    return trust === undefined || trust === 'none' || trust === 'whitelist';
}

function isAgenticCollectionAddress(address: string | undefined): boolean {
    if (!address) {
        return false;
    }

    return address === ENV_AGENTIC_COLLECTION_MAINNET || address === ENV_AGENTIC_COLLECTION_TESTNET;
}

function isSoulboundNft(nft: NFT): boolean {
    if (nft.isSoulbound === true) {
        return true;
    }

    const extra = nft.extra;
    if (!extra || typeof extra !== 'object') {
        return false;
    }

    const soulbound = extra.soulbound;
    const nonTransferable = extra.nonTransferable;
    return soulbound === true || nonTransferable === true;
}

export function isEligibleFundingNft(nft: NFT): boolean {
    return isAllowedNftTrust(nft) && !isSoulboundNft(nft) && !isAgenticCollectionAddress(nft.collection?.address);
}
