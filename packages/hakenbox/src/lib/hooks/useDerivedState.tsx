import { useMemo, useState, type DependencyList } from 'react';

/**
 * A custom hook that provides state along with a memoized derived value function.
 *
 * @param initial - The initial state value.
 * @returns A stateful value, a function to update it and and a `useDerived` function.
 *
 * @example
 * const [count, setCount, useDerived] = useDerivedState(1);
 * const double = useDerived(c => c * 2);
 */
export const useDerivedState = <T,>(initial: T) => {
  const [value, setValue] = useState<T>(initial);

  /**
   * Computes a memoized value derived from the current state.
   *
   * @param cb - A function that derives a value from state.
   * @param deps - Optional extra dependencies.
   * @returns The memoized derived value.
   */
  function useDerived<U>(cb: (value: T) => U, deps?: DependencyList) {
    return useMemo(
      () => cb(value),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [value, ...(deps || [])]
    );
  }

  return [value, setValue, useDerived] as const;
};
