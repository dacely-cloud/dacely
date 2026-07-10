// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { CliInvocation } from '../types';
import { Tokenizer } from './Tokenizer';

// Parses process argv into a CliInvocation.
export class ArgvParser {
    // Short single-dash aliases mapped to their command name.
    private static readonly SHORT_ALIASES: Readonly<Record<string, string>> = {
        h: 'help',
        v: 'version',
    };

    // Parse argv (already sliced past `node` and the script path).
    //
    // The first token selects the command and may be written three ways so that
    // both `dacely login` and `dacely --login` (and `dacely -h`) work:
    //   - `login`   -> command "login"
    //   - `--login` -> command "login"
    //   - `-h`      -> command "help" (via SHORT_ALIASES)
    // Everything after the first token is parsed as positionals + flags.
    parse(argv: readonly string[]): CliInvocation {
        if (argv.length === 0) {
            return { interactive: true, positionals: [], flags: {} };
        }

        const [first, ...rest] = argv;
        let command: string;

        if (first.startsWith('--') && first.length > 2) {
            command = first.slice(2);
        } else if (first.startsWith('-') && first.length > 1 && !first.startsWith('--')) {
            const key = first.slice(1);
            command = ArgvParser.SHORT_ALIASES[key] ?? key;
        } else {
            command = first;
        }

        const { positionals, flags } = Tokenizer.splitFlags(rest);
        return {
            interactive: false,
            command: command.toLowerCase(),
            positionals,
            flags,
        };
    }
}
