import { useState } from 'react';

/**
 * A React hook that allows a value to be optionally controlled by the parent component.
 *
 * If both `value` and `updater` are provided, the hook behaves as a controlled state.
 * Otherwise, it falls back to internal state management.
 *
 * @template T The type of the state value.
 * @param fallback The default internal state value if uncontrolled.
 * @param control A tuple containing the external `value` and `updater` function.
 * @returns A tuple: `[value, setValue]`, where `setValue` accepts either a new value or an updater function.
 *
 * @example
 * // Uncontrolled usage
 * const [value, setValue] = useControlState(true);
 *
 * @example
 * // Controlled usage
 * const [value, setValue] = useControlState(true, [controlledValue, setControlledValue]);
 */
export const useControlState = <T,>(
  fallback: T,
  [value, updater]:
    | [
        value?: T,
        set?: React.Dispatch<React.SetStateAction<T>> | ((prev: T) => void)
      ] = []
) => {
  const [internal, setInternal] = useState<T>(fallback);

  const isControlled = value !== undefined && updater !== undefined;
  const current = isControlled ? value : internal;

  function dispatch(input: T | ((prev: T) => T)) {
    const newValue =
      typeof input === 'function' ? (input as (prev: T) => T)(current) : input;

    if (isControlled) {
      updater(newValue);
    } else {
      setInternal(newValue);
    }
  }

  return [current, dispatch] as const;
};
