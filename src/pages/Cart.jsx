import React, {
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  ShopContext,
} from '../context/ShopContext'

import {
  assets,
} from '../assets/assets'

import CartTotal from '../components/CartTotal'

import {
  useNavigate,
} from 'react-router-dom'


const formatVND = (
  value
) => {

  const num =
    Number(value)


  if (
    isNaN(num)
  ) {

    return value

  }


  return (
    num.toLocaleString(
      'vi-VN'
    ) +
    ' ₫'
  )

}


const Cart = () => {

  const {
    products,
    cartItems,
    updateQuantity,
  } = useContext(
    ShopContext
  )


  const navigate =
    useNavigate()


  const [
    cartData,
    setCartData,
  ] = useState([])


  useEffect(() => {

    const tempData = []


    for (
      const itemId in cartItems
    ) {

      for (
        const size in
        cartItems[itemId]
      ) {

        const quantity =
          Number(
            cartItems[itemId][size]
          )


        if (
          quantity > 0
        ) {

          tempData.push({
            _id:
              String(
                itemId
              ),
            size,
            quantity,
          })

        }

      }

    }


    setCartData(
      tempData
    )

  }, [
    cartItems,
  ])


  return (
    <div className="border-t-2 pt-10 pb-20">

      <div className="mb-10 text-center">

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">

          <span className="text-gray-800">
            GIỎ
          </span>

          {' '}

          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            HÀNG CỦA BẠN
          </span>

        </h1>


        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
          Kiểm tra lại sản phẩm trước khi tiến hành thanh toán.
        </p>

      </div>


      {cartData.length === 0 ? (

        <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/60 py-20 text-center">

          <p className="mb-3 text-5xl">
            🛒
          </p>


          <p className="mb-6 text-sm text-gray-500">
            Giỏ hàng của bạn đang trống.
          </p>


          <button
            type="button"
            onClick={() =>
              navigate(
                '/collection'
              )
            }
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            TIẾP TỤC MUA SẮM
          </button>

        </div>

      ) : (

        <>

          <div className="flex flex-col gap-4">

            {cartData.map(
              (
                item
              ) => {

                const productData =
                  products.find(
                    (product) =>
                      String(
                        product._id
                      ) ===
                      String(
                        item._id
                      )
                  )


                if (
                  !productData
                ) {

                  return null

                }


                const maxStock =
                  typeof productData.stock ===
                    'number' &&
                  productData.stock >
                    0
                    ? productData.stock
                    : 99


                const canIncrease =
                  item.quantity <
                  maxStock


                return (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-orange-200 hover:shadow-md sm:p-5"
                  >

                    <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">

                      <img
                        className="h-16 w-16 flex-shrink-0 rounded-xl border border-gray-100 object-cover sm:h-20 sm:w-20"
                        src={
                          productData.image &&
                          productData.image.length >
                            0
                            ? productData.image[0]
                            : ''
                        }
                        alt={
                          productData.name
                        }
                      />


                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                          {
                            productData.name
                          }
                        </p>


                        <div className="mt-2 flex flex-wrap items-center gap-3">

                          <p className="text-sm font-bold text-orange-600 sm:text-base">
                            {
                              formatVND(
                                productData.price
                              )
                            }
                          </p>


                          <p className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                            Size:
                            {' '}
                            {
                              item.size
                            }
                          </p>

                        </div>

                      </div>

                    </div>


                    <div className="flex flex-shrink-0 items-center overflow-hidden rounded-full border border-gray-300">

                      <button
                        type="button"
                        onClick={() => {

                          if (
                            item.quantity >
                            1
                          ) {

                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity -
                                1
                            )

                          }

                        }}
                        disabled={
                          item.quantity <=
                          1
                        }
                        className="flex h-8 w-8 items-center justify-center text-gray-500 transition hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
                      >
                        −
                      </button>


                      <span className="w-8 select-none text-center text-sm font-medium sm:w-10">
                        {
                          item.quantity
                        }
                      </span>


                      <button
                        type="button"
                        onClick={() => {

                          if (
                            canIncrease
                          ) {

                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity +
                                1
                            )

                          }

                        }}
                        disabled={
                          !canIncrease
                        }
                        className="flex h-8 w-8 items-center justify-center text-gray-500 transition hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
                      >
                        +
                      </button>

                    </div>


                    <button
                      type="button"
                      onClick={() => {

                        updateQuantity(
                          item._id,
                          item.size,
                          0
                        )

                      }}
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label="Xoá sản phẩm"
                    >

                      <img
                        className="w-4"
                        src={
                          assets.bin_icon
                        }
                        alt="Xoá"
                      />

                    </button>

                  </div>
                )

              }
            )}

          </div>


          <div className="mt-16 flex justify-end">

            <div className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 p-6 sm:w-[420px]">

              <CartTotal />


              <div className="w-full text-end">

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      '/place-order'
                    )
                  }
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 sm:w-auto"
                >
                  TIẾN HÀNH THANH TOÁN
                </button>

              </div>

            </div>

          </div>

        </>

      )}

    </div>
  )
}


export default Cart