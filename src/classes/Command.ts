// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandContext, CommandResult, ICommand } from '../types';

// The abstract base every command extends. Subclasses declare their name,
// summary, and (optionally) aliases/usage, and implement run().
export abstract class Command implements ICommand {
    abstract readonly name: string;
    readonly aliases: readonly string[] = [];
    abstract readonly summary: string;
    readonly usage?: string;

    abstract run(context: CommandContext): CommandResult | Promise<CommandResult>;
}
