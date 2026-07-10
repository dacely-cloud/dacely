// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { describe, expect, it } from 'vitest';
import { CliApplication } from '../src/classes/CliApplication';

// Drive the top-level orchestrator in direct mode, capturing stdout. Under
// vitest stdin/stdout are not TTYs, so an empty argv falls back to help rather
// than launching the interactive REPL.
async function capture(argv: string[]): Promise<{ code: number; out: string }> {
    const writes: string[] = [];
    const original = process.stdout.write.bind(process.stdout);
    const fake = ((chunk: string | Uint8Array, encodingOrCb?: unknown, maybeCb?: unknown): boolean => {
        writes.push(typeof chunk === 'string' ? chunk : chunk.toString());
        const cb = typeof encodingOrCb === 'function' ? encodingOrCb : maybeCb;
        if (typeof cb === 'function') {
            (cb as () => void)();
        }
        return true;
    }) as typeof process.stdout.write;
    process.stdout.write = fake;
    try {
        const code = await new CliApplication().run(argv);
        return { code, out: writes.join('') };
    } finally {
        process.stdout.write = original;
    }
}

describe('CliApplication (direct mode)', () => {
    it('runs a known command and exits 0', async () => {
        const { code, out } = await capture(['whoami']);
        expect(code).toBe(0);
        expect(out).toContain('not signed in');
    });

    it('exits 1 for an unknown command', async () => {
        const { code, out } = await capture(['nope']);
        expect(code).toBe(1);
        expect(out).toContain('Unknown command');
    });

    it('passes flags through to the command', async () => {
        const { out } = await capture(['deploy', '--prod']);
        expect(out).toContain('production');
    });

    it('falls back to help when interactive mode has no TTY', async () => {
        const { code, out } = await capture([]);
        expect(code).toBe(0);
        expect(out).toContain('COMMANDS');
    });
});
