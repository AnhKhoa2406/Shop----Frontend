import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const NAV_LINKS = [
  { to: '/', label: 'TRANG CHỦ' },
  { to: '/collection', label: 'SẢN PHẨM' },
  { to: '/about', label: 'GIỚI THIỆU' },
  { to: '/contact', label: 'LIÊN HỆ' },
]

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
    navigate,
  } = useContext(ShopContext)

  const cartCount = getCartCount()

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-3 z-40 my-3 flex items-center justify-between px-4 sm:px-6 py-3 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm">
        
        {/* LOGO */}
        <Link to="/" className="shrink-0">
          <img
            src={assets.logo}
            className="w-28 sm:w-36"
            alt="Forever logo"
          />
        </Link>

        {/* ================= MENU DESKTOP ================= */}
        <ul className="hidden sm:flex items-center gap-1 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-full transition-colors ${
                  isActive
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </ul>

        {/* ================= ICONS ================= */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* TÌM KIẾM */}
          <button
            onClick={() => {
              setShowSearch(true)
              navigate('/collection')
            }}
            className="p-2.5 rounded-full hover:bg-orange-50 active:scale-90 transition"
            title="Tìm kiếm sản phẩm"
          >
            <img
              src={assets.search_icon}
              className="w-5"
              alt="Tìm kiếm"
            />
          </button>

          {/* TÀI KHOẢN */}
          <div className="group relative">
            <button
              onClick={() => !token && navigate('/login')}
              className="p-2.5 rounded-full hover:bg-orange-50 active:scale-90 transition"
              title="Tài khoản"
            >
              <img
                src={assets.profile_icon}
                className="w-5"
                alt="Tài khoản"
              />
            </button>

            {/* DROPDOWN TÀI KHOẢN */}
            {token && (
              <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute right-0 pt-3 z-50">
                <div className="flex flex-col w-44 p-2 bg-white border border-gray-100 rounded-2xl shadow-xl text-sm text-gray-600">

                  <p
                    onClick={() => navigate('/profile')}
                    className="px-3 py-2 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    Tài khoản
                  </p>

                  <p
                    onClick={() => navigate('/orders')}
                    className="px-3 py-2 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    Đơn hàng
                  </p>

                  <hr className="my-1 border-gray-100" />

                  <p
                    onClick={logout}
                    className="px-3 py-2 rounded-xl cursor-pointer text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Đăng xuất
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* GIỎ HÀNG */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full hover:bg-orange-50 active:scale-90 transition"
            title="Giỏ hàng"
          >
            <img
              src={assets.cart_icon}
              className="w-5 min-w-5"
              alt="Giỏ hàng"
            />

            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow">
                {cartCount}
              </span>
            )}
          </Link>

          {/* MENU MOBILE */}
          <button
            onClick={() => setVisible(true)}
            className="sm:hidden p-2.5 rounded-full hover:bg-orange-50 active:scale-90 transition"
            title="Mở menu"
          >
            <img
              src={assets.menu_icon}
              className="w-5"
              alt="Menu"
            />
          </button>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={() => setVisible(false)}
        className={`sm:hidden fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          visible
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
      />

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`sm:hidden fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
          visible
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >

        {/* HEADER SIDEBAR */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <img
            src={assets.logo}
            className="w-28"
            alt="Forever logo"
          />

          <button
            onClick={() => setVisible(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition"
            title="Đóng menu"
          >
            ✕
          </button>
        </div>

        {/* MENU */}
        <nav className="flex flex-col p-3 text-gray-600">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
                  isActive
                    ? 'bg-orange-50 text-orange-600'
                    : 'hover:bg-gray-50 hover:pl-6'
                }`
              }
            >
              <span>{link.label}</span>
              <span>→</span>
            </NavLink>
          ))}
        </nav>

        {/* FOOTER SIDEBAR */}
        <div className="absolute bottom-0 inset-x-0 p-5 border-t border-gray-100">

          {token ? (
            <button
              onClick={() => {
                setVisible(false)
                logout()
              }}
              className="w-full py-3 text-sm font-semibold text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition"
            >
              Đăng xuất
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setVisible(false)}
              className="block w-full py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-200"
            >
              Đăng nhập
            </Link>
          )}

        </div>
      </aside>
    </>
  )
}

export default Navbar