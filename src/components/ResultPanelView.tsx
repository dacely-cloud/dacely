// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { Box, Text } from 'ink';
import { Component, type ReactElement } from 'react';
import type { CommandResult } from '../types';
import { Theme } from '../classes/Theme';
import { OutputView } from './OutputView';

interface ResultPanelViewProps {
    readonly input: string;
    readonly result: CommandResult;
    readonly width: number;
}

// A bordered panel showing the last command: the echoed prompt line and output.
export class ResultPanelView extends Component<ResultPanelViewProps> {
    render(): ReactElement {
        return (
            <Box
                borderStyle="round"
                borderColor={Theme.faint}
                paddingX={1}
                width={this.props.width}
                flexDirection="column">
                <Box>
                    <Text
                        color={Theme.sky}
                        bold>
                        {'❯ '}
                    </Text>
                    <Text color={Theme.strongMuted}>{this.props.input}</Text>
                </Box>
                <OutputView lines={this.props.result.lines} />
            </Box>
        );
    }
}
