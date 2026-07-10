// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandResult } from '../types';
import type { CommandRegistry } from './CommandRegistry';
import type { Session } from './Session';
import { OutputBuilder } from './OutputBuilder';
import { Span } from './Span';
import { Theme } from './Theme';
import { Tokenizer } from './Tokenizer';

interface RunOptions {
    readonly positionals?: readonly string[];
    readonly flags?: Record<string, string | boolean>;
    readonly interactive: boolean;
}

// Executes commands, either by name with parsed arguments (direct mode) or from
// a raw line of prompt input (REPL).
export class CommandRunner {
    constructor(
        private readonly registry: CommandRegistry,
        private readonly session: Session,
    ) {}

    private unknown(name: string): CommandResult {
        const lines = new OutputBuilder()
            .error(`Unknown command: ${name}`)
            .push(
                Span.of('  Run ', Theme.muted),
                Span.of('/help', Theme.sky, { bold: true }),
                Span.of(' to see the available commands.', Theme.muted),
            )
            .build();
        return { exitCode: 1, lines };
    }

    async runCommand(name: string, options: RunOptions): Promise<CommandResult> {
        const command = this.registry.find(name);
        if (!command) {
            return this.unknown(name);
        }
        return command.run({
            args: options.positionals ?? [],
            flags: options.flags ?? {},
            session: this.session,
            interactive: options.interactive,
            commands: this.registry.all,
        });
    }

    // Run a raw line typed at the REPL prompt. A leading slash is optional.
    // Returns null for empty input (nothing to do).
    async runInput(input: string, options: { interactive: boolean }): Promise<CommandResult | null> {
        const trimmed = input.trim().replace(/^\/+/, '').trim();
        if (trimmed === '') {
            return null;
        }
        const [name, ...rest] = Tokenizer.tokenize(trimmed);
        const { positionals, flags } = Tokenizer.splitFlags(rest);
        return this.runCommand(name, {
            positionals,
            flags,
            interactive: options.interactive,
        });
    }
}
