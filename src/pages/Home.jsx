import { useStoreData } from '../context/StoreDataContext';
import Hero from '../components/home/Hero';
import FeaturesBar from '../components/home/FeaturesBar';
import CategoryShowcase from '../components/home/CategoryShowcase';
import Newsletter from '../components/home/Newsletter';
import ProductCard from '../components/product/ProductCard';

export default function Home() {
  const { products, categories } = useStoreData();
  const featured = products.filter((product) => product.isFeatured).slice(0, 8);

  return (
    <>
      <Hero />
      <FeaturesBar />

      <section className="container featured-products">
        <div className="section-heading">
          <h2 className="section-heading__title">پیشنهاد ویژه</h2>
          <p className="section-heading__subtitle">تکه‌هایی که این فصل بیشترین توجه را گرفته‌اند</p>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>

      <CategoryShowcase categories={categories} />
      <Newsletter />
    </>
  );
}
