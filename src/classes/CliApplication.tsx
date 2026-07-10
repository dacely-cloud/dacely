// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { render, renderToString } from 'ink';
import type { CliInvocation } from '../types';
import { AppView } from '../components/AppView';
import { OutputView } from '../components/OutputView';
import { ArgvParser } from './ArgvParser';
import { CommandRegistry } from './CommandRegistry';
import { CommandRunner } from './CommandRunner';
import { Session } from './Session';

// Top-level orchestrator: parse argv, then either launch the interactive REPL
// or render a single command's output and return its exit code.
export class CliApplication {
    private readonly parser = new ArgvParser();
    private readonly registry = CommandRegistry.createDefault();
    private readonly runner = new CommandRunner(this.registry, Session.guest());

    async run(argv: readonly string[]): Promise<number> {
        const invocation: CliInvocation = this.parser.parse(argv);

        // The REPL needs a TTY for raw-mode input. Under a pipe / CI / redirected
        // stdin, fall back to direct mode (which prints help) instead of crashing.
        if (invocation.interactive && CliApplication.canInteract()) {
            // onExit fires later (on the /exit command), by which point `instance`
            // is assigned, so unmounting resolves waitUntilExit.
            const instance = render(
                <AppView
                    runner={this.runner}
                    onExit={() => {
                        instance.unmount();
                    }}
                />,
            );
            await instance.waitUntilExit();
            return 0;
        }

        const result = await this.runner.runCommand(invocation.command ?? 'help', {
            positionals: invocation.positionals,
            flags: invocation.flags,
            interactive: false,
        });
        // Render once to a string and print it; wait for the write to flush so
        // the caller's process.exit cannot truncate piped output.
        await CliApplication.writeLine(renderToString(<OutputView lines={result.lines} />));
        return result.exitCode ?? 0;
    }

    private static canInteract(): boolean {
        return process.stdin.isTTY && process.stdout.isTTY;
    }

    private static writeLine(text: string): Promise<void> {
        return new Promise((resolve) => {
            process.stdout.write(`${text}\n`, () => {
                resolve();
            });
        });
    }
}
