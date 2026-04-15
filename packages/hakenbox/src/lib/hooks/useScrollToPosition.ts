import { useCallback, useEffect, useRef } from 'react';

type ScrollPosition = { x?: number; y?: number };

type Options = {
  defaultPosition?: ScrollPosition;
  offset?: ScrollPosition;
  behavior?: ScrollBehavior;
};

/**
 * Imperatively scrolls a container element to a given position.
 *
 * Call `scrollTo({ x, y })` to scroll the container — each axis is optional,
 * so you can scroll vertically, horizontally, or both at once. Scrolling does
 * not cause a re-render.
 *
 * @template T - The HTMLElement type of the container
 * @param options.defaultPosition - Scroll position applied once on mount
 * @param options.offset - Offset added to each axis on every scroll (default: 0)
 * @param options.behavior - Native scroll behavior (default: `'smooth'`)
 * @returns `scrollTo` handler and a `ref` to attach to the container element
 *
 * @example
 * const { scrollTo, ref } = useScrollToPosition<HTMLDivElement>({ offset: { y: -60 } });
 *
 * return (
 *   <div ref={ref}>
 *     <button onClick={() => scrollTo({ y: 300 })}>Jump to 300</button>
 *   </div>
 * );
 */
export function useScrollToPosition<T extends HTMLElement>({
  defaultPosition,
  offset,
  behavior = 'smooth',
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!defaultPosition) return;
    const id = requestAnimationFrame(() => {
      ref.current?.scrollTo({
        top:
          defaultPosition.y !== undefined
            ? defaultPosition.y + (offset?.y ?? 0)
            : undefined,
        left:
          defaultPosition.x !== undefined
            ? defaultPosition.x + (offset?.x ?? 0)
            : undefined,
        behavior,
      });
    });
    return () => cancelAnimationFrame(id);
    // intentionally mount-only: defaultPosition is an initial value, not reactive
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = useCallback(
    ({ x, y }: ScrollPosition) => {
      if (!ref.current) return;

      const el = ref.current;
      const targetTop = y !== undefined ? y + (offset?.y ?? 0) : el.scrollTop;
      const targetLeft = x !== undefined ? x + (offset?.x ?? 0) : el.scrollLeft;

      if (el.scrollTop === targetTop && el.scrollLeft === targetLeft) return;

      requestAnimationFrame(() =>
        ref.current?.scrollTo({ top: targetTop, left: targetLeft, behavior }),
      );
    },
    [behavior, offset],
  );

  return { scrollTo, ref };
}
