// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { SessionState } from '../types';

// Placeholder session. Real authentication is not wired up yet.
export class Session implements SessionState {
    readonly authenticated: boolean;
    readonly user?: string;

    constructor(state: SessionState = { authenticated: false }) {
        this.authenticated = state.authenticated;
        this.user = state.user;
    }

    static guest(): Session {
        return new Session({ authenticated: false });
    }
}
