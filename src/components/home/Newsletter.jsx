import { useState } from 'react';
import { Mail } from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../ui/Toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    // No real backend in this demo-data version — this is where you'd
    // POST to your email provider once one is connected.
    showToast('با تشکر! ایمیل شما ثبت شد.');
    setEmail('');
  }

  return (
    <section className="newsletter">
      <div className="container newsletter__inner">
        <Mail size={28} strokeWidth={1.4} />
        <div className="newsletter__text">
          <h3>از تخفیف‌ها باخبر شوید</h3>
          <p>ایمیل خود را وارد کنید تا از مجموعه‌های جدید و پیشنهادهای ویژه باخبر شوید.</p>
        </div>
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="ایمیل شما"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="newsletter__input"
          />
          <Button type="submit">عضویت</Button>
        </form>
      </div>
    </section>
  );
}
