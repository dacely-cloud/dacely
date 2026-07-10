// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { Component, type ReactElement } from 'react';
import type { CommandResult } from '../types';
import type { CommandRunner } from '../classes/CommandRunner';
import { Version } from '../classes/Version';
import { HomeView } from './HomeView';

interface AppViewProps {
    readonly runner: CommandRunner;
    // Called when a command requests exit; wired to the Ink instance's unmount.
    readonly onExit: () => void;
}

interface Entry {
    readonly input: string;
    readonly result: CommandResult;
}

interface AppViewState {
    readonly last?: Entry;
    readonly busy: boolean;
    readonly cols: number;
    readonly rows: number;
}

// The interactive controller: tracks terminal size, the last command result,
// and the busy flag, and renders the full-screen HomeView.
export class AppView extends Component<AppViewProps, AppViewState> {
    state: AppViewState = { busy: false, cols: 80, rows: 24 };

    private readonly handleResize = (): void => {
        this.setState({
            cols: process.stdout.columns ?? 80,
            rows: process.stdout.rows ?? 24,
        });
    };

    componentDidMount(): void {
        this.handleResize();
        process.stdout.on('resize', this.handleResize);
    }

    componentWillUnmount(): void {
        process.stdout.off('resize', this.handleResize);
    }

    private readonly handleSubmit = (value: string): void => {
        void this.execute(value);
    };

    private async execute(value: string): Promise<void> {
        if (value.trim() === '') {
            return;
        }
        this.setState({ busy: true });
        const result = await this.props.runner.runInput(value, { interactive: true });
        this.setState({ busy: false });
        if (result === null) {
            return;
        }
        if (result.exit) {
            this.props.onExit();
            return;
        }
        if (result.clear) {
            this.setState({ last: undefined });
            return;
        }
        this.setState({ last: { input: value, result } });
    }

    render(): ReactElement {
        return (
            <HomeView
                cols={this.state.cols}
                rows={this.state.rows}
                last={this.state.last}
                busy={this.state.busy}
                version={Version.current}
                onSubmit={this.handleSubmit}
            />
        );
    }
}
