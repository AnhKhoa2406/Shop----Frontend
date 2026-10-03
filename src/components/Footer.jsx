import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const COMPANY_LINKS = [
  { to: '/', label: 'Trang chủ' },
  { to: '/about', label: 'Về chúng tôi' },
  { to: '/collection', label: 'Bộ sưu tập' },
  { to: '/orders', label: 'Đơn hàng của tôi' },
  { to: '/contact', label: 'Chính sách bảo mật' },
]

const SOCIALS = [
  { label: 'Facebook', icon: 'f' },
  { label: 'Instagram', icon: '◎' },
  { label: 'TikTok', icon: '♪' },
  { label: 'YouTube', icon: '▶' },
]

const Footer = () => {
  const onSubscribe = (e) => {
    e.preventDefault()
    toast.success('Cảm ơn bạn đã đăng ký nhận tin!')
    e.target.reset()
  }

  return (
    <footer className='mt-32 text-sm'>
      {/* Khối đăng ký nhận tin */}
      <div className='relative overflow-hidden px-6 sm:px-12 py-10 text-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-xl shadow-orange-200'>
        <div className='pointer-events-none absolute -top-16 -left-16 w-52 h-52 rounded-full bg-white/10' />
        <div className='pointer-events-none absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-white/10' />

        <div className='relative'>
          <h3 className='text-xl sm:text-2xl font-bold text-white'>
            Nhận ưu đãi 20% cho đơn hàng đầu tiên
          </h3>
          <p className='mt-2 text-sm text-orange-50'>
            Đăng ký email để cập nhật bộ sưu tập mới và các chương trình khuyến mãi.
          </p>

          <form
            onSubmit={onSubscribe}
            className='flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto mt-6'
          >
            <input
              type='email'
              required
              placeholder='Nhập địa chỉ email của bạn'
              className='w-full px-5 py-3 text-sm text-gray-800 bg-white rounded-full outline-none focus:ring-4 focus:ring-orange-300/60 placeholder:text-gray-400'
            />
            <button
              type='submit'
              className='w-full sm:w-auto px-8 py-3 text-sm font-semibold text-orange-600 bg-white rounded-full whitespace-nowrap hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all'
            >
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>

      {/* Nội dung footer */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1.2fr] gap-12 mt-14 mb-10'>
        {/* Logo + mô tả */}
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt='Forever logo' />

          <p className='w-full md:w-2/3 leading-relaxed text-gray-500'>
            Forever mang đến những thiết kế thời trang hiện đại, chất liệu thoải mái và mức giá
            hợp lý. Chúng tôi tin rằng phong cách của bạn xứng đáng được thể hiện mỗi ngày.
          </p>

          <div className='flex items-center gap-3 mt-6'>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href='#'
                title={s.label}
                aria-label={s.label}
                className='flex items-center justify-center w-10 h-10 text-sm font-semibold text-gray-600 bg-gray-100 rounded-full hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-200 transition-all duration-300'
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* CÔNG TY */}
        <div>
          <p className='mb-5 text-base font-semibold tracking-wide text-gray-900'>CÔNG TY</p>
          <ul className='flex flex-col gap-3 text-gray-500'>
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className='inline-block hover:text-orange-600 hover:translate-x-1 transition-all duration-200'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LIÊN HỆ */}
        <div>
          <p className='mb-5 text-base font-semibold tracking-wide text-gray-900'>LIÊN HỆ</p>
          <ul className='flex flex-col gap-4 text-gray-500'>
            <li className='flex items-center gap-3'>
              <span className='flex items-center justify-center w-9 h-9 text-base bg-orange-50 rounded-full'>
                📞
              </span>
              <a href='tel:+84123456789' className='hover:text-orange-600 transition-colors'>
                +84 123 456 789
              </a>
            </li>
            <li className='flex items-center gap-3'>
              <span className='flex items-center justify-center w-9 h-9 text-base bg-orange-50 rounded-full'>
                ✉️
              </span>
              <a
                href='mailto:contact@foreveryou.com'
                className='hover:text-orange-600 transition-colors'
              >
                contact@foreveryou.com
              </a>
            </li>
            <li className='flex items-center gap-3'>
              <span className='flex items-center justify-center w-9 h-9 text-base bg-orange-50 rounded-full'>
                📍
              </span>
              <span>TP. Hồ Chí Minh, Việt Nam</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bản quyền */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-6 text-xs text-gray-400 border-t border-gray-200'>
        <p>© 2026 forever.com - Bảo lưu mọi quyền.</p>
        <p>Thiết kế với ❤️ tại Việt Nam</p>
      </div>
    </footer>
  )
}

export default Footer