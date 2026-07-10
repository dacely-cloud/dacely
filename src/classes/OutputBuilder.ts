// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { OutputLine, OutputSpan } from '../types';
import { Span } from './Span';
import { Theme } from './Theme';

// Fluent builder for a command's output. Keeps command classes terse and
// on-brand: every semantic helper returns `this` for chaining.
export class OutputBuilder {
    private readonly lines: OutputLine[] = [];

    // Push a raw line made of the given spans.
    push(...spans: OutputSpan[]): this {
        this.lines.push(spans);
        return this;
    }

    blank(): this {
        this.lines.push([]);
        return this;
    }

    heading(text: string): this {
        return this.push(Span.of(text, Theme.white, { bold: true }));
    }

    muted(text: string): this {
        return this.push(Span.of(text, Theme.muted));
    }

    success(text: string): this {
        return this.push(Span.of('✔ ', Theme.success, { bold: true }), Span.of(text, Theme.strongMuted));
    }

    info(text: string): this {
        return this.push(Span.of('› ', Theme.sky, { bold: true }), Span.of(text, Theme.strongMuted));
    }

    warn(text: string): this {
        return this.push(Span.of('⚠ ', Theme.warning, { bold: true }), Span.of(text, Theme.strongMuted));
    }

    error(text: string): this {
        return this.push(Span.of('✖ ', Theme.danger, { bold: true }), Span.of(text, Theme.strongMuted));
    }

    // A consistent "not wired up yet" footer for placeholder commands.
    placeholder(): this {
        return this.push(
            Span.of('  placeholder — this command is not wired up yet.', Theme.muted, { dim: true }),
        );
    }

    build(): OutputLine[] {
        return this.lines;
    }
}
