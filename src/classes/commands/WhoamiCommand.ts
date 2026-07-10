// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandContext, CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';
import { Span } from '../Span';
import { Theme } from '../Theme';

export class WhoamiCommand extends Command {
    readonly name = 'whoami';
    readonly summary = 'Show the currently signed-in account';

    run(context: CommandContext): CommandResult {
        if (context.session.authenticated) {
            const lines = new OutputBuilder()
                .push(
                    Span.of('● ', Theme.success, { bold: true }),
                    Span.of('Signed in as ', Theme.muted),
                    Span.of(context.session.user ?? 'unknown', Theme.white, { bold: true }),
                )
                .build();
            return { lines };
        }

        const lines = new OutputBuilder()
            .push(Span.of('○ ', Theme.muted), Span.of('You are not signed in.', Theme.muted))
            .push(
                Span.of('  Run ', Theme.muted),
                Span.of('/login', Theme.sky, { bold: true }),
                Span.of(' to authenticate.', Theme.muted),
            )
            .build();
        return { lines };
    }
}
