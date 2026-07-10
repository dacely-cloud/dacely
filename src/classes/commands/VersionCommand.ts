// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandResult } from '../../types';
import { Branding } from '../Branding';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';
import { Span } from '../Span';
import { Theme } from '../Theme';
import { Version } from '../Version';

export class VersionCommand extends Command {
    readonly name = 'version';
    readonly aliases: readonly string[] = ['ver'];
    readonly summary = 'Print the CLI version';

    run(): CommandResult {
        const lines = new OutputBuilder()
            .push(
                Span.of('dacely', Theme.sky, { bold: true }),
                Span.of(' cli ', Theme.muted),
                Span.of(`v${Version.current}`, Theme.strongMuted, { bold: true }),
            )
            .muted(Branding.TAGLINE)
            .build();
        return { lines };
    }
}
