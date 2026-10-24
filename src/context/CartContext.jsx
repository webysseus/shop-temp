import { createContext, useContext, useState, useMemo } from 'react';

// WHY CONTEXT HERE: the cart needs to be readable and editable from lots
// of unrelated places at once (header icon, product page, cart drawer,
// checkout) — passing it down as props would mean threading it through
// every component in between. Context lets any of them plug in directly
// with the useCart() hook at the bottom of this file.

const CartContext = createContext(null);

/** Builds a unique key for a cart line. Same product + same size = same
 *  line (quantity goes up); same product + different size = a new line. */
function buildLineKey(productId, size) {
  return size ? `${productId}__${size}` : productId;
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]); // [{ key, productId, name, price, tone, size, quantity }]
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function addItem(product, { size = null, quantity = 1 } = {}) {
    const key = buildLineKey(product.id, size);

    setLines((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + quantity } : line
        );
      }
      return [
        ...current,
        {
          key,
          productId: product.id,
          name: product.name,
          price: product.price,
          tone: product.tone,
          size,
          quantity,
        },
      ];
    });

    setIsDrawerOpen(true); // open the drawer so adding to cart feels confirmed
  }

  function removeItem(key) {
    setLines((current) => current.filter((line) => line.key !== key));
  }

  function updateQuantity(key, quantity) {
    if (quantity < 1) {
      removeItem(key);
      return;
    }
    setLines((current) => current.map((line) => (line.key === key ? { ...line, quantity } : line)));
  }

  function clearCart() {
    setLines([]);
  }

  const totalItems = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const totalPrice = useMemo(() => lines.reduce((sum, line) => sum + line.price * line.quantity, 0), [lines]);

  const value = {
    lines,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isDrawerOpen,
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Access the cart from any component: const { lines, addItem } = useCart(); */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a <CartProvider>');
  }
  return context;
}
