import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const REASONS = [
  {
    icon: '✅',
    title: 'Đảm bảo chất lượng',
    desc: 'Chúng tôi chọn lọc và kiểm tra kỹ từng sản phẩm để đảm bảo đạt tiêu chuẩn chất lượng nghiêm ngặt.',
  },
  {
    icon: '⚡',
    title: 'Tiện lợi',
    desc: 'Giao diện thân thiện cùng quy trình đặt hàng đơn giản giúp việc mua sắm chưa bao giờ dễ dàng đến vậy.',
  },
  {
    icon: '🛍️',
    title: 'Đa dạng sản phẩm',
    desc: 'Nhiều mẫu mã phong phú để bạn tìm được đúng thứ mình cần, tất cả trong cùng một nơi.',
  },
  {
    icon: '💬',
    title: 'Dịch vụ khách hàng xuất sắc',
    desc: 'Đội ngũ tận tâm luôn đồng hành cùng bạn ở mọi bước, sự hài lòng của bạn là ưu tiên hàng đầu.',
  },
]

const STATS = [
  { value: '10K+', label: 'Khách hàng' },
  { value: '500+', label: 'Mẫu thiết kế' },
  { value: '4.9★', label: 'Đánh giá' },
]

const About = () => {
  return (
    <div className='pt-8 border-t'>
      <div className='text-2xl text-center'>
        <Title text1={'VỀ'} text2={'CHÚNG TÔI'} />
      </div>

      {/* Giới thiệu */}
      <div className='my-12 flex flex-col md:flex-row gap-10 md:gap-16 items-center'>
        <div className='relative w-full md:max-w-[450px]'>
          <div className='absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-orange-300' />
          <img
            className='relative w-full rounded-3xl shadow-xl object-cover'
            src={assets.about_img}
            alt='Về chúng tôi'
          />
        </div>

        <div className='flex flex-col justify-center gap-5 md:w-2/4 text-gray-600 leading-relaxed'>
          <p>
            Forever ra đời từ niềm đam mê đổi mới và mong muốn thay đổi cách mọi người mua sắm
            trực tuyến. Hành trình của chúng tôi bắt đầu từ một ý tưởng đơn giản: tạo ra nơi
            khách hàng có thể dễ dàng khám phá, lựa chọn và mua sắm đa dạng sản phẩm ngay tại nhà.
          </p>
          <p>
            Từ những ngày đầu, chúng tôi không ngừng chọn lọc các sản phẩm chất lượng cao, phù hợp
            với mọi sở thích và phong cách. Từ thời trang, lối sống đến công nghệ, chúng tôi nỗ lực
            mang đến trải nghiệm mua sắm liền mạch, dịch vụ đáng tin cậy và sự hài lòng của khách hàng.
          </p>

          <div className='p-5 bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl'>
            <b className='text-lg text-orange-600'>Sứ mệnh của chúng tôi</b>
            <p className='mt-2'>
              Sứ mệnh của Forever là mang đến cho khách hàng sự lựa chọn, sự tiện lợi và niềm tin.
              Chúng tôi tận tâm tạo nên trải nghiệm mua sắm vượt mong đợi, từ lúc xem hàng, đặt
              hàng cho đến khi giao hàng và hơn thế nữa.
            </p>
          </div>

          <div className='flex items-center gap-6 sm:gap-10 pt-2'>
            {STATS.map((s, i) => (
              <div key={s.label} className='flex items-center gap-6 sm:gap-10'>
                <div>
                  <p className='text-2xl font-bold text-gray-900'>{s.value}</p>
                  <p className='text-xs text-gray-500'>{s.label}</p>
                </div>
                {i < STATS.length - 1 && <span className='w-px h-8 bg-gray-200' />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tại sao chọn chúng tôi */}
      <div className='text-3xl md:text-4xl py-4 text-center'>
        <Title text1={'TẠI SAO'} text2={'CHỌN CHÚNG TÔI'} />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-sm mt-6 mb-20'>
        {REASONS.map((item) => (
          <div
            key={item.title}
            className='group p-7 flex flex-col gap-4 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-orange-100/60 hover:-translate-y-1 transition-all duration-300'
          >
            <span className='flex items-center justify-center w-12 h-12 text-xl bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl group-hover:scale-110 transition-transform duration-300'>
              {item.icon}
            </span>
            <b className='text-base text-gray-900'>{item.title}</b>
            <p className='leading-relaxed text-gray-500'>{item.desc}</p>
          </div>
        ))}
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About