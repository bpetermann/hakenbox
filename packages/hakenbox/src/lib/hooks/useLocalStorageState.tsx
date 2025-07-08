import { useEffect, useState } from 'react';

type UseStorageStateOptions<T> = {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
};

const isBrowser = typeof window !== 'undefined';

export const useLocalStorageState = <TValue,>(
  key: string,
  defaultValue: TValue,
  options?: UseStorageStateOptions<TValue>
): [TValue, React.Dispatch<React.SetStateAction<TValue>>] => {
  const serialize = options?.serialize ?? JSON.stringify;
  const deserialize = options?.deserialize ?? JSON.parse;

  const [state, setState] = useState<TValue>(defaultValue);

  useEffect(() => {
    if (!isBrowser) return;

    const stored = localStorage.getItem(key);

    if (stored !== null) {
      try {
        setState(deserialize(stored));
      } catch {
        console.warn(`Failed to deserialize localStorage key "${key}".`);
      }
    }
  }, [deserialize, key]);

  useEffect(() => {
    if (!isBrowser || JSON.stringify(defaultValue) === JSON.stringify(state))
      return;

    try {
      localStorage.setItem(key, serialize(state));
    } catch {
      console.warn(`Failed to serialize localStorage key "${key}".`);
    }
  }, [key, state, serialize, defaultValue]);

  return [state, setState];
};
