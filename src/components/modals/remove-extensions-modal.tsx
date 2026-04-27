/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useState } from 'react';
import { toast } from 'sonner';

import { Modal } from './modal';

import type { AgentWallet } from '@/features/agents';
import { useAgentOperations } from '@/features/agents';
import { CopyableAddress } from '@/components/shared/copyable-address';

interface RemoveExtensionsModalProps {
    agent: AgentWallet | null;
    selectedExtensions: string[];
    onClose: () => void;
    onSuccess?: () => void | Promise<void>;
}

export function RemoveExtensionsModal({ agent, selectedExtensions, onClose, onSuccess }: RemoveExtensionsModalProps) {
    const { removeAgentExtensions, isPending } = useAgentOperations();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!agent || selectedExtensions.length === 0) return null;
    const uiPending = isPending || isSubmitting;
    const buttonLabel = selectedExtensions.length === 1 ? 'Delete selected extension' : 'Delete selected extensions';

    const handleRemove = async () => {
        try {
            setIsSubmitting(true);
            await removeAgentExtensions(agent, selectedExtensions);
            await onSuccess?.();
            toast.success(
                selectedExtensions.length === 1
                    ? 'Extension deleted from wallet.'
                    : `${selectedExtensions.length} extensions deleted from wallet.`,
            );
            onClose();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete selected extensions';
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal open={!!agent && selectedExtensions.length > 0} onClose={onClose} title={buttonLabel}>
            <div className="space-y-4">
                <div className="rounded-xl border border-red-500/10 bg-red-500/[0.04] px-4 py-3">
                    <p className="text-sm leading-relaxed text-red-400/90">
                        This will remove the selected wallet extensions from the agentic wallet. The change is applied
                        on-chain and takes effect after the transaction is confirmed. Removals are split into batches of up
                        to 255 extensions per message, and large batches may require several wallet confirmations.
                    </p>
                </div>

                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-neutral-600">Selected extensions</p>
                    <div className="max-h-52 space-y-2 overflow-y-auto rounded-xl border border-white/[0.08] bg-surface-1 p-3">
                        {selectedExtensions.map((extension) => (
                            <div key={extension} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                                <CopyableAddress address={extension} adaptive className="w-full justify-between" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-full border border-white/[0.1] py-3 text-sm text-neutral-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => void handleRemove()}
                        disabled={uiPending}
                        className="flex-1 rounded-full bg-red-500 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {uiPending ? (
                            <span className="inline-flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                Deleting...
                            </span>
                        ) : (
                            buttonLabel
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
