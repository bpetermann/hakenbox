import { useFocusTrap } from 'hakenbox';
import { useRef, useState } from 'react';

function Component() {
  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button ref={triggerRef} onClick={() => setOpen((prev) => !prev)}>
        Show
      </button>
      {open ? <Modal handleClose={handleClose} /> : null}
    </>
  );
}

function Modal({ handleClose }: { handleClose: () => void }) {
  const modalRef = useFocusTrap<HTMLDivElement>(handleClose);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        style={{
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          minWidth: '200px',
          maxWidth: '400px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          zIndex: '100',
          backgroundColor: 'black',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <button
            style={{ backgroundColor: 'transparent' }}
            onClick={handleClose}
            autoFocus
          >
            &#x2716;
          </button>
        </div>
        <p style={{ marginTop: 0 }}>Hello 👋</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default Component;
