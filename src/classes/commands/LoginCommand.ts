// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';
import { Span } from '../Span';
import { Theme } from '../Theme';

export class LoginCommand extends Command {
    readonly name = 'login';
    readonly aliases: readonly string[] = ['signin'];
    readonly summary = 'Sign in to your Dacely account';
    readonly usage = 'dacely login [--email <address>]';

    run(): CommandResult {
        const lines = new OutputBuilder()
            .info('Opening the Dacely login…')
            .push(
                Span.of('  We would open ', Theme.muted),
                Span.of('https://dacely.com/login', Theme.sky),
                Span.of(' and wait for you to authorize this device.', Theme.muted),
            )
            .blank()
            .placeholder()
            .build();
        return { lines };
    }
}
