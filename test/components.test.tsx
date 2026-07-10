// SPDX-License-Identifier: BUSL-1.1
// SPDX-FileCopyrightText: Copyright (c) 2026 Dacely <business@dacely.com>

import { render } from 'ink-testing-library';
import { describe, expect, it, vi } from 'vitest';
import { Branding } from '../src/classes/Branding';
import { CommandRegistry } from '../src/classes/CommandRegistry';
import { CommandRunner } from '../src/classes/CommandRunner';
import { Session } from '../src/classes/Session';
import { AppView } from '../src/components/AppView';
import { HomeView } from '../src/components/HomeView';
import { LogoView } from '../src/components/LogoView';
import { OutputView } from '../src/components/OutputView';
import { PromptBoxView } from '../src/components/PromptBoxView';
import { ResultPanelView } from '../src/components/ResultPanelView';
import { SpinnerView } from '../src/components/SpinnerView';
import { TooltipView } from '../src/components/TooltipView';

const makeRunner = (): CommandRunner =>
    new CommandRunner(CommandRegistry.createDefault(), Session.guest());

describe('LogoView', () => {
    it('renders the mark and wordmark', () => {
        const { lastFrame, unmount } = render(<LogoView />);
        expect(lastFrame() ?? '').toContain(Branding.MARK[2]);
        unmount();
    });
});

describe('OutputView', () => {
    it('renders span text', () => {
        const { lastFrame, unmount } = render(<OutputView lines={[[{ text: 'hello edge' }]]} />);
        expect(lastFrame() ?? '').toContain('hello edge');
        unmount();
    });

    it('preserves blank lines between content', () => {
        const { lastFrame, unmount } = render(
            <OutputView lines={[[{ text: 'top' }], [], [{ text: 'bottom' }]]} />,
        );
        const frameLines = (lastFrame() ?? '').split('\n');
        expect(frameLines).toHaveLength(3);
        expect(frameLines[1].trim()).toBe('');
        unmount();
    });
});

describe('TooltipView', () => {
    it('lists commands and the version', () => {
        const { lastFrame, unmount } = render(<TooltipView version="1.2.3" />);
        const frame = lastFrame() ?? '';
        expect(frame).toContain('/deploy');
        expect(frame).toContain('v1.2.3');
        unmount();
    });
});

describe('ResultPanelView', () => {
    it('echoes the input and renders the output', () => {
        const { lastFrame, unmount } = render(
            <ResultPanelView
                input="/deploy"
                result={{ lines: [[{ text: 'shipped' }]] }}
                width={40}
            />,
        );
        const frame = lastFrame() ?? '';
        expect(frame).toContain('/deploy');
        expect(frame).toContain('shipped');
        unmount();
    });
});

describe('SpinnerView', () => {
    it('renders its label and a spinner glyph, and unmounts cleanly', () => {
        const { lastFrame, unmount } = render(<SpinnerView label="loading" />);
        const frame = lastFrame() ?? '';
        expect(frame).toContain('loading');
        expect(/[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏]/u.test(frame)).toBe(true);
        unmount();
    });
});

describe('PromptBoxView', () => {
    it('shows the placeholder before input', () => {
        const { lastFrame, unmount } = render(
            <PromptBoxView
                onSubmit={() => undefined}
                width={40}
                busy={false}
            />,
        );
        expect(lastFrame() ?? '').toContain('run a command');
        unmount();
    });

    it('submits the typed value on enter', async () => {
        const onSubmit = vi.fn();
        const { lastFrame, stdin, unmount } = render(
            <PromptBoxView
                onSubmit={onSubmit}
                width={40}
                busy={false}
            />,
        );
        stdin.write('hi');
        await vi.waitFor(() => {
            expect(lastFrame() ?? '').toContain('hi');
        });
        stdin.write('\r');
        await vi.waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith('hi');
        });
        unmount();
    });
});

describe('HomeView', () => {
    it('renders the logo, tagline, prompt box and tooltip', () => {
        const { lastFrame, unmount } = render(
            <HomeView
                cols={80}
                rows={24}
                busy={false}
                version="0.0.1"
                onSubmit={() => undefined}
            />,
        );
        const frame = lastFrame() ?? '';
        expect(frame).toContain(Branding.TAGLINE);
        expect(frame).toContain('run a command');
        expect(frame).toContain('/deploy');
        unmount();
    });

    it('shows a result panel when a last result is present', () => {
        const { lastFrame, unmount } = render(
            <HomeView
                cols={80}
                rows={30}
                last={{ input: '/status', result: { lines: [[{ text: 'Ready' }]] } }}
                busy={false}
                version="0.0.1"
                onSubmit={() => undefined}
            />,
        );
        const frame = lastFrame() ?? '';
        expect(frame).toContain('/status');
        expect(frame).toContain('Ready');
        unmount();
    });
});

describe('AppView', () => {
    it('renders the prompt on mount', () => {
        const { lastFrame, unmount } = render(
            <AppView
                runner={makeRunner()}
                onExit={() => undefined}
            />,
        );
        expect(lastFrame() ?? '').toContain('run a command');
        unmount();
    });

    it('shows a command result, then clears it on /clear', async () => {
        const { lastFrame, stdin, unmount } = render(
            <AppView
                runner={makeRunner()}
                onExit={() => undefined}
            />,
        );
        stdin.write('/version');
        await vi.waitFor(() => {
            expect(lastFrame() ?? '').toContain('/version');
        });
        stdin.write('\r');
        await vi.waitFor(() => {
            expect(lastFrame() ?? '').toContain('dacely cli');
        });
        stdin.write('/clear');
        await vi.waitFor(() => {
            expect(lastFrame() ?? '').toContain('/clear');
        });
        stdin.write('\r');
        await vi.waitFor(() => {
            expect(lastFrame() ?? '').not.toContain('dacely cli');
        });
        unmount();
    });

    it('calls onExit when the user runs /exit', async () => {
        const onExit = vi.fn();
        const { lastFrame, stdin, unmount } = render(
            <AppView
                runner={makeRunner()}
                onExit={onExit}
            />,
        );
        stdin.write('/exit');
        await vi.waitFor(() => {
            expect(lastFrame() ?? '').toContain('/exit');
        });
        stdin.write('\r');
        await vi.waitFor(() => {
            expect(onExit).toHaveBeenCalled();
        });
        unmount();
    });
});
