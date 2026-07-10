// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandContext, CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';

export class ExitCommand extends Command {
    readonly name = 'exit';
    readonly aliases: readonly string[] = ['quit'];
    readonly summary = 'Exit the interactive prompt';

    run(context: CommandContext): CommandResult {
        if (context.interactive) {
            const lines = new OutputBuilder().muted('Goodbye — see you on the edge.').build();
            return { lines, exit: true };
        }
        const lines = new OutputBuilder()
            .muted('There is no interactive session to exit.')
            .build();
        return { lines };
    }
}
