import { act, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useFocusTrap } from '../../lib/hooks/useFocusTrap';
import { renderHookComponent } from '../utils/renderHookComponent';

describe('useFocusTrap', () => {
  it('should trap focus inside the container', () => {
    renderHookComponent(
      () => useFocusTrap<HTMLDivElement>(),
      (ref) => (
        <div ref={ref}>
          <button data-testid='first'>First</button>
          <button data-testid='second'>Second</button>
        </div>
      )
    );

    const first = screen.getByTestId('first');
    const second = screen.getByTestId('second');

    act(() => {
      first.focus();
    });

    // Shift+Tab on first -> should wrap to last
    fireEvent.keyDown(first, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(second);

    // Tab on last -> should wrap back to first
    fireEvent.keyDown(second, { key: 'Tab' });
    expect(document.activeElement).toBe(first);
  });

  it('should call onEscape when Escape is pressed', () => {
    const onEscape = vi.fn();

    renderHookComponent(
      () => useFocusTrap<HTMLDivElement>(onEscape),
      (ref) => (
        <div ref={ref}>
          <button data-testid='btn'>Button</button>
        </div>
      )
    );

    const btn = screen.getByTestId('btn');
    act(() => {
      btn.focus();
    });

    fireEvent.keyDown(btn, { key: 'Escape' });
    expect(onEscape).toHaveBeenCalledTimes(1);
  });
});
