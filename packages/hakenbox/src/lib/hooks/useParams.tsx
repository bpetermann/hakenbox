import { useCallback, useEffect, useMemo, useState } from 'react';

const parse = (data: string) => {
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

const parseSearchParams = (
  searchParams: URLSearchParams
): Record<string, unknown> => {
  return [...searchParams.entries()].reduce((acc, [key, value]) => {
    acc[key] = parse(value);

    return acc;
  }, {} as Record<string, unknown>);
};

const convertParams = <T extends Record<string, unknown>>(
  params: T
): URLSearchParams => {
  const newSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue;

    newSearchParams.set(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  return newSearchParams;
};

/**
 * Custom hook to manage URL search parameters as state.
 * @template T The shape of the parameters object.
 * @param {T} [initialState] Optional initial state for parameters.
 * @returns
 * - `params`: The current parameters object.
 * - `setParams`: Function to update parameters.
 * - `resetParams`: Function to reset parameters to their initial state.
 */
export function useParams<T extends Record<string, unknown>>(
  initialState?: T
): [
  params: T,
  setParams: (setFn: (prev: T) => T, options?: { replace?: boolean }) => void,
  resetParams: () => void
] {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableInitialState = useMemo(() => initialState || ({} as T), []);

  const getUrlParams = useMemo(() => {
    if (typeof window === 'undefined') return {} as T;
    return parseSearchParams(new URLSearchParams(window.location.search));
  }, []);

  const [searchParams, setSearchParamsState] = useState<T>(() => {
    return Object.assign({}, stableInitialState, getUrlParams);
  });

  useEffect(() => {
    let isMounted = true;
    const handlePopState = () => {
      if (isMounted) {
        setSearchParamsState(
          parseSearchParams(new URLSearchParams(window.location.search)) as T
        );
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      isMounted = false;
      window.removeEventListener('popstate', handlePopState);
    };
  }, [stableInitialState]);

  const setSearchParams = useCallback(
    (setFn: (prev: T) => T, options?: { replace?: boolean }) => {
      if (typeof window === 'undefined') return;

      const newParams = setFn(searchParams);
      if (JSON.stringify(newParams) === JSON.stringify(searchParams)) return;

      const newSearchParams = convertParams(newParams);

      if (options?.replace) {
        window.history.replaceState({}, '', `?${newSearchParams.toString()}`);
      } else {
        window.history.pushState({}, '', `?${newSearchParams.toString()}`);
      }

      setSearchParamsState(newParams);
    },
    [searchParams]
  );

  const resetParams = useCallback(() => {
    if (typeof window === 'undefined') return;

    setSearchParamsState(initialState ?? ({} as T));
    const resetSearchParams = convertParams(initialState ?? {});

    window.history.replaceState({}, '', `?${resetSearchParams.toString()}`);
  }, [initialState]);

  return [searchParams, setSearchParams, resetParams];
}
