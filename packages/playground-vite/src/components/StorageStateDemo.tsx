import { useLocalStorageState } from 'hakenbox';

function Component() {
  const [count, setCount] = useLocalStorageState<number>('key', 0);

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
}

export default Component;
