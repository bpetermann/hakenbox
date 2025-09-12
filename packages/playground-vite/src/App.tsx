import './App.css';
import reactLogo from './assets/react.svg';
import ControlDemo from './components/ControlDemo';
import DebounceDemo from './components/DebounceDemo';
import DerivedDemo from './components/DerivedDemo';
import HistoryDemo from './components/HistoryDemo';
import ParamsDemo from './components/ParamsDemo';
import StorageStateDemo from './components/StorageStateDemo';

import viteLogo from '/vite.svg';

function App() {
  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <StorageStateDemo />
      </div>
      <div className='card'>
        <ParamsDemo />
      </div>
      <HistoryDemo /> <div className='card'></div>
      <div className='card'>
        <DerivedDemo />
      </div>
      <div className='card'>
        <ControlDemo />
      </div>
      <div className='card'>
        <DebounceDemo />
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
