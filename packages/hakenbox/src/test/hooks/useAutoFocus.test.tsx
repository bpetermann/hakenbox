import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAutoFocus } from '../../lib/hooks/useAutoFocus';
import { renderHookComponent } from '../utils/renderHookComponent';

describe('useAutoFocus', () => {
  it('should should autofocus the selected element', () => {
    renderHookComponent(
      () => useAutoFocus<HTMLInputElement>(true),
      (ref) => (
        <>
          <input ref={ref} />
        </>
      ),
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });
});
