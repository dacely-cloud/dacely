// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';
import { Span } from '../Span';
import { Theme } from '../Theme';

export class EnvCommand extends Command {
    readonly name = 'env';
    readonly summary = 'Manage environment variables';
    readonly usage = 'dacely env <list|add|rm> [name]';

    run(): CommandResult {
        const lines = new OutputBuilder()
            .heading('Environment variables')
            .blank()
            .push(Span.of('  dacely env list', Theme.sky), Span.of('    show all variables', Theme.muted))
            .push(Span.of('  dacely env add ', Theme.sky), Span.of('    add a new variable', Theme.muted))
            .push(Span.of('  dacely env rm  ', Theme.sky), Span.of('    remove a variable', Theme.muted))
            .blank()
            .placeholder()
            .build();
        return { lines };
    }
}
