// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandContext, CommandResult } from '../../types';
import { Branding } from '../Branding';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';
import { Span } from '../Span';
import { Theme } from '../Theme';

export class HelpCommand extends Command {
    readonly name = 'help';
    readonly aliases: readonly string[] = ['?'];
    readonly summary = 'List the available commands';

    run(context: CommandContext): CommandResult {
        const width = Math.max(...context.commands.map((command) => command.name.length));
        const builder = new OutputBuilder()
            .heading('Dacely CLI')
            .muted(Branding.TAGLINE)
            .blank()
            .push(Span.of('COMMANDS', Theme.strongMuted, { bold: true }));

        for (const command of context.commands) {
            const aliases =
                command.aliases.length > 0 ? `  aka ${command.aliases.join(', ')}` : '';
            builder.push(
                Span.of('  /', Theme.muted),
                Span.of(command.name.padEnd(width + 2), Theme.sky, { bold: true }),
                Span.of(command.summary, Theme.strongMuted),
                Span.of(aliases, Theme.muted, { dim: true }),
            );
        }

        builder.blank().push(
            Span.of('Run ', Theme.muted),
            Span.of('dacely <command>', Theme.sky),
            Span.of(' from your shell, or type ', Theme.muted),
            Span.of('/<command>', Theme.sky),
            Span.of(' here.', Theme.muted),
        );

        return { lines: builder.build() };
    }
}
