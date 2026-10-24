import { useEffect } from 'react';
import { X } from 'lucide-react';

// A generic modal shell. It doesn't know anything about what goes
// inside it — ProductForm, a delete confirmation, anything — it just
// handles the parts every modal needs: backdrop, closing on Escape or
// backdrop click, and not letting the page scroll behind it.

export default function Modal({ isOpen, onClose, title, children, footer = null, size = 'md' }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // stop the page scrolling behind the modal

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      {/* stopPropagation so clicking inside the modal doesn't bubble up and close it */}
      <div
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__header">
          <h3 id="modal-title" className="modal__title">
            {title}
          </h3>
          <button className="modal__close" onClick={onClose} aria-label="بستن">
            <X size={20} />
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
