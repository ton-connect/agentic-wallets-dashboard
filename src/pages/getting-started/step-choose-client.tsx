/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useState } from 'react';
import { CodeBlock } from '@/components/shared/code-block';

const clients = [
    {
        id: 'cursor',
        label: 'Cursor',
        steps: [
            'Open Cursor Settings → MCP',
            'Add a new global MCP server',
            'Set the command to: npx @ton/mcp@alpha',
            'Save and restart Cursor',
        ],
    },
    {
        id: 'claude-desktop',
        label: 'Claude Desktop',
        steps: [
            'Open Claude Desktop → Settings → Developer → Edit Config',
            'Add to the "mcpServers" section (see config below)',
            'Save and restart Claude Desktop',
        ],
    },
    {
        id: 'windsurf',
        label: 'Windsurf',
        steps: [
            'Open Windsurf Settings → MCP Configuration',
            'Add to the MCP servers config (see config below)',
            'Save and restart Windsurf',
        ],
    },
    {
        id: 'other',
        label: 'Other',
        steps: [
            'Any MCP-compatible client can connect via stdio',
            'Run npx @ton/mcp@alpha as the server command',
            'Refer to your client\'s documentation for adding MCP servers',
        ],
    },
] as const;

const jsonConfig = `{
  "mcpServers": {
    "ton-wallet": {
      "command": "npx",
      "args": ["@ton/mcp@alpha"]
    }
  }
}`;

export function StepChooseClient() {
    const [activeTab, setActiveTab] = useState<string>('cursor');
    const activeClient = clients.find((c) => c.id === activeTab)!;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-xl font-bold tracking-tight">Choose Your MCP Client</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    Pick your AI coding assistant and follow the setup instructions to connect the TON MCP server.
                </p>
            </div>

            <div className="flex gap-1 overflow-x-auto rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
                {clients.map((client) => (
                    <button
                        key={client.id}
                        onClick={() => setActiveTab(client.id)}
                        className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === client.id
                                ? 'bg-amber-500/10 text-amber-500'
                                : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                    >
                        {client.label}
                    </button>
                ))}
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <ol className="flex flex-col gap-3">
                    {activeClient.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-500/10 font-mono text-[10px] font-bold text-amber-500">
                                {i + 1}
                            </span>
                            <span className="text-sm text-neutral-300">{step}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <CodeBlock code={jsonConfig} title="MCP config — copy to your client" language="json" />
        </div>
    );
}
