import React, {
  useContext,
} from 'react'

import {
  Link,
} from 'react-router-dom'

import {
  ShopContext,
} from '../context/ShopContext'


const formatVND = (value) => {
  const num = Number(value)

  if (isNaN(num)) {
    return value
  }

  return num.toLocaleString('vi-VN') + ' ₫'
}


const HeartIcon = ({
  filled = false,
  className = 'w-5 h-5',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={
        filled
          ? 'currentColor'
          : 'none'
      }
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.5s-7.2-4.5-9.9-8.8C.5 8.4 1.5 4.6 4.9 3.3c2.7-1 5.3.1 7.1 2.4 1.8-2.3 4.4-3.4 7.1-2.4 3.4 1.3 4.4 5.1 2.8 8.4C19.2 16 12 20.5 12 20.5Z"
      />
    </svg>
  )
}


const Wishlist = () => {

  const {
    products,
    addToCart,
    wishlist,
    removeFromWishlist,
    clearWishlist,
  } = useContext(
    ShopContext
  )


  const wishedProducts =
    products.filter(
      (product) => {
        return wishlist.includes(
          String(product._id)
        )
      }
    )


  const handleQuickAdd = (
    product
  ) => {

    const size =
      product.sizes &&
      product.sizes.length > 0
        ? product.sizes[0]
        : ''


    if (!size) {

      return

    }


    addToCart(
      product._id,
      size
    )
  }


  return (
    <main className="relative isolate overflow-hidden rounded-[2rem] border border-orange-100 bg-[radial-gradient(ellipse_at_top_left,_#ffedd5,_transparent_42%),linear-gradient(135deg,_#fff7ed_0%,_#ffffff_48%,_#fffaf5_100%)] px-4 pb-20 pt-8 sm:px-8 sm:pt-12 lg:px-12">

      <div className="pointer-events-none absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />


      <header className="mb-9 flex flex-wrap items-end justify-between gap-4 sm:mb-12">

        <div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-700 shadow-sm">

            <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />

            Sản phẩm của bạn

          </div>


          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Sản phẩm yêu thích
          </h1>


          <p className="mt-3 text-sm font-semibold text-slate-600 sm:text-base">
            {
              wishedProducts.length > 0
                ? `${wishedProducts.length} sản phẩm bạn đã lưu`
                : 'Chưa có sản phẩm nào được lưu'
            }
          </p>

        </div>


        {wishedProducts.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-md"
          >
            Xoá tất cả
          </button>
        )}

      </header>


      {wishedProducts.length === 0 ? (

        <section className="flex flex-col items-center rounded-3xl border border-orange-100 bg-white/90 px-6 py-16 text-center shadow-[0_24px_70px_-40px_rgba(154,52,18,0.35)] sm:py-24">

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-100 to-amber-50 text-orange-500 shadow-inner ring-1 ring-orange-100">

            <HeartIcon
              className="h-9 w-9"
            />

          </div>


          <p className="text-lg font-extrabold text-slate-900">
            Danh sách yêu thích đang trống
          </p>


          <p className="mt-2 max-w-md text-sm font-medium leading-6 text-slate-600">
            Lưu lại những sản phẩm bạn yêu thích để dễ dàng xem lại và mua sau.
          </p>


          <Link
            to="/collection"
            className="mt-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-200 active:translate-y-0"
          >
            Khám phá sản phẩm
          </Link>

        </section>

      ) : (

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">

          {wishedProducts.map(
            (product) => (

              <div
                key={product._id}
                className="group relative"
              >

                <button
                  type="button"
                  onClick={() => {
                    removeFromWishlist(
                      product._id
                    )
                  }}
                  aria-label="Bỏ khỏi yêu thích"
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-orange-500 shadow-md ring-1 ring-black/5 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-orange-500 hover:text-white hover:shadow-lg active:scale-90"
                >
                  <HeartIcon
                    filled
                    className="h-4 w-4"
                  />
                </button>


                <Link
                  to={`/product/${product._id}`}
                  className="block"
                >

                  <div className="aspect-square overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-2 group-hover:ring-orange-200 group-hover:shadow-xl group-hover:shadow-orange-100">

                    <img
                      src={
                        product.image &&
                        product.image.length > 0
                          ? product.image[0]
                          : ''
                      }
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                  </div>


                  <p className="mt-4 min-h-[40px] line-clamp-2 text-sm font-bold leading-5 text-slate-800 transition-colors duration-200 group-hover:text-orange-600 sm:text-base">
                    {product.name}
                  </p>


                  <p className="mt-2 text-base font-black tracking-tight text-orange-600 sm:text-lg">
                    {formatVND(
                      product.price
                    )}
                  </p>


                  {product.category && (
                    <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {product.category}
                    </p>
                  )}

                </Link>


                <button
                  type="button"
                  onClick={() => {
                    handleQuickAdd(
                      product
                    )
                  }}
                  className="mt-4 w-full rounded-xl border border-orange-200 bg-white py-2.5 text-xs font-extrabold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 hover:shadow-md active:scale-[0.98]"
                >
                  Thêm vào giỏ hàng
                </button>

              </div>

            )
          )}

        </div>

      )}

    </main>
  )
}


export default Wishlist