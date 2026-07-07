import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'

// Auth Store
interface User {
  id: number
  name: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      
      login: (token: string, user: User) => {
        Cookies.set('token', token, { expires: 30 }) // 30 days
        set({ isAuthenticated: true, user, token })
      },
      
      logout: () => {
        Cookies.remove('token')
        set({ isAuthenticated: false, user: null, token: null })
      },
      
      initAuth: () => {
        const token = Cookies.get('token')
        if (token) {
          // In a real app, you'd validate the token with the server
          // For now, we'll just set authenticated to true if token exists
          set({ isAuthenticated: true, token })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)

// Cart Store
interface CartState {
  items: any[]
  isLoading: boolean
  error: string | null
  setItems: (items: any[]) => void
  addItem: (item: any) => void
  updateItem: (id: number, quantity: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isLoading: false,
  error: null,
  
  setItems: (items) => set({ items }),
  
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  
  updateItem: (id, quantity) => set((state) => ({
    items: state.items.map(item => 
      item.id === id ? { ...item, quantity } : item
    )
  })),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  clearCart: () => set({ items: [] }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
}))

// Product Store
interface ProductState {
  products: any[]
  categories: string[]
  currentProduct: any | null
  isLoading: boolean
  error: string | null
  setProducts: (products: any[]) => void
  setCategories: (categories: string[]) => void
  setCurrentProduct: (product: any | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setCurrentProduct: (currentProduct) => set({ currentProduct }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))

// UI Store
interface UIState {
  isMobileMenuOpen: boolean
  isCartOpen: boolean
  isSearchOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  
  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
  setCartOpen: (isCartOpen) => set({ isCartOpen }),
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
}))