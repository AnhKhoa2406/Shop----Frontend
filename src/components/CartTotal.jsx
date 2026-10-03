import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const shippingFee = subtotal === 0 ? 0 : delivery_fee
  const total = subtotal === 0 ? 0 : subtotal + shippingFee

  return (
    <div className='w-full'>
      {/* Tiêu đề */}
      <div className='flex items-center gap-3 mb-5'>
        <p className='text-xl text-gray-400 tracking-wide'>
          TỔNG <span className='text-gray-900 font-bold'>GIỎ HÀNG</span>
        </p>
        <span className='w-8 sm:w-12 h-[2px] bg-orange-500' />
      </div>

      <div className='flex flex-col gap-3 text-sm text-gray-600'>
        <div className='flex justify-between'>
          <p>Tạm tính</p>
          <p className='font-medium text-gray-800'>
            {currency}
            {subtotal}
          </p>
        </div>

        <hr className='border-gray-100' />

        <div className='flex justify-between'>
          <p>Phí vận chuyển</p>
          <p className='font-medium text-gray-800'>
            {currency}
            {shippingFee}
          </p>
        </div>

        <hr className='border-gray-100' />

        <div className='flex justify-between items-center pt-1'>
          <p className='text-base font-semibold text-gray-900'>Tổng cộng</p>
          <p className='text-xl font-bold text-orange-600'>
            {currency}
            {total}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal