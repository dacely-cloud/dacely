// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { Box, Text } from 'ink';
import { Component, type ReactElement } from 'react';
import type { OutputLine } from '../types';

interface OutputViewProps {
    readonly lines: readonly OutputLine[];
}

// Renders a list of styled output lines. Shared by the REPL scrollback and the
// one-shot (direct) mode.
export class OutputView extends Component<OutputViewProps> {
    render(): ReactElement {
        const { lines } = this.props;
        return (
            <Box flexDirection="column">
                {lines.map((spans, lineIndex) => (
                    <Text key={lineIndex}>
                        {spans.length === 0
                            ? ' '
                            : spans.map((span, spanIndex) => (
                                  <Text
                                      key={spanIndex}
                                      color={span.color}
                                      bold={span.bold}
                                      dimColor={span.dim}>
                                      {span.text}
                                  </Text>
                              ))}
                    </Text>
                ))}
            </Box>
        );
    }
}
