# Dacely CLI

The command-line interface for [Dacely](https://dacely.com), the application
cloud for modern fullstack apps. A themed terminal experience built with
[Ink](https://github.com/vadimdemedes/ink) and React.

> **TypeScript in. Global edge out.**

```
  ▀██████████▄▄
    ▀███████████▄     ██████╗  █████╗  ██████╗███████╗██╗     ██╗   ██╗
      ▀██████████▄    ██╔══██╗██╔══██╗██╔════╝██╔════╝██║     ╚██╗ ██╔╝
        ▀█████████    ██║  ██║███████║██║     █████╗  ██║      ╚████╔╝
        ▄█████████    ██║  ██║██╔══██║██║     ██╔══╝  ██║       ╚██╔╝
      ▄██████████▀    ██████╔╝██║  ██║╚██████╗███████╗███████╗   ██║
    ▄███████████▀     ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚══════╝╚══════╝   ╚═╝
  ▄██████████▀▀
```

> The commands below are placeholders that render their intended UX. Wiring them
> to the Dacely API is tracked separately.

## Install

```bash
npm install -g dacely
```

Requires Node.js >= 24. The CLI targets modern ES2026 runtimes and runs on
Node, Bun, and Deno.

## Usage

Run `dacely` with no arguments to open the interactive prompt:

```bash
dacely
```

Type a slash command such as `/help`, `/login`, or `/deploy`. Type `/exit` (or
press Ctrl-C) to leave.

Every command also works directly from your shell, as a subcommand or a flag:

```bash
dacely help          # or dacely --help,  dacely -h
dacely login         # or dacely --login
dacely deploy --prod
dacely --version     # or dacely -v
```

## Commands

| Command     | Aliases        | Description                                       |
| ----------- | -------------- | ------------------------------------------------- |
| `help`      | `?`            | List the available commands                       |
| `login`     | `signin`       | Sign in to your Dacely account                    |
| `logout`    | `signout`      | Sign out of the current session                   |
| `whoami`    |                | Show the currently signed-in account              |
| `projects`  | `ls`, `list`   | List your Dacely projects                         |
| `deploy`    | `ship`         | Deploy the current directory to the Dacely edge   |
| `status`    |                | Show the latest deployment status                 |
| `logs`      |                | Stream logs from your deployment                  |
| `env`       |                | Manage environment variables                      |
| `link`      |                | Link the current directory to a Dacely project    |
| `version`   | `ver`          | Print the CLI version                             |
| `clear`     | `cls`          | Clear the screen (interactive)                    |
| `exit`      | `quit`         | Exit the interactive prompt                       |

## Development

```bash
npm install       # install dependencies
npm run dev       # run the CLI from source with hot reload (tsx)
npm start         # run the CLI from source once
npm run build     # typecheck and bundle to build/cli.js (esbuild)
npm run typecheck # strict TypeScript type check
npm run lint      # ESLint (strict, type-checked)
npm test          # run the vitest suite with coverage
```

## Architecture

The project is organized into three layers with a strict object-oriented core:

```
src/
  types/        Interfaces and type aliases only (no runtime code)
  classes/      Domain logic as classes
    commands/     one class per command, extending the Command base
    ...           CommandRegistry, CommandRunner, ArgvParser, Tokenizer,
                  OutputBuilder, Session, Theme, Branding, Version, CliApplication
  components/   Ink views as React class components
  cli.tsx       Entry point
```

- **`ArgvParser` / `Tokenizer`** turn `process.argv` (or a typed prompt line)
  into a command name, positionals, and flags.
- **`CommandRegistry`** holds the catalog and resolves names/aliases.
- **`CommandRunner`** executes a command and returns styled `OutputLine`s built
  with `OutputBuilder`.
- **`CliApplication`** either launches the interactive `AppView` (Ink) or renders
  a single command's output to a string and exits.
- **`Theme`** and **`Branding`** hold the Dacely palette and splash artwork,
  matching [dacely.com](https://dacely.com).

## License

The Dacely CLI is licensed under the **Business Source License 1.1**
([LICENSE](./LICENSE)). You may install, run, use, modify, and redistribute it
for any purpose, including commercially. The only thing BUSL restricts before
the Change Date is offering it to third parties as a hosted, managed, or
standalone product or service that competes with Dacely (for that, contact
business@dacely.com).

On the **Change Date, 2030-07-10**, it converts to the **Apache License,
Version 2.0** ([LICENSE-APACHE-2.0.txt](./LICENSE-APACHE-2.0.txt)).

Copyright (c) 2026 Dacely &lt;business@dacely.com&gt;. All rights not expressly
granted are reserved; see [NOTICE](./NOTICE). Third-party components and their
licenses are listed in [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).
Contributions are covered by [CONTRIBUTING.md](./CONTRIBUTING.md).
