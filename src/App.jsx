import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { StoreDataProvider } from './context/StoreDataContext';
import { ToastProvider } from './components/ui/Toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import NotFound from './pages/NotFound';

import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import ProductsManager from './admin/pages/ProductsManager';
import CategoriesManager from './admin/pages/CategoriesManager';
import OrdersManager from './admin/pages/OrdersManager';

/** Every storefront page shares this chrome (header, footer, cart
 *  drawer). It's a "layout route" — <Outlet/> is where the matched
 *  child page renders. The admin section below uses its own layout
 *  (AdminLayout) instead of this one. */
function StorefrontLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <StoreDataProvider>
      <CartProvider>
        <ToastProvider>
          <Routes>
            <Route element={<StorefrontLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:orderId" element={<OrderSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductsManager />} />
              <Route path="categories" element={<CategoriesManager />} />
              <Route path="orders" element={<OrdersManager />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
          </Routes>
        </ToastProvider>
      </CartProvider>
    </StoreDataProvider>
  );
}
