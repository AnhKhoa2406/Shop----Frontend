import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    setBestSeller(products.filter((item) => item.bestseller).slice(0, 5))
  }, [products])

  // Không có sản phẩm bán chạy thì ẩn cả mục
  if (bestSeller.length === 0) return null

  return (
    <section className="my-16">
      {/* Tiêu đề */}
      <div className="text-center mb-10">
        <div className="text-2xl sm:text-3xl">
          <Title text1="SẢN PHẨM" text2="BÁN CHẠY" />
        </div>
        <p className="max-w-xl mx-auto mt-2 px-4 text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed">
          Những sản phẩm được yêu thích và mua nhiều nhất tại cửa hàng.
        </p>
      </div>

      {/* Danh sách */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 gap-y-6 sm:gap-y-8">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            bestseller={item.bestseller}
          />
        ))}
      </div>

      {/* Nút xem tất cả */}
      <div className="mt-12 flex justify-center">
        <Link
          to="/collection"
          className="group inline-flex items-center gap-3 px-8 py-3 text-sm font-semibold text-orange-600 bg-white border-2 border-orange-200 rounded-full hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:border-transparent hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 transition-all duration-300"
        >
          XEM TẤT CẢ SẢN PHẨM
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  )
}

export default BestSeller