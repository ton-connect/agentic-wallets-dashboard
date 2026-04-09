/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect, useMemo, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAddress, useAppKit, useNetwork } from '@ton/appkit-react';
import type { NFT } from '@ton/appkit';
import { ENV_AGENTIC_ACTIVITY_POLL_MS, ENV_AGENTIC_COLLECTION_MAINNET, ENV_AGENTIC_COLLECTION_TESTNET } from '@/core/configs/env';

import { useAgentsStore } from '../store/agents-store';
import type { AgentWallet } from '../types';
import { extractCreationDateFromMetadata, extractNameFromMetadata } from '../lib/metadata';
import { getAgentWalletState } from '../lib/agentic-wallet';
import { isSameTonAddress, normalizeTonAddress } from '../lib/address';
import { mapWithConcurrency } from '../lib/async';
import { formatUint256PublicKey } from '../lib/public-key';

export function getCollectionAddressForNetwork(chainId: string | undefined): string {
    if (chainId === '-239') {
        return ENV_AGENTIC_COLLECTION_MAINNET;
    }
    if (chainId === '-3') {
        return ENV_AGENTIC_COLLECTION_TESTNET;
    }
    return '';
}

function getAttribute(nft: NFT, traitType: string): string | undefined {
    return nft.attributes?.find((a) => a.traitType === traitType || (a as { trait_type?: string }).trait_type === traitType)
        ?.value;
}

function parseBigint(value: string | undefined): bigint | null {
    if (!value) {
        return null;
    }
    try {
        return BigInt(value);
    } catch {
        return null;
    }
}

const CHAIN_STATE_CONCURRENCY = 8;

type PolledAccount = {
    address: string;
    balance: string;
    activityMarker: string | null;
};

function getBalanceLookupKey(address: string): string {
    return normalizeTonAddress(address) ?? address.trim();
}

function getActivityMarker(accountState: { lastTransaction?: { lt?: string | null; hash?: string | null } | null }): string | null {
    const lt = accountState.lastTransaction?.lt?.trim();
    if (lt) {
        return lt;
    }

    const hash = accountState.lastTransaction?.hash?.trim();
    return hash || null;
}

