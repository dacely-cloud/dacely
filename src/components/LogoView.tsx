// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { Box, Text } from 'ink';
import { Component, type ReactElement } from 'react';
import { Branding } from '../classes/Branding';
import { Theme } from '../classes/Theme';

// The Dacely mark (a half-block trace of the real logo) beside the DACELY
// wordmark, vertically centered, in white.
export class LogoView extends Component {
    render(): ReactElement {
        return (
            <Box
                flexDirection="row"
                alignItems="center">
                <Box
                    flexDirection="column"
                    marginRight={4}>
                    {Branding.MARK.map((row, index) => (
                        <Text
                            key={index}
                            color={Theme.white}
                            bold>
                            {row}
                        </Text>
                    ))}
                </Box>
                <Box flexDirection="column">
                    {Branding.WORDMARK_ROWS.map((rowIndex) => (
                        <Text
                            key={rowIndex}
                            color={Theme.white}
                            bold>
                            {Branding.WORD.map((letter) => Branding.GLYPHS[letter][rowIndex]).join('')}
                        </Text>
                    ))}
                </Box>
            </Box>
        );
    }
}
