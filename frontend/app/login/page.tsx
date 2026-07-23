'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import api, { endpoints, AuthResponse } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

const LoginPage = () => {
  const router = useRouter()
  const { isAuthenticated, login } = useAuthStore()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) router.replace('/')
  }, [isAuthenticated, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const getErrorMessage = (error: unknown): string => {
    const axiosError = error as any
    return axiosError?.response?.data?.message || 'Unable to login. Please try again.'
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      toast.error('Please enter email and password')
      return
    }
    setIsSubmitting(true)
    try {
      const response = await api.post<AuthResponse>(endpoints.auth.login, formData)
      const auth = response.data
      login(auth.token, {
        id: auth.id,
        name: auth.name,
        email: auth.email,
        role: auth.role ?? 'ROLE_USER',
      })
      toast.success('Logged in successfully')
      router.push('/')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputCls = "w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
  const labelCls = "block text-sm font-medium text-gray-300 mb-1.5"

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Avyaya"
                width={140}
                height={55}
                className="h-12 w-auto object-contain mx-auto mb-4 brightness-0 invert"
              />
            </Link>
            <h1 className="text-3xl font-playfair font-bold text-gray-100">Welcome Back</h1>
            <p className="text-gray-400 mt-1">Sign in to continue your Avyaya journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className={labelCls}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={inputCls}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={labelCls}>Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={inputCls + ' pr-12'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-accent/90 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0 mt-2"
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            New to Avyaya?{' '}
            <Link href="/register" className="text-accent font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  )
}

export default LoginPage
