'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import api, { endpoints, Product } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import ProductFormModal from '@/components/admin/ProductFormModal'

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-900/30 px-2 py-0.5 rounded-full"><XCircleIcon className="w-3 h-3" />Sold Out</span>
  if (stock <= 5)
    return <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded-full"><ExclamationTriangleIcon className="w-3 h-3" />Low ({stock})</span>
  return <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full"><CheckCircleIcon className="w-3 h-3" />In Stock ({stock})</span>
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [stockEditing, setStockEditing] = useState<{ [id: number]: string }>({})

  // ── Fetch all products ──
  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get(endpoints.products.getAll)
      setProducts(res.data)
    } catch {
      toast.error('Failed to load products.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // ── Logout ──
  const handleLogout = () => {
    logout()
    Cookies.remove('adminRole')
    router.push('/admin/login')
  }

  // ── Delete ──
  const handleDelete = async (id: number) => {
    try {
      await api.delete(endpoints.products.delete(id))
      toast.success('Product deleted.')
      setDeleteId(null)
      fetchProducts()
    } catch {
      toast.error('Failed to delete product.')
    }
  }

  // ── Inline stock update ──
  const handleStockSave = async (product: Product) => {
    const raw = stockEditing[product.id]
    if (raw === undefined) return
    const newStock = parseInt(raw)
    if (isNaN(newStock) || newStock < 0) { toast.error('Invalid stock value.'); return }

    try {
      await api.put(endpoints.products.update(product.id), {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        material: product.material,
        stone: product.stone,
        imageUrl: product.imageUrl,
        stock: newStock,
      })
      toast.success('Stock updated!')
      setStockEditing(prev => { const n = { ...prev }; delete n[product.id]; return n })
      fetchProducts()
    } catch {
      toast.error('Failed to update stock.')
    }
  }

  // ── Filtered list ──
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  // ── Stats ──
  const soldOut = products.filter(p => p.stock === 0).length
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* ── Header ── */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CubeIcon className="w-6 h-6 text-accent" />
            <span className="font-playfair font-bold text-lg text-gray-100">Avyaya Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {user?.name ?? 'Admin'}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Stats cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Products', value: products.length, color: 'text-blue-400' },
            { label: 'Sold Out', value: soldOut, color: 'text-red-400' },
            { label: 'Low Stock', value: lowStock, color: 'text-amber-400' },
            { label: 'Inventory Value', value: fmt(totalValue), color: 'text-green-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-9 pr-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <button
            onClick={() => { setEditProduct(null); setModalOpen(true) }}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-all hover:shadow-lg hover:shadow-accent/20"
          >
            <PlusIcon className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* ── Product table ── */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading products…</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              {search ? 'No products match your search.' : 'No products yet. Click "Add Product" to create one.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Stock</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filtered.map(product => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`group hover:bg-gray-800/50 transition-colors ${product.stock === 0 ? 'opacity-70' : ''}`}
                    >
                      {/* Product name + image */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product.imageUrl ? (
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                              <CubeIcon className="w-5 h-5 text-gray-500" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-100 leading-tight">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.material} • {product.stone}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 text-gray-400">{product.category}</td>

                      {/* Price */}
                      <td className="px-4 py-3 font-semibold text-accent">{fmt(product.price)}</td>

                      {/* Inline stock editor */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={stockEditing[product.id] ?? product.stock}
                            onChange={e =>
                              setStockEditing(prev => ({ ...prev, [product.id]: e.target.value }))
                            }
                            className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 text-gray-100 rounded text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                          {stockEditing[product.id] !== undefined && (
                            <button
                              onClick={() => handleStockSave(product)}
                              className="text-xs text-green-400 hover:text-green-300 font-medium transition-colors"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="px-4 py-3">
                        <StockBadge stock={
                          stockEditing[product.id] !== undefined
                            ? parseInt(stockEditing[product.id]) || 0
                            : product.stock
                        } />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditProduct(product); setModalOpen(true) }}
                            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(product.id)}
                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Product Form Modal ── */}
      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditProduct(null) }}
        product={editProduct}
        onSaved={fetchProducts}
      />

      {/* ── Delete Confirm Modal ── */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-900/30 rounded-full p-2">
                <TrashIcon className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="font-semibold text-gray-100">Delete Product</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure? This action cannot be undone and will permanently remove the product.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-semibold">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
