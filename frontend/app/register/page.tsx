'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api, { endpoints, AuthResponse } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

const RegisterPage = () => {
  const router = useRouter()
  const { isAuthenticated, login } = useAuthStore()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
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
    return axiosError?.response?.data?.message || 'Unable to register. Please try again.'
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Name, email, and password are required')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address || undefined,
      }

      const response = await api.post<AuthResponse>(endpoints.auth.register, payload)
      const auth = response.data

      login(auth.token, {
        id: auth.id,
        name: auth.name,
        email: auth.email,
        role: auth.role ?? 'ROLE_USER',
      })

      toast.success('Account created successfully')
      router.push('/')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-[rgb(248,246,242)]">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Create Account</h1>
        <p className="text-gray-600 mb-8">Start shopping timeless jewelry with Avyaya.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="input-field"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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
              autoComplete="new-password"
              className="input-field"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="input-field"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address (optional)
            </label>
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="street-address"
              className="input-field"
              placeholder="Delivery address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-70">
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-accent font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}

export default RegisterPage
