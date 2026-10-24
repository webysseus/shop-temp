import { createContext, useContext, useState } from 'react';
import { productService, categoryService, orderService } from '../services/dataService';

// WHY THIS FILE EXISTS ON TOP OF dataService.js: dataService's arrays
// are plain JS, so changing them doesn't make React re-render anything.
// This context calls the service functions and puts their result into
// useState, which DOES trigger re-renders. Practical effect: edit a
// product in the admin panel, and the storefront (same browser tab)
// shows the change immediately, because both read from this same
// context instead of two disconnected copies of the data.

const StoreDataContext = createContext(null);

export function StoreDataProvider({ children }) {
  const [products, setProducts] = useState(() => productService.getAll());
  const [categories, setCategories] = useState(() => categoryService.getAll());
  const [orders, setOrders] = useState(() => orderService.getAll());

  // ---- products ----
  function addProduct(data) {
    setProducts(productService.create(data));
  }
  function editProduct(id, changes) {
    setProducts(productService.update(id, changes));
  }
  function deleteProduct(id) {
    setProducts(productService.remove(id));
  }
  function toggleProductAvailability(id) {
    setProducts(productService.toggleAvailability(id));
  }

  // ---- categories ----
  function addCategory(data) {
    setCategories(categoryService.create(data));
  }
  function editCategory(id, changes) {
    setCategories(categoryService.update(id, changes));
  }
  function deleteCategory(id) {
    setCategories(categoryService.remove(id));
  }

  // ---- orders ----
  /** Places an order and returns it (so Checkout.jsx can show the order
   *  number on the confirmation page). */
  function placeOrder(data) {
    const updatedList = orderService.create(data);
    setOrders(updatedList);
    return updatedList[0]; // create() adds the new order at the front
  }
  function updateOrderStatus(id, status) {
    setOrders(orderService.updateStatus(id, status));
  }

  const value = {
    products,
    categories,
    orders,
    addProduct,
    editProduct,
    deleteProduct,
    toggleProductAvailability,
    addCategory,
    editCategory,
    deleteCategory,
    placeOrder,
    updateOrderStatus,
    orderStatuses: orderService.statuses,
  };

  return <StoreDataContext.Provider value={value}>{children}</StoreDataContext.Provider>;
}

/** Access shared product/category/order data: const { products } = useStoreData(); */
export function useStoreData() {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error('useStoreData must be used inside a <StoreDataProvider>');
  }
  return context;
}
