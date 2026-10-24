// DEMO DATA — categories shown across the storefront and the admin panel.
//
// This file is the easiest place to start when reusing the template for
// a different kind of store: replace these objects with your own
// categories and everything downstream (filters, admin dropdowns, nav)
// updates automatically because nothing else hardcodes category names.
//
// `tone` picks which placeholder color scheme ProductImage.jsx uses when
// a product has no real photo yet — it has nothing to do with the data
// itself, it's purely a visual seed. Pick from: 'sand', 'sage', 'rose',
// 'ink', 'clay'.

export const categories = [
  {
    id: 'women-clothing',
    name: 'پوشاک زنانه',
    description: 'پیراهن، مانتو و لباس روزمره',
    tone: 'rose',
  },
  {
    id: 'men-clothing',
    name: 'پوشاک مردانه',
    description: 'پیراهن، تی‌شرت و کت‌وشلوار',
    tone: 'ink',
  },
  {
    id: 'accessories',
    name: 'اکسسوری',
    description: 'ساعت، عینک و جواهرات',
    tone: 'sand',
  },
  {
    id: 'bags-shoes',
    name: 'کیف و کفش',
    description: 'کیف دستی، کفش و صندل',
    tone: 'clay',
  },
  {
    id: 'home-decor',
    name: 'خانه و دکوراسیون',
    description: 'اقلام تزئینی برای خانه',
    tone: 'sage',
  },
];

// Small helper used in a few places (breadcrumbs, admin dropdown) so we
// don't repeat the same .find() call everywhere.
export function getCategoryById(id) {
  return categories.find((category) => category.id === id);
}
