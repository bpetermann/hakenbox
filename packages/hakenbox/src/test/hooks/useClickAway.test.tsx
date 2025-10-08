import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useClickAway } from '../../lib/hooks/useClickAway';
import { renderHookComponent } from '../utils/renderHookComponent';

describe('useClickAway', () => {
  it('should trigger the callback when clicked outside the ref', () => {
    const callback = vi.fn();

    renderHookComponent(
      () => useClickAway(callback),
      (ref) => (
        <>
          <button>Outside</button>
          <div ref={ref}>Inside</div>
        </>
      )
    );

    const button = screen.getByRole('button');
    fireEvent.mouseDown(button);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger the callback when clicked inside the ref', () => {
    const callback = vi.fn();

    renderHookComponent(
      () => useClickAway(callback),
      (ref) => (
        <>
          <button>Outside</button>
          <div ref={ref}>
            <span>Inside</span>
          </div>
        </>
      )
    );

    const inside = screen.getByText('Inside');
    fireEvent.mouseDown(inside);

    expect(callback).not.toHaveBeenCalled();
  });
});
