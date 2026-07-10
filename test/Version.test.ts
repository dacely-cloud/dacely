// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { Version } from '../src/classes/Version';

describe('Version', () => {
    it('resolves the real version from package.json (not the fallback)', () => {
        const manifestPath = fileURLToPath(new URL('../package.json', import.meta.url));
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { version: string };
        expect(Version.current).toBe(manifest.version);
        expect(Version.current).not.toBe('0.0.0');
    });
});
