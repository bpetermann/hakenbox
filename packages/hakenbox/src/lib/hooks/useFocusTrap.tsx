import { useEffect, useRef } from 'react';

const FOCUSABLE_ELEMENTS = `
  a[href]:not([tabindex="-1"]),
  button:not([disabled]):not([tabindex="-1"]),
  textarea:not([disabled]):not([tabindex="-1"]),
  input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]),
  select:not([disabled]):not([tabindex="-1"]),
  [tabindex]:not([tabindex="-1"])
`;

/**
 * Traps keyboard focus within a container element.
 *
 * Focusable elements are recalculated dynamically on each Tab press, so the trap
 * stays accurate even if the DOM changes (elements are added, removed, or disabled).
 *
 * You can optionally:
 * - Close the trap with Escape (`onEscape` callback)
 * - Set an initial focus element (`initialFocus` selector)
 *
 * @param options Optional configuration
 * @param options.onEscape Callback invoked when Escape key is pressed
 * @param options.initialFocus CSS selector for the element to focus initially
 *
 * @returns Ref object to attach to the container element
 *
 * @example
 * const ref = useFocusTrap({
 *   onEscape: () => console.log('Escape pressed'),
 *   initialFocus: '[data-autofocus]'
 * });
 *
 * return (
 *   <div ref={ref}>
 *     <button>Cancel</button>
 *     <button data-autofocus>Confirm</button>
 *   </div>
 * );
 */
export function useFocusTrap<T extends HTMLElement>(options?: {
  onEscape?: () => void;
  initialFocus?: string;
}): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const refElement = ref.current;
    const getFocusableBounds = () => {
      const elements =
        refElement.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
      return [elements[0], elements[elements.length - 1]];
    };

    let [firstElement, lastElement] = getFocusableBounds();
    if (!firstElement || !lastElement) return;

    const focusElement = options?.initialFocus
      ? refElement.querySelector<HTMLElement>(options.initialFocus)
      : firstElement;
    focusElement?.focus({ preventScroll: true });

    const handleTabKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && options?.onEscape) {
        e.preventDefault();
        options?.onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

      [firstElement, lastElement] = getFocusableBounds();
      if (!firstElement || !lastElement) return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    refElement.addEventListener('keydown', handleTabKeyPress);
    return () => refElement.removeEventListener('keydown', handleTabKeyPress);
  }, [options]);

  return ref;
}
