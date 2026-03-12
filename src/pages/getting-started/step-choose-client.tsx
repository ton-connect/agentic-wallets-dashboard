/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Terminal } from 'lucide-react';

import { CodeBlock } from '@/components/shared/code-block';

const installCommand = 'npx skills add ton-connect/kit/packages/mcp';

const installSteps = [
    'Run the command once in your terminal to add the TON MCP skills package.',
    'Restart or reload your AI client so it picks up the new MCP tools.',
    'Ask your agent to "create agentic wallet" and follow the onboarding flow.',
] as const;

export function StepChooseClient() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-xl font-bold tracking-tight">Add TON MCP Skills</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    One install path works across Cursor, Claude Desktop, Windsurf, Codex, and
                    other MCP-compatible clients.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
                    <Terminal size={12} className="text-neutral-600" />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
                        SINGLE ENTRYPOINT · RUN IN YOUR TERMINAL
                    </span>
                </div>
                <CodeBlock code={installCommand} className="rounded-none border-0 bg-transparent" />
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <ol className="flex flex-col gap-3">
                    {installSteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-500/10 font-mono text-[10px] font-bold text-amber-500">
                                {i + 1}
                            </span>
                            <span className="text-sm text-neutral-300">{step}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
