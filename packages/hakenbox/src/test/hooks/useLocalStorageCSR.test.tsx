import { describe, expect, it, vitest } from 'vitest';
import { useLocalStorageCSR } from '../../lib/hooks/useLocalStorageCSR';
import { renderHookComponent } from '../utils/renderHookComponent';

const key = 'test-key-csr';

describe('useLocalStorageCSR (CSR-only)', () => {
  it('reads from localStorage during initial render, which may cause hydration mismatch in SSR', () => {
    localStorage.setItem(key, JSON.stringify(1));

    const { getByText } = renderHookComponent(
      () => useLocalStorageCSR<number>(key, 0),
      ([value]) => <div>{value}</div>
    );

    expect(getByText('1')).toBeInTheDocument();
  });

  it('reads localStorage during initial render (unsafe for SSR)', () => {
    const key = 'csr-key';
    const getItemSpy = vitest.spyOn(window.localStorage.__proto__, 'getItem');

    renderHookComponent(
      () => useLocalStorageCSR<number>(key, 0),
      ([value]) => <div>Value: {value}</div>
    );

    expect(getItemSpy).toHaveBeenCalledWith(key);

    getItemSpy.mockRestore();
  });
});
