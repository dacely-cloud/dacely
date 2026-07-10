// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

// The result of parsing process argv. With no arguments the CLI drops into the
// interactive REPL; otherwise a single command runs and the process exits.
export interface CliInvocation {
    readonly interactive: boolean;
    readonly command?: string;
    readonly positionals: string[];
    readonly flags: Record<string, string | boolean>;
}
