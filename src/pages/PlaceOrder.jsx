
import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const [method, setMethod] = useState('banking')

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target

    setFormData((data) => ({
      ...data,
      [name]: value
    }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            )

            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error('Giỏ hàng của bạn đang trống!')
        return
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method === 'banking' ? 'Banking' : 'COD'
      }

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        {
          headers: {
            token
          }
        }
      )

      if (response.data.success) {
        setCartItems({})
        toast.success('Đặt hàng thành công!')
        navigate('/orders')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)

      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Có lỗi xảy ra khi đặt hàng!'
      )
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
              🛍️
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Thanh toán đơn hàng
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Hoàn tất thông tin để đặt hàng
              </p>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">

          {/* LEFT */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">

            {/* TITLE */}
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-lg">
                📍
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Thông tin giao hàng
                </h2>

                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  Nhập chính xác thông tin nhận hàng
                </p>
              </div>
            </div>

            {/* FORM */}
            <div className="space-y-5">

              {/* FIRST NAME + LAST NAME */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Họ <span className="text-red-500">*</span>
                  </label>

                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChangeHandler}
                    placeholder="Nguyễn"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Tên <span className="text-red-500">*</span>
                  </label>

                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChangeHandler}
                    placeholder="Văn A"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>

              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Địa chỉ Email <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                  placeholder="example@gmail.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* STREET */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Địa chỉ nhận hàng <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={onChangeHandler}
                  placeholder="Số nhà, tên đường..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* CITY + DISTRICT */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Tỉnh / Thành phố <span className="text-red-500">*</span>
                  </label>

                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={onChangeHandler}
                    placeholder="TP. Hồ Chí Minh"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Quận / Huyện
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={onChangeHandler}
                    placeholder="Quận 1"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>

              </div>

              {/* ZIP + COUNTRY */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Mã bưu điện
                  </label>

                  <input
                    type="text"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={onChangeHandler}
                    placeholder="700000"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Quốc gia <span className="text-red-500">*</span>
                  </label>

                  <input
                    required
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={onChangeHandler}
                    placeholder="Việt Nam"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>

              </div>

              {/* PHONE */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={onChangeHandler}
                  placeholder="0912 345 678"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* ORDER TOTAL */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-lg">
                  🛒
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Đơn hàng
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Kiểm tra lại tổng thanh toán
                  </p>
                </div>
              </div>

              <CartTotal />
            </div>

            {/* PAYMENT */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              {/* PAYMENT HEADER */}
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-lg">
                  💳
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Phương thức thanh toán
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Chọn phương thức thanh toán
                  </p>
                </div>
              </div>

              {/* BANKING */}
              <div
                onClick={() => setMethod('banking')}
                className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${
                  method === 'banking'
                    ? 'border-orange-500 bg-orange-50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-300'
                }`}
              >

                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    method === 'banking'
                      ? 'border-orange-500'
                      : 'border-gray-300'
                  }`}
                >
                  {method === 'banking' && (
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                  )}
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white text-lg">
                  💳
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Chuyển khoản ngân hàng
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Thanh toán qua QR Code
                  </p>
                </div>

                {method === 'banking' && (
                  <span className="hidden text-xs font-semibold text-orange-600 sm:block">
                    Đã chọn
                  </span>
                )}
              </div>

              {/* COD */}
              <div
                onClick={() => setMethod('cod')}
                className={`mt-3 flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${
                  method === 'cod'
                    ? 'border-orange-500 bg-orange-50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-300'
                }`}
              >

                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    method === 'cod'
                      ? 'border-orange-500'
                      : 'border-gray-300'
                  }`}
                >
                  {method === 'cod' && (
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                  )}
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg">
                  📦
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Thanh toán khi nhận hàng
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Thanh toán tiền mặt khi nhận hàng
                  </p>
                </div>

                {method === 'cod' && (
                  <span className="hidden text-xs font-semibold text-orange-600 sm:block">
                    Đã chọn
                  </span>
                )}
              </div>

              {/* BANKING QR */}
              {method === 'banking' && (
                <div className="mt-5 rounded-2xl border border-orange-100 bg-gradient-to-b from-orange-50 to-white p-5 text-center">

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900">
                      Quét mã QR để thanh toán
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Mở ứng dụng ngân hàng và quét mã
                    </p>
                  </div>

                  <div className="inline-flex rounded-2xl border border-gray-100 bg-white p-3 shadow-md">
                    <img
                      src="https://img.vietqr.io/image/VCB-0123456789-compact2.png?amount=0&addInfo=Thanh%20toan%20don%20hang&accountName=SHOP%20ONLINE"
                      alt="QR Code thanh toán"
                      className="h-44 w-44 rounded-lg object-contain"
                    />
                  </div>

                  {/* BANK INFORMATION */}
                  <div className="mt-5 space-y-2 text-xs text-gray-600">

                    <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2.5">
                      <span>Ngân hàng</span>
                      <strong className="text-gray-900">
                        Vietcombank
                      </strong>
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2.5">
                      <span>Số tài khoản</span>
                      <strong className="text-gray-900">
                        0123456789
                      </strong>
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2.5">
                      <span>Chủ tài khoản</span>
                      <strong className="text-gray-900">
                        SHOP ONLINE
                      </strong>
                    </div>

                  </div>

                  {/* TRANSFER NOTE */}
                  <div className="mt-4 rounded-xl border border-orange-200 bg-orange-100 px-4 py-3">
                    <p className="text-xs leading-relaxed text-orange-800">
                      <span className="font-semibold">
                        Nội dung chuyển khoản:
                      </span>{' '}
                      Thanh toán đơn hàng
                    </p>
                  </div>
                </div>
              )}

              {/* COD INFO */}
              {method === 'cod' && (
                <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">

                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white">
                      🚚
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Thanh toán khi nhận hàng
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-gray-500">
                        Bạn sẽ thanh toán trực tiếp cho nhân viên giao hàng
                        khi đơn hàng được giao tới địa chỉ của bạn.
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
              >
                ĐẶT HÀNG NGAY
              </button>

              {/* SECURITY */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                <span>🔒</span>
                <span>
                  Thông tin của bạn được bảo mật an toàn
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

