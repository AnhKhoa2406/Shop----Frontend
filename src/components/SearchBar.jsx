import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext)

  const location = useLocation()
  const navigate = useNavigate()

  const visible =
    showSearch && location.pathname.includes('collection')

  if (!visible) return null

  const handleSearch = () => {
    navigate('/collection')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="w-full bg-white border-b border-gray-100 animate-[fadeIn_0.25s_ease-out]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
        
        <div className="flex items-center gap-3">
          
          {/* SEARCH BOX */}
          <div className="flex-1 flex items-center h-12 sm:h-14 px-4 sm:px-5 bg-gray-50 border border-gray-200 rounded-full transition-all duration-200 focus-within:bg-white focus-within:border-gray-400 focus-within:shadow-sm">
            
            {/* ICON */}
            <img
              src={assets.search_icon}
              className="w-4 sm:w-5 opacity-60 shrink-0"
              alt="Tìm kiếm"
            />

            {/* INPUT */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-0 ml-3 bg-transparent outline-none text-sm sm:text-[15px] text-gray-700 placeholder:text-gray-400"
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              autoFocus
            />

            {/* CLEAR */}
            {search && (
              <button
                onClick={() => setSearch('')}
                className="ml-2 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition"
              >
                ✕
              </button>
            )}
          </div>

          {/* CLOSE */}
          <button
            onClick={() => setShowSearch(false)}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition active:scale-90"
            title="Đóng tìm kiếm"
          >
            <img
              src={assets.cross_icon}
              className="w-3.5 sm:w-4"
              alt="Đóng"
            />
          </button>
        </div>

        {/* GỢI Ý */}
        <div className="mt-3 px-2 text-xs text-gray-400">
          Nhấn <span className="font-medium text-gray-500">Enter</span> để tìm kiếm sản phẩm
        </div>
      </div>
    </div>
  )
}

export default SearchBar