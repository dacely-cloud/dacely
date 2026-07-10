// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';
import { Span } from '../Span';
import { Theme } from '../Theme';

export class StatusCommand extends Command {
    readonly name = 'status';
    readonly summary = 'Show the latest deployment status';

    run(): CommandResult {
        const lines = new OutputBuilder()
            .heading('Latest deployment')
            .blank()
            .push(Span.of('  state     ', Theme.muted), Span.of('● Ready', Theme.success, { bold: true }))
            .push(Span.of('  url       ', Theme.muted), Span.of('https://dacely.com', Theme.sky))
            .push(Span.of('  region    ', Theme.muted), Span.of('global edge', Theme.strongMuted))
            .push(Span.of('  deployed  ', Theme.muted), Span.of('just now', Theme.strongMuted))
            .blank()
            .placeholder()
            .build();
        return { lines };
    }
}
