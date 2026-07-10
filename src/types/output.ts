// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

// A single run of colored/styled text within a line of command output.
export interface OutputSpan {
    readonly text: string;
    // Hex (e.g. "#6366f1") or any Ink-supported color name. Omit for default.
    readonly color?: string;
    readonly bold?: boolean;
    readonly dim?: boolean;
}

// A line of output is an ordered list of spans. An empty list renders blank.
export type OutputLine = readonly OutputSpan[];
