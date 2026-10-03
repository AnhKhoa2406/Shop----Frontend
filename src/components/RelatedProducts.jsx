import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory, currentId }) => {
  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const list = products
        .filter((item) => item.category === category)
        .filter((item) => item.subCategory === subCategory)
        .filter((item) => item._id !== currentId) // bỏ sản phẩm đang xem

      setRelated(list.slice(0, 5))
    }
  }, [products, category, subCategory, currentId])

  // Không có sản phẩm liên quan thì ẩn cả mục
  if (related.length === 0) return null

  return (
    <section className='my-24'>
      <div className='text-center mb-10'>
        <div className='text-2xl sm:text-3xl'>
          <Title text1='SẢN PHẨM' text2='LIÊN QUAN' />
        </div>
        <p className='mt-2 text-xs sm:text-sm text-gray-500'>
          Có thể bạn cũng thích những mẫu cùng loại này.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 gap-y-6 sm:gap-y-8'>
        {related.map((item) => (
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
    </section>
  )
}

export default RelatedProducts