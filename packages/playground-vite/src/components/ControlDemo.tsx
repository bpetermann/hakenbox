import { useControlState } from 'hakenbox';
import { useState } from 'react';

const Parent = () => {
  const [on, setOn] = useState<boolean>(false);

  const toggleOn = () => {
    setOn((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleOn}>{on ? 'Turn "off"' : 'Turn "on"'}</button>
      <br />
      <br />
      <Child toggleOn={toggleOn} />
    </>
  );
};

const Child = ({ on, toggleOn }: { on?: boolean; toggleOn?: () => void }) => {
  const [value, setValue] = useControlState<boolean>(true, [on, toggleOn]);

  return (
    <button onClick={() => setValue((prev) => !prev)}>
      {!value ? 'off' : 'on'}
    </button>
  );
};

export default Parent;
