// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandContext, CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';
import { Span } from '../Span';
import { Theme } from '../Theme';

export class DeployCommand extends Command {
    readonly name = 'deploy';
    readonly aliases: readonly string[] = ['ship'];
    readonly summary = 'Deploy the current directory to the Dacely edge';
    readonly usage = 'dacely deploy [--prod]';

    run(context: CommandContext): CommandResult {
        const production = context.flags.prod === true || context.flags.production === true;
        const lines = new OutputBuilder()
            .info(`Preparing ${production ? 'a production' : 'a preview'} deployment…`)
            .push(
                Span.of('  target   ', Theme.muted),
                Span.of(production ? 'production' : 'preview', production ? Theme.warning : Theme.sky, {
                    bold: true,
                }),
            )
            .push(
                Span.of('  region   ', Theme.muted),
                Span.of('global edge (auto)', Theme.strongMuted),
            )
            .blank()
            .placeholder()
            .build();
        return { lines };
    }
}
