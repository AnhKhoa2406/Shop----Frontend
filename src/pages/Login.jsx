import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const inputClass =
  'w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-200 rounded-xl outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 placeholder:text-gray-400'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login') // 'Login' | 'Sign Up'
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const url =
        currentState === 'Sign Up'
          ? backendUrl + '/api/user/register'
          : backendUrl + '/api/user/login'

      const payload =
        currentState === 'Sign Up' ? { name, email, password } : { email, password }

      const response = await axios.post(url, payload)

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        toast.success(currentState === 'Sign Up' ? 'Đăng ký thành công' : 'Đăng nhập thành công')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  // Có token rồi thì tự chuyển về trang chủ
  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md p-8 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-orange-100/50"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {currentState === 'Login' ? 'Chào mừng trở lại' : 'Tạo tài khoản'}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {currentState === 'Login'
              ? 'Đăng nhập để tiếp tục mua sắm'
              : 'Đăng ký để nhận ưu đãi từ Forever'}
          </p>
        </div>

        <div className="space-y-4">
          {currentState === 'Sign Up' && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className={inputClass}
              placeholder="Họ và tên"
              required
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className={inputClass}
            placeholder="Email"
            required
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className={inputClass}
            placeholder="Mật khẩu (tối thiểu 8 ký tự)"
            required
          />
        </div>

        <div className="flex justify-between mt-3 text-sm">
          <p className="text-gray-500 cursor-pointer hover:text-orange-600 transition-colors">
            Quên mật khẩu?
          </p>
          <p
            onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
            className="font-medium text-orange-600 cursor-pointer hover:underline"
          >
            {currentState === 'Login' ? 'Tạo tài khoản' : 'Đăng nhập ở đây'}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? 'Đang xử lý...' : currentState === 'Login' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
        </button>
      </form>
    </div>
  )
}

export default Login