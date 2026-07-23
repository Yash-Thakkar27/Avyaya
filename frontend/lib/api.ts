import axios from 'axios'
import Cookies from 'js-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      Cookies.remove('token')
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api

// API endpoints
export const endpoints = {
  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  
  // Products
  products: {
    getAll: '/products',
    getById: (id: number) => `/products/${id}`,
    getByCategory: (category: string) => `/products/category/${category}`,
    search: (query: string) => `/products/search?name=${encodeURIComponent(query)}`,
    create: '/products',
    update: (id: number) => `/products/${id}`,
    delete: (id: number) => `/products/${id}`,
  },
  
  // Categories
  categories: {
    getAll: '/categories',
  },
  
  // Cart
  cart: {
    get: '/cart',
    add: '/cart/add',
    update: (id: number) => `/cart/${id}`,
    remove: (id: number) => `/cart/${id}`,
    clear: '/cart/clear',
    total: '/cart/total',
  },
  
  // Orders
  orders: {
    getAll: '/orders',
    getById: (id: number) => `/orders/${id}`,
    adminGetAll: '/orders/admin/all',
    updateStatus: (id: number) => `/orders/admin/${id}/status`,
  },
  
  // Payment
  payment: {
    createOrder: '/payment/create-order',
    verify: '/payment/verify',
    getDetails: (id: string) => `/payment/details/${id}`,
  },
}

// Type definitions
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  address?: string
}

export interface AuthResponse {
  token: string
  type: string
  id: number
  name: string
  email: string
  role: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  material: string
  stone: string
  imageUrl: string
  stock: number
  createdAt: string
}

export interface CartItem {
  id: number
  productId: number
  productName: string
  productPrice: number
  productImage: string
  quantity: number
  totalPrice: number
}

export interface Order {
  id: number
  totalPrice: number
  status: string
  createdAt: string
  orderItems: OrderItem[]
}

export interface OrderItem {
  id: number
  productName: string
  price: number
  quantity: number
  totalPrice: number
}

export interface ApiError {
  message: string
  timestamp?: number
}