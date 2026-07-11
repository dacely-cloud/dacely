// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { describe, expect, it } from 'vitest';
import { Pattern } from '../src/classes/Pattern';

// Count the dots the vignette places over a whole cols×rows screen.
function dotCount(cols: number, rows: number): number {
    let n = 0;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (Pattern.isDot(x, y, cols, rows)) {
                n += 1;
            }
        }
    }
    return n;
}

describe('Pattern (vignette backdrop)', () => {
    it('keeps the center clean and only draws toward the edges', () => {
        const cols = 80;
        const rows = 40;
        // A generous central region should have no dots at all.
        for (let y = Math.floor(rows * 0.35); y < Math.ceil(rows * 0.65); y++) {
            for (let x = Math.floor(cols * 0.35); x < Math.ceil(cols * 0.65); x++) {
                expect(Pattern.isDot(x, y, cols, rows)).toBe(false);
            }
        }
        // ...yet the screen overall is not empty: the border band has dots.
        expect(dotCount(cols, rows)).toBeGreaterThan(0);
    });

    it('is denser near the edges than in the middle band', () => {
        const cols = 80;
        const rows = 40;
        const edgeRows = [0, 1, rows - 2, rows - 1];
        const midRows = [rows / 2 - 1, rows / 2];
        const count = (ys: number[]): number =>
            ys.reduce((sum, y) => sum + Pattern.row(0, y, cols, cols, rows).replace(/ /gu, '').length, 0);
        expect(count(edgeRows)).toBeGreaterThan(count(midRows));
    });

    it('is deterministic: the same cell always resolves the same way', () => {
        for (const [x, y] of [[0, 0], [79, 0], [3, 21], [40, 39]] as const) {
            expect(Pattern.isDot(x, y, 80, 40)).toBe(Pattern.isDot(x, y, 80, 40));
        }
    });

    it('row() honors the absolute start column so bands stay continuous', () => {
        const cols = 80;
        const rows = 24;
        const whole = Pattern.row(0, 0, cols, cols, rows);
        const tail = Pattern.row(60, 0, 20, cols, rows);
        expect(tail).toBe(whole.slice(60));
    });

    it('never draws outside a degenerate 1×1 screen', () => {
        expect(Pattern.isDot(0, 0, 1, 1)).toBe(false);
        expect(Pattern.row(0, 0, 1, 1, 1)).toBe(' ');
    });
});
