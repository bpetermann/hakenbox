import { useParams } from 'hakenbox';

function Component() {
  const [params, setParams] = useParams<{ name: string }>({ name: '' });

  return (
    <div className='card'>
      <label htmlFor='name'>Your Name:</label>
      <br />
      <input
        type='name'
        name='name'
        id='name'
        value={params.name}
        onChange={(e) =>
          setParams((prev) => ({ ...prev, name: e.target.value }))
        }
      />
    </div>
  );
}

export default Component;
