// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

// A sparse diagonal dotted lattice used as the splash backdrop. Kept as pure,
// testable logic separate from the view that colors and lays it out.
export class Pattern {
    static readonly GLYPH = '·';
    private static readonly PERIOD = 5;

    // Whether a background dot sits at cell (x, y).
    static isDot(x: number, y: number): boolean {
        return (x + y) % Pattern.PERIOD === 0;
    }

    // Build one row of the pattern, `width` cells wide, at absolute row `y`.
    static row(width: number, y: number): string {
        let out = '';
        for (let x = 0; x < width; x++) {
            out += Pattern.isDot(x, y) ? Pattern.GLYPH : ' ';
        }
        return out;
    }
}
