import { useDerivedState } from 'hakenbox';

function Component() {
  const [count, setCount, computed] = useDerivedState<number>(0);

  const derived = computed((count) => count * 5);

  return (
    <>
      <button onClick={() => setCount((prev) => (prev += 1))}>
        count: {count}
      </button>
      <p> Derived: {derived}</p>
    </>
  );
}

export default Component;
