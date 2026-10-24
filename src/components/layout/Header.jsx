import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const NAV_LINKS = [
  { to: '/', label: 'خانه' },
  { to: '/shop', label: 'فروشگاه' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { totalItems, openDrawer } = useCart();
  const navigate = useNavigate();

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (!searchValue.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
    setIsSearchOpen(false);
    setSearchValue('');
  }

  return (
    <header className="header">
      <div className="container header__bar">
        {/* Mobile menu toggle — only visible under the tablet breakpoint (see layout.css) */}
        <button
          className="header__icon-btn header__menu-toggle"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="باز کردن منو"
        >
          <Menu size={22} />
        </button>

        <Link to="/" className="header__logo">
          دیبا
        </Link>

        <nav className="header__nav">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `header__nav-link${isActive ? ' header__nav-link--active' : ''}`}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button
            className="header__icon-btn"
            onClick={() => setIsSearchOpen((open) => !open)}
            aria-label="جستجو"
          >
            <Search size={20} />
          </button>
          <button className="header__icon-btn header__cart-btn" onClick={openDrawer} aria-label="سبد خرید">
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="header__cart-count">{totalItems}</span>}
          </button>
        </div>
      </div>

      {/* Expandable search bar */}
      {isSearchOpen && (
        <div className="header__search-panel fade-in">
          <form className="container header__search-form" onSubmit={handleSearchSubmit}>
            <Search size={18} />
            <input
              type="text"
              autoFocus
              placeholder="دنبال چی می‌گردی؟"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="header__search-input"
            />
          </form>
        </div>
      )}

      {/* Mobile nav panel */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-menu__header">
              <span className="header__logo">دیبا</span>
              <button
                className="header__icon-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="بستن منو"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="mobile-menu__nav">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="mobile-menu__link"
                  onClick={() => setIsMobileMenuOpen(false)}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
