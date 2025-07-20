import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vitest } from 'vitest';
import { useControlState } from '../../lib/hooks/useControlState';

const TestUncontrolled = () => {
  const [value, setValue] = useControlState(false);

  return (
    <button onClick={() => setValue((prev) => !prev)}>
      {value ? 'on' : 'off'}
    </button>
  );
};

const TestControlled = () => {
  const [state, setState] = useState(false);
  const [value, setValue] = useControlState(false, [state, setState]);

  return (
    <button onClick={() => setValue((prev) => !prev)}>
      {value ? 'on' : 'off'}
    </button>
  );
};

describe('useControlState', () => {
  it('toggles internal state when uncontrolled', () => {
    render(<TestUncontrolled />);
    const button = screen.getByRole('button');

    expect(button.textContent).toBe('off');
    fireEvent.click(button);
    expect(button.textContent).toBe('on');
    fireEvent.click(button);
    expect(button.textContent).toBe('off');
  });

  it('uses external state when controlled', () => {
    render(<TestControlled />);
    const button = screen.getByRole('button');

    expect(button.textContent).toBe('off');
    fireEvent.click(button);
    expect(button.textContent).toBe('on');
    fireEvent.click(button);
    expect(button.textContent).toBe('off');
  });

  it('falls back to internal state if only value is passed', () => {
    const Test = () => {
      const [value, setValue] = useControlState(false, [
        false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        undefined as any,
      ]);
      return (
        <button onClick={() => setValue(true)}>{value ? 'on' : 'off'}</button>
      );
    };

    render(<Test />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button.textContent).toBe('on');
  });

  it('falls back to internal state if only updater is passed', () => {
    const fakeFn = vitest.fn();
    const Test = () => {
      const [value, setValue] = useControlState<boolean>(false, [
        undefined,
        fakeFn,
      ]);
      return (
        <button onClick={() => setValue(true)}>{value ? 'on' : 'off'}</button>
      );
    };

    render(<Test />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button.textContent).toBe('on');
    expect(fakeFn).not.toHaveBeenCalled();
  });
});
