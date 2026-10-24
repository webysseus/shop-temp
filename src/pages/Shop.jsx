import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { useStoreData } from '../context/StoreDataContext';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';

export default function Shop() {
  const { products, categories } = useStoreData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Category and search live in the URL (?category=...&search=...) so a
  // filtered view is shareable/bookmarkable. Sort and "in stock only"
  // are local state — resetting them on navigation is fine.
  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  const [sortValue, setSortValue] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  function handleCategoryChange(categoryId) {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  }

  const filteredProducts = useMemo(() => {
    let list = products;

    if (selectedCategory) {
      list = list.filter((product) => product.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
      );
    }
    if (inStockOnly) {
      list = list.filter((product) => product.stock > 0);
    }

    // Sort on a COPY — never sort `list` in place when it might still be
    // the exact array reference coming straight from `products`.
    const sorted = [...list];
    if (sortValue === 'newest') {
      sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortValue === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    return sorted;
  }, [products, selectedCategory, searchQuery, inStockOnly, sortValue]);

  const activeCategoryName = categories.find((category) => category.id === selectedCategory)?.name;

  return (
    <div className="container shop-page">
      <div className="section-heading">
        <h1 className="section-heading__title">{activeCategoryName || 'همه محصولات'}</h1>
        <p className="section-heading__subtitle">
          {searchQuery ? `نتایج جستجو برای «${searchQuery}»` : 'مجموعه کامل فروشگاه را مرور کنید'}
        </p>
      </div>

      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortValue={sortValue}
        onSortChange={setSortValue}
        inStockOnly={inStockOnly}
        onInStockChange={setInStockOnly}
      />

      {filteredProducts.length === 0 ? (
        <div className="shop-page__empty">
          <SearchX size={40} strokeWidth={1.2} />
          <p>محصولی با این مشخصات پیدا نشد</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
}
