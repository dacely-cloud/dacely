// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { describe, expect, it } from 'vitest';
import { CommandRegistry } from '../src/classes/CommandRegistry';

describe('CommandRegistry', () => {
    const registry = CommandRegistry.createDefault();

    it('exposes the full command catalog', () => {
        expect(registry.all.length).toBeGreaterThanOrEqual(13);
    });

    it('resolves commands by name', () => {
        expect(registry.find('deploy')?.name).toBe('deploy');
    });

    it('resolves commands by alias', () => {
        expect(registry.find('ls')?.name).toBe('projects');
        expect(registry.find('?')?.name).toBe('help');
    });

    it('is case-insensitive', () => {
        expect(registry.find('LOGIN')?.name).toBe('login');
    });

    it('returns undefined for an unknown command', () => {
        expect(registry.find('nope')).toBeUndefined();
    });

    it('never maps two commands to the same name or alias', () => {
        const keys = registry.all.flatMap((command) => [command.name, ...command.aliases]);
        expect(new Set(keys).size).toBe(keys.length);
    });
});
