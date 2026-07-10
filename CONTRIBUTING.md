# Contributing to the Dacely CLI

Thanks for your interest in improving the Dacely CLI. This document explains how
to set up the project, the conventions we follow, and the licensing terms that
apply to contributions.

## License and contributions

The Dacely CLI is licensed under the **Business Source License 1.1 (BUSL-1.1)**;
see [LICENSE](./LICENSE). It converts to the Apache License, Version 2.0 on the
Change Date, **2030-07-10**.

By submitting a contribution (a pull request, patch, or any other work) you
agree that:

- Your contribution is your original work, or you have the right to submit it.
- You license your contribution to Dacely under the terms of the project's
  license (BUSL-1.1, converting to Apache-2.0 on the Change Date), and you grant
  Dacely a perpetual, worldwide, non-exclusive, royalty-free, irrevocable
  license to use, reproduce, modify, and relicense your contribution as part of
  the Licensed Work, including under future versions of the project license.
- You retain no claim to any Dacely trademark, service mark, or logo.

All rights not expressly granted are reserved by Dacely. See [NOTICE](./NOTICE).
For commercial-licensing questions, contact **business@dacely.com**.

Every source file must carry the SPDX header:

```ts
// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>
```

## Getting started

Requires Node.js >= 24. We use npm.

```bash
npm install       # install dependencies
npm run dev       # run the CLI from source with hot reload (tsx)
npm start         # run the CLI from source once
npm run build     # typecheck and bundle to build/cli.js (esbuild)
```

## Before you open a pull request

Please make sure the full gate passes:

```bash
npm run lint       # ESLint (strict, type-checked)
npm run typecheck  # tsc, strict
npm test           # vitest with coverage
# or all three:
npm run test:all
```

Add or update tests for any behavior you change; the suite uses
[vitest](https://vitest.dev) and
[ink-testing-library](https://github.com/vadimdemedes/ink-testing-library).

## Project conventions

- **TypeScript, strict.** The project uses strict `tsc` options and
  `typescript-eslint` `strictTypeChecked`. Keep the build warning-free.
- **Object-oriented.** Domain logic lives in `src/classes/` as classes
  (one class per command in `src/classes/commands/`, extending the `Command`
  base). Pure types live in `src/types/`. The Ink UI in `src/components/` is
  built from React **class** components, not functional components.
- **Formatting.** Run Prettier (`npm run format`); 4-space indent, single
  quotes, 100-column width (see `.prettierrc.json`).
- **Commits.** Use clear, conventional-style prefixes (`feat:`, `fix:`,
  `docs:`, `chore:`, `refactor:`, `test:`). Do not commit secrets or generated
  output (`build/`, `coverage/`).
- **Adding a command.** Create a class in `src/classes/commands/`, register it
  in `CommandRegistry.createDefault()`, and add a test.
- **Third-party dependencies.** If you add or change a runtime dependency,
  regenerate [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).

## Reporting bugs and requesting features

Use the GitHub issue templates. For security vulnerabilities, do **not** open a
public issue: report privately via GitHub Security Advisories, as described in
the issue templates.
