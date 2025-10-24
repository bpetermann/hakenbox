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
 * Custom React hook to create a focus trap within a specific DOM element.
 * * This hook traps the user's focus inside the provided element, preventing them
 * from tabbing to elements outside of it. It also handles closing the trap
 * with the 'Escape' key if an onEscape function is provided.
 *
 * @param {Function} [onEscape] - An optional callback function to be executed when the 'Escape' key is pressed.
 * @returns {React.RefObject<T>} A ref object to be attached to the container element that will act as the focus trap.
 */
export function useFocusTrap<T extends HTMLElement>(
  onEscape?: () => void
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const refElement = ref.current;

    const focusableElements =
      refElement.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) return;

    const handleTabKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

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
  }, [onEscape]);

  return ref;
}
