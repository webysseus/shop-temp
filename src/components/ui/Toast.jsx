import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

// Small notification system for quick feedback ("محصول ذخیره شد", "خطا
// در ثبت سفارش"). Wrap the app once in <ToastProvider>, then call
// useToast().showToast('...') from any component — the toast stack
// itself lives fixed to the corner of the screen via CSS.

const ToastContext = createContext(null);
let toastIdCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = ++toastIdCounter;
    setToasts((current) => [...current, { id, message, type }]);
    // Auto-dismiss after 3 seconds — no need for the caller to clean up.
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-stack">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.type} fade-in`} role="status">
            {toast.type === 'success' && <CheckCircle2 size={18} />}
            {toast.type === 'error' && <XCircle size={18} />}
            {toast.type === 'info' && <Info size={18} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside a <ToastProvider>');
  }
  return context;
}
