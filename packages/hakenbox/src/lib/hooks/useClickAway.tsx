import { useEffect, useRef } from 'react';

const EVENTS: {
  eventName: 'mousedown' | 'touchstart';
  options?: AddEventListenerOptions;
}[] = [
  { eventName: 'mousedown', options: {} },
  { eventName: 'touchstart', options: { passive: true } },
] as const;

/**
 * Hook that triggers a callback when a user clicks or taps outside of
 * the referenced element.
 *
 * Uses mousedown and touchstart to avoid React synthetic event timing issues.
 *
 * @example
 * 

 * const [isOpen, setIsOpen] = useState(false);
 * const ref = useClickAway(() => setIsOpen(false));
 *
 * return (
 *   <div ref={ref}>
 *     {isOpen && <div />}
 *   </div>
 * );
 * 
 *
 * @param cb - Function to call when a click or touch occurs outside the element.
 * @returns A ref to attach to the element you want to detect outside clicks for.
 */
export const useClickAway = <T extends HTMLElement = HTMLDivElement>(
  cb: () => void
) => {
  const ref = useRef<T | null>(null);
  const cbRef = useRef(cb);

  cbRef.current = cb;

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        cbRef.current();
    };

    EVENTS.forEach(({ eventName, options }) =>
      document.addEventListener(eventName, handleClick, options)
    );

    return () =>
      EVENTS.forEach(({ eventName, options }) =>
        document.removeEventListener(eventName, handleClick, options)
      );
  }, []);

  return ref;
};
