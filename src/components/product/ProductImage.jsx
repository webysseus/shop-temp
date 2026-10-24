// This template ships without real product photography (that's yours
// to add), but an empty grey box everywhere would look broken instead
// of "ready to customize." So: pass a real `src` and this renders a
// normal <img>. Leave `src` empty and it renders a soft gradient panel
// in the product's `tone` color with a monogram letter and a subtle
// pattern — good enough to judge layout and spacing by, and obviously
// a placeholder rather than a bug.
//
// To go live with real photos: just start passing `src={product.image}`
// wherever this component is used. Nothing else changes.

export default function ProductImage({ src, alt, tone = 'sand', className = '' }) {
  if (src) {
    return <img src={src} alt={alt} className={`product-image ${className}`} loading="lazy" />;
  }

  const initial = alt ? alt.trim().charAt(0) : '';

  return (
    <div
      className={`product-image product-image--placeholder product-image--${tone} ${className}`}
      role="img"
      aria-label={alt}
    >
      <svg className="product-image__pattern" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="160" cy="36" r="70" fill="currentColor" opacity="0.14" />
        <circle cx="18" cy="176" r="92" fill="currentColor" opacity="0.09" />
      </svg>
      <span className="product-image__monogram">{initial}</span>
    </div>
  );
}
