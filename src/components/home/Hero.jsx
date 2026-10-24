import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';

// The only "page load" animation on the whole site lives here (see
// animations.css: .hero-reveal). Each child sets its own --delay so they
// settle in as one short, orchestrated sequence instead of everything
// fading in at once. Nothing else on the site animates on scroll.

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow hero-reveal" style={{ '--delay': '0ms' }}>
            مجموعه پاییزه ۱۴۰۵
          </p>
          <h1 className="hero__title hero-reveal" style={{ '--delay': '90ms' }}>
            کیفیت ماندگار
            <br />
            طراحی بی‌زمان
          </h1>
          <p className="hero__lead hero-reveal" style={{ '--delay': '180ms' }}>
            مجموعه‌ای منتخب از پوشاک و کالای زندگی، ساخته‌شده برای دوام و طراحی‌شده برای همین امروز.
          </p>
          <div className="hero-reveal" style={{ '--delay': '270ms' }}>
            <Button as={Link} to="/shop" size="lg" icon={<ArrowLeft size={18} />} iconPosition="end">
              مشاهده محصولات
            </Button>
          </div>
        </div>

        <div className="hero__visual hero-reveal" style={{ '--delay': '140ms' }}>
          <svg viewBox="0 0 400 480" className="hero__visual-pattern" aria-hidden="true">
            <circle cx="330" cy="70" r="140" fill="currentColor" opacity="0.15" />
            <circle cx="60" cy="420" r="180" fill="currentColor" opacity="0.1" />
            <circle cx="200" cy="240" r="1" stroke="currentColor" strokeOpacity="0.25" fill="none" />
          </svg>
          <span className="hero__visual-letter">د</span>
        </div>
      </div>
    </section>
  );
}
