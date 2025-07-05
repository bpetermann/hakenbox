import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLocalStorageState } from '../../lib/hooks/useLocalStorageState';
import { renderHookComponent } from '../utils/renderHookComponent';

describe('useLocalStorageState', () => {
  const storageKey = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('updates state on user interaction', () => {
    renderHookComponent(
      () => useLocalStorageState<number>('key', 0),
      ([count, setCount]) => (
        <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      )
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toHaveTextContent('2');
  });

  it('saves updated value to localStorage', () => {
    renderHookComponent(
      () => useLocalStorageState<number>(storageKey, 0),
      ([count, setCount]) => (
        <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      )
    );

    fireEvent.click(screen.getByRole('button'));

    expect(localStorage.getItem(storageKey)).toBe('1');
  });

  it('restores value from localStorage on remount', () => {
    const { unmount } = renderHookComponent(
      () => useLocalStorageState<number>(storageKey, 0),
      ([count, setCount]) => (
        <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      )
    );

    fireEvent.click(screen.getByRole('button'));
    unmount();

    renderHookComponent(
      () => useLocalStorageState<number>(storageKey, 0),
      ([count]) => <div>{count}</div>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(localStorage.getItem(storageKey)).toBe('1');
  });
});
