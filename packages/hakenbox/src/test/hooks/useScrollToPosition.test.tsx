import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useScrollToPosition } from '../../lib/hooks/useScrollToPosition';
import { renderHookComponent } from '../utils/renderHookComponent';

describe('useScrollToPosition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    HTMLElement.prototype.scrollTo = () => {};
    vi.spyOn(HTMLElement.prototype, 'scrollTo');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete (HTMLElement.prototype as Partial<HTMLElement>).scrollTo;
    vi.useRealTimers();
  });

  function setup(options?: Parameters<typeof useScrollToPosition>[0]) {
    let result!: ReturnType<typeof useScrollToPosition<HTMLDivElement>>;
    renderHookComponent(
      () => {
        result = useScrollToPosition<HTMLDivElement>(options);
        return result;
      },
      (r) => <div ref={r.ref} />,
    );
    return () => result;
  }

  it('scrolls vertically to the given position', () => {
    const getResult = setup();

    act(() => {
      getResult().scrollTo({ y: 200 });
      vi.runAllTimers();
    });

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ top: 200 }),
    );
  });

  it('scrolls horizontally to the given position', () => {
    const getResult = setup();

    act(() => {
      getResult().scrollTo({ x: 150 });
      vi.runAllTimers();
    });

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ left: 150 }),
    );
  });

  it('applies y offset to the scroll target', () => {
    const getResult = setup({ offset: { y: 50 } });

    act(() => {
      getResult().scrollTo({ y: 100 });
      vi.runAllTimers();
    });

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ top: 150 }),
    );
  });

  it('applies x offset to the scroll target', () => {
    const getResult = setup({ offset: { x: 20 } });

    act(() => {
      getResult().scrollTo({ x: 80 });
      vi.runAllTimers();
    });

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ left: 100 }),
    );
  });

  it('does not scroll when no position is provided', () => {
    setup();

    act(() => {
      vi.runAllTimers();
    });

    expect(HTMLElement.prototype.scrollTo).not.toHaveBeenCalled();
  });

  it('scrolls to defaultPosition on mount', () => {
    setup({ defaultPosition: { y: 400 } });

    act(() => {
      vi.runAllTimers();
    });

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ top: 400 }),
    );
  });

  it('can scroll to the same position multiple times', () => {
    const getResult = setup();

    act(() => {
      getResult().scrollTo({ y: 300 });
      vi.runAllTimers();
    });

    act(() => {
      getResult().scrollTo({ y: 300 });
      vi.runAllTimers();
    });

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalledTimes(2);
  });
});
