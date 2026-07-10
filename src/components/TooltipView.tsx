// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { Box, Text } from 'ink';
import { Component, type ReactElement } from 'react';
import { Theme } from '../classes/Theme';

interface TooltipViewProps {
    readonly version: string;
}

// The hint line under the prompt box: the common commands, then key bindings.
export class TooltipView extends Component<TooltipViewProps> {
    render(): ReactElement {
        return (
            <Box
                flexDirection="column"
                alignItems="center">
                <Text color={Theme.sky}>/help   /login   /deploy   /projects   /logs</Text>
                <Text
                    color={Theme.muted}
                    dimColor>
                    {`↵ run    ·    ctrl+c exit    ·    v${this.props.version}`}
                </Text>
            </Box>
        );
    }
}
