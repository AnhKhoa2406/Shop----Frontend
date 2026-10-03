import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);


  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems])

  return (
    <div className='border-t border-gray-200 pt-14'>

      <div className='text-2xl mb-3'>
        <h1 className='text-gray-500'>YOUR CART</h1>
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div
                key={index}
                className='py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
              >
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border border-gray-200 bg-gray-50'>{item.size}</p>
                    </div>
                  </div>
                </div>

                {/* ---------- Nút tăng giảm số lượng ---------- */}
                <div className='flex items-center border border-gray-300 rounded-md w-fit overflow-hidden'>
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(item._id, item.size, item.quantity - 1)
                    }
                    className='w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-30 disabled:hover:bg-transparent'
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>

                  <span className='w-8 sm:w-10 text-center text-sm select-none'>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                    className='w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition'
                  >
                    +
                  </button>
                </div>

                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='w-4 mr-4 cursor-pointer justify-self-center'
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            )
          })
        }
      </div>

      {/* ---------- Cart Total & Checkout ---------- */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-700 transition'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart