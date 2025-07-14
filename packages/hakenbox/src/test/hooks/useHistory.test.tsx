import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useHistory } from '../../lib/hooks/useHistory';
import { renderHookComponent } from '../utils/renderHookComponent';

const VALUE = 'value';
const HISTORY = 'history';

describe('useHistory', () => {
  it('should initialize with the initial value and save manually', () => {
    renderHookComponent(
      () => useHistory(0),
      ([value, set, history]) => {
        return (
          <>
            <div data-testid={VALUE}>{value}</div>
            <div data-testid={HISTORY}>{history.join(',')}</div>
            <button onClick={() => set(1, true)}>Update</button>
          </>
        );
      }
    );

    fireEvent.click(screen.getByText('Update'));

    expect(screen.getByTestId(VALUE)).toHaveTextContent('1');
    expect(screen.getByTestId(HISTORY)).toHaveTextContent('0,1');
  });

  it('should auto-save to history if option is enabled', () => {
    renderHookComponent(
      () => useHistory('a', { autoSave: true }),
      ([value, set, history]) => {
        return (
          <>
            <div data-testid={VALUE}>{value}</div>
            <div data-testid={HISTORY}>{history.join(',')}</div>
            <button onClick={() => set('b')}>Update</button>
          </>
        );
      }
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId(VALUE)).toHaveTextContent('b');
    expect(screen.getByTestId(HISTORY)).toHaveTextContent('a,b');
  });

  it('should respect history limit', () => {
    renderHookComponent(
      () => useHistory(1, { autoSave: true, limit: 3 }),
      ([value, set, history]) => {
        return (
          <>
            <div data-testid={VALUE}>{value}</div>
            <div data-testid={HISTORY}>{history.join(',')}</div>
            <button onClick={() => set((v) => v + 1)}>+</button>
          </>
        );
      }
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByTestId(VALUE)).toHaveTextContent('5');
    expect(screen.getByTestId(HISTORY)).toHaveTextContent('3,4,5');
  });

  it('should not save to history if save is false and autoSave is off', () => {
    renderHookComponent(
      () => useHistory('start', { autoSave: false }),
      ([value, set, history]) => {
        return (
          <>
            <div data-testid={VALUE}>{value}</div>
            <div data-testid={HISTORY}>{history.join(',')}</div>
            <button onClick={() => set('new')}>Update</button>
          </>
        );
      }
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId(VALUE)).toHaveTextContent('new');
    expect(screen.getByTestId(HISTORY)).toHaveTextContent('start');
  });

  it('should only keep the last entry if limit is 1', () => {
    renderHookComponent(
      () => useHistory('x', { autoSave: true, limit: 1 }),
      ([value, set, history]) => {
        return (
          <>
            <div data-testid={VALUE}>{value}</div>
            <div data-testid={HISTORY}>{history.join(',')}</div>
            <button onClick={() => set('y')}>Next</button>
          </>
        );
      }
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId(HISTORY)).toHaveTextContent('y');
  });
});
