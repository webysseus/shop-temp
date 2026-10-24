import { Link } from 'react-router-dom';

export default function CategoryShowcase({ categories }) {
  return (
    <section className="container category-showcase">
      <div className="section-heading">
        <h2 className="section-heading__title">دسته‌بندی‌ها</h2>
        <p className="section-heading__subtitle">مجموعه را بر اساس نیاز خود مرور کنید</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to={`/shop?category=${category.id}`}
            key={category.id}
            className={`category-card product-image--${category.tone}`}
          >
            <span className="category-card__name">{category.name}</span>
            <span className="category-card__desc">{category.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
