// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import { Component, type ReactElement } from 'react';
import { Theme } from '../classes/Theme';
import { SpinnerView } from './SpinnerView';

interface PromptBoxViewProps {
    readonly onSubmit: (value: string) => void;
    readonly width: number;
    readonly busy: boolean;
}

interface PromptBoxViewState {
    readonly value: string;
}

// The centered, bordered input box. Owns its buffer; shows a spinner while a
// command is running.
export class PromptBoxView extends Component<PromptBoxViewProps, PromptBoxViewState> {
    state: PromptBoxViewState = { value: '' };

    private readonly handleChange = (value: string): void => {
        this.setState({ value });
    };

    private readonly handleSubmit = (value: string): void => {
        this.props.onSubmit(value);
        this.setState({ value: '' });
    };

    render(): ReactElement {
        return (
            <Box
                borderStyle="round"
                borderColor={Theme.sky}
                paddingX={1}
                width={this.props.width}>
                <Text
                    color={Theme.sky}
                    bold>
                    {'❯ '}
                </Text>
                {this.props.busy ? (
                    <SpinnerView label="running…" />
                ) : (
                    <TextInput
                        value={this.state.value}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        placeholder="run a command, or /help"
                    />
                )}
            </Box>
        );
    }
}
