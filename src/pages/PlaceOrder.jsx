import React, { useContext, useState } from 'react'
import Title from '../components/Title'
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
    const name = event.target.name
    const value = event.target.value

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

      let orderData = {
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
        navigate('/orders')
        toast.success('Đặt hàng thành công!')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.message || error.message
      )
    }
  }

  const inputClass = `
    w-full
    h-12
    px-4
    rounded-xl
    border
    border-gray-200
    bg-gray-50
    text-sm
    text-gray-900
    outline-none
    transition-all
    duration-200
    placeholder:text-gray-400
    focus:bg-white
    focus:border-orange-400
    focus:ring-4
    focus:ring-orange-100
  `

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] bg-gray-50 border-t border-gray-100 py-8 sm:py-12"
    >

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-gray-800">THANH </span>
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              TOÁN
            </span>
          </h1>
          <p className="max-w-xl mx-auto mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
            Hoàn tất thông tin bên dưới để chúng tôi tiến hành giao hàng cho bạn.
          </p>
        </div>


        {/* ================= MAIN ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-start">


          {/* =================================================
              THÔNG TIN GIAO HÀNG
          ================================================= */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 sm:p-7">

            {/* Title */}
            <div className="mb-7">
              <Title
                text1="THÔNG TIN"
                text2="GIAO HÀNG"
              />

              <p className="text-xs text-gray-500 mt-2">
                Vui lòng nhập chính xác thông tin để chúng tôi giao hàng.
              </p>
            </div>


            {/* ================= FORM ================= */}
            <div className="space-y-4">


              {/* HỌ + TÊN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Họ
                    <span className="text-orange-500 ml-1">*</span>
                  </label>

                  <input
                    required
                    onChange={onChangeHandler}
                    name="firstName"
                    value={formData.firstName}
                    type="text"
                    placeholder="Nguyễn"
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tên
                    <span className="text-orange-500 ml-1">*</span>
                  </label>

                  <input
                    required
                    onChange={onChangeHandler}
                    name="lastName"
                    value={formData.lastName}
                    type="text"
                    placeholder="Văn A"
                    className={inputClass}
                  />
                </div>

              </div>


              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                  <span className="text-orange-500 ml-1">*</span>
                </label>

                <input
                  required
                  onChange={onChangeHandler}
                  name="email"
                  value={formData.email}
                  type="email"
                  placeholder="example@gmail.com"
                  className={inputClass}
                />
              </div>


              {/* ĐỊA CHỈ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Địa chỉ nhận hàng
                  <span className="text-orange-500 ml-1">*</span>
                </label>

                <input
                  required
                  onChange={onChangeHandler}
                  name="street"
                  value={formData.street}
                  type="text"
                  placeholder="Số nhà, tên đường..."
                  className={inputClass}
                />
              </div>


              {/* THÀNH PHỐ + QUẬN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tỉnh / Thành phố
                    <span className="text-orange-500 ml-1">*</span>
                  </label>

                  <input
                    required
                    onChange={onChangeHandler}
                    name="city"
                    value={formData.city}
                    type="text"
                    placeholder="TP. Hồ Chí Minh"
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Quận / Huyện
                  </label>

                  <input
                    onChange={onChangeHandler}
                    name="state"
                    value={formData.state}
                    type="text"
                    placeholder="Quận 1"
                    className={inputClass}
                  />
                </div>

              </div>


              {/* ZIP + COUNTRY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mã bưu điện
                  </label>

                  <input
                    onChange={onChangeHandler}
                    name="zipcode"
                    value={formData.zipcode}
                    type="text"
                    placeholder="700000"
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Quốc gia
                    <span className="text-orange-500 ml-1">*</span>
                  </label>

                  <input
                    required
                    onChange={onChangeHandler}
                    name="country"
                    value={formData.country}
                    type="text"
                    placeholder="Việt Nam"
                    className={inputClass}
                  />
                </div>

              </div>


              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Số điện thoại
                  <span className="text-orange-500 ml-1">*</span>
                </label>

                <input
                  required
                  onChange={onChangeHandler}
                  name="phone"
                  value={formData.phone}
                  type="tel"
                  placeholder="0912 345 678"
                  className={inputClass}
                />
              </div>

            </div>
          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}
          <div className="space-y-6">


            {/* ================= CART TOTAL ================= */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 sm:p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-xl">
                  🛒
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Đơn hàng
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Kiểm tra tổng tiền trước khi đặt hàng
                  </p>
                </div>

              </div>

              <CartTotal />

            </div>


            {/* ================= PAYMENT ================= */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 sm:p-6">

              {/* Payment title */}
              <div className="mb-5">
                <Title
                  text1="PHƯƠNG THỨC"
                  text2="THANH TOÁN"
                />

                <p className="text-xs text-gray-500 mt-2">
                  Chọn phương thức thanh toán phù hợp với bạn.
                </p>
              </div>


              {/* PAYMENT OPTIONS */}
              <div className="space-y-3">


                {/* BANKING */}
                <div
                  onClick={() => setMethod('banking')}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    method === 'banking'
                      ? 'border-orange-500 bg-orange-50 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-orange-200'
                  }`}
                >

                  {/* Radio */}
                  <div
                    className={`w-5 h-5 min-w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      method === 'banking' ? 'border-orange-500' : 'border-gray-300'
                    }`}
                  >
                    {method === 'banking' && (
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    )}
                  </div>


                  {/* Icon */}
                  <div className="w-10 h-10 min-w-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-lg">
                    💳
                  </div>


                  {/* Text */}
                  <div className="flex-1">

                    <p className="text-sm font-bold text-gray-900">
                      Chuyển khoản ngân hàng
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Thanh toán nhanh qua QR Code
                    </p>

                  </div>

                </div>


                {/* COD */}
                <div
                  onClick={() => setMethod('cod')}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    method === 'cod'
                      ? 'border-orange-500 bg-orange-50 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-orange-200'
                  }`}
                >

                  {/* Radio */}
                  <div
                    className={`w-5 h-5 min-w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      method === 'cod' ? 'border-orange-500' : 'border-gray-300'
                    }`}
                  >
                    {method === 'cod' && (
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    )}
                  </div>


                  {/* Icon */}
                  <div className="w-10 h-10 min-w-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
                    📦
                  </div>


                  {/* Text */}
                  <div className="flex-1">

                    <p className="text-sm font-bold text-gray-900">
                      Thanh toán khi nhận hàng
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Thanh toán tiền mặt khi nhận hàng
                    </p>

                  </div>

                </div>

              </div>


              {/* ================= QR ================= */}
              {method === 'banking' && (
                <div className="mt-5 p-5 rounded-2xl border border-orange-200 bg-gradient-to-b from-orange-50 to-white">

                  {/* QR HEADER */}
                  <div className="text-center mb-4">

                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 mb-2">
                      📱
                    </div>

                    <p className="text-sm font-bold text-gray-900">
                      Quét mã QR để thanh toán
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Mở ứng dụng ngân hàng và quét mã bên dưới
                    </p>

                  </div>


                  {/* QR IMAGE */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-md">

                      <img
                        src="https://img.vietqr.io/image/VCB-0123456789-compact2.png?amount=0&addInfo=Thanh%20toan%20don%20hang&accountName=SHOP%20ONLINE"
                        alt="QR Code"
                        className="w-44 h-44 object-contain rounded-lg"
                      />

                    </div>
                  </div>


                  {/* BANK INFO */}
                  <div className="space-y-2 text-xs">

                    <div className="flex justify-between items-center bg-white rounded-xl border border-gray-100 px-3 py-2.5">
                      <span className="text-gray-500">
                        Ngân hàng
                      </span>

                      <strong className="text-gray-900">
                        Vietcombank
                      </strong>
                    </div>


                    <div className="flex justify-between items-center bg-white rounded-xl border border-gray-100 px-3 py-2.5">
                      <span className="text-gray-500">
                        Số tài khoản
                      </span>

                      <strong className="text-gray-900">
                        0123456789
                      </strong>
                    </div>


                    <div className="flex justify-between items-center bg-white rounded-xl border border-gray-100 px-3 py-2.5">
                      <span className="text-gray-500">
                        Chủ tài khoản
                      </span>

                      <strong className="text-gray-900">
                        SHOP ONLINE
                      </strong>
                    </div>

                  </div>


                  {/* NOTE */}
                  <div className="mt-4 p-3 rounded-xl bg-orange-100 border border-orange-200 text-center">
                    <p className="text-xs text-orange-800">
                      <span className="font-bold">
                        Nội dung chuyển khoản:
                      </span>

                      <br />

                      Thanh toán đơn hàng
                    </p>
                  </div>

                </div>
              )}


              {/* ================= COD INFO ================= */}
              {method === 'cod' && (
                <div className="mt-5 p-4 rounded-2xl bg-gray-50 border border-gray-100">

                  <div className="flex gap-3">

                    <div className="w-10 h-10 min-w-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                      🚚
                    </div>

                    <div>

                      <p className="text-sm font-bold text-gray-900">
                        Thanh toán khi nhận hàng
                      </p>

                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        Bạn sẽ thanh toán trực tiếp cho nhân viên
                        giao hàng khi nhận được đơn hàng.
                      </p>

                    </div>

                  </div>

                </div>
              )}


              {/* ================= BUTTON ================= */}
              <button
                type="submit"
                className="
                  w-full
                  mt-6
                  py-3.5
                  px-6
                  rounded-xl
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-600
                  text-white
                  text-sm
                  font-bold
                  tracking-wide
                  shadow-lg
                  shadow-orange-200
                  transition-all
                  duration-300
                  hover:shadow-xl
                  hover:-translate-y-0.5
                  active:translate-y-0
                "
              >
                ĐẶT HÀNG NGAY
              </button>


              {/* SECURITY */}
              <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-gray-400">
                <span>🔒</span>

                <span>
                  Thanh toán an toàn &amp; bảo mật
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