import React from 'react'
import { assets } from '../assets/assets'

const POLICIES = [
  {
    icon: assets.exchange_icon,
    alt: 'Chính sách đổi hàng',
    title: 'Đổi hàng dễ dàng',
    desc: 'Chúng tôi hỗ trợ đổi hàng nhanh chóng, không rườm rà.',
  },
  {
    icon: assets.quality_icon,
    alt: 'Chính sách đổi trả',
    title: 'Đổi trả trong 7 ngày',
    desc: 'Miễn phí đổi trả trong vòng 7 ngày kể từ khi nhận hàng.',
  },
  {
    icon: assets.support_img,
    alt: 'Hỗ trợ khách hàng',
    title: 'Hỗ trợ khách hàng tốt nhất',
    desc: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng 24/7.',
  },
]

const OurPolicy = () => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 py-16'>
      {POLICIES.map((item) => (
        <div
          key={item.title}
          className='group p-8 text-center bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-orange-100/60 hover:-translate-y-1 transition-all duration-300'
        >
          <div className='flex items-center justify-center w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full group-hover:scale-110 transition-transform duration-300'>
            <img src={item.icon} className='w-10' alt={item.alt} />
          </div>
          <p className='text-base font-semibold text-gray-900'>{item.title}</p>
          <p className='mt-2 text-sm leading-relaxed text-gray-500'>{item.desc}</p>
        </div>
      ))}
    </section>
  )
}

export default OurPolicy