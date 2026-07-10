// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { describe, expect, it } from 'vitest';
import { Branding } from '../src/classes/Branding';

// The splash art only stays aligned if every row has a fixed cell width. These
// invariants were the QA gate from the design panel.
describe('Branding art invariants', () => {
    // Every art glyph is a single-cell BMP box-drawing character, so the string
    // length (UTF-16 code units) equals the rendered column count.
    it('renders every mark row at exactly MARK_WIDTH cells', () => {
        for (const row of Branding.MARK) {
            expect(row).toHaveLength(Branding.MARK_WIDTH);
        }
    });

    it('assembles every wordmark row at exactly WORDMARK_WIDTH cells', () => {
        for (const rowIndex of Branding.WORDMARK_ROWS) {
            const assembled = Branding.WORD.map((letter) => Branding.GLYPHS[letter][rowIndex]).join('');
            expect(assembled).toHaveLength(Branding.WORDMARK_WIDTH);
        }
    });

    it('provides six glyph rows for every wordmark letter', () => {
        for (const letter of Branding.WORD) {
            expect(Branding.GLYPHS[letter]).toHaveLength(Branding.WORDMARK_ROWS.length);
        }
    });

    it('renders the mark as an eight-row block', () => {
        expect(Branding.MARK).toHaveLength(8);
    });
});