export function useAgents() {
    const appKit = useAppKit();
    const queryClient = useQueryClient();
    const network = useNetwork();
    const ownerAddress = useAddress();
    const chainId = network?.chainId;
    const collectionAddress = getCollectionAddressForNetwork(chainId);

    const {
        data: nftsResponse,
        isLoading: isNftsLoading,
        error: nftsError,
        refetch: refetchNfts,
    } = useQuery({
        queryKey: ['agentic-wallets-owner-nfts', chainId, ownerAddress, collectionAddress],
        enabled: !!network && !!ownerAddress && !!collectionAddress,
        refetchInterval: ENV_AGENTIC_ACTIVITY_POLL_MS,
        refetchIntervalInBackground: true,
        queryFn: async () => {
            if (!network || !ownerAddress || !collectionAddress) {
                return { nfts: [] as NFT[] };
            }

            const client = appKit.networkManager.getClient(network);
            const pageLimit = 100;
            const maxPages = 50;
            const allNfts: NFT[] = [];

            for (let page = 0; page < maxPages; page += 1) {
                const response = await client.nftItemsByOwner({
                    ownerAddress,
                    collectionAddress,
                    pagination: {
                        limit: pageLimit,
                        offset: page * pageLimit,
                    },
                });
                const nfts = response.nfts ?? [];
                allNfts.push(...nfts);

                if (nfts.length < pageLimit) {
                    break;
                }
            }

            const deduped = Array.from(new Map(allNfts.map((nft) => [nft.address, nft])).values());
            return {
                nfts: deduped.filter((nft) => isSameTonAddress(nft.collection?.address, collectionAddress)),
            };
        },
    });

    const knownAgentIds = useAgentsStore((s) => s.knownAgentIds);
    const markKnown = useAgentsStore((s) => s.markKnown);
    const markManyKnown = useAgentsStore((s) => s.markManyKnown);
    const pendingAgents = useAgentsStore((s) => s.pendingAgents);
    const removePendingAgent = useAgentsStore((s) => s.removePendingAgent);

    const chainStateCandidates = useMemo(() => nftsResponse?.nfts ?? [], [nftsResponse]);

    const pendingAgentsForOwner = useMemo(
        () =>
            pendingAgents.filter(
                (agent) =>
                    agent.networkChainId === chainId && (!ownerAddress || isSameTonAddress(agent.ownerAddress, ownerAddress)),
            ),
        [chainId, ownerAddress, pendingAgents],
    );

    const chainWalletAddresses = useMemo(
        () => Array.from(new Set([...chainStateCandidates.map((nft) => nft.address), ...pendingAgentsForOwner.map((agent) => agent.address)])).sort(),
        [chainStateCandidates, pendingAgentsForOwner],
    );

    type ChainStateEntry = {
        publicKey: bigint;
        originPublicKey: bigint;
        extensions: AgentWallet['extensions'];
        nftItemContent: AgentWallet['nftItemContent'];
        ownerAddress: string;
        collectionAddress: string;
    };

    const chainStateQueryKey = ['agentic-wallets-chain-state', chainId, chainWalletAddresses] as const;

    const {
        data: chainState,
        error: chainError,
        refetch: refetchChain,
    } = useQuery({
        queryKey: chainStateQueryKey,
        enabled: !!network && chainWalletAddresses.length > 0,
        staleTime: 30_000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        queryFn: async () => {
            if (!network) {
                return {} as Record<string, ChainStateEntry>;
            }

            const client = appKit.networkManager.getClient(network);
            const previousState = queryClient.getQueryData<Record<string, ChainStateEntry>>(chainStateQueryKey) ?? {};
            const nftByAddress = new Map(chainStateCandidates.map((nft) => [nft.address, nft] as const));

            const entries = await mapWithConcurrency(
                chainWalletAddresses,
                CHAIN_STATE_CONCURRENCY,
                async (walletAddress) => {
                    const nft = nftByAddress.get(walletAddress);
                    try {
                        const state = await getAgentWalletState(client, walletAddress);
                        if (!state.isInitialized) {
                            return null;
                        }

                        return [
                            walletAddress,
                            {
                                publicKey: state.operatorPublicKey,
                                originPublicKey: state.originOperatorPublicKey,
                                extensions: state.extensions,
                                nftItemContent: state.nftItemContent,
                                ownerAddress: state.ownerAddress?.toString() ?? nft?.ownerAddress ?? '',
                                collectionAddress: state.collectionAddress.toString(),
                            },
                        ] as const;
                    } catch {
                        const prev = previousState[walletAddress];
                        return prev ? ([walletAddress, prev] as const) : null;
                    }
                },
            );

            return Object.fromEntries(entries.filter((entry): entry is readonly [string, ChainStateEntry] => entry !== null));
        },
    });

    useEffect(() => {
        if (knownAgentIds.length > 0) {
            return;
        }

        const initialIds = chainStateCandidates.map((nft) => nft.address);
        if (initialIds.length === 0) {
            return;
        }

        // Build initial baseline silently: no "new" notifications for the first discovered set.
        markManyKnown(initialIds);
    }, [knownAgentIds.length, chainStateCandidates, markManyKnown]);

    useEffect(() => {
        if (!chainId || pendingAgentsForOwner.length === 0 || chainStateCandidates.length === 0) {
            return;
        }

        const indexedAddressSet = new Set(
            chainStateCandidates.map((nft) => normalizeTonAddress(nft.address) ?? nft.address),
        );
        for (const agent of pendingAgentsForOwner) {
            if (indexedAddressSet.has(normalizeTonAddress(agent.address) ?? agent.address)) {
                removePendingAgent(agent.id, chainId);
            }
        }
    }, [chainId, chainStateCandidates, pendingAgentsForOwner, removePendingAgent]);

    const agents = useMemo(() => {
        const hasKnownBaseline = knownAgentIds.length > 0;
        const knownAgentIdSet = new Set(knownAgentIds);

        const indexedAgents = chainStateCandidates.map((nft): AgentWallet => {
            const chain = chainState?.[nft.address];
            const onchainName = chain ? extractNameFromMetadata(chain.nftItemContent) : null;
            const onchainCreatedAt = chain ? extractCreationDateFromMetadata(chain.nftItemContent) : null;
            const creationDateTimestamp = onchainCreatedAt ? Date.parse(onchainCreatedAt) : null;
            const fallbackName = nft.info?.name ?? `Agent #${nft.index ?? '?'}`;

            const source = getAttribute(nft, 'source') ?? nft.info?.description ?? nft.collection?.name ?? 'Unknown';
            const createdAt = onchainCreatedAt ?? getAttribute(nft, 'created_at') ?? new Date().toISOString();
            const isNew = hasKnownBaseline && !knownAgentIdSet.has(nft.address);

            const fallbackPublicKey = parseBigint(getAttribute(nft, 'operator_pubkey')) ?? 0n;
            const fallbackOriginPublicKey =
                parseBigint(getAttribute(nft, 'origin_operator_public_key')) ?? fallbackPublicKey;

            const publicKey = chain?.publicKey ?? fallbackPublicKey;
            const originPublicKey = chain?.originPublicKey ?? fallbackOriginPublicKey;
            const status: AgentWallet['status'] = chain ? (chain.publicKey === 0n ? 'revoked' : 'active') : 'active';

            return {
                id: nft.address,
                name: onchainName ?? fallbackName,
                address: nft.address,
                operatorPubkey: formatUint256PublicKey(publicKey),
                originOperatorPublicKey: formatUint256PublicKey(originPublicKey),
                extensions: chain?.extensions ?? [],
                ownerAddress: chain?.ownerAddress ?? nft.ownerAddress ?? '',
                creationDateTimestamp:
                    creationDateTimestamp != null && Number.isFinite(creationDateTimestamp)
                        ? creationDateTimestamp
                        : null,
                createdAt,
                detectedAt: getAttribute(nft, 'detected_at') ?? createdAt,
                isNew,
                status,
                source,
                collectionAddress: nft.collection?.address,
                nftItemContent: chain?.nftItemContent ?? null,
            };
        });

        const indexedAddressSet = new Set(indexedAgents.map((a) => normalizeTonAddress(a.address) ?? a.address));
        return [
            ...indexedAgents,
            ...pendingAgentsForOwner.filter((p) => !indexedAddressSet.has(normalizeTonAddress(p.address) ?? p.address)),
        ];
    }, [chainStateCandidates, chainState, knownAgentIds, pendingAgentsForOwner]);

    const activeAgents = useMemo(() => agents.filter((a) => a.status === 'active'), [agents]);
    const revokedAgents = useMemo(() => agents.filter((a) => a.status === 'revoked'), [agents]);
    const newAgents = useMemo(() => agents.filter((a) => a.isNew), [agents]);

    // --- Bulk activity polling ---

    // Tracks last known last_activity per address to detect changes
    const lastActivityRef = useRef<Map<string, string>>(new Map());

    const bulkPollQueryKey = ['agentic-wallets-bulk-poll', chainId, chainWalletAddresses] as const;

    const { data: bulkAccountsData } = useQuery({
        queryKey: bulkPollQueryKey,
        enabled: !!network && chainWalletAddresses.length > 0,
        refetchInterval: ENV_AGENTIC_ACTIVITY_POLL_MS,
        refetchIntervalInBackground: true,
        staleTime: 0,
        queryFn: async (): Promise<PolledAccount[]> => {
            if (!network || chainWalletAddresses.length === 0) return [];
            const client = appKit.networkManager.getClient(network);
            if (typeof client.getBulkAccounts === 'function') {
                try {
                    const result = await client.getBulkAccounts(chainWalletAddresses);
                    return result.map((account) => ({
                        address: account.address,
                        balance: String(account.balance),
                        activityMarker:
                            account.last_activity != null
                                ? String(account.last_activity)
                                : account.last_transaction_lt ?? account.last_transaction_hash ?? null,
                    }));
                } catch {
                    // Some clients may expose the method but fail against the current backend.
                    // Fall back to per-account polling in that case.
                }
            }
            const accounts = await mapWithConcurrency(chainWalletAddresses, CHAIN_STATE_CONCURRENCY, async (walletAddress) => {
                const accountState = await client.getAccountState(walletAddress);
                return {
                    address: walletAddress,
                    balance: accountState.balance,
                    activityMarker: getActivityMarker(accountState),
                };
            });
            return accounts;
        },
    });

    // Map address → balance in nanotons.
    // TonAPI bulk returns addresses in raw format ("0:abc..."),
    // but agent.address is bounceable-friendly ("EQabc...") via asAddressFriendly in the NFT mapper.
    // Address.parse(x).toString() matches that format.
    const balancesByAddress = useMemo((): Record<string, bigint> => {
        if (!bulkAccountsData) return {};
        const result: Record<string, bigint> = {};
        for (const account of bulkAccountsData) {
            try {
                result[getBalanceLookupKey(account.address)] = BigInt(account.balance);
            } catch {
                result[account.address] = BigInt(account.balance);
            }
        }
        return result;
    }, [bulkAccountsData]);

    // When last_activity changes for any wallet, invalidate its active queries
    useEffect(() => {
        if (!bulkAccountsData) return;

        const changedAddresses: string[] = [];
        for (const account of bulkAccountsData) {
            const prev = lastActivityRef.current.get(account.address);
            if (prev !== undefined && account.activityMarker !== null && prev !== account.activityMarker) {
                changedAddresses.push(account.address);
            }
            if (account.activityMarker !== null) {
                lastActivityRef.current.set(account.address, account.activityMarker);
            }
        }

        if (changedAddresses.length === 0) return;

        void queryClient.invalidateQueries({ queryKey: ['balance'], type: 'active' });
        void queryClient.invalidateQueries({ queryKey: ['jettons'], type: 'active' });
        void queryClient.invalidateQueries({ queryKey: ['nfts'], type: 'active' });
        void queryClient.invalidateQueries({ queryKey: ['agentic-wallet-activity'], type: 'active' });
    }, [bulkAccountsData, queryClient]);

    const refresh = async () => {
        await Promise.all([
            refetchNfts(),
            refetchChain(),
            queryClient.invalidateQueries({ queryKey: ['balance'] }),
            queryClient.invalidateQueries({ queryKey: ['jettons'] }),
            queryClient.invalidateQueries({ queryKey: ['nfts'] }),
            queryClient.invalidateQueries({ queryKey: ['agentic-wallet-activity'] }),
        ]);
    };

    return {
        agents,
        activeAgents,
        revokedAgents,
        newAgents,
        balancesByAddress,
        isLoading: isNftsLoading && !nftsResponse,
        error: nftsError ?? chainError,
        refresh,
        collectionAddress: collectionAddress || null,
        markAgentKnown: markKnown,
        markAgentsKnown: markManyKnown,
    };
}
