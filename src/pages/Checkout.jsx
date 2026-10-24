import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useStoreData } from '../context/StoreDataContext';
import { TextField, TextAreaField } from '../components/ui/FormField';
import Button from '../components/ui/Button';
import { formatPrice, toPersianDigits } from '../utils/format';

export default function Checkout() {
  const { lines, totalPrice, clearCart } = useCart();
  const { placeOrder } = useStoreData();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', phone: '', city: '', address: '', postalCode: '' });
  const [paymentMethod, setPaymentMethod] = useState('gateway'); // 'gateway' | 'cod'
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'نام را وارد کنید';
    if (!form.phone.trim()) nextErrors.phone = 'شماره تماس را وارد کنید';
    if (!form.city.trim()) nextErrors.city = 'شهر را وارد کنید';
    if (!form.address.trim()) nextErrors.address = 'آدرس را وارد کنید';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    // NOTE: this is where a real backend would matter most. Right now
    // "gateway" doesn't call any actual payment provider — it just
    // records the order like "cod" does. When you connect a backend,
    // this is the spot to redirect to ZarinPal/IDPay/etc. and only
    // call placeOrder() after payment is confirmed.
    const order = placeOrder({
      customerName: form.name,
      customerPhone: form.phone,
      address: `${form.city}، ${form.address}${form.postalCode ? ' - کد پستی ' + form.postalCode : ''}`,
      items: lines.map((line) => ({
        productId: line.productId,
        name: line.name,
        price: line.price,
        quantity: line.quantity,
      })),
      total: totalPrice,
      paymentMethod,
    });

    clearCart();
    navigate(`/order-success/${order.id}`);
  }

  if (lines.length === 0) {
    return (
      <div className="container checkout-page__empty">
        <p>سبد خرید شما خالی است.</p>
        <Button as={Link} to="/shop">
          مشاهده محصولات
        </Button>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <div className="section-heading">
        <h1 className="section-heading__title">تکمیل خرید</h1>
      </div>

      <form className="cart-page__grid" onSubmit={handleSubmit}>
        <div className="cart-page__items checkout-page__form">
          <h3>اطلاعات ارسال</h3>
          <div className="checkout-page__form-row">
            <TextField
              id="name"
              label="نام و نام خانوادگی"
              required
              value={form.name}
              onChange={(event) => handleChange('name', event.target.value)}
              error={errors.name}
            />
            <TextField
              id="phone"
              label="شماره تماس"
              required
              dir="ltr"
              value={form.phone}
              onChange={(event) => handleChange('phone', event.target.value)}
              error={errors.phone}
            />
          </div>
          <div className="checkout-page__form-row">
            <TextField
              id="city"
              label="شهر"
              required
              value={form.city}
              onChange={(event) => handleChange('city', event.target.value)}
              error={errors.city}
            />
            <TextField
              id="postalCode"
              label="کد پستی (اختیاری)"
              dir="ltr"
              value={form.postalCode}
              onChange={(event) => handleChange('postalCode', event.target.value)}
            />
          </div>
          <TextAreaField
            id="address"
            label="آدرس کامل"
            required
            value={form.address}
            onChange={(event) => handleChange('address', event.target.value)}
            error={errors.address}
          />

          <h3>روش پرداخت</h3>
          <div className="payment-options">
            <label className={`payment-option${paymentMethod === 'gateway' ? ' payment-option--active' : ''}`}>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'gateway'}
                onChange={() => setPaymentMethod('gateway')}
              />
              <div>
                <strong>پرداخت آنلاین</strong>
                <span>از طریق درگاه بانکی</span>
              </div>
            </label>
            <label className={`payment-option${paymentMethod === 'cod' ? ' payment-option--active' : ''}`}>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              <div>
                <strong>پرداخت در محل</strong>
                <span>نقدی یا کارت‌خوان هنگام تحویل</span>
              </div>
            </label>
          </div>
        </div>

        <div className="cart-page__summary">
          <h3>خلاصه سفارش</h3>
          {lines.map((line) => (
            <div className="checkout-page__summary-item" key={line.key}>
              <span>
                {line.name} × {toPersianDigits(line.quantity)}
              </span>
              <span>{formatPrice(line.price * line.quantity)}</span>
            </div>
          ))}
          <div className="cart-page__summary-total">
            <span>مجموع</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Button type="submit" fullWidth size="lg" className="cart-page__checkout-btn">
            ثبت سفارش
          </Button>
        </div>
      </form>
    </div>
  );
}
