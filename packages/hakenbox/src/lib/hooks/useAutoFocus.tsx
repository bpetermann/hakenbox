import { useEffect, useRef } from 'react';

/**
 * A lightweight hook that imperatively focuses an element when enabled.
 *
 * Useful for elements that do not support the native autofocus attribute
 * (e.g. anchor elements), or when consistent autofocus behavior is needed.
 *
 * @template T - A focusable HTMLElement type
 * @param enabled - Whether the element should receive focus (defaults to true)
 * @returns A ref to attach to the element that should be autofocused
 */
export function useAutoFocus<T extends HTMLElement>(enabled: boolean = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (enabled && ref.current) ref.current.focus();
  }, [enabled]);

  return ref;
}
