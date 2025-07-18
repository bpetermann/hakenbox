import { useCallback, useState } from 'react';

type SetStateWithHistory<T> = {
  (value: T, save?: boolean): void;
  (updater: (prev: T) => T, save?: boolean): void;
};

type UseHistoryOptions = {
  autoSave?: boolean;
  limit?: number;
};

/**
 * Custom hook that manages state with optional history tracking.
 *
 * Supports manual or automatic saving of previous state values.
 *
 * @param initial - Initial state value.
 * @param options - Optional settings:
 *   - `autoSave`: Automatically add every new value to history (default: false).
 *   - `limit`: Maximum number of entries to retain in history.
 *
 * @returns A stateful value, a function to update it and the history of updates.
 */

export const useHistory = <T,>(initial: T, options?: UseHistoryOptions) => {
  const [value, set] = useState<T>(initial);
  const [history, setHistory] = useState<T[]>([initial]);

  const { autoSave = false, limit } = options || {};

  const setValue = useCallback<SetStateWithHistory<T>>(
    (arg, save = false) => {
      const newValue =
        typeof arg === 'function' ? (arg as (prev: T) => T)(value) : arg;

      const toSave = save || autoSave;

      set(newValue);
      if (toSave) {
        setHistory((prev) => {
          const next = [...prev, newValue];
          return limit ? next.slice(-limit) : next;
        });
      }
    },
    [value, autoSave, limit]
  );

  return [value, setValue, history] as const;
};
