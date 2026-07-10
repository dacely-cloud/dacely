// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { CliApplication } from './classes/CliApplication';

// Entry point. esbuild prepends the `#!/usr/bin/env node` shebang at build time.
const application = new CliApplication();
const exitCode = await application.run(process.argv.slice(2));
process.exit(exitCode);
