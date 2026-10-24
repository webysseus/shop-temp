import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="container not-found">
      <span className="not-found__code">۴۰۴</span>
      <h1>صفحه مورد نظر پیدا نشد</h1>
      <p>ممکن است آدرس اشتباه باشد یا این صفحه جابه‌جا شده باشد.</p>
      <Button as={Link} to="/">
        بازگشت به خانه
      </Button>
    </div>
  );
}
