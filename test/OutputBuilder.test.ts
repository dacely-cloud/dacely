// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { describe, expect, it } from 'vitest';
import { OutputBuilder } from '../src/classes/OutputBuilder';
import { Theme } from '../src/classes/Theme';

describe('OutputBuilder', () => {
    it('builds lines in the order they were added', () => {
        const lines = new OutputBuilder().heading('Title').blank().muted('sub').build();
        expect(lines).toHaveLength(3);
        expect(lines[0][0].text).toBe('Title');
        expect(lines[0][0].bold).toBe(true);
        expect(lines[1]).toEqual([]);
        expect(lines[2][0].color).toBe(Theme.muted);
    });

    it('composes multi-span lines with push', () => {
        const lines = new OutputBuilder().push({ text: 'a' }, { text: 'b' }).build();
        expect(lines[0]).toHaveLength(2);
    });

    it('prefixes semantic helpers with their status color', () => {
        const [line] = new OutputBuilder().success('done').build();
        expect(line[0].color).toBe(Theme.success);
        expect(line[1].text).toBe('done');
    });

    it('gives info, warn and error their own glyph and color', () => {
        const [info] = new OutputBuilder().info('a').build();
        expect(info[0].text).toBe('› ');
        expect(info[0].color).toBe(Theme.sky);

        const [warn] = new OutputBuilder().warn('b').build();
        expect(warn[0].text).toBe('⚠ ');
        expect(warn[0].color).toBe(Theme.warning);

        const [error] = new OutputBuilder().error('c').build();
        expect(error[0].text).toBe('✖ ');
        expect(error[0].color).toBe(Theme.danger);
    });

    it('renders a dim, muted placeholder footer', () => {
        const [line] = new OutputBuilder().placeholder().build();
        expect(line[0].dim).toBe(true);
        expect(line[0].color).toBe(Theme.muted);
    });
});
