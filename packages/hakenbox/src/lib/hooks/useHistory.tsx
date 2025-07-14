import { useState, useCallback } from 'react';

type SetStateWithHistory<T> = {
  (value: T, save?: boolean): void;
  (updater: (prev: T) => T, save?: boolean): void;
};

type UseHistoryOptions = {
  autoSave?: boolean;
  limit?: number;
};

/**
 * Custom hook that acts like useState, but optionally saves state history.
 */
export const useHistory = <T,>(
  initial: T,
  options?: UseHistoryOptions
): [T, SetStateWithHistory<T>, T[]] => {
  const [value, setValue] = useState<T>(initial);
  const [history, setHistory] = useState<T[]>([initial]);

  const { autoSave = false, limit } = options || {};

  const set = useCallback<SetStateWithHistory<T>>(
    (arg, save = false) => {
      const newValue =
        typeof arg === 'function' ? (arg as (prev: T) => T)(value) : arg;

      const toSave = save || autoSave;

      setValue(newValue);
      if (toSave) {
        setHistory((prev) => {
          const next = [...prev, newValue];
          return limit ? next.slice(-limit) : next;
        });
      }
    },
    [value, autoSave, limit]
  );

  return [value, set, history];
};
