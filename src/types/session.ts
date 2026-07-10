// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

// Placeholder authentication state. Real auth is not wired up yet, so every
// session starts as a guest.
export interface SessionState {
    readonly authenticated: boolean;
    readonly user?: string;
}
