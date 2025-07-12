'use client';
import { useParams } from 'hakenbox';

function Component() {
  const [params, setParams] = useParams<{ name: string }>({ name: '' });

  return (
    <div>
      <label
        htmlFor='name'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        Your Name:
      </label>
      <input
        type='name'
        name='name'
        id='name'
        className='bg-gray-50 dark:bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-black dark:focus:border-white'
        value={params.name}
        onChange={(e) =>
          setParams((prev) => ({ ...prev, name: e.target.value }))
        }
      />
    </div>
  );
}

export default Component;
