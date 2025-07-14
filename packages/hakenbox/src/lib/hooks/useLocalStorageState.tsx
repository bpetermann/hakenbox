import { useEffect, useState } from 'react';

type UseStorageStateOptions<T> = {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
};

const isBrowser = typeof window !== 'undefined';

/**
 * Persists state to localStorage and restores it on initial load.
 * Safe to use in environments that support server-side rendering.
 *
 * @param key - The localStorage key to use.
 * @param defaultValue - The initial value if nothing is stored.
 * @param options - Optional custom serialization and deserialization.
 * @returns A stateful value, and a function to update it.
 */
export const useLocalStorageState = <TValue,>(
  key: string,
  defaultValue: TValue,
  options?: UseStorageStateOptions<TValue>
): [TValue, React.Dispatch<React.SetStateAction<TValue>>] => {
  const serialize = options?.serialize ?? JSON.stringify;
  const deserialize = options?.deserialize ?? JSON.parse;

  const [value, set] = useState<TValue>(defaultValue);

  useEffect(() => {
    if (!isBrowser) return;

    const stored = localStorage.getItem(key);

    if (stored !== null) {
      try {
        set(deserialize(stored));
      } catch {
        console.warn(`Failed to deserialize localStorage key "${key}".`);
      }
    }
  }, [deserialize, key]);

  useEffect(() => {
    if (!isBrowser || JSON.stringify(defaultValue) === JSON.stringify(value))
      return;

    try {
      localStorage.setItem(key, serialize(value));
    } catch {
      console.warn(`Failed to serialize localStorage key "${key}".`);
    }
  }, [key, value, serialize, defaultValue]);

  return [value, set];
};
