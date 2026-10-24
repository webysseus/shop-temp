import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/product/ProductImage';
import Button from '../components/ui/Button';
import { formatPrice, toPersianDigits } from '../utils/format';

// Orders qualify for free shipping over this amount — change freely,
// it's just a plain constant, not tied to anything else.
const FREE_SHIPPING_THRESHOLD = 3000000;
const STANDARD_SHIPPING_COST = 250000;

export default function Cart() {
  const { lines, totalPrice, updateQuantity, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container cart-page">
        <div className="cart-page__empty">
          <ShoppingBag size={48} strokeWidth={1.2} />
          <h2>سبد خرید شما خالی است</h2>
          <Button as={Link} to="/shop">
            مشاهده محصولات
          </Button>
        </div>
      </div>
    );
  }

  const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="container cart-page">
      <div className="section-heading">
        <h1 className="section-heading__title">سبد خرید</h1>
      </div>

      <div className="cart-page__grid">
        <div className="cart-page__items">
          {lines.map((line) => (
            <div className="cart-line" key={line.key}>
              <ProductImage src={line.image} alt={line.name} tone={line.tone} className="cart-line__image" />
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

        <div className="cart-page__summary">
          <h3>خلاصه سفارش</h3>
          <div className="cart-page__summary-row">
            <span>جمع کالاها</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="cart-page__summary-row">
            <span>هزینه ارسال</span>
            <span>{shippingCost === 0 ? 'رایگان' : formatPrice(shippingCost)}</span>
          </div>
          <div className="cart-page__summary-total">
            <span>مجموع</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
          <Button as={Link} to="/checkout" fullWidth size="lg" className="cart-page__checkout-btn">
            ادامه فرآیند خرید
          </Button>
        </div>
      </div>
    </div>
  );
}
