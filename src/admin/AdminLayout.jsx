import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, ShoppingCart, LogOut, ArrowRight, Menu } from 'lucide-react';
import AdminLogin from './pages/AdminLogin';

const NAV_ITEMS = [
  { to: '/admin', label: 'داشبورد', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'محصولات', icon: Package },
  { to: '/admin/categories', label: 'دسته‌بندی‌ها', icon: Tag },
  { to: '/admin/orders', label: 'سفارش‌ها', icon: ShoppingCart },
];

export default function AdminLayout() {
  // Plain component state on purpose, matching the "demo data" choice
  // for the rest of the app: refreshing the page logs you out again.
  // Swap in a real session (or even just sessionStorage) once you have
  // a backend worth guarding.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  // Defined once, rendered in two places (static desktop sidebar +
  // mobile overlay) so the nav links don't have to be written twice.
  const navContent = (
    <>
      <Link to="/admin" className="admin__logo" onClick={() => setIsSidebarOpen(false)}>
        دیبا <span>ادمین</span>
      </Link>
      <nav className="admin__nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) => `admin__nav-link${isActive ? ' admin__nav-link--active' : ''}`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="admin__sidebar-footer">
        <Link to="/" className="admin__nav-link">
          <ArrowRight size={18} />
          <span>بازگشت به فروشگاه</span>
        </Link>
        <button className="admin__nav-link admin__logout" onClick={() => setIsAuthenticated(false)}>
          <LogOut size={18} />
          <span>خروج</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="admin">
      <header className="admin__topbar">
        <button
          className="header__icon-btn admin__menu-toggle"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="باز کردن منو"
        >
          <Menu size={22} />
        </button>
        <span className="admin__logo">
          دیبا <span>ادمین</span>
        </span>
      </header>

      <div className="admin__body">
        <aside className="admin__sidebar">{navContent}</aside>

        {isSidebarOpen && (
          <div className="mobile-menu-backdrop" onClick={() => setIsSidebarOpen(false)}>
            <aside className="admin__sidebar admin__sidebar--mobile" onClick={(event) => event.stopPropagation()}>
              {navContent}
            </aside>
          </div>
        )}

        <main className="admin__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
