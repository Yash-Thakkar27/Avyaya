'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import api, { endpoints, Product } from '@/lib/api'

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  product?: Product | null   // null = create mode, Product = edit mode
  onSaved: () => void        // called after successful save so parent can refresh
}

const CATEGORIES = ['Rings', 'Earrings', 'Neckwear', 'Bracelets', 'Other']
const BADGES = ['', 'Bestseller', 'New', 'Sale', 'Limited', 'Featured', 'Premium']

interface FormState {
  name: string
  description: string
  price: string
  category: string
  material: string
  stone: string
  imageUrl: string
  stock: string
  badge: string
}

const empty: FormState = {
  name: '', description: '', price: '', category: 'Rings',
  material: '', stone: '', imageUrl: '', stock: '', badge: ''
}

export default function ProductFormModal({ isOpen, onClose, product, onSaved }: ProductFormModalProps) {
  const [form, setForm] = useState<FormState>(empty)
  const [saving, setSaving] = useState(false)
  const isEdit = !!product

  // Pre-fill when editing
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? '',
        description: product.description ?? '',
        price: String(product.price ?? ''),
        category: product.category ?? 'Rings',
        material: product.material ?? '',
        stone: product.stone ?? '',
        imageUrl: product.imageUrl ?? '',
        stock: String(product.stock ?? 0),
        badge: (product as any).badge ?? '',
      })
    } else {
      setForm(empty)
    }
  }, [product, isOpen])

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category || form.stock === '') {
      toast.error('Please fill in all required fields.')
      return
    }

    setSaving(true)
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      material: form.material,
      stone: form.stone,
      imageUrl: form.imageUrl,
      stock: parseInt(form.stock),
    }

    try {
      if (isEdit && product) {
        await api.put(endpoints.products.update(product.id), payload)
        toast.success('Product updated!')
      } else {
        await api.post(endpoints.products.create, payload)
        toast.success('Product created!')
      }
      onSaved()
      onClose()
    } catch {
      toast.error('Failed to save product. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const inputCls = "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition-colors"
  const labelCls = "block text-xs font-medium text-gray-400 mb-1"

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-playfair font-bold text-gray-100">
                {isEdit ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {/* Name */}
              <div>
                <label className={labelCls}>Product Name *</label>
                <input value={form.name} onChange={set('name')} placeholder="Eternal Solitaire Ring" required className={inputCls} />
              </div>

              {/* Description */}
              <div>
                <label className={labelCls}>Description</label>
                <textarea value={form.description} onChange={set('description')} placeholder="A beautiful piece crafted with…" rows={3} className={inputCls + ' resize-none'} />
              </div>

              {/* Price / Category row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Price (₹) *</label>
                  <input type="number" min="0" value={form.price} onChange={set('price')} placeholder="45000" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Category *</label>
                  <select value={form.category} onChange={set('category')} className={inputCls}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Material / Stone row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Material</label>
                  <input value={form.material} onChange={set('material')} placeholder="18K Gold" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Stone</label>
                  <input value={form.stone} onChange={set('stone')} placeholder="1ct Lab Diamond" className={inputCls} />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className={labelCls}>Image URL</label>
                <input value={form.imageUrl} onChange={set('imageUrl')} placeholder="https://..." className={inputCls} />
              </div>

              {/* Stock / Badge row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Stock *</label>
                  <input type="number" min="0" value={form.stock} onChange={set('stock')} placeholder="10" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Badge</label>
                  <select value={form.badge} onChange={set('badge')} className={inputCls}>
                    {BADGES.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
                  </select>
                </div>
              </div>

              {/* Stock preview */}
              {form.stock !== '' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Stock status:</span>
                  {parseInt(form.stock) === 0
                    ? <span className="text-xs font-semibold text-red-400 bg-red-900/30 px-2 py-0.5 rounded-full">Sold Out</span>
                    : parseInt(form.stock) <= 5
                    ? <span className="text-xs font-semibold text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded-full">Low Stock ({form.stock} left)</span>
                    : <span className="text-xs font-semibold text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">In Stock ({form.stock} units)</span>
                  }
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-accent hover:bg-accent/90 disabled:opacity-60 text-white rounded-lg transition-all text-sm font-semibold">
                  {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
