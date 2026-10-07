import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    // sản phẩm mới nhất nằm cuối mảng nên đảo ngược lại
    setLatestProducts([...products].reverse().slice(0, 10))
  }, [products])

  return (
    <section className="my-16">
      {/* Tiêu đề */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-gray-800">BỘ SƯU TẬP </span>
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            MỚI NHẤT
          </span>
        </h2>
        <p className="max-w-xl mx-auto mt-2 px-4 text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed">
          Khám phá những mẫu thời trang mới nhất vừa về cửa hàng, cập nhật liên tục mỗi tuần.
        </p>
      </div>

      {/* Danh sách */}
      {latestProducts.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/60">
          <p className="text-5xl mb-3">🛍️</p>
          <p className="text-sm text-gray-500">Chưa có sản phẩm nào.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 gap-y-6 sm:gap-y-8">
            {latestProducts.map((item) => (
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
        </>
      )}
    </section>
  )
}

export default LatestCollection