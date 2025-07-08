'use client';

import { useLocalStorageState } from 'hakenbox';

export default function Page() {
  const [count, setCount] = useLocalStorageState<number>('key', 0);

  return (
    <>
      <h1>Hello, Next.js!</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
}
