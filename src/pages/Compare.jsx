import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

/* =========================
   LOCAL STORAGE
========================= */

const readList = (key) => {
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : []

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((id) => typeof id === 'string')
  } catch {
    return []
  }
}

const writeList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    // Ignore storage errors
  }
}

/* =========================
   FORMAT PRICE
========================= */

const formatVND = (value) => {
  const num = Number(value)

  if (Number.isNaN(num)) {
    return value
  }

  return `${num.toLocaleString('vi-VN')} ₫`
}

/* =========================
   ICONS
========================= */

const CompareIcon = () => {
  return (
    <div className="flex h-full w-full items-center justify-center text-4xl">
      ⚖️
    </div>
  )
}

const CloseIcon = () => {
  return (
    <span className="text-xl font-bold leading-none">
      ×
    </span>
  )
}

/* =========================
   COMPARE PAGE
========================= */

const Compare = () => {
  const { products, addToCart } = useContext(ShopContext)

  const [compareList, setCompareList] = useState(() =>
    readList('compareList')
  )

  /* =========================
     UPDATE COMPARE LIST
  ========================= */

  useEffect(() => {
    const handleFocus = () => {
      setCompareList(readList('compareList'))
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  /* =========================
     GET COMPARE PRODUCTS
  ========================= */

  const items = compareList
    .map((id) => products.find((product) => product._id === id))
    .filter(Boolean)

  /* =========================
     REMOVE ONE PRODUCT
  ========================= */

  const removeItem = (id) => {
    const nextList = compareList.filter(
      (compareId) => compareId !== id
    )

    setCompareList(nextList)
    writeList('compareList', nextList)
  }

  /* =========================
     CLEAR ALL
  ========================= */

  const clearAll = () => {
    setCompareList([])
    writeList('compareList', [])
  }

  /* =========================
     QUICK ADD TO CART
  ========================= */

  const handleQuickAdd = (product) => {
    const size =
      product.sizes && product.sizes.length > 0
        ? product.sizes[0]
        : ''

    addToCart(product._id, size)
  }

  /* =========================
     COMPARE INFORMATION
  ========================= */

  const rows = [
    {
      label: 'Giá',
      render: (product) => (
        <span className="text-lg font-black tracking-tight text-orange-600 sm:text-xl">
          {formatVND(product.price)}
        </span>
      ),
    },

    {
      label: 'Danh mục',
      render: (product) => (
        <span className="font-bold text-slate-800">
          {product.category || '—'}
        </span>
      ),
    },

    {
      label: 'Loại',
      render: (product) => (
        <span className="font-bold text-slate-800">
          {product.subCategory || '—'}
        </span>
      ),
    },

    {
      label: 'Kích cỡ',
      render: (product) => (
        <span className="font-semibold text-slate-700">
          {product.sizes && product.sizes.length > 0
            ? product.sizes.join(', ')
            : '—'}
        </span>
      ),
    },

    {
      label: 'Màu sắc',
      render: (product) => {
        if (!product.colors || product.colors.length === 0) {
          return (
            <span className="font-semibold text-slate-400">
              —
            </span>
          )
        }

        return (
          <div className="flex flex-wrap justify-center gap-2">
            {product.colors.map((color, index) => (
              <span
                key={`${color}-${index}`}
                className="h-7 w-7 rounded-full border-2 border-white shadow-md ring-1 ring-slate-200"
                style={{
                  backgroundColor: color,
                }}
                title={color}
              />
            ))}
          </div>
        )
      },
    },

    {
      label: 'Tồn kho',
      render: (product) => {
        if (typeof product.stock !== 'number') {
          return (
            <span className="font-semibold text-slate-400">
              —
            </span>
          )
        }

        if (product.stock <= 0) {
          return (
            <span className="inline-flex items-center gap-2 font-extrabold text-red-600">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              Hết hàng
            </span>
          )
        }

        return (
          <span className="inline-flex items-center gap-2 font-extrabold text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            {product.stock} sản phẩm
          </span>
        )
      },
    },

    {
      label: 'Mô tả',
      render: (product) => (
        <span className="text-sm font-medium leading-6 text-slate-600">
          {product.description || '—'}
        </span>
      ),
    },
  ]

  /* =========================
     RENDER
  ========================= */

  return (
    <main className="relative isolate overflow-hidden rounded-[2rem] border border-orange-100 bg-[radial-gradient(ellipse_at_top_left,_#ffedd5,_transparent_42%),linear-gradient(135deg,_#fff7ed_0%,_#ffffff_48%,_#fffaf5_100%)] px-4 pb-20 pt-8 sm:px-8 sm:pt-12 lg:px-12">

      {/* Background decoration */}

      <div className="pointer-events-none absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl" />

      {/* =========================
          HEADER
      ========================= */}

      <header className="mb-9 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
        <div>

          {/* Badge */}

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />

            Chọn đúng sản phẩm
          </div>

          {/* Title */}

          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            So sánh sản phẩm
          </h1>

          {/* Description */}

          <p className="mt-3 text-sm font-semibold text-slate-600 sm:text-base">
            {items.length > 0
              ? `Đang so sánh ${items.length} sản phẩm`
              : 'Chưa có sản phẩm nào để so sánh'}
          </p>
        </div>

        {/* Clear */}

        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-md"
          >
            Xoá tất cả
          </button>
        )}
      </header>

      {/* =========================
          EMPTY
      ========================= */}

      {items.length === 0 ? (
        <section className="flex flex-col items-center rounded-3xl border border-orange-100 bg-white/90 px-6 py-16 text-center shadow-[0_24px_70px_-40px_rgba(154,52,18,0.35)] sm:py-24">

          {/* Icon */}

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-100 to-amber-50 text-orange-500 shadow-inner ring-1 ring-orange-100">
            <CompareIcon />
          </div>

          {/* Title */}

          <p className="text-lg font-extrabold text-slate-900">
            Chưa có sản phẩm để so sánh
          </p>

          {/* Description */}

          <p className="mt-2 max-w-md text-sm font-medium leading-6 text-slate-600">
            Thêm sản phẩm vào danh sách so sánh từ trang
            chi tiết sản phẩm để xem điểm khác biệt.
          </p>

          {/* Button */}

          <Link
            to="/collection"
            className="mt-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-200"
          >
            Khám phá sản phẩm
          </Link>
        </section>
      ) : (

        /* =========================
           COMPARE TABLE
        ========================= */

        <div className="overflow-x-auto rounded-3xl border border-orange-100 bg-white shadow-[0_24px_70px_-36px_rgba(124,45,18,0.35)]">

          <table className="w-full min-w-[680px] border-collapse">

            {/* =========================
                TABLE HEADER
            ========================= */}

            <thead>
              <tr>

                {/* First column */}

                <th className="w-36 bg-orange-50/80 px-4 py-5 text-left text-xs font-black uppercase tracking-wider text-slate-500" />

                {/* Products */}

                {items.map((product) => (
                  <th
                    key={product._id}
                    className="min-w-[190px] bg-gradient-to-b from-orange-50/90 to-white px-4 pb-6 pt-6 text-left align-top"
                  >

                    <div className="relative">

                      {/* Remove button */}

                      <button
                        onClick={() => removeItem(product._id)}
                        aria-label="Xoá khỏi so sánh"
                        className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 shadow-md ring-1 ring-slate-200 transition-all duration-200 hover:scale-105 hover:bg-red-500 hover:text-white hover:ring-red-500"
                      >
                        <CloseIcon />
                      </button>

                      {/* Product */}

                      <Link
                        to={`/product/${product._id}`}
                        className="group block"
                      >

                        {/* Image */}

                        <div className="aspect-square overflow-hidden rounded-2xl bg-orange-50 ring-1 ring-orange-100 transition-all duration-300 group-hover:ring-2 group-hover:ring-orange-300 group-hover:shadow-lg">

                          <img
                            src={
                              product.image &&
                              product.image.length > 0
                                ? product.image[0]
                                : ''
                            }
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                        </div>

                        {/* Product name */}

                        <p className="mt-4 line-clamp-2 text-base font-black leading-snug text-slate-950 transition group-hover:text-orange-600">
                          {product.name}
                        </p>

                      </Link>

                      {/* Add to cart */}

                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="mt-4 w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-xs font-extrabold text-white shadow-md shadow-orange-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
                      >
                        Thêm vào giỏ hàng
                      </button>

                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* =========================
                TABLE BODY
            ========================= */}

            <tbody>

              {rows.map((row, rowIndex) => (
                <tr
                  key={row.label}
                  className={`
                    transition-colors
                    hover:bg-orange-50/80
                    ${
                      rowIndex % 2 === 0
                        ? 'bg-slate-50/70'
                        : 'bg-white'
                    }
                  `}
                >

                  {/* Label */}

                  <td className="whitespace-nowrap border-t border-slate-200 px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-600">
                    {row.label}
                  </td>

                  {/* Product data */}

                  {items.map((product) => (
                    <td
                      key={product._id}
                      className="border-t border-slate-200 px-4 py-4 text-center text-sm font-medium text-slate-700"
                    >
                      {row.render(product)}
                    </td>
                  ))}

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default Compare