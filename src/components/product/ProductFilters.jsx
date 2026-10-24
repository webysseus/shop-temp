// Controlled component: Shop.jsx owns the actual filter state and just
// hands it down here along with the change handlers. Keeping the state
// in the page rather than in here means Shop.jsx can read the current
// filters (to filter the product list) without reaching into this
// component to get them.

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortValue,
  onSortChange,
  inStockOnly,
  onInStockChange,
}) {
  return (
    <div className="product-filters">
      <div className="product-filters__categories">
        <button
          className={`filter-pill${selectedCategory === null ? ' filter-pill--active' : ''}`}
          onClick={() => onCategoryChange(null)}
        >
          همه
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-pill${selectedCategory === category.id ? ' filter-pill--active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="product-filters__row">
        <label className="product-filters__checkbox">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => onInStockChange(event.target.checked)}
          />
          <span>فقط کالاهای موجود</span>
        </label>

        <select
          value={sortValue}
          onChange={(event) => onSortChange(event.target.value)}
          className="product-filters__sort"
          aria-label="مرتب‌سازی"
        >
          <option value="featured">پیشنهادی</option>
          <option value="newest">جدیدترین</option>
          <option value="price-asc">ارزان‌ترین</option>
          <option value="price-desc">گران‌ترین</option>
        </select>
      </div>
    </div>
  );
}
