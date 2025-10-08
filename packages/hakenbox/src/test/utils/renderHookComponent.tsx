import { render } from '@testing-library/react';
import type { ReactNode } from 'react';

/**
 * Helper component for testing custom React hooks.
 * Calls the provided hook and passes its result to the render function.
 *
 * @example
 * renderHookComponent(
 *   () => useClickAway(callback),
 *   (ref) => <div ref={ref} />
 * );
 */
export function HookTestComponent<T>({
  hook,
  children,
}: {
  hook: () => T;
  children: (value: T) => ReactNode;
}) {
  const result = hook();
  return <>{children(result)}</>;
}

/**
 * Utility function that renders a component wrapping a hook under test.
 * Allows you to test hooks that return refs or UI-dependent values.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function renderHookComponent<T>(
  hook: () => T,
  children: (value: T) => ReactNode
) {
  return render(<HookTestComponent hook={hook}>{children}</HookTestComponent>);
}
