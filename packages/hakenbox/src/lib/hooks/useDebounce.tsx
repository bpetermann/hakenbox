import { useEffect, useState } from 'react';

/**
 * Delays updating the returned value until after a specified delay has passed
 * since the last change to the input value.
 *
 * @param value - The input value to debounce.
 * @param delay - The delay in milliseconds. Defaults to 500.
 * @returns The debounced value.
 */
export const useDebounce = <T,>(value: T, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceValue;
};
