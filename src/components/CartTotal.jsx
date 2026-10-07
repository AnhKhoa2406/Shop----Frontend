import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const formatVND = (value) => {
  const num = Number(value)
  if (isNaN(num)) return value
  return num.toLocaleString('vi-VN') + ' ₫'
}

const CartTotal = () => {
  const { delivery_fee, getCartAmount } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const shippingFee = subtotal === 0 ? 0 : delivery_fee
  const total = subtotal === 0 ? 0 : subtotal + shippingFee

  return (
    <div className='w-full'>
      {/* Tiêu đề */}
      <div className='mb-6'>
        <h3 className='text-xl sm:text-2xl font-extrabold tracking-tight'>
          <span className='text-gray-900'>TỔNG </span>
          <span className='bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent'>
            GIỎ HÀNG
          </span>
        </h3>
        <span className='block w-12 h-1 mt-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600' />
      </div>

      <div className='flex flex-col gap-3 text-sm text-gray-600'>
        <div className='flex justify-between'>
          <p>Tạm tính</p>
          <p className='font-medium text-gray-800'>
            {formatVND(subtotal)}
          </p>
        </div>

        <hr className='border-gray-100' />

        <div className='flex justify-between'>
          <p>Phí vận chuyển</p>
          <p className='font-medium text-gray-800'>
            {formatVND(shippingFee)}
          </p>
        </div>

        <hr className='border-gray-100' />

        <div className='flex justify-between items-center pt-1'>
          <p className='text-base font-semibold text-gray-900'>Tổng cộng</p>
          <p className='text-xl font-bold text-orange-600'>
            {formatVND(total)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal