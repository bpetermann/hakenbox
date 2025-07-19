/* eslint-disable @typescript-eslint/no-unused-vars */
import { act, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDerivedState } from '../../lib/hooks/useDerivedState';
import { renderHookComponent } from '../utils/renderHookComponent';

describe('useDerivedState', () => {
  it('should return the initial state', () => {
    renderHookComponent(
      () => useDerivedState(5),
      ([value]) => {
        expect(value).toBe(5);
        return null;
      }
    );
  });

  it('should update the state using the setter', () => {
    let setState: (val: number) => void = () => {};

    renderHookComponent(
      () => useDerivedState(1),
      ([value, set]) => {
        setState = set;
        return <div data-testid='value'>{value}</div>;
      }
    );

    act(() => {
      setState(10);
    });

    expect(screen.getByTestId('value').textContent).toBe('10');
  });

  it('should compute a derived value', () => {
    renderHookComponent(
      () => useDerivedState(3),
      ([_value, , useComputed]) => {
        const doubled = useComputed((v) => v * 2);
        return <div data-testid='computed'>{doubled}</div>;
      }
    );

    expect(screen.getByTestId('computed').textContent).toBe('6');
  });

  it('should re-compute when dependencies change', () => {
    let setState: (val: number) => void = () => {};

    renderHookComponent(
      () => useDerivedState(2),
      ([_value, set, useComputed]) => {
        setState = set;
        const computed = useComputed((v) => v * 5, []);
        return <div data-testid='computed'>{computed}</div>;
      }
    );

    expect(screen.getByTestId('computed').textContent).toBe('10');

    act(() => {
      setState(3);
    });

    expect(screen.getByTestId('computed').textContent).toBe('15');
  });
});
