import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import Badge from '../ui/Badge';
import { formatPrice, formatPercent, getDiscountPercent } from '../../utils/format';

export default function ProductCard({ product }) {
  const discount = getDiscountPercent(product.price, product.oldPrice);
  const outOfStock = product.stock === 0;

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image-wrap">
        <ProductImage src={product.image} alt={product.name} tone={product.tone} />

        <div className="product-card__badges">
          {product.isNew && <Badge variant="gold">جدید</Badge>}
          {discount && <Badge variant="danger">{formatPercent(discount)} تخفیف</Badge>}
        </div>

        {outOfStock && (
          <div className="product-card__stock-overlay">
            <span>ناموجود</span>
          </div>
        )}
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="product-card__old-price">{formatPrice(product.oldPrice)}</span>}
        </div>
      </div>
    </Link>
  );
}
