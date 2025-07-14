import { useHistory } from 'hakenbox';

function Component() {
  const [count, setCount, history] = useHistory<number>(0);

  return (
    <>
      <button
        onClick={() => {
          const save = count % 3 === 0 || count % 5 === 0;

          setCount((count) => {
            return count + 1;
          }, save);
        }}
      >
        count is {count}
      </button>
      <div>History: {history.join(',')}</div>
    </>
  );
}

export default Component;
