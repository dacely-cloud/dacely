// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';
import { Span } from '../Span';
import { Theme } from '../Theme';

export class LinkCommand extends Command {
    readonly name = 'link';
    readonly summary = 'Link the current directory to a Dacely project';

    run(): CommandResult {
        const lines = new OutputBuilder()
            .info('Linking this directory to a Dacely project…')
            .push(
                Span.of(
                    '  We would detect your framework and connect this folder to a project.',
                    Theme.muted,
                ),
            )
            .blank()
            .placeholder()
            .build();
        return { lines };
    }
}
