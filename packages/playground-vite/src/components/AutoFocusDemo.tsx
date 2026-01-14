import { useAutoFocus } from 'hakenbox';

const Example = () => {
  const ref = useAutoFocus<HTMLInputElement>(true);

  return (
    <div>
      <label htmlFor='autofocus-input'>
        This input is autofocused on mount:
      </label>
      <input id='autofocus-input' ref={ref} type='text' />
    </div>
  );
};

export default Example;
