// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CommandResult } from '../../types';
import { Command } from '../Command';
import { OutputBuilder } from '../OutputBuilder';
import { Span } from '../Span';
import { Theme } from '../Theme';

interface SampleProject {
    readonly name: string;
    readonly domain: string;
    readonly status: 'Ready' | 'Building';
}

export class ProjectsCommand extends Command {
    readonly name = 'projects';
    readonly aliases: readonly string[] = ['ls', 'list'];
    readonly summary = 'List your Dacely projects';

    // Example data, shown until the API is wired up.
    private static readonly SAMPLES: readonly SampleProject[] = [
        { name: 'dacely-website', domain: 'dacely.com', status: 'Ready' },
        { name: 'edge-api', domain: 'edge-api.dacely.app', status: 'Ready' },
        { name: 'docs', domain: 'docs.dacely.app', status: 'Building' },
    ];

    run(): CommandResult {
        const samples = ProjectsCommand.SAMPLES;
        const nameWidth = Math.max(...samples.map((project) => project.name.length));
        const builder = new OutputBuilder().heading('Projects').blank();

        for (const project of samples) {
            const statusColor = project.status === 'Ready' ? Theme.success : Theme.warning;
            builder.push(
                Span.of('  ● ', statusColor),
                Span.of(project.name.padEnd(nameWidth + 2), Theme.white, { bold: true }),
                Span.of(project.domain.padEnd(24), Theme.sky),
                Span.of(project.status, statusColor),
            );
        }

        builder.blank().placeholder();
        return { lines: builder.build() };
    }
}
