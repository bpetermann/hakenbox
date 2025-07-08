import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';
import { useDebounce } from '../../lib/hooks/useDebounce';

vitest.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update the debounced value after the delay', () => {
    let value = 'initial';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    value = 'updated';
    rerender();

    expect(result.current).toBe('initial');

    act(() => {
      vitest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset timer if value changes before delay expires', () => {
    let value = 'start';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    value = 'intermediate';
    rerender();
    act(() => {
      vitest.advanceTimersByTime(300);
    });

    value = 'final';
    rerender();
    act(() => {
      vitest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('start');

    act(() => {
      vitest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('final');
  });
});
