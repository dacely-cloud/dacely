// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { Box, Text } from 'ink';
import { Component, type ReactElement } from 'react';
import { Pattern } from '../classes/Pattern';
import { Theme } from '../classes/Theme';

interface BackdropViewProps {
    // Full screen size, so the vignette is computed against absolute position
    // and stays continuous across every band and gutter that draws it.
    readonly cols: number;
    readonly rows: number;
    // The absolute rectangle this band covers.
    readonly xStart: number;
    readonly yStart: number;
    readonly width: number;
    readonly height: number;
}

// One rectangular band of the faint vignette backdrop.
export class BackdropView extends Component<BackdropViewProps> {
    render(): ReactElement | null {
        const { cols, rows, xStart, yStart, width, height } = this.props;
        if (width <= 0 || height <= 0) {
            return null;
        }
        const lines: string[] = [];
        for (let j = 0; j < height; j++) {
            lines.push(Pattern.row(xStart, yStart + j, width, cols, rows));
        }
        return (
            <Box flexDirection="column">
                {lines.map((line, index) => (
                    <Text
                        key={index}
                        color={Theme.faint}>
                        {line}
                    </Text>
                ))}
            </Box>
        );
    }
}
