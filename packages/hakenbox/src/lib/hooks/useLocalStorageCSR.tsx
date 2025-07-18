import { useEffect, useState } from 'react';

type UseStorageStateOptions<T> = {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
};

const isBrowser = typeof window !== 'undefined';

/**
 * Persists state to localStorage and restores it immediately during render.
 * Should only be used in client-only environments to avoid hydration mismatch.
 *
 * If you're using server-side rendering, prefer useLocalStorageState instead.
 *
 * @param key - The localStorage key to use.
 * @param defaultValue - The initial value if nothing is stored.
 * @param options - Optional custom serialization and deserialization.
 * @returns A stateful value, and a function to update it.
 */
export const useLocalStorageCSR = <TValue,>(
  key: string,
  defaultValue: TValue,
  options?: UseStorageStateOptions<TValue>
) => {
  const serialize = options?.serialize ?? JSON.stringify;
  const deserialize = options?.deserialize ?? JSON.parse;

  const [value, setValue] = useState<TValue>(() => {
    if (!isBrowser) return defaultValue;

    const stored = localStorage.getItem(key);

    if (stored !== null) {
      try {
        return deserialize(stored);
      } catch {
        return defaultValue;
      }
    }

    return defaultValue;
  });

  useEffect(() => {
    if (!isBrowser) return;

    try {
      localStorage.setItem(key, serialize(value));
    } catch {
      console.warn(`Failed to serialize localStorage key "${key}"`);
    }
  }, [key, value, serialize]);

  return [value, setValue] as const;
};
