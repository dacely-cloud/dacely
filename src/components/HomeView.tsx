// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { Box, Text } from 'ink';
import { Component, type ReactElement } from 'react';
import { Branding } from '../classes/Branding';
import { Theme } from '../classes/Theme';
import type { CommandResult } from '../types';
import { BackdropView } from './BackdropView';
import { LogoView } from './LogoView';
import { PromptBoxView } from './PromptBoxView';
import { ResultPanelView } from './ResultPanelView';
import { TooltipView } from './TooltipView';

interface HomeViewProps {
    readonly cols: number;
    readonly rows: number;
    readonly last?: { readonly input: string; readonly result: CommandResult };
    readonly busy: boolean;
    readonly version: string;
    readonly onSubmit: (value: string) => void;
}

const LOGO_ROWS = 8;
const MAX_RESULT_ROWS = 10;

// The full-screen home: a dotted backdrop with the logo, tagline, optional
// last-result panel, prompt box, and command tooltip vertically centered.
export class HomeView extends Component<HomeViewProps> {
    render(): ReactElement {
        const { cols, rows, last, busy, version } = this.props;
        const boxWidth = Math.min(64, Math.max(28, cols - 8));
        const panelWidth = Math.min(72, Math.max(32, cols - 8));

        // Estimate the centered block height so the backdrop bands center it.
        // The panel block is: marginTop(1) + border(2) + echo(1) + output rows.
        const resultRows = last ? Math.min(last.result.lines.length, MAX_RESULT_ROWS) : 0;
        const resultBlock = last ? resultRows + 4 : 0;
        const contentH = LOGO_ROWS + 2 + resultBlock + 4 + 3;
        const topH = Math.max(0, Math.floor((rows - contentH) / 2));
        const botH = Math.max(0, rows - contentH - topH);

        // Note: no fixed height on the outer box. The backdrop band heights sum
        // with the content to fill the screen; letting it flow (rather than
        // clamping to `rows`) avoids Ink compressing/overlapping lines if the
        // content is a row taller than estimated.
        return (
            <Box
                flexDirection="column"
                width={cols}>
                <BackdropView
                    cols={cols}
                    height={topH}
                    yOffset={0}
                />
                <Box
                    flexDirection="column"
                    alignItems="center">
                    <LogoView />
                    <Box marginTop={1}>
                        <Text color={Theme.muted}>{Branding.TAGLINE}</Text>
                    </Box>
                    {last ? (
                        <Box marginTop={1}>
                            <ResultPanelView
                                input={last.input}
                                result={last.result}
                                width={panelWidth}
                            />
                        </Box>
                    ) : null}
                    <Box marginTop={1}>
                        <PromptBoxView
                            onSubmit={this.props.onSubmit}
                            width={boxWidth}
                            busy={busy}
                        />
                    </Box>
                    <Box marginTop={1}>
                        <TooltipView version={version} />
                    </Box>
                </Box>
                <BackdropView
                    cols={cols}
                    height={botH}
                    yOffset={topH + contentH}
                />
            </Box>
        );
    }
}
