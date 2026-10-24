import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductImage from '../product/ProductImage';
import Button from '../ui/Button';
import { formatPrice, toPersianDigits } from '../../utils/format';

export default function CartDrawer() {
  const { lines, totalPrice, isDrawerOpen, closeDrawer, updateQuantity, removeItem } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={closeDrawer}>
      {/* stopPropagation so interacting with the cart doesn't close it */}
      <div className="cart-drawer" onClick={(event) => event.stopPropagation()} role="dialog" aria-label="سبد خرید">
        <div className="cart-drawer__header">
          <h3>سبد خرید</h3>
          <button className="header__icon-btn" onClick={closeDrawer} aria-label="بستن">
            <X size={20} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="cart-drawer__empty">
            <ShoppingBag size={40} strokeWidth={1.2} />
            <p>سبد خرید شما خالی است</p>
            <Button variant="secondary" onClick={closeDrawer} as={Link} to="/shop">
              مشاهده محصولات
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-drawer__lines">
              {lines.map((line) => (
                <div className="cart-line" key={line.key}>
                  <ProductImage
                    src={line.image}
                    alt={line.name}
                    tone={line.tone}
                    className="cart-line__image"
                  />
                  <div className="cart-line__info">
                    <span className="cart-line__name">{line.name}</span>
                    {line.size && <span className="cart-line__size">سایز: {toPersianDigits(line.size)}</span>}
                    <span className="cart-line__price">{formatPrice(line.price)}</span>
                    <div className="cart-line__quantity">
                      <button onClick={() => updateQuantity(line.key, line.quantity - 1)} aria-label="کاهش تعداد">
                        <Minus size={14} />
                      </button>
                      <span>{toPersianDigits(line.quantity)}</span>
                      <button onClick={() => updateQuantity(line.key, line.quantity + 1)} aria-label="افزایش تعداد">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button className="cart-line__remove" onClick={() => removeItem(line.key)} aria-label="حذف از سبد">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__subtotal">
                <span>جمع کل</span>
                <span className="cart-drawer__subtotal-amount">{formatPrice(totalPrice)}</span>
              </div>
              <Button as={Link} to="/checkout" onClick={closeDrawer} fullWidth size="lg">
                ادامه فرآیند خرید
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
