<div align="center">

<img src="https://raw.githubusercontent.com/dacely-cloud/dacely/main/assets/logo.svg" alt="Dacely" width="120" height="120" />

# Dacely CLI

### Ship from your terminal.

<sub>The CLI for <a href="https://dacely.com">Dacely</a>, the application cloud for modern fullstack apps.</sub>

<br/>

[![npm](https://img.shields.io/npm/v/dacely.svg?color=2563ff&label=npm&labelColor=0b0d12)](https://www.npmjs.com/package/dacely)

</div>

---

## Install

```bash
npm install -g dacely      # global `dacely` command
npx dacely --help          # or run once, no install
```

Requires Node.js >= 24. Runs on Node, Bun, and Deno.

## Usage

Run `dacely` with no arguments for the interactive home, then type a slash command like `/help`, `/login`, or `/deploy`. The same commands run directly from your shell and in CI:

```bash
dacely login           # or: dacely --login
dacely deploy --prod
dacely projects
dacely --help          # -h
dacely --version       # -v
```

> Commands are rendered placeholders today; wiring them to the Dacely API is in progress.

## Commands

| Command    | Aliases      | Description                                     |
| ---------- | ------------ | ----------------------------------------------- |
| `help`     | `?`          | List the available commands                     |
| `login`    | `signin`     | Sign in to your Dacely account                  |
| `logout`   | `signout`    | Sign out of the current session                 |
| `whoami`   |              | Show the currently signed-in account            |
| `projects` | `ls`, `list` | List your Dacely projects                       |
| `deploy`   | `ship`       | Deploy the current directory to the Dacely edge |
| `status`   |              | Show the latest deployment status               |
| `logs`     |              | Stream logs from your deployment                |
| `env`      |              | Manage environment variables                    |
| `link`     |              | Link the current directory to a Dacely project  |
| `version`  | `ver`        | Print the CLI version                           |
| `clear`    | `cls`        | Clear the screen (interactive)                  |
| `exit`     | `quit`       | Exit the interactive prompt                     |

## Architecture

Pure types in `src/types/`, class-based domain logic in `src/classes/` (one class per command), and the terminal UI in `src/components/`.

```mermaid
flowchart LR
    classDef core fill:#0b0d12,stroke:#8ab4ff,stroke-width:2px,color:#dbe8ff;
    classDef ui fill:#0c1016,stroke:#22c55e,stroke-width:2px,color:#c8f5e2;

    ARGV["argv / prompt"]:::core --> APP["CliApplication"]:::core
    APP --> RUN["CommandRunner<br/>+ CommandRegistry"]:::core
    RUN --> RESULT["CommandResult"]:::core
    APP -->|no args| HOME["interactive home"]:::ui
    HOME -->|typed command| RUN
    RESULT --> HOME
    APP -->|command| STDOUT["prints to stdout"]:::ui
    RESULT --> STDOUT
```

## Development

```bash
npm install       # install dependencies
npm run dev       # run from source with hot reload (tsx)
npm run build     # typecheck and bundle to build/cli.js
npm test          # vitest with coverage
npm run test:all  # lint + typecheck + tests
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for conventions and contribution terms.

## License

[Business Source License 1.1](./LICENSE). Free to install, run, use, modify, and redistribute (including commercially); the only restriction before the Change Date is offering it as a competing hosted or managed service. Converts to [Apache-2.0](./LICENSE-APACHE-2.0.txt) on **2030-07-10**.

Copyright (c) 2026 Dacely &lt;business@dacely.com&gt;. See [NOTICE](./NOTICE) and [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).
