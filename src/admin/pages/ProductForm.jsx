import { useState } from 'react';
import { useStoreData } from '../../context/StoreDataContext';
import { TextField, TextAreaField, SelectField } from '../../components/ui/FormField';
import Button from '../../components/ui/Button';

const TONE_OPTIONS = [
  { value: 'sand', label: 'شنی' },
  { value: 'sage', label: 'سبز کمرنگ' },
  { value: 'rose', label: 'صورتی کمرنگ' },
  { value: 'ink', label: 'تیره' },
  { value: 'clay', label: 'قهوه‌ای' },
];

export default function ProductForm({ product, categories, onSuccess, onCancel }) {
  const { addProduct, editProduct } = useStoreData();
  const isEditing = Boolean(product);

  // Text inputs stay as strings in state (that's what <input> gives you)
  // and get converted to numbers/arrays only at submit time — trying to
  // keep them "typed" while the user is still typing causes more bugs
  // than it prevents.
  const [values, setValues] = useState({
    name: product?.name || '',
    category: product?.category || categories[0]?.id || '',
    price: product?.price ?? '',
    oldPrice: product?.oldPrice ?? '',
    stock: product?.stock ?? '',
    sku: product?.sku || '',
    description: product?.description || '',
    details: product?.details?.join('\n') || '',
    sizes: product?.options?.size?.join('، ') || '',
    tone: product?.tone || 'sand',
    isNew: product?.isNew ?? false,
    isFeatured: product?.isFeatured ?? false,
  });
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = 'نام محصول را وارد کنید';
    if (!values.price || Number(values.price) <= 0) next.price = 'قیمت معتبر وارد کنید';
    if (values.stock === '' || Number(values.stock) < 0) next.stock = 'موجودی را وارد کنید';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    // "S, M, L" or "S، M، L" (Persian comma) both work as separators.
    const sizesArray = values.sizes
      .split(/[,،]/)
      .map((size) => size.trim())
      .filter(Boolean);
    // One line = one bullet point on the product page.
    const detailsArray = values.details
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      name: values.name.trim(),
      category: values.category,
      price: Number(values.price),
      oldPrice: values.oldPrice ? Number(values.oldPrice) : null,
      stock: Number(values.stock),
      sku: values.sku.trim(),
      description: values.description.trim(),
      details: detailsArray,
      options: sizesArray.length > 0 ? { size: sizesArray } : {},
      tone: values.tone,
      isNew: values.isNew,
      isFeatured: values.isFeatured,
    };

    if (isEditing) {
      editProduct(product.id, payload);
      onSuccess('محصول ویرایش شد');
    } else {
      addProduct(payload);
      onSuccess('محصول جدید اضافه شد');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid-2">
        <TextField
          id="name"
          label="نام محصول"
          required
          value={values.name}
          onChange={(event) => set('name', event.target.value)}
          error={errors.name}
        />
        <SelectField
          id="category"
          label="دسته‌بندی"
          value={values.category}
          onChange={(event) => set('category', event.target.value)}
          options={categories.map((category) => ({ value: category.id, label: category.name }))}
        />
      </div>

      <div className="form-grid-2">
        <TextField
          id="price"
          label="قیمت (تومان)"
          type="number"
          required
          value={values.price}
          onChange={(event) => set('price', event.target.value)}
          error={errors.price}
        />
        <TextField
          id="oldPrice"
          label="قیمت قبل از تخفیف (اختیاری)"
          type="number"
          value={values.oldPrice}
          onChange={(event) => set('oldPrice', event.target.value)}
        />
      </div>

      <div className="form-grid-2">
        <TextField
          id="stock"
          label="موجودی"
          type="number"
          required
          value={values.stock}
          onChange={(event) => set('stock', event.target.value)}
          error={errors.stock}
        />
        <TextField id="sku" label="کد کالا (SKU)" value={values.sku} onChange={(event) => set('sku', event.target.value)} />
      </div>

      <TextAreaField
        id="description"
        label="توضیحات"
        value={values.description}
        onChange={(event) => set('description', event.target.value)}
        rows={3}
      />
      <TextAreaField
        id="details"
        label="ویژگی‌ها (هر مورد در یک خط)"
        value={values.details}
        onChange={(event) => set('details', event.target.value)}
        rows={3}
      />
      <TextField
        id="sizes"
        label="سایزها (با کاما جدا کنید، اختیاری)"
        value={values.sizes}
        onChange={(event) => set('sizes', event.target.value)}
        placeholder="S، M، L، XL"
      />
      <SelectField
        id="tone"
        label="رنگ زمینه تصویر نمونه"
        value={values.tone}
        onChange={(event) => set('tone', event.target.value)}
        options={TONE_OPTIONS}
      />

      <div className="form-checkboxes">
        <label className="checkbox-label">
          <input type="checkbox" checked={values.isNew} onChange={(event) => set('isNew', event.target.checked)} />
          <span>نشان «جدید»</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={values.isFeatured}
            onChange={(event) => set('isFeatured', event.target.checked)}
          />
          <span>نمایش در پیشنهاد ویژه</span>
        </label>
      </div>

      <div className="form-actions">
        <Button type="button" variant="ghost" onClick={onCancel}>
          انصراف
        </Button>
        <Button type="submit">{isEditing ? 'ذخیره تغییرات' : 'افزودن محصول'}</Button>
      </div>
    </form>
  );
}
