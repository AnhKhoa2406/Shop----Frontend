import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const STATS = [
  { value: '10K+', label: 'Khách hàng' },
  { value: '500+', label: 'Mẫu thiết kế' },
  { value: '4.9★', label: 'Đánh giá' },
]

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-50 via-white to-orange-100 border border-orange-100 shadow-lg shadow-orange-100/50">
      {/* Nền trang trí */}
      <div className="pointer-events-none absolute -top-28 -left-28 w-80 h-80 rounded-full bg-orange-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 w-80 h-80 rounded-full bg-pink-200/40 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#fdba74 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-10 px-6 sm:px-12 py-10 lg:py-14">
        {/* Bên trái: nội dung */}
        <div className="w-full lg:w-1/2 text-[#414141]">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-orange-600 bg-white/80 backdrop-blur border border-orange-200 rounded-full shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            BỘ SƯU TẬP MÙA MỚI 2026
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] text-gray-900">
            Hàng mới{' '}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              về
            </span>
            <br />
            cho mọi phong cách
          </h1>

          <p className="mt-5 max-w-md text-sm md:text-base text-gray-500 leading-relaxed">
            Khám phá bộ sưu tập thời trang mới nhất: chất liệu thoải mái, đường may tinh tế,
            phong cách hiện đại cho mọi ngày.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/collection"
              className="group inline-flex items-center gap-3 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-300/60 hover:shadow-xl hover:shadow-orange-300/70 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              MUA NGAY
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/25 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              to="/about"
              className="px-6 py-3.5 text-sm font-medium text-gray-700 bg-white/70 backdrop-blur border border-gray-200 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              Tìm hiểu thêm
            </Link>
          </div>

          {/* Thống kê */}
          <div className="mt-10 flex items-center gap-6 sm:gap-10">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 sm:gap-10">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
                {i < STATS.length - 1 && <span className="w-px h-8 bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>

        {/* Bên phải: ảnh */}
        <div className="relative w-full lg:w-1/2 max-w-xl">
          {/* Khung lệch phía sau */}
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-orange-300" />
          <div className="absolute -z-0 -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-orange-200/60 to-pink-200/60 blur-xl" />

          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl group">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              src={assets.hero_img}
              alt="Hàng mới về"
            />
          </div>

          {/* Thẻ nổi 1 */}
          <div className="absolute -left-3 sm:-left-8 top-10 flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white animate-bounce [animation-duration:3s]">
            <span className="flex items-center justify-center w-10 h-10 text-lg bg-orange-100 rounded-full">🚚</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Miễn phí vận chuyển</p>
              <p className="text-[11px] text-gray-500">Cho đơn từ $50</p>
            </div>
          </div>

          {/* Thẻ nổi 2 */}
          <div className="absolute -right-2 sm:-right-6 bottom-10 flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white">
            <span className="flex items-center justify-center w-10 h-10 text-lg bg-pink-100 rounded-full">❤️</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Được yêu thích</p>
              <p className="text-[11px] text-gray-500">Bán chạy tuần này</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero