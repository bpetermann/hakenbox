import { useState } from 'react';
import './App.css';
import ClickAwayDemo from './components/ClickAwayDemo';
import ControlDemo from './components/ControlDemo';
import DebounceDemo from './components/DebounceDemo';
import DerivedDemo from './components/DerivedDemo';
import FocusTrapDemo from './components/FocusTrapDemo';
import ParamsDemo from './components/ParamsDemo';
import StorageStateDemo from './components/StorageStateDemo';

const options = {
  StorageStateDemo: {
    hook: <StorageStateDemo />,
    description:
      'Shows how state can be persisted in localStorage on the client side.',
  },
  DerivedDemo: {
    hook: <DerivedDemo />,
    description:
      'Demonstrates a derived state value computed from the main state.',
  },
  ParamsDemo: {
    hook: <ParamsDemo />,
    description:
      'A simple demo showing how URL or form parameters can be managed.',
  },
  ControlDemo: {
    hook: <ControlDemo />,
    description: 'Shows controlled state between parent and child components.',
  },
  DebounceDemo: {
    hook: <DebounceDemo />,
    description:
      'Illustrates debouncing input updates to avoid unnecessary renders.',
  },
  FocusTrapDemo: {
    hook: <FocusTrapDemo />,
    description:
      'Demonstrates trapping focus inside a modal or popover component.',
  },

  ClickAwayDemo: {
    hook: <ClickAwayDemo />,
    description: 'Demonstrates closing a panel by clicking outside of it',
  },
};

const optionLabels: Record<keyof typeof options, string> = {
  StorageStateDemo: 'Storage State',
  DerivedDemo: 'Derived State',
  ParamsDemo: 'Params',
  ControlDemo: 'Control',
  DebounceDemo: 'Debounce',
  FocusTrapDemo: 'Focus Trap',
  ClickAwayDemo: 'Click Away',
};

function App() {
  const [value, setValue] = useState<keyof typeof options | ''>('');

  return (
    <>
      <h2>Pick a demo:</h2>
      <select
        name='demo'
        id='demo'
        value={value}
        onChange={(e) =>
          setValue(e.currentTarget.value as keyof typeof options)
        }
      >
        <option value='' disabled>
          -- Please choose a demo --
        </option>
        {Object.entries(optionLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      {value && (
        <div className='card'>
          <h3>{optionLabels[value]}</h3>
          <p>{options[value].description}</p>
          <div>{options[value].hook}</div>
        </div>
      )}
    </>
  );
}

export default App;
