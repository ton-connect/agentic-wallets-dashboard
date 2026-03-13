/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { getTransactionStatus } from '@ton/appkit';

const DEFAULT_STATUS_RETRY_ATTEMPTS = 40;
const DEFAULT_STATUS_RETRY_DELAY_MS = 250;

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

type GetTransactionStatusAppKit = Parameters<typeof getTransactionStatus>[0];
type GetTransactionStatusParams = Parameters<typeof getTransactionStatus>[1];
type TransactionStatus = Awaited<ReturnType<typeof getTransactionStatus>>['status'];

interface WaitForTransactionStatusOptions {
    attempts?: number;
    delayMs?: number;
}

export async function waitForTransactionStatus(
    appKit: GetTransactionStatusAppKit,
    params: GetTransactionStatusParams,
    options: WaitForTransactionStatusOptions = {},
): Promise<TransactionStatus> {
    const attempts = options.attempts ?? DEFAULT_STATUS_RETRY_ATTEMPTS;
    const delayMs = options.delayMs ?? DEFAULT_STATUS_RETRY_DELAY_MS;

    for (let attempt = 0; attempt < attempts; attempt += 1) {
        const status = await getTransactionStatus(appKit, params);
        if (status.status === 'completed' || status.status === 'failed') {
            return status.status;
        }
        await delay(delayMs);
    }

    return 'pending';
}
