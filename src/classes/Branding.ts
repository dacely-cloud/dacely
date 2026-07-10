// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

export type WordLetter = 'D' | 'A' | 'C' | 'E' | 'L' | 'Y';

// The Dacely splash artwork. The mark is a half-block trace of the real Dacely
// logo (client/public/images/logo.svg): the chunky "D" with a pointed left
// edge, a rounded bowl on the right, and a horizontal slit through the middle.
// It sits to the left of a block-letter DACELY wordmark. Everything renders in
// white; a single sky-blue accent is applied by the view, matching dacely.com.
//
// Grid integrity is load-bearing: every MARK row is exactly MARK_WIDTH cells and
// every assembled wordmark row is exactly WORDMARK_WIDTH cells, so nothing
// shears on a real monospace grid (asserted by test/Branding.test.ts).
export class Branding {
    // The Dacely "D" mark, 8 rows, each exactly 16 cells wide.
    static readonly MARK: readonly string[] = [
        '▀██████████▄▄   ',
        '  ▀███████████▄ ',
        '    ▀██████████▄',
        '      ▀█████████',
        '      ▄█████████',
        '    ▄██████████▀',
        '  ▄███████████▀ ',
        '▄██████████▀▀   ',
    ];

    static readonly MARK_WIDTH = 16;
    static readonly WORDMARK_WIDTH = 49;

    static readonly WORD: readonly WordLetter[] = ['D', 'A', 'C', 'E', 'L', 'Y'];
    static readonly WORDMARK_ROWS: readonly number[] = [0, 1, 2, 3, 4, 5];

    // ANSI-Shadow block glyphs. D/A/C/E/L are 8 cells wide, Y is 9 (8*5 + 9 = 49).
    static readonly GLYPHS: Readonly<Record<WordLetter, readonly string[]>> = {
        D: ['██████╗ ', '██╔══██╗', '██║  ██║', '██║  ██║', '██████╔╝', '╚═════╝ '],
        A: [' █████╗ ', '██╔══██╗', '███████║', '██╔══██║', '██║  ██║', '╚═╝  ╚═╝'],
        C: [' ██████╗', '██╔════╝', '██║     ', '██║     ', '╚██████╗', ' ╚═════╝'],
        E: ['███████╗', '██╔════╝', '█████╗  ', '██╔══╝  ', '███████╗', '╚══════╝'],
        L: ['██╗     ', '██║     ', '██║     ', '██║     ', '███████╗', '╚══════╝'],
        Y: ['██╗   ██╗', '╚██╗ ██╔╝', ' ╚████╔╝ ', '  ╚██╔╝  ', '   ██║   ', '   ╚═╝   '],
    };

    // Copy.
    static readonly TAGLINE = 'the application cloud for modern fullstack apps';
    static readonly PROMISE_HEAD = 'TypeScript in. ';
    static readonly PROMISE_TAIL = 'Global edge out.';
    static readonly CHANNEL = 'channel stable';
    static readonly HINT_SUFFIX = 'to start building on the edge';
}
