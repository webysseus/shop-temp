import { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';
import { useToast } from '../../components/ui/Toast';
import ProductImage from '../../components/product/ProductImage';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ProductForm from './ProductForm';
import { formatPrice, toPersianDigits } from '../../utils/format';

export default function ProductsManager() {
  const { products, categories, deleteProduct, toggleProductAvailability } = useStoreData();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = "add" mode
  const [deletingProduct, setDeletingProduct] = useState(null);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter((product) => product.name.toLowerCase().includes(query));
  }, [products, searchQuery]);

  function openAddForm() {
    setEditingProduct(null);
    setIsFormOpen(true);
  }
  function openEditForm(product) {
    setEditingProduct(product);
    setIsFormOpen(true);
  }
  function handleFormSuccess(message) {
    setIsFormOpen(false);
    showToast(message);
  }
  function handleDeleteConfirm() {
    deleteProduct(deletingProduct.id);
    showToast(`${deletingProduct.name} حذف شد`);
    setDeletingProduct(null);
  }
  function categoryName(id) {
    return categories.find((category) => category.id === id)?.name || '—';
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1>محصولات</h1>
        <Button icon={<Plus size={18} />} onClick={openAddForm}>
          افزودن محصول
        </Button>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={16} />
          <input
            placeholder="جستجوی محصول..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>نام محصول</th>
                <th>دسته‌بندی</th>
                <th>قیمت</th>
                <th>موجودی</th>
                <th>وضعیت</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      tone={product.tone}
                      className="admin-table__thumb"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{categoryName(product.category)}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{toPersianDigits(product.stock)}</td>
                  <td>
                    <button
                      className={`availability-toggle${product.stock > 0 ? ' availability-toggle--on' : ''}`}
                      onClick={() => toggleProductAvailability(product.id)}
                      aria-label="تغییر وضعیت موجودی"
                      type="button"
                    >
                      <span className="availability-toggle__handle" />
                    </button>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button onClick={() => openEditForm(product)} aria-label="ویرایش" type="button">
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeletingProduct(product)}
                        aria-label="حذف"
                        className="admin-table__danger"
                        type="button"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="admin-table__empty">
                    محصولی یافت نشد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingProduct ? 'ویرایش محصول' : 'افزودن محصول جدید'}
        size="lg"
      >
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        title="حذف محصول"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeletingProduct(null)}>
              انصراف
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              حذف
            </Button>
          </>
        }
      >
        <p>آیا از حذف «{deletingProduct?.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.</p>
      </Modal>
    </div>
  );
}
