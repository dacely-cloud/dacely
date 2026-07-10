// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import type { Command } from './Command';
import { ClearCommand } from './commands/ClearCommand';
import { DeployCommand } from './commands/DeployCommand';
import { EnvCommand } from './commands/EnvCommand';
import { ExitCommand } from './commands/ExitCommand';
import { HelpCommand } from './commands/HelpCommand';
import { LinkCommand } from './commands/LinkCommand';
import { LoginCommand } from './commands/LoginCommand';
import { LogoutCommand } from './commands/LogoutCommand';
import { LogsCommand } from './commands/LogsCommand';
import { ProjectsCommand } from './commands/ProjectsCommand';
import { StatusCommand } from './commands/StatusCommand';
import { VersionCommand } from './commands/VersionCommand';
import { WhoamiCommand } from './commands/WhoamiCommand';

// Holds the command catalog and resolves a name/alias to its command.
export class CommandRegistry {
    private readonly byName = new Map<string, Command>();
    readonly all: readonly Command[];

    constructor(commands: readonly Command[]) {
        this.all = commands;
        for (const command of commands) {
            this.byName.set(command.name, command);
            for (const alias of command.aliases) {
                this.byName.set(alias, command);
            }
        }
    }

    find(name: string): Command | undefined {
        return this.byName.get(name.toLowerCase());
    }

    // The default registry, in the order shown by `help`.
    static createDefault(): CommandRegistry {
        return new CommandRegistry([
            new HelpCommand(),
            new LoginCommand(),
            new LogoutCommand(),
            new WhoamiCommand(),
            new ProjectsCommand(),
            new DeployCommand(),
            new StatusCommand(),
            new LogsCommand(),
            new EnvCommand(),
            new LinkCommand(),
            new VersionCommand(),
            new ClearCommand(),
            new ExitCommand(),
        ]);
    }
}
