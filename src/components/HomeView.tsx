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
// The chrome that always surrounds the result: the logo block, the tagline
// (marginTop + line), and the prompt (marginTop + border + input) and tooltip
// (marginTop + two lines) blocks. Used both to center the content and to keep
// the prompt on screen when a tall result would otherwise crowd it out.
const CHROME_ROWS = LOGO_ROWS + 2 + 4 + 3;
const PANEL_CHROME = 4; // marginTop + border(2) + echoed input line.

// The centered content is at most this wide; the vignette only grows side
// gutters once the terminal is wider than that (plus a little breathing room).
const CONTENT_MAX = 72;
const GUTTER_MAX = 6;

// The full-screen home: a faint vignette backdrop framing the logo, tagline,
// optional last-result panel, prompt box, and command tooltip, all vertically
// centered. The root is pinned to the terminal size and clips overflow, so it
// re-fits cleanly on every resize instead of scrolling.
export class HomeView extends Component<HomeViewProps> {
    render(): ReactElement {
        const { cols, rows, last, busy, version } = this.props;
        const boxWidth = Math.min(64, Math.max(28, cols - 8));
        const panelWidth = Math.min(CONTENT_MAX, Math.max(32, cols - 8));

        // Cap the result to the vertical room left after the fixed chrome so the
        // prompt is never pushed off-screen, then estimate the centered block
        // height so the backdrop bands can center it.
        const roomForResult = Math.max(0, rows - CHROME_ROWS - PANEL_CHROME);
        const resultRows = last
            ? Math.min(last.result.lines.length, MAX_RESULT_ROWS, roomForResult)
            : 0;
        const resultBlock = last ? resultRows + PANEL_CHROME : 0;
        const contentH = CHROME_ROWS + resultBlock;

        const topH = Math.max(0, Math.floor((rows - contentH) / 2));
        const botH = Math.max(0, rows - contentH - topH);

        // Side gutters complete the vignette frame beside the centered content,
        // but only when the terminal has columns to spare beyond the content.
        const gutter = Math.max(0, Math.min(GUTTER_MAX, Math.floor((cols - CONTENT_MAX) / 2)));

        return (
            <Box
                flexDirection="column"
                width={cols}
                height={rows}
                overflow="hidden">
                <BackdropView
                    cols={cols}
                    rows={rows}
                    xStart={0}
                    yStart={0}
                    width={cols}
                    height={topH}
                />
                <Box
                    flexDirection="row"
                    flexShrink={0}>
                    <BackdropView
                        cols={cols}
                        rows={rows}
                        xStart={0}
                        yStart={topH}
                        width={gutter}
                        height={contentH}
                    />
                    <Box
                        flexGrow={1}
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
                        rows={rows}
                        xStart={cols - gutter}
                        yStart={topH}
                        width={gutter}
                        height={contentH}
                    />
                </Box>
                <BackdropView
                    cols={cols}
                    rows={rows}
                    xStart={0}
                    yStart={topH + contentH}
                    width={cols}
                    height={botH}
                />
            </Box>
        );
    }
}
