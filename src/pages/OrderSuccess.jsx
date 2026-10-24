import { useParams, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div className="container order-success">
      <CheckCircle2 size={56} strokeWidth={1.3} className="order-success__icon" />
      <h1>سفارش شما با موفقیت ثبت شد</h1>
      <p>
        شماره سفارش: <strong dir="ltr">{orderId}</strong>
      </p>
      <p className="order-success__note">جزئیات سفارش به‌زودی برای شما پیامک می‌شود.</p>
      <div className="order-success__actions">
        <Button as={Link} to="/shop">
          ادامه خرید
        </Button>
        <Button as={Link} to="/" variant="secondary">
          بازگشت به خانه
        </Button>
      </div>
    </div>
  );
}
