'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../store/useStore'

export default function Register() {
  const router = useRouter()
  const setUser = useStore((state) => state.setUser)

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
  })

  const [errors, setErrors] = useState({})
  const [shareData, setShareData] = useState(false)

  const validateForm = () => {
    const tempErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phonePattern = /^\d{10}$/
    const usernamePattern = /^[a-zA-Z0-9]+$/

    if (!formData.name.trim()) {
      tempErrors.name = 'Name field cannot be left blank.'
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      tempErrors.name = 'Name should contain only alphabets.'
    }

    if (!formData.username.trim()) {
      tempErrors.username = 'Username field cannot be left blank.'
    } else if (!usernamePattern.test(formData.username.trim())) {
      tempErrors.username = 'Username should be alphanumeric with no spaces.'
    }

    if (!emailPattern.test(formData.email)) {
      tempErrors.email = 'Please input a valid email formatting schema.'
    }

    if (!phonePattern.test(formData.mobile)) {
      tempErrors.mobile = 'Mobile field must encompass exactly 10 digital characters.'
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setUser(formData)
      router.push('/categories')
    }
  }

  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <h1 className="text-5xl font-bold mb-4 text-center">Discover new things on Superapp</h1>
          <p className="text-xl text-purple-200 text-center">Your all-in-one dashboard for entertainment, productivity, and more</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-black">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-8">Create your account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-text text-red-500 text-sm mt-1 block">{errors.name}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Choose a username"
              />
              {errors.username && <span className="error-text text-red-500 text-sm mt-1 block">{errors.username}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-text text-red-500 text-sm mt-1 block">{errors.email}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="10-digit mobile number"
                maxLength={10}
              />
              {errors.mobile && <span className="error-text text-red-500 text-sm mt-1 block">{errors.mobile}</span>}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="shareData"
                checked={shareData}
                onChange={(e) => setShareData(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="shareData" className="text-sm text-gray-300">
                Share my registration data with Superapp
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              SIGN UP
            </button>

            <div className="text-center space-y-2 text-sm text-gray-400">
              <p>
                By clicking "Sign up", you agree to our{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">Terms and Conditions of Use</a>
              </p>
              <p>
                To learn more about how Superapp collects, uses, shares and protects your personal data, please read{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
