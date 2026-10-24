import { Link } from 'react-router-dom';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';

// A small hand-drawn glyph instead of pulling in lucide-react's Instagram
// icon, which is deprecated upstream (lucide dropped brand-specific
// icons). Simple enough to restyle or swap for a real logo later.
function InstagramGlyph(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const { categories } = useStoreData();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__column footer__brand">
          <span className="header__logo">دیبا</span>
          <p className="footer__tagline">
            کیفیت ماندگار، طراحی بی‌زمان. مجموعه‌ای منتخب از پوشاک و کالای زندگی، برای کسانی که به جزئیات اهمیت می‌دهند.
          </p>
          <div className="footer__social">
            <a href="#" className="header__icon-btn" aria-label="اینستاگرام">
              <InstagramGlyph />
            </a>
            <a href="#" className="header__icon-btn" aria-label="تلگرام">
              <Send size={18} />
            </a>
          </div>
        </div>

        <div className="footer__column">
          <h4 className="footer__heading">دسترسی سریع</h4>
          <ul className="footer__links">
            <li>
              <Link to="/">خانه</Link>
            </li>
            <li>
              <Link to="/shop">همه محصولات</Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h4 className="footer__heading">دسته‌بندی‌ها</h4>
          <ul className="footer__links">
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`/shop?category=${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h4 className="footer__heading">ارتباط با ما</h4>
          <ul className="footer__links footer__contact">
            <li>
              <MapPin size={16} />
              <span>تهران، خیابان ولیعصر</span>
            </li>
            <li>
              <Phone size={16} />
              <span dir="ltr">021&nbsp;91234567</span>
            </li>
            <li>
              <Mail size={16} />
              <span dir="ltr">hello@diba-store.ir</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {year} فروشگاه دیبا. تمامی حقوق محفوظ است.</span>
          <span className="footer__admin-link">
            <Link to="/admin">ورود مدیر</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
