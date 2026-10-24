import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';
import { useToast } from '../../components/ui/Toast';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { TextField, SelectField } from '../../components/ui/FormField';
import { toPersianDigits } from '../../utils/format';

const TONE_OPTIONS = [
  { value: 'sand', label: 'شنی' },
  { value: 'sage', label: 'سبز کمرنگ' },
  { value: 'rose', label: 'صورتی کمرنگ' },
  { value: 'ink', label: 'تیره' },
  { value: 'clay', label: 'قهوه‌ای' },
];

const EMPTY_FORM = { name: '', description: '', tone: 'sand' };

// The category form is small enough (3 fields) that it lives directly in
// this file instead of a separate CategoryForm.jsx — compare to
// ProductForm.jsx, which is its own file because it's genuinely bigger.

export default function CategoriesManager() {
  const { categories, products, addCategory, editCategory, deleteCategory } = useStoreData();
  const { showToast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState(EMPTY_FORM);
  const [deletingCategory, setDeletingCategory] = useState(null);

  function openAddForm() {
    setEditingCategory(null);
    setFormValues(EMPTY_FORM);
    setIsFormOpen(true);
  }
  function openEditForm(category) {
    setEditingCategory(category);
    setFormValues({ name: category.name, description: category.description, tone: category.tone });
    setIsFormOpen(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formValues.name.trim()) return;

    if (editingCategory) {
      editCategory(editingCategory.id, formValues);
      showToast('دسته‌بندی ویرایش شد');
    } else {
      addCategory(formValues);
      showToast('دسته‌بندی جدید اضافه شد');
    }
    setIsFormOpen(false);
  }

  function handleDeleteConfirm() {
    deleteCategory(deletingCategory.id);
    showToast(`${deletingCategory.name} حذف شد`);
    setDeletingCategory(null);
  }

  function productCountFor(categoryId) {
    return products.filter((product) => product.category === categoryId).length;
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1>دسته‌بندی‌ها</h1>
        <Button icon={<Plus size={18} />} onClick={openAddForm}>
          افزودن دسته‌بندی
        </Button>
      </div>

      <div className="category-manager-grid">
        {categories.map((category) => (
          <div className="admin-card category-manager-card" key={category.id}>
            <div className={`category-manager-card__swatch product-image--${category.tone}`} />
            <div className="category-manager-card__body">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span>{toPersianDigits(productCountFor(category.id))} محصول</span>
            </div>
            <div className="admin-table__actions">
              <button onClick={() => openEditForm(category)} aria-label="ویرایش" type="button">
                <Pencil size={16} />
              </button>
              <button
                onClick={() => setDeletingCategory(category)}
                aria-label="حذف"
                className="admin-table__danger"
                type="button"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingCategory ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی'}
        size="sm"
      >
        <form onSubmit={handleSubmit}>
          <TextField
            id="cat-name"
            label="نام دسته‌بندی"
            required
            value={formValues.name}
            onChange={(event) => setFormValues((current) => ({ ...current, name: event.target.value }))}
          />
          <TextField
            id="cat-desc"
            label="توضیح کوتاه"
            value={formValues.description}
            onChange={(event) => setFormValues((current) => ({ ...current, description: event.target.value }))}
          />
          <SelectField
            id="cat-tone"
            label="رنگ زمینه"
            value={formValues.tone}
            onChange={(event) => setFormValues((current) => ({ ...current, tone: event.target.value }))}
            options={TONE_OPTIONS}
          />
          <div className="form-actions">
            <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>
              انصراف
            </Button>
            <Button type="submit">{editingCategory ? 'ذخیره تغییرات' : 'افزودن'}</Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        title="حذف دسته‌بندی"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeletingCategory(null)}>
              انصراف
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              حذف
            </Button>
          </>
        }
      >
        <p>
          آیا از حذف «{deletingCategory?.name}» مطمئن هستید؟
          {deletingCategory && productCountFor(deletingCategory.id) > 0 && (
            <> این دسته‌بندی شامل {toPersianDigits(productCountFor(deletingCategory.id))} محصول است.</>
          )}
        </p>
      </Modal>
    </div>
  );
}
