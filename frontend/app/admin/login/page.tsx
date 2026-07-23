'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import api, { endpoints } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

export default function AdminLoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post(endpoints.auth.login, { email, password })
      const data = res.data

      if (data.role !== 'ROLE_ADMIN') {
        toast.error('Access denied. Admin credentials required.')
        setLoading(false)
        return
      }

      // Store auth state
      login(data.token, { id: data.id, name: data.name, email: data.email, role: data.role })
      // Store role cookie so middleware can read it
      Cookies.set('adminRole', data.role, { expires: 1 })

      toast.success('Welcome back, Admin!')
      router.push('/admin/dashboard')
    } catch {
      toast.error('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Logo + title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-3">
                <ShieldCheckIcon className="w-8 h-8 text-accent" />
              </div>
            </div>
            <h1 className="text-2xl font-playfair font-bold text-gray-100">Admin Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Avyaya Jewels — Staff Access Only</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@avyaya.com"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword
                    ? <EyeSlashIcon className="w-5 h-5" />
                    : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0 mt-2"
            >
              {loading ? 'Signing in…' : 'Sign In to Admin'}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-6">
            This portal is restricted to authorised Avyaya staff only.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
