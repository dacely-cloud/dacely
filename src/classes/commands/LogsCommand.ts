// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';

export class LogsCommand extends Command {
    readonly name = 'logs';
    readonly summary = 'Stream logs from your deployment';
    readonly usage = 'dacely logs [--follow]';

    run(): CommandResult {
        const lines = new OutputBuilder()
            .info('Connecting to the edge log stream…')
            .blank()
            .placeholder()
            .build();
        return { lines };
    }
}
