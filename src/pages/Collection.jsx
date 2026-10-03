
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const CATEGORIES = [
  { value: 'Men', label: 'Nam' },
  { value: 'Women', label: 'Nữ' },
  { value: 'Kids', label: 'Trẻ em' },
]

const SUB_CATEGORIES = [
  { value: 'Topwear', label: 'Áo' },
  { value: 'Bottomwear', label: 'Quần' },
  { value: 'Winterwear', label: 'Đồ mùa đông' },
]

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleValue = (value, setter) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  useEffect(() => {
    let list = [...products]

    // Tìm kiếm
    if (showSearch && search) {
      list = list.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Lọc danh mục
    if (category.length > 0) {
      list = list.filter((item) => category.includes(item.category))
    }

    // Lọc loại sản phẩm
    if (subCategory.length > 0) {
      list = list.filter((item) =>
        subCategory.includes(item.subCategory)
      )
    }

    // Sắp xếp
    if (sortType === 'low-high') {
      list.sort((a, b) => a.price - b.price)
    }

    if (sortType === 'high-low') {
      list.sort((a, b) => b.price - a.price)
    }

    setFilterProducts(list)
  }, [
    products,
    category,
    subCategory,
    search,
    showSearch,
    sortType,
  ])

  const checkboxClass =
    'w-4 h-4 accent-orange-500 cursor-pointer'

  return (
    <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 pt-8 sm:pt-10 border-t border-gray-200">

      {/* ================= BỘ LỌC ================= */}
      <div className="min-w-60 sm:w-60">

        {/* Tiêu đề bộ lọc */}
        <p
          onClick={() => setShowFilter((prev) => !prev)}
          className="
            my-2
            text-lg
            sm:text-xl
            font-medium
            flex
            items-center
            justify-between
            cursor-pointer
            select-none
          "
        >
          BỘ LỌC

          <span
            className={`
              sm:hidden
              text-sm
              transition-transform
              duration-300
              ${showFilter ? 'rotate-90' : ''}
            `}
          >
            ▶
          </span>
        </p>

        {/* ================= DANH MỤC ================= */}
        <div
          className={`
            border
            border-gray-200
            bg-white
            px-5
            py-4
            mt-5
            rounded-xl
            shadow-sm
            ${showFilter ? '' : 'hidden'}
            sm:block
          `}
        >
          <p className="mb-4 text-sm font-semibold text-gray-800">
            DANH MỤC
          </p>

          <div className="flex flex-col gap-3 text-sm text-gray-600">
            {CATEGORIES.map((item) => (
              <label
                key={item.value}
                className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                  hover:text-orange-500
                  transition-colors
                "
              >
                <input
                  type="checkbox"
                  className={checkboxClass}
                  value={item.value}
                  checked={category.includes(item.value)}
                  onChange={() =>
                    toggleValue(item.value, setCategory)
                  }
                />

                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ================= LOẠI SẢN PHẨM ================= */}
        <div
          className={`
            border
            border-gray-200
            bg-white
            px-5
            py-4
            my-5
            rounded-xl
            shadow-sm
            ${showFilter ? '' : 'hidden'}
            sm:block
          `}
        >
          <p className="mb-4 text-sm font-semibold text-gray-800">
            LOẠI SẢN PHẨM
          </p>

          <div className="flex flex-col gap-3 text-sm text-gray-600">
            {SUB_CATEGORIES.map((item) => (
              <label
                key={item.value}
                className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                  hover:text-orange-500
                  transition-colors
                "
              >
                <input
                  type="checkbox"
                  className={checkboxClass}
                  value={item.value}
                  checked={subCategory.includes(item.value)}
                  onChange={() =>
                    toggleValue(item.value, setSubCategory)
                  }
                />

                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ================= DANH SÁCH SẢN PHẨM ================= */}
      <div className="flex-1">

        {/* Header */}
        <div
          className="
            flex
            justify-between
            items-center
            gap-3
            text-base
            sm:text-2xl
            mb-6
          "
        >
          <Title
            text1="TẤT CẢ"
            text2="SẢN PHẨM"
          />

          {/* Sắp xếp */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className="
              border
              border-gray-300
              rounded-lg
              text-xs
              sm:text-sm
              px-2
              sm:px-3
              py-2
              outline-none
              bg-white
              cursor-pointer
              focus:border-orange-400
              transition
            "
          >
            <option value="relevant">
              Sắp xếp: Liên quan
            </option>

            <option value="low-high">
              Giá: Thấp → Cao
            </option>

            <option value="high-low">
              Giá: Cao → Thấp
            </option>
          </select>
        </div>

        {/* Không có sản phẩm */}
        {filterProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm">
              Không tìm thấy sản phẩm phù hợp.
            </p>

            <p className="text-gray-300 text-xs mt-2">
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
            </p>
          </div>
        ) : (
          /* Danh sách sản phẩm */
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-4
              gap-y-7
            "
          >
            {filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection

