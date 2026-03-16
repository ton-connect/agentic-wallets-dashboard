/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { NFT } from '@ton/appkit';


type NftTrust = 'whitelist' | 'graylist' | 'blacklist' | 'none';
type NftAddressBook = Record<string, { interfaces?: string[] } | undefined>;

function readTrust(nft: NFT): NftTrust | undefined {
    const trust = nft.extra?.trust;
    if (trust === 'none' || trust === 'whitelist' || trust === 'graylist' || trust === 'blacklist') {
        return trust;
    }
    return undefined;
}

export function isAllowedNftTrust(nft: NFT): boolean {
    const trust = readTrust(nft);
    return trust === undefined || trust === 'none' || trust === 'whitelist' || trust === 'graylist';
}

function hasSbtInterface(nft: NFT, addressBook?: NftAddressBook): boolean {
    const interfaces = addressBook?.[nft.address]?.interfaces;
    return Array.isArray(interfaces) && interfaces.some((iface) => typeof iface === 'string' && iface.toLowerCase() === 'sbt');
}

export function isSoulboundNft(nft: NFT, addressBook?: NftAddressBook): boolean {
    if (nft.isSoulbound === true) {
        return true;
    }

    return hasSbtInterface(nft, addressBook);
}

export function isEligibleFundingNft(nft: NFT, addressBook?: NftAddressBook): boolean {
    return isAllowedNftTrust(nft) && !isSoulboundNft(nft, addressBook);
}
