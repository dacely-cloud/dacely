// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

export interface SplitFlags {
    readonly positionals: string[];
    readonly flags: Record<string, string | boolean>;
}

// Dependency-free argument parsing shared by the argv parser (direct mode) and
// the REPL prompt.
export class Tokenizer {
    // Split a raw input string into tokens, honoring single/double quotes that
    // may appear anywhere so a value like `--name="my app"` survives as one
    // token (the quotes are stripped).
    static tokenize(input: string): string[] {
        const tokens: string[] = [];
        let current = '';
        let started = false;
        let quote: '"' | "'" | null = null;

        for (const ch of input) {
            if (quote !== null) {
                if (ch === quote) {
                    quote = null;
                } else {
                    current += ch;
                }
            } else if (ch === '"' || ch === "'") {
                quote = ch;
                started = true;
            } else if (/\s/.test(ch)) {
                if (started) {
                    tokens.push(current);
                    current = '';
                    started = false;
                }
            } else {
                current += ch;
                started = true;
            }
        }

        if (started) {
            tokens.push(current);
        }
        return tokens;
    }

    // Separate `--key`, `--key=value`, and `-abc` flags from positional args. A
    // bare `--key` is boolean true; grouped short flags each become true.
    static splitFlags(tokens: readonly string[]): SplitFlags {
        const positionals: string[] = [];
        const flags: Record<string, string | boolean> = {};

        for (const token of tokens) {
            if (token.startsWith('--') && token.length > 2) {
                const body = token.slice(2);
                const eq = body.indexOf('=');
                if (eq >= 0) {
                    flags[body.slice(0, eq)] = body.slice(eq + 1);
                } else {
                    flags[body] = true;
                }
            } else if (token.startsWith('-') && token.length > 1 && !token.startsWith('--')) {
                for (const ch of token.slice(1)) {
                    flags[ch] = true;
                }
            } else {
                positionals.push(token);
            }
        }

        return { positionals, flags };
    }
}
