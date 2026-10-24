// DEMO DATA — orders, shown in the admin panel's "سفارش‌ها" section.
//
// In the real-backend version of this template, orders would be created
// by the checkout flow and stored server-side. Here (demo-data mode)
// checkout adds a new order to this same in-memory list via
// dataService.js, so the admin panel reflects orders placed during the
// current browser session too — it just resets on page refresh.

export const orderStatuses = [
  { id: 'pending', label: 'در انتظار تایید' },
  { id: 'processing', label: 'در حال آماده‌سازی' },
  { id: 'shipped', label: 'ارسال شده' },
  { id: 'delivered', label: 'تحویل داده شده' },
  { id: 'cancelled', label: 'لغو شده' },
];

export const orders = [
  {
    id: 'ORD-10231',
    customerName: 'سارا محمدی',
    customerPhone: '0912XXXXXXX',
    address: 'تهران، خیابان ولیعصر',
    items: [
      { productId: 'p001', name: 'پیراهن کتان بلند', price: 1850000, quantity: 1 },
      { productId: 'p009', name: 'ساعت مچی کلاسیک', price: 3450000, quantity: 1 },
    ],
    total: 5300000,
    status: 'delivered',
    createdAt: '2026-08-14T10:32:00',
  },
  {
    id: 'ORD-10232',
    customerName: 'امیر حسینی',
    customerPhone: '0935XXXXXXX',
    address: 'اصفهان، خیابان چهارباغ',
    items: [{ productId: 'p006', name: 'کت‌وشلوار کلاسیک', price: 5200000, quantity: 1 }],
    total: 5200000,
    status: 'shipped',
    createdAt: '2026-08-20T14:05:00',
  },
  {
    id: 'ORD-10233',
    customerName: 'نگار کریمی',
    customerPhone: '0919XXXXXXX',
    address: 'شیراز، خیابان زند',
    items: [
      { productId: 'p017', name: 'شمع معطر دست‌ساز', price: 320000, quantity: 2 },
      { productId: 'p018', name: 'گلدان سرامیکی', price: 480000, quantity: 1 },
    ],
    total: 1120000,
    status: 'processing',
    createdAt: '2026-08-29T09:18:00',
  },
  {
    id: 'ORD-10234',
    customerName: 'رضا صادقی',
    customerPhone: '0902XXXXXXX',
    address: 'مشهد، بلوار وکیل‌آباد',
    items: [{ productId: 'p013', name: 'کیف دستی چرم', price: 2450000, quantity: 1 }],
    total: 2450000,
    status: 'pending',
    createdAt: '2026-09-03T18:42:00',
  },
  {
    id: 'ORD-10235',
    customerName: 'مریم اکبری',
    customerPhone: '0938XXXXXXX',
    address: 'تبریز، خیابان امام',
    items: [
      { productId: 'p002', name: 'مانتو لینن ساده', price: 2450000, quantity: 1 },
      { productId: 'p011', name: 'گردنبند طلایی ظریف', price: 1650000, quantity: 1 },
    ],
    total: 4100000,
    status: 'pending',
    createdAt: '2026-09-06T11:27:00',
  },
  {
    id: 'ORD-10236',
    customerName: 'کیانوش رستمی',
    customerPhone: '0917XXXXXXX',
    address: 'تهران، خیابان شریعتی',
    items: [{ productId: 'p016', name: 'کوله‌پشتی مینیمال', price: 1340000, quantity: 1 }],
    total: 1340000,
    status: 'cancelled',
    createdAt: '2026-09-01T08:55:00',
  },
];
