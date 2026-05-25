/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { UseNFTsByAddressParameters } from '@ton/appkit-react';
import { useNetwork, useNftsByAddress } from '@ton/appkit-react';

import { ENV_TON_API_PROVIDER } from '@/core/configs/env';

import { fetchNftInterfaces, mergeAddressBookInterfaces } from '../lib/nft-interfaces';

export function useEnrichedNftsByAddress(parameters: UseNFTsByAddressParameters = {}) {
    const network = useNetwork();
    const query = useNftsByAddress(parameters);
    const chainId = parameters.network?.chainId ?? network?.chainId;

    const nftAddresses = useMemo(
        () => (query.data?.nfts ?? []).map((nft) => nft.address),
        [query.data?.nfts],
    );

    const addressesKey = nftAddresses.join('|');

    const interfacesQuery = useQuery({
        queryKey: ['nft-interfaces', chainId, addressesKey],
        enabled: ENV_TON_API_PROVIDER === 'tonapi' && nftAddresses.length > 0,
        staleTime: 60_000,
        queryFn: () => fetchNftInterfaces(chainId, nftAddresses),
    });

    const enrichedData = useMemo(() => {
        if (!query.data) return query.data;
        if (!interfacesQuery.data || Object.keys(interfacesQuery.data).length === 0) {
            return query.data;
        }
        return {
            ...query.data,
            addressBook: mergeAddressBookInterfaces(query.data.addressBook, interfacesQuery.data),
        };
    }, [query.data, interfacesQuery.data]);

    return { ...query, data: enrichedData };
}
