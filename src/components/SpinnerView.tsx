// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { Text } from 'ink';
import { Component, type ReactElement } from 'react';
import { Theme } from '../classes/Theme';

interface SpinnerViewProps {
    readonly label?: string;
}

interface SpinnerViewState {
    readonly frame: number;
}

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'] as const;

// A small braille spinner, animated with its own interval so we do not depend
// on a functional-component spinner package.
export class SpinnerView extends Component<SpinnerViewProps, SpinnerViewState> {
    state: SpinnerViewState = { frame: 0 };
    private timer: ReturnType<typeof setInterval> | undefined = undefined;

    componentDidMount(): void {
        this.timer = setInterval(() => {
            this.setState((prev) => ({ frame: (prev.frame + 1) % FRAMES.length }));
        }, 80);
    }

    componentWillUnmount(): void {
        if (this.timer !== undefined) {
            clearInterval(this.timer);
        }
    }

    render(): ReactElement {
        const label = this.props.label ?? 'working…';
        return (
            <Text>
                <Text color={Theme.sky}>{FRAMES[this.state.frame]}</Text>
                <Text color={Theme.muted}>{` ${label}`}</Text>
            </Text>
        );
    }
}
