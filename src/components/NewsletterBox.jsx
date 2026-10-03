import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')

  const onSubmitHandler = (event) => {
    event.preventDefault()
    toast.success('Cảm ơn bạn đã đăng ký! Mã giảm giá 20% sẽ được gửi qua email.')
    setEmail('')
  }

  return (
    <section className='relative overflow-hidden px-6 sm:px-12 py-12 text-center bg-gradient-to-br from-orange-50 via-white to-orange-100 border border-orange-100 rounded-3xl shadow-lg shadow-orange-100/50'>
      {/* Hình trang trí */}
      <div className='pointer-events-none absolute -top-16 -left-16 w-52 h-52 rounded-full bg-orange-200/50 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-pink-200/40 blur-3xl' />

      <div className='relative'>
        <span className='inline-flex items-center justify-center w-14 h-14 mb-4 text-2xl bg-white rounded-full shadow-md shadow-orange-100'>
          🎁
        </span>

        <p className='text-2xl sm:text-3xl font-bold text-gray-900'>
          Đăng ký ngay & nhận ưu đãi{' '}
          <span className='bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'>
            20%
          </span>
        </p>

        <p className='mt-3 text-sm sm:text-base text-gray-500'>
          Đăng ký nhận bản tin để cập nhật bộ sưu tập mới và các chương trình khuyến mãi.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mx-auto mt-8'
        >
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Nhập địa chỉ email của bạn'
            className='w-full px-6 py-3.5 text-sm text-gray-800 bg-white border border-gray-200 rounded-full outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400'
            required
          />

          <button
            type='submit'
            className='w-full sm:w-auto px-9 py-3.5 text-sm font-semibold text-white whitespace-nowrap bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300'
          >
            ĐĂNG KÝ
          </button>
        </form>

        <p className='mt-4 text-xs text-gray-400'>
          Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.
        </p>
      </div>
    </section>
  )
}

export default NewsletterBox