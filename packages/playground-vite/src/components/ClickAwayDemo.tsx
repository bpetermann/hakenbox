import { useClickAway } from 'hakenbox';
import { useState } from 'react';

const Example = () => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useClickAway(() => setIsOpen(false));

  return (
    <div ref={ref}>
      {isOpen && (
        <div style={{ border: '1px solid #fff', padding: '1rem' }}>
          Modal open
        </div>
      )}
    </div>
  );
};

export default Example;
