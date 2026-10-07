import React from 'react'
import { Link } from 'react-router-dom'

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='#f5f5f5'/><circle cx='110' cy='110' r='18' fill='#d4d4d4'/><path d='M50 250l70-90 50 60 35-40 45 70z' fill='#d4d4d4'/></svg>"
  )

const formatVND = (value) => {
  const num = Number(value)
  if (isNaN(num)) return value
  return num.toLocaleString('vi-VN') + ' ₫'
}

const ProductItem = ({ id, image, name, price }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="
        group
        block
        text-gray-700
        rounded-2xl
        overflow-hidden
        border
        border-transparent
        hover:border-orange-200
        hover:shadow-xl
        hover:shadow-orange-100
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/5] rounded-2xl">
        <img
          src={image?.[0] || PLACEHOLDER}
          alt={name}
          loading="lazy"
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-110
          "
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = PLACEHOLDER
          }}
        />
      </div>

      {/* INFO */}
      <div className="pt-4 px-1 pb-3">
        <p className="
          text-[13px]
          sm:text-sm
          font-medium
          text-gray-700
          line-clamp-1
          group-hover:text-orange-600
          transition-colors
          duration-300
        ">
          {name}
        </p>

        <p className="
          mt-1.5
          text-sm
          sm:text-base
          font-bold
          bg-gradient-to-r
          from-orange-500
          to-orange-600
          bg-clip-text
          text-transparent
        ">
          {formatVND(price)}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem