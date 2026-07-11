// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

// A faint dotted vignette used as the splash backdrop: dots crowd the screen
// edges and thin out to nothing toward the center, framing the content without
// cluttering it. Kept as pure, testable logic separate from the view that
// colors and lays it out.
export class Pattern {
    static readonly GLYPH = '·';

    // Below this edge-proximity the center stays completely clean; PEAK is the
    // dot density right at the outermost row/column.
    private static readonly START = 0.62;
    private static readonly PEAK = 0.22;

    // Edge-proximity of cell (x, y) on a `cols`×`rows` screen, in [0, 1]:
    // 0 at the exact center, 1 at the outermost row or column.
    private static edge(x: number, y: number, cols: number, rows: number): number {
        const nx = cols > 1 ? Math.abs((x * 2 - (cols - 1)) / (cols - 1)) : 0;
        const ny = rows > 1 ? Math.abs((y * 2 - (rows - 1)) / (rows - 1)) : 0;
        return Math.max(nx, ny);
    }

    // Dot density in [0, PEAK] for a given edge-proximity: zero until START,
    // then an ease-in ramp so the field fades in gently toward the border.
    private static density(edge: number): number {
        if (edge <= Pattern.START) {
            return 0;
        }
        const t = (edge - Pattern.START) / (1 - Pattern.START);
        return t * t * Pattern.PEAK;
    }

    // Deterministic hash of (x, y) into [0, 1). Stable across renders so the
    // field doesn't shimmer or churn every repaint (no RNG involved).
    private static hash01(x: number, y: number): number {
        let h = (Math.imul(x | 0, 73856093) ^ Math.imul(y | 0, 19349663)) >>> 0;
        h ^= h >>> 13;
        h = Math.imul(h, 0x5bd1e995) >>> 0;
        h ^= h >>> 15;
        return (h >>> 0) / 0x1_0000_0000;
    }

    // Whether a background dot sits at cell (x, y) of a `cols`×`rows` screen.
    static isDot(x: number, y: number, cols: number, rows: number): boolean {
        const d = Pattern.density(Pattern.edge(x, y, cols, rows));
        return d > 0 && Pattern.hash01(x, y) < d;
    }

    // Build a `width`-cell run starting at absolute column `xStart` on row `y`,
    // for a screen that is `cols` wide and `rows` tall.
    static row(xStart: number, y: number, width: number, cols: number, rows: number): string {
        let out = '';
        for (let i = 0; i < width; i++) {
            out += Pattern.isDot(xStart + i, y, cols, rows) ? Pattern.GLYPH : ' ';
        }
        return out;
    }
}
