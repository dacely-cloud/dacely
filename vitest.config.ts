// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['test/**/*.test.ts', 'test/**/*.test.tsx', 'test/**/*.spec.ts'],
        exclude: [...configDefaults.exclude],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                'node_modules/',
                'build/',
                'test/',
                '**/*.d.ts',
                '**/*.config.*',
                'src/cli.tsx',
            ],
        },
    },
});
