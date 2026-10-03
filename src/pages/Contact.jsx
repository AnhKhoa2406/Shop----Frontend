import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const CONTACTS = [
  {
    icon: '📍',
    title: 'Cửa hàng của chúng tôi',
    lines: ['54709 Willms Station', 'Suite 350, Washington, USA'],
  },
  {
    icon: '📞',
    title: 'Điện thoại',
    lines: ['(415) 555-0132'],
    href: 'tel:+14155550132',
  },
  {
    icon: '✉️',
    title: 'Email',
    lines: ['admin@forever.com'],
    href: 'mailto:admin@forever.com',
  },
  {
    icon: '🕘',
    title: 'Giờ làm việc',
    lines: ['Thứ 2 - Thứ 7: 8:00 - 21:00', 'Chủ nhật: 9:00 - 18:00'],
  },
]

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'LIÊN HỆ'} text2={'VỚI CHÚNG TÔI'} />
      </div>

      <div className='my-12 flex flex-col md:flex-row justify-center gap-10 md:gap-14 mb-24 items-center'>
        {/* Ảnh */}
        <div className='relative w-full md:max-w-[480px]'>
          <div className='absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-orange-300' />
          <img
            className='relative w-full rounded-3xl shadow-xl object-cover'
            src={assets.contact_img}
            alt='Liên hệ với chúng tôi'
          />
        </div>

        {/* Thông tin */}
        <div className='flex flex-col gap-4 w-full md:w-2/4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {CONTACTS.map((item) => {
              const Wrapper = item.href ? 'a' : 'div'
              return (
                <Wrapper
                  key={item.title}
                  {...(item.href ? { href: item.href } : {})}
                  className='group flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-orange-100/60 hover:-translate-y-0.5 transition-all duration-300'
                >
                  <span className='flex items-center justify-center w-11 h-11 shrink-0 text-lg bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl group-hover:scale-110 transition-transform duration-300'>
                    {item.icon}
                  </span>
                  <div className='text-sm'>
                    <p className='font-semibold text-gray-900'>{item.title}</p>
                    {item.lines.map((line) => (
                      <p key={line} className='mt-1 text-gray-500 leading-relaxed'>
                        {line}
                      </p>
                    ))}
                  </div>
                </Wrapper>
              )
            })}
          </div>

          {/* Tuyển dụng */}
          <div className='p-6 bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl'>
            <p className='text-lg font-semibold text-orange-600'>Cơ hội nghề nghiệp tại Forever</p>
            <p className='mt-2 text-sm text-gray-500'>
              Tìm hiểu thêm về các đội nhóm và vị trí đang tuyển dụng của chúng tôi.
            </p>
            <button className='group inline-flex items-center gap-3 mt-5 px-7 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300'>
              XEM VIỆC LÀM
              <span className='transition-transform duration-300 group-hover:translate-x-1'>→</span>
            </button>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact