import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useFocusTrap } from '../../lib/hooks/useFocusTrap';
import { renderHookComponent } from '../utils/renderHookComponent';

describe('useFocusTrap', () => {
  it('should trap focus inside the container', async () => {
    const user = userEvent.setup();

    renderHookComponent(
      () => useFocusTrap<HTMLDivElement>(),
      (ref) => (
        <div ref={ref}>
          <button>First</button>
          <button>Second</button>
        </div>
      )
    );

    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });

    first.focus();
    expect(first).toHaveFocus();

    await user.tab({ shift: true });
    expect(second).toHaveFocus();

    await user.tab();
    expect(first).toHaveFocus();
  });

  it('should call onEscape when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onEscape = vi.fn();

    renderHookComponent(
      () => useFocusTrap<HTMLDivElement>({ onEscape }),
      (ref) => (
        <div ref={ref}>
          <button>Button</button>
        </div>
      )
    );

    const btn = screen.getByRole('button', { name: 'Button' });
    btn.focus();
    expect(btn).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('should recalculate elements dynamically and wrap focus', async () => {
    const user = userEvent.setup();

    renderHookComponent(
      () => useFocusTrap<HTMLDivElement>(),
      (ref) => {
        const [disabled, setDisabled] = useState(true);

        return (
          <div ref={ref}>
            <button onClick={() => setDisabled(false)}>First</button>
            <button>Second</button>
            <button disabled={disabled}>Third</button>
          </div>
        );
      }
    );

    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });
    const third = screen.getByRole('button', { name: 'Third' });

    expect(third).toBeDisabled();

    await user.click(first);
    expect(first).toHaveFocus();
    expect(third).not.toBeDisabled();

    await user.tab();
    expect(second).toHaveFocus();

    await user.tab();
    expect(third).toHaveFocus();

    await user.tab();
    expect(first).toHaveFocus();
  });

  it('focuses element marked with data-autofocus', () => {
    renderHookComponent(
      () => useFocusTrap<HTMLDivElement>({ initialFocus: '[data-autofocus]' }),
      (ref) => (
        <div ref={ref}>
          <button>First</button>
          <button data-autofocus>Second</button>
          <button>Third</button>
        </div>
      )
    );

    const second = screen.getByRole('button', { name: 'Second' });
    expect(second).toHaveFocus();
  });

  it('falls back to first focusable element if no initialFocus provided', () => {
    renderHookComponent(
      () => useFocusTrap<HTMLDivElement>(),
      (ref) => (
        <div ref={ref}>
          <button>First</button>
          <button>Second</button>
        </div>
      )
    );

    const first = screen.getByRole('button', { name: 'First' });
    expect(first).toHaveFocus();
  });
});
