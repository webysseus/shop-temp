// DATA SERVICE
// ============
// Every component talks to product/category/order data through the
// three objects exported from this file — never by importing
// src/data/*.js directly. That one rule is what makes this template
// easy to reuse:
//
//   Right now: these functions read/write a plain array in memory
//   (seeded from src/data/*.js), so changes last for the browser
//   session and reset on refresh. That's what "demo data" means.
//
//   Later, with a real backend: you'd rewrite the INSIDE of these
//   functions to call `fetch('/api/products')` etc. and make them
//   async. Every component that already calls `productService.getAll()`
//   keeps working — you'd just add `await` at the call sites, guided by
//   your editor. Nothing about the components themselves needs to
//   change shape.

import { products as seedProducts } from '../data/products';
import { categories as seedCategories } from '../data/categories';
import { orders as seedOrders, orderStatuses } from '../data/orders';

// These three arrays play the role of "the database" for now.
// They're intentionally module-level (not React state) — StoreDataContext
// is what wraps them in React state so the UI re-renders on change.
let _products = [...seedProducts];
let _categories = [...seedCategories];
let _orders = [...seedOrders];

/** Generates a short, collision-safe id like "p1a2b3c4". Good enough for
 *  demo data; a real backend would assign ids itself. */
function generateId(prefix) {
  return `${prefix}${Date.now().toString(36)}${Math.floor(Math.random() * 100)}`;
}

// ---------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------
export const productService = {
  getAll() {
    return _products;
  },
  getById(id) {
    return _products.find((product) => product.id === id) || null;
  },
  create(data) {
    const newProduct = {
      rating: 0,
      reviewCount: 0,
      isNew: true,
      isFeatured: false,
      oldPrice: null,
      options: {},
      ...data,
      id: generateId('p'),
    };
    _products = [newProduct, ..._products];
    return _products;
  },
  update(id, changes) {
    _products = _products.map((product) => (product.id === id ? { ...product, ...changes } : product));
    return _products;
  },
  remove(id) {
    _products = _products.filter((product) => product.id !== id);
    return _products;
  },
  /** Quick on/off switch for the admin panel. Turning a product "off"
   *  sets stock to 0 (so it shows as unavailable on the storefront);
   *  turning it back "on" gives it a starter stock of 10 — adjust the
   *  exact number afterwards from the edit form if needed. */
  toggleAvailability(id) {
    _products = _products.map((product) =>
      product.id === id ? { ...product, stock: product.stock > 0 ? 0 : 10 } : product
    );
    return _products;
  },
};

// ---------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------
export const categoryService = {
  getAll() {
    return _categories;
  },
  getById(id) {
    return _categories.find((category) => category.id === id) || null;
  },
  create(data) {
    const newCategory = { tone: 'sand', ...data, id: generateId('cat') };
    _categories = [..._categories, newCategory];
    return _categories;
  },
  update(id, changes) {
    _categories = _categories.map((category) => (category.id === id ? { ...category, ...changes } : category));
    return _categories;
  },
  remove(id) {
    _categories = _categories.filter((category) => category.id !== id);
    return _categories;
  },
};

// ---------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------
export const orderService = {
  statuses: orderStatuses,
  getAll() {
    return _orders;
  },
  getById(id) {
    return _orders.find((order) => order.id === id) || null;
  },
  /** Used by the checkout flow to place a new order. */
  create(data) {
    const newOrder = {
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...data,
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    _orders = [newOrder, ..._orders];
    return _orders;
  },
  updateStatus(id, status) {
    _orders = _orders.map((order) => (order.id === id ? { ...order, status } : order));
    return _orders;
  },
};
