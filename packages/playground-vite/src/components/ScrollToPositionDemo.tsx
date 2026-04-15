import { useScrollToPosition } from 'hakenbox';

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const Example = () => {
  const { scrollTo, ref } = useScrollToPosition<HTMLUListElement>({
    defaultPosition: { y: 600 },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <ul
        ref={ref}
        style={{
          height: '200px',
          overflowY: 'scroll',
          border: '1px solid #444',
          borderRadius: '6px',
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
      >
        {items.map((item) => (
          <li
            key={item}
            style={{
              padding: '8px 12px',
              borderBottom: '1px solid #333',
              textAlign: 'left',
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => scrollTo({ y: 0 })}>Scroll to top</button>
        <button onClick={() => scrollTo({ y: 600 })}>Scroll to bottom</button>
      </div>
    </div>
  );
};

export default Example;
