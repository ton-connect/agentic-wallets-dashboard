/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { isSameTonAddress, normalizeTonAddress } from '@/features/agents/lib/address';
import type { PendingAgentWallet } from '@/features/agents/types';

interface AgentsState {
    knownAgentIds: string[];
    pendingDeploymentNoticeAgentIds: string[];
    pendingAgents: PendingAgentWallet[];
    markKnown: (id: string) => void;
    markManyKnown: (ids: string[]) => void;
    queueDeploymentNotice: (id: string) => void;
    consumeDeploymentNotice: (id: string) => void;
    upsertPendingAgent: (agent: PendingAgentWallet) => void;
    removePendingAgent: (id: string, networkChainId?: string) => void;
}

function normalizeAgentId(id: string): string {
    return normalizeTonAddress(id) ?? id.trim();
}

/**
 * Persists discovered agent ids only to detect newly appeared wallets.
 * Business state (name/status/operator/content) is always read from chain.
 */
export const useAgentsStore = create<AgentsState>()(
    persist(
        (set) => ({
            knownAgentIds: [],
            pendingDeploymentNoticeAgentIds: [],
            pendingAgents: [],
            markKnown: (id) => {
                set((state) => {
                    if (state.knownAgentIds.includes(id)) {
                        return state;
                    }
                    return { knownAgentIds: [...state.knownAgentIds, id] };
                });
            },
            markManyKnown: (ids) => {
                if (ids.length === 0) {
                    return;
                }
                set((state) => {
                    const known = new Set(state.knownAgentIds);
                    let changed = false;
                    for (const id of ids) {
                        if (!known.has(id)) {
                            known.add(id);
                            changed = true;
                        }
                    }
                    if (!changed) {
                        return state;
                    }
                    return { knownAgentIds: Array.from(known) };
                });
            },
            queueDeploymentNotice: (id) => {
                const normalizedId = normalizeAgentId(id);
                if (!normalizedId) {
                    return;
                }

                set((state) => {
                    if (
                        state.pendingDeploymentNoticeAgentIds.some((knownId) =>
                            isSameTonAddress(knownId, normalizedId),
                        )
                    ) {
                        return state;
                    }

                    return {
                        pendingDeploymentNoticeAgentIds: [...state.pendingDeploymentNoticeAgentIds, normalizedId],
                    };
                });
            },
            consumeDeploymentNotice: (id) => {
                const normalizedId = normalizeAgentId(id);
                if (!normalizedId) {
                    return;
                }

                set((state) => {
                    const nextIds = state.pendingDeploymentNoticeAgentIds.filter(
                        (knownId) => !isSameTonAddress(knownId, normalizedId),
                    );

                    if (nextIds.length === state.pendingDeploymentNoticeAgentIds.length) {
                        return state;
                    }

                    return {
                        pendingDeploymentNoticeAgentIds: nextIds,
                    };
                });
            },
            upsertPendingAgent: (agent) => {
                const normalizedId = normalizeAgentId(agent.id);
                if (!normalizedId) {
                    return;
                }

                set((state) => {
                    const nextAgent = {
                        ...agent,
                        id: normalizedId,
                        address: normalizedId,
                    };
                    const existingIndex = state.pendingAgents.findIndex(
                        (storedAgent) =>
                            storedAgent.networkChainId === agent.networkChainId &&
                            isSameTonAddress(storedAgent.id, normalizedId),
                    );

                    if (existingIndex === -1) {
                        return {
                            pendingAgents: [...state.pendingAgents, nextAgent],
                        };
                    }

                    const pendingAgents = [...state.pendingAgents];
                    pendingAgents[existingIndex] = nextAgent;
                    return { pendingAgents };
                });
            },
            removePendingAgent: (id, networkChainId) => {
                const normalizedId = normalizeAgentId(id);
                if (!normalizedId) {
                    return;
                }

                set((state) => {
                    const nextPendingAgents = state.pendingAgents.filter((agent) => {
                        if (networkChainId && agent.networkChainId !== networkChainId) {
                            return true;
                        }
                        return !isSameTonAddress(agent.id, normalizedId);
                    });

                    if (nextPendingAgents.length === state.pendingAgents.length) {
                        return state;
                    }

                    return {
                        pendingAgents: nextPendingAgents,
                    };
                });
            },
        }),
        {
            name: 'agentic-wallets-known-agent-ids',
            partialize: (state) => ({
                knownAgentIds: state.knownAgentIds,
                pendingDeploymentNoticeAgentIds: state.pendingDeploymentNoticeAgentIds,
            }),
        },
    ),
);
