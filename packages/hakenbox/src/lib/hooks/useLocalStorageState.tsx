import { useEffect, useState } from 'react';

type UseStorageStateOptions<T> = {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
};

export const useLocalStorageState = <TValue,>(
  key: string,
  defaultValue: TValue,
  options?: UseStorageStateOptions<TValue>
): [TValue, React.Dispatch<React.SetStateAction<TValue>>] => {
  const serialize = options?.serialize ?? JSON.stringify;
  const deserialize = options?.deserialize ?? JSON.parse;

  const [state, setState] = useState<TValue>(() => {
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
    try {
      localStorage.setItem(key, serialize(state));
    } catch {
      console.warn(`Failed to serialize localStorage key "${key}"`);
    }
  }, [key, state, serialize]);

  return [state, setState];
};
