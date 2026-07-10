// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { describe, expect, it } from 'vitest';
import { CommandRegistry } from '../src/classes/CommandRegistry';
import { CommandRunner } from '../src/classes/CommandRunner';
import { Session } from '../src/classes/Session';

// Smoke test: every registered command runs without throwing and returns a
// lines array, for both a guest and an interactive context.
describe('every registered command runs', () => {
    const registry = CommandRegistry.createDefault();
    const runner = new CommandRunner(registry, Session.guest());

    for (const command of registry.all) {
        it(`runs "${command.name}"`, async () => {
            const result = await runner.runCommand(command.name, { interactive: true });
            expect(Array.isArray(result.lines)).toBe(true);
        });
    }
});
