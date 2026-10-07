import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NAV_LINKS = [
  { to: '/', label: 'TRANG CHỦ' },
  { to: '/collection', label: 'SẢN PHẨM' },
  { to: '/about', label: 'GIỚI THIỆU' },
  { to: '/contact', label: 'LIÊN HỆ' },
];

const iconBtnClass = 'relative rounded-full p-2.5 text-gray-500 transition-all duration-200 hover:bg-orange-50 hover:text-orange-600 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300';
const badgeClass = 'absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-1 text-[10px] font-semibold text-white shadow-sm';

const HeartIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.5s-7.2-4.5-9.9-8.8C.5 8.4 1.5 4.6 4.9 3.3c2.7-1 5.3.1 7.1 2.4 1.8-2.3 4.4-3.4 7.1-2.4 3.4 1.3 4.4 5.1 2.8 8.4C19.2 16 12 20.5 12 20.5Z" />
  </svg>
);

const CompareIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 16 19 8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 16 5 8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, setCartItems, navigate, wishlist } = useContext(ShopContext);
  const cartCount = getCartCount();
  const wishCount = wishlist.length;

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-3 z-40 my-3 flex items-center justify-between rounded-2xl border border-gray-100 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/70 sm:px-6">
        <Link to="/" className="shrink-0">
          <img src={assets.logo} className="w-28 sm:w-36" alt="Forever logo" />
        </Link>

        <ul className="hidden items-center gap-1 text-sm font-medium sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `relative rounded-full px-4 py-2 transition-colors duration-200 ${isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50 hover:text-orange-600'}`}>
              {link.label}
            </NavLink>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <button type="button" onClick={() => { setShowSearch(true); navigate('/collection'); }} className={iconBtnClass} title="Tìm kiếm sản phẩm">
            <img src={assets.search_icon} className="w-5" alt="Tìm kiếm" />
          </button>

          <Link to="/compare" className={`hidden sm:flex ${iconBtnClass}`} title="So sánh sản phẩm">
            <CompareIcon />
          </Link>

          <Link to="/wishlist" className={iconBtnClass} title="Sản phẩm yêu thích">
            <HeartIcon />
            {wishCount > 0 && <span className={badgeClass}>{wishCount}</span>}
          </Link>

          <div className="group relative">
            <button type="button" onClick={() => { if (!token) navigate('/login'); }} className={iconBtnClass} title="Tài khoản">
              <img src={assets.profile_icon} className="w-5" alt="Tài khoản" />
            </button>

            {token && (
              <div className="invisible absolute right-0 z-50 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex w-44 flex-col rounded-2xl border border-gray-100 bg-white p-2 text-sm text-gray-600 shadow-xl">
                  <p onClick={() => navigate('/profile')} className="cursor-pointer rounded-xl px-3 py-2 transition-colors hover:bg-orange-50 hover:text-orange-600">Tài khoản</p>
                  <p onClick={() => navigate('/orders')} className="cursor-pointer rounded-xl px-3 py-2 transition-colors hover:bg-orange-50 hover:text-orange-600">Đơn hàng</p>
                  <hr className="my-1 border-gray-100" />
                  <p onClick={logout} className="cursor-pointer rounded-xl px-3 py-2 text-red-500 transition-colors hover:bg-red-50">Đăng xuất</p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className={iconBtnClass} title="Giỏ hàng">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Giỏ hàng" />
            {cartCount > 0 && <span className={badgeClass}>{cartCount}</span>}
          </Link>

          <button type="button" onClick={() => setVisible(true)} className={`sm:hidden ${iconBtnClass}`} title="Mở menu">
            <img src={assets.menu_icon} className="w-5" alt="Menu" />
          </button>
        </div>
      </header>

      <div onClick={() => setVisible(false)} className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 sm:hidden ${visible ? 'visible opacity-100' : 'invisible opacity-0'}`} />

      <aside className={`fixed bottom-0 right-0 top-0 z-50 w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out sm:hidden ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <img src={assets.logo} className="w-28" alt="Forever logo" />
          <button type="button" onClick={() => setVisible(false)} className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-orange-50 hover:text-orange-600" title="Đóng menu">✕</button>
        </div>

        <nav className="flex flex-col p-3 text-gray-600">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setVisible(false)} className={({ isActive }) => `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium tracking-wide transition-all ${isActive ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50 hover:pl-6'}`}>
              <span>{link.label}</span>
              <span>→</span>
            </NavLink>
          ))}

          <hr className="my-2 border-gray-100" />

          <NavLink to="/wishlist" onClick={() => setVisible(false)} className={({ isActive }) => `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium tracking-wide transition-all ${isActive ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50 hover:pl-6'}`}>
            <span className="flex items-center gap-2">
              <HeartIcon className="h-4 w-4" />
              YÊU THÍCH
              {wishCount > 0 && <span className="rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">{wishCount}</span>}
            </span>
            <span>→</span>
          </NavLink>

          <NavLink to="/compare" onClick={() => setVisible(false)} className={({ isActive }) => `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium tracking-wide transition-all ${isActive ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50 hover:pl-6'}`}>
            <span className="flex items-center gap-2"><CompareIcon className="h-4 w-4" /> SO SÁNH</span>
            <span>→</span>
          </NavLink>
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-gray-100 p-5">
          {token ? (
            <button type="button" onClick={() => { setVisible(false); logout(); }} className="w-full rounded-xl bg-red-50 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-100">Đăng xuất</button>
          ) : (
            <Link to="/login" onClick={() => setVisible(false)} className="block w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-orange-200">Đăng nhập</Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
