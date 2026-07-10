// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

// The Dacely palette, lifted from the product's design tokens so the CLI
// matches dacely.com. Values are 24-bit hex strings, which Ink renders directly
// via the <Text color> prop on truecolor terminals (and degrades gracefully
// elsewhere).
export class Theme {
    // Primary brand accent (indigo) and the violet/gold gradient stops.
    static readonly accent = '#6366f1';
    static readonly indigo = '#6366f1';
    static readonly violet = '#a78bfa';
    static readonly violetDeep = '#7c3aed';
    static readonly gold = '#d3c170';
    static readonly sky = '#8ab4ff';
    // The electric-blue accent dot from the Dacely mark.
    static readonly electric = '#0033ff';

    // Neutrals.
    static readonly white = '#ffffff';
    static readonly text = '#ffffff';
    static readonly muted = '#8d8c8b';
    static readonly strongMuted = '#d7d7d7';
    static readonly panel = '#060606';
    static readonly border = '#1a1a1a';
    // Faint slate for the background pattern; subtly visible on black.
    static readonly faint = '#3a3f4d';

    // Status colors.
    static readonly success = '#22c55e';
    static readonly warning = '#f59e0b';
    static readonly danger = '#ef4444';
}
