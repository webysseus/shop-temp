import { Truck, ShieldCheck, CreditCard, Headphones } from 'lucide-react';

const FEATURES = [
  { icon: Truck, title: 'ارسال سریع', desc: 'تحویل به سراسر کشور' },
  { icon: ShieldCheck, title: 'ضمانت اصالت', desc: 'تضمین کیفیت کالا' },
  { icon: CreditCard, title: 'پرداخت امن', desc: 'درگاه پرداخت معتبر' },
  { icon: Headphones, title: 'پشتیبانی', desc: 'پاسخگویی هر روز هفته' },
];

export default function FeaturesBar() {
  return (
    <section className="features-bar">
      <div className="container features-bar__grid">
        {FEATURES.map((feature) => (
          <div className="features-bar__item" key={feature.title}>
            <feature.icon size={22} strokeWidth={1.5} />
            <div>
              <strong>{feature.title}</strong>
              <span>{feature.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
