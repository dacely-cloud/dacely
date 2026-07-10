// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';

export class LogoutCommand extends Command {
    readonly name = 'logout';
    readonly aliases: readonly string[] = ['signout'];
    readonly summary = 'Sign out of the current session';

    run(): CommandResult {
        const lines = new OutputBuilder()
            .success('You have been signed out.')
            .blank()
            .placeholder()
            .build();
        return { lines };
    }
}
