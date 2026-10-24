import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingBag, ChevronLeft } from 'lucide-react';
import { useStoreData } from '../context/StoreDataContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ui/Toast';
import ProductImage from '../components/product/ProductImage';
import ProductCard from '../components/product/ProductCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatPrice, formatPercent, getDiscountPercent, toPersianDigits } from '../utils/format';

// Static demo reviews shown under every product. There's no review
// system behind this yet — swap this array for real review data (or a
// review API) whenever you add one.
const DEMO_REVIEWS = [
  { id: 1, author: 'سارا.م', rating: 5, text: 'کیفیت پارچه واقعا عالی بود، دقیقا مثل توضیحات.' },
  { id: 2, author: 'امیر.ح', rating: 4, text: 'ارسال سریع بود، ولی سایزبندی کمی بزرگ‌تر از حد معمول است.' },
  { id: 3, author: 'نگار.ک', rating: 5, text: 'برای بار دوم خرید کردم، همیشه راضی بودم.' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { products, categories } = useStoreData();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const product = products.find((item) => item.id === id);
  const sizes = product?.options?.size;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container product-detail__not-found">
        <p>این محصول پیدا نشد.</p>
        <Button as={Link} to="/shop" variant="secondary">
          بازگشت به فروشگاه
        </Button>
      </div>
    );
  }

  const category = categories.find((item) => item.id === product.category);
  const discount = getDiscountPercent(product.price, product.oldPrice);
  const outOfStock = product.stock === 0;
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  function handleAddToCart() {
    addItem(product, { size: selectedSize, quantity });
    showToast(`${product.name} به سبد خرید اضافه شد`);
  }

  return (
    <div className="container product-detail">
      <nav className="breadcrumb">
        <Link to="/">خانه</Link>
        <ChevronLeft size={14} />
        <Link to={`/shop?category=${product.category}`}>{category?.name}</Link>
        <ChevronLeft size={14} />
        <span>{product.name}</span>
      </nav>

      <div className="product-detail__grid">
        <div className="product-detail__image">
          <ProductImage src={product.image} alt={product.name} tone={product.tone} />
        </div>

        <div className="product-detail__info">
          {product.isNew && <Badge variant="gold">جدید</Badge>}
          <h1 className="product-detail__name">{product.name}</h1>

          <div className="product-detail__rating">
            <div className="star-row">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={16} fill={index < Math.round(product.rating) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span>({toPersianDigits(product.reviewCount)} نظر)</span>
          </div>

          <div className="product-detail__price-row">
            <span className="product-detail__price">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="product-detail__old-price">{formatPrice(product.oldPrice)}</span>}
            {discount && <Badge variant="danger">{formatPercent(discount)} تخفیف</Badge>}
          </div>

          <p className="product-detail__description">{product.description}</p>

          {sizes && sizes.length > 0 && (
            <div className="product-detail__sizes">
              <span className="product-detail__label">سایز</span>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option${selectedSize === size ? ' size-option--active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    type="button"
                  >
                    {toPersianDigits(size)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-detail__actions">
            <div className="cart-line__quantity product-detail__quantity">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="کاهش تعداد" type="button">
                <Minus size={14} />
              </button>
              <span>{toPersianDigits(quantity)}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="افزایش تعداد" type="button">
                <Plus size={14} />
              </button>
            </div>

            <Button size="lg" icon={<ShoppingBag size={18} />} onClick={handleAddToCart} disabled={outOfStock} fullWidth>
              {outOfStock ? 'ناموجود' : 'افزودن به سبد خرید'}
            </Button>
          </div>

          {product.details?.length > 0 && (
            <ul className="product-detail__details">
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <section className="product-detail__reviews">
        <h2 className="section-heading__title">نظرات مشتریان</h2>
        <div className="review-list">
          {DEMO_REVIEWS.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-card__header">
                <strong>{review.author}</strong>
                <div className="star-row">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={13} fill={index < review.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-products">
          <div className="section-heading">
            <h2 className="section-heading__title">محصولات مشابه</h2>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard product={item} key={item.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
