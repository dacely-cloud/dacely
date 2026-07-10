// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { describe, expect, it } from 'vitest';
import { Tokenizer } from '../src/classes/Tokenizer';

describe('Tokenizer.tokenize', () => {
    it('splits on whitespace', () => {
        expect(Tokenizer.tokenize('deploy --prod now')).toEqual(['deploy', '--prod', 'now']);
    });

    it('honors double and single quotes', () => {
        expect(Tokenizer.tokenize('env add --name="my app"')).toEqual([
            'env',
            'add',
            '--name=my app',
        ]);
        expect(Tokenizer.tokenize("say 'hello world'")).toEqual(['say', 'hello world']);
    });

    it('returns an empty array for blank input', () => {
        expect(Tokenizer.tokenize('   ')).toEqual([]);
    });
});

describe('Tokenizer.splitFlags', () => {
    it('separates positionals from long flags', () => {
        const { positionals, flags } = Tokenizer.splitFlags(['add', '--name=api', '--force']);
        expect(positionals).toEqual(['add']);
        expect(flags).toEqual({ name: 'api', force: true });
    });

    it('expands grouped short flags', () => {
        const { flags } = Tokenizer.splitFlags(['-ab']);
        expect(flags).toEqual({ a: true, b: true });
    });

    it('does not terminate options at a bare -- (kept as positional)', () => {
        const { positionals, flags } = Tokenizer.splitFlags(['deploy', '--', '--prod']);
        expect(positionals).toEqual(['deploy', '--']);
        expect(flags).toEqual({ prod: true });
    });

    it('yields an empty string value for --key=', () => {
        expect(Tokenizer.splitFlags(['--name=']).flags).toEqual({ name: '' });
    });
});
