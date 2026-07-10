// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { Box, Text } from 'ink';
import { Component, type ReactElement } from 'react';
import { Pattern } from '../classes/Pattern';
import { Theme } from '../classes/Theme';

interface BackdropViewProps {
    readonly cols: number;
    readonly height: number;
    // Absolute row of the first line, so the diagonal stays continuous across
    // the bands above and below the centered content.
    readonly yOffset?: number;
}

// A band of the faint background pattern.
export class BackdropView extends Component<BackdropViewProps> {
    render(): ReactElement {
        const { cols, height } = this.props;
        const yOffset = this.props.yOffset ?? 0;
        const rows: string[] = [];
        for (let y = 0; y < Math.max(0, height); y++) {
            rows.push(Pattern.row(cols, yOffset + y));
        }
        return (
            <Box flexDirection="column">
                {rows.map((row, index) => (
                    <Text
                        key={index}
                        color={Theme.faint}>
                        {row}
                    </Text>
                ))}
            </Box>
        );
    }
}
