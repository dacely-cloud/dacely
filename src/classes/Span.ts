// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { OutputSpan } from '../types';

// Factory for styled output spans.
export class Span {
    static of(
        text: string,
        color?: string,
        extra: { bold?: boolean; dim?: boolean } = {},
    ): OutputSpan {
        return { text, color, bold: extra.bold, dim: extra.dim };
    }
}
