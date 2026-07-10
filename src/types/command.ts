// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { OutputLine } from './output';
import type { SessionState } from './session';

export interface CommandResult {
    readonly lines: readonly OutputLine[];
    // Process exit code for direct mode. Defaults to 0.
    readonly exitCode?: number;
    // REPL control signals, ignored in direct mode.
    readonly clear?: boolean;
    readonly exit?: boolean;
}

// Everything a command needs to run. Positional args and flags are parsed from
// either the process argv (direct mode) or the typed prompt input (REPL).
export interface CommandContext {
    readonly args: readonly string[];
    readonly flags: Readonly<Record<string, string | boolean>>;
    readonly session: SessionState;
    // true when invoked from the interactive REPL, false for `dacely <command>`.
    readonly interactive: boolean;
    // The full command catalog, for introspection (e.g. `help`).
    readonly commands: readonly ICommand[];
}

// The structural contract a command satisfies. Implemented by the abstract
// Command base class; kept here so the types layer stays free of runtime code.
export interface ICommand {
    readonly name: string;
    readonly aliases: readonly string[];
    readonly summary: string;
    readonly usage?: string;
    run(context: CommandContext): CommandResult | Promise<CommandResult>;
}
