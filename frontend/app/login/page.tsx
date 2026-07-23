'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api, { endpoints, AuthResponse } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

const LoginPage = () => {
  const router = useRouter()
  const { isAuthenticated, login } = useAuthStore()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, router])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getErrorMessage = (error: unknown): string => {
    const axiosError = error as any
    return axiosError?.response?.data?.message || 'Unable to login. Please try again.'
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

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

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[rgb(248,246,242)]">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-8">Sign in to continue your Avyaya journey.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="input-field"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="input-field"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-70">
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          New to Avyaya?{' '}
          <Link href="/register" className="text-accent font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}

export default LoginPage
