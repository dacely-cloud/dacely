// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { beforeEach, describe, expect, it } from 'vitest';
import { ArgvParser } from '../src/classes/ArgvParser';

describe('ArgvParser', () => {
    let parser: ArgvParser;

    beforeEach(() => {
        parser = new ArgvParser();
    });

    it('drops into interactive mode with no arguments', () => {
        const invocation = parser.parse([]);
        expect(invocation.interactive).toBe(true);
        expect(invocation.command).toBeUndefined();
    });

    it('parses a bare subcommand', () => {
        const invocation = parser.parse(['login']);
        expect(invocation).toMatchObject({ interactive: false, command: 'login' });
    });

    it('treats --login the same as login', () => {
        expect(parser.parse(['--login']).command).toBe('login');
    });

    it('maps short flags -h and -v to help and version', () => {
        expect(parser.parse(['-h']).command).toBe('help');
        expect(parser.parse(['-v']).command).toBe('version');
    });

    it('lowercases the command and collects positionals and flags', () => {
        const invocation = parser.parse(['Deploy', 'site', '--prod']);
        expect(invocation.command).toBe('deploy');
        expect(invocation.positionals).toEqual(['site']);
        expect(invocation.flags).toEqual({ prod: true });
    });

    it('maps an unknown short flag to its letter as the command', () => {
        const invocation = parser.parse(['-x', 'y']);
        expect(invocation.command).toBe('x');
        expect(invocation.positionals).toEqual(['y']);
    });

    it('treats a bare -- as the command name', () => {
        expect(parser.parse(['--']).command).toBe('--');
    });
});
