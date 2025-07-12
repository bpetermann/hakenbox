import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { useParams } from '../../lib/hooks/useParams';
import { renderHookComponent } from '../utils/renderHookComponent';
const originalLocation = window.location;

const defineWindow = (param: { [k: string]: unknown }) =>
  Object.defineProperty(window, 'location', {
    value: {
      search: `?${Object.entries(param)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`,
    },
    writable: true,
  });

afterEach(() => {
  Object.defineProperty(window, 'location', {
    value: originalLocation,
    writable: true,
  });
});

describe('useParamsHook', () => {
  it('should display the correct param value', () => {
    defineWindow({ count: 2 });

    renderHookComponent(
      () => useParams<{ count: number }>(),
      ([params]) => <div>{params.count}</div>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should display the correct initial value', () => {
    defineWindow({});

    renderHookComponent(
      () => useParams<{ count: number }>({ count: 2 }),
      ([params]) => <div>{params.count}</div>
    );

    expect(screen.queryByText('2')).toBeInTheDocument();
  });

  it('should display the correct value from a long url', () => {
    defineWindow({ foo: 'bar', baz: true, count: 2 });

    renderHookComponent(
      () => useParams<{ count: number }>(),
      ([params]) => <div>{params.count}</div>
    );

    expect(screen.queryByText('2')).toBeInTheDocument();
  });

  it('should display the correct value after update', () => {
    defineWindow({ count: 0 });

    renderHookComponent(
      () => useParams<{ count: number }>(),
      ([params, setParams]) => (
        <div>
          <button
            onClick={() =>
              setParams((prev) => ({ ...prev, count: prev.count + 1 }), {
                replace: false,
              })
            }
          >
            <span>{params.count}</span>
          </button>
        </div>
      )
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.queryByText('2')).toBeInTheDocument();
  });

  it('should correctly reset to default values', () => {
    defineWindow({});

    renderHookComponent(
      () => useParams<{ count: number }>({ count: 1 }),
      ([params, setParams, resetParams]) => (
        <div>
          <button
            data-testid='increase'
            onClick={() =>
              setParams((prev) => ({ ...prev, count: prev.count + 1 }), {
                replace: false,
              })
            }
          >
            <span>{params.count}</span>
          </button>
          <button onClick={resetParams} data-testid='reset' />
        </div>
      )
    );

    fireEvent.click(screen.getByTestId('increase'));

    expect(screen.queryByText('2')).toBeInTheDocument();
  });

  it('should update window history correctly', () => {
    defineWindow({ count: 1 });

    renderHookComponent(
      () => useParams<{ count: number }>({ count: 1 }),
      ([params, setParams]) => (
        <div>
          <button
            onClick={() =>
              setParams((prev) => ({ ...prev, count: prev.count + 1 }), {
                replace: false,
              })
            }
          >
            <span>{params.count}</span>
          </button>
        </div>
      )
    );

    fireEvent.click(screen.getByRole('button'));

    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(screen.queryByText('1')).toBeInTheDocument();
  });
});
