import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='#f5f5f5'/><circle cx='110' cy='110' r='18' fill='#d4d4d4'/><path d='M50 250l70-90 50 60 35-40 45 70z' fill='#d4d4d4'/></svg>"
  )

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      to={`/product/${id}`}
      className="group block text-gray-700"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
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
            group-hover:scale-105
          "
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = PLACEHOLDER
          }}
        />

        {/* OVERLAY */}
        <div className="
          absolute inset-0
          bg-black/0
          group-hover:bg-black/5
          transition-colors duration-500
        " />

        {/* XEM CHI TIẾT */}
        <div className="
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          translate-y-3
          opacity-0
          group-hover:translate-y-0
          group-hover:opacity-100
          transition-all
          duration-300
        ">
          <span className="
            whitespace-nowrap
            bg-white
            px-4
            py-2
            text-xs
            tracking-wide
            text-gray-800
            shadow-sm
          ">
            XEM SẢN PHẨM
          </span>
        </div>
      </div>

      {/* INFO */}
      <div className="pt-4">
        <p className="
          text-[13px]
          sm:text-sm
          text-gray-700
          line-clamp-1
          group-hover:text-black
          transition-colors
        ">
          {name}
        </p>

        <p className="
          mt-1.5
          text-sm
          font-medium
          text-gray-900
        ">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem