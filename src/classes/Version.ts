// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

interface PackageManifest {
    readonly version?: string;
}

// Resolves the package version at runtime by walking up from the module's own
// location until it finds a package.json. This works identically in dev
// (tsx/vitest, from src/classes), in the bundled build (from build/), and inside
// an installed node_modules, without hardcoding a relative depth.
export class Version {
    private static cached: string | undefined = undefined;

    static get current(): string {
        Version.cached ??= Version.read();
        return Version.cached;
    }

    private static read(): string {
        let directory = dirname(fileURLToPath(import.meta.url));
        for (let depth = 0; depth < 8; depth++) {
            const candidate = join(directory, 'package.json');
            if (existsSync(candidate)) {
                const manifest = JSON.parse(readFileSync(candidate, 'utf8')) as PackageManifest;
                if (typeof manifest.version === 'string') {
                    return manifest.version;
                }
            }
            const parent = dirname(directory);
            if (parent === directory) {
                break;
            }
            directory = parent;
        }
        return '0.0.0';
    }
}
