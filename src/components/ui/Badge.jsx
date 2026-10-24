// Tiny pill for status labels: "جدید" on a product card, "لغو شده" on
// an order row, stock status, etc. One component, five color variants.

export default function Badge({ children, variant = 'neutral' }) {
  // 'neutral' | 'gold' | 'success' | 'danger' | 'stone'
  return <span className={`badge badge--${variant}`}>{children}</span>;
}
