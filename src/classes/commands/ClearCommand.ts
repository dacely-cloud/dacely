// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandContext, CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';

export class ClearCommand extends Command {
    readonly name = 'clear';
    readonly aliases: readonly string[] = ['cls'];
    readonly summary = 'Clear the screen';

    run(context: CommandContext): CommandResult {
        if (context.interactive) {
            return { lines: [], clear: true };
        }
        const lines = new OutputBuilder()
            .muted('Nothing to clear outside the interactive prompt.')
            .build();
        return { lines };
    }
}
