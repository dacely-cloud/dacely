// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { beforeEach, describe, expect, it } from 'vitest';
import { CommandRegistry } from '../src/classes/CommandRegistry';
import { CommandRunner } from '../src/classes/CommandRunner';
import { Session } from '../src/classes/Session';

function textOf(result: { lines: readonly (readonly { text: string }[])[] }): string {
    return result.lines.map((line) => line.map((span) => span.text).join('')).join('\n');
}

describe('CommandRunner', () => {
    let runner: CommandRunner;

    beforeEach(() => {
        runner = new CommandRunner(CommandRegistry.createDefault(), Session.guest());
    });

    it('runs a known command', async () => {
        const result = await runner.runCommand('whoami', { interactive: false });
        expect(textOf(result)).toContain('not signed in');
    });

    it('returns exit code 1 for an unknown command', async () => {
        const result = await runner.runCommand('nope', { interactive: false });
        expect(result.exitCode).toBe(1);
        expect(textOf(result)).toContain('Unknown command');
    });

    it('ignores a leading slash on prompt input', async () => {
        const result = await runner.runInput('/version', { interactive: true });
        if (result === null) {
            throw new Error('expected a result for /version');
        }
        expect(textOf(result)).toContain('dacely');
    });

    it('returns null for empty input', async () => {
        expect(await runner.runInput('   ', { interactive: true })).toBeNull();
        expect(await runner.runInput('//', { interactive: true })).toBeNull();
    });

    it('signals clear in interactive mode', async () => {
        const result = await runner.runInput('/clear', { interactive: true });
        expect(result?.clear).toBe(true);
    });

    it('signals exit for the exit command', async () => {
        const result = await runner.runInput('/exit', { interactive: true });
        expect(result?.exit).toBe(true);
    });

    it('passes flags through to the command', async () => {
        const result = await runner.runCommand('deploy', {
            flags: { prod: true },
            interactive: false,
        });
        expect(textOf(result)).toContain('production');
    });

    it('greets an authenticated user by name', async () => {
        const authed = new CommandRunner(
            CommandRegistry.createDefault(),
            new Session({ authenticated: true, user: 'ada@dacely.com' }),
        );
        const result = await authed.runCommand('whoami', { interactive: false });
        expect(textOf(result)).toContain('Signed in as');
        expect(textOf(result)).toContain('ada@dacely.com');
    });

    it('falls back to "unknown" when authenticated without a user', async () => {
        const authed = new CommandRunner(
            CommandRegistry.createDefault(),
            new Session({ authenticated: true }),
        );
        const result = await authed.runCommand('whoami', { interactive: false });
        expect(textOf(result)).toContain('unknown');
    });
});
