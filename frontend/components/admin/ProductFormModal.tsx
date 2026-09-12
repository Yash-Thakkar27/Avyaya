'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, PhotoIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
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
const MAX_IMAGES = 5

interface FormState {
  name: string
  description: string
  price: string
  category: string
  material: string
  stone: string
  stock: string
  badge: string
}

const empty: FormState = {
  name: '', description: '', price: '', category: 'Rings',
  material: '', stone: '', stock: '', badge: ''
}

export default function ProductFormModal({ isOpen, onClose, product, onSaved }: ProductFormModalProps) {
  const [form, setForm] = useState<FormState>(empty)
  const [saving, setSaving] = useState(false)
  const isEdit = !!product

  // ── Image state ──
  // Each slot is either: { kind: 'existing', url: string } or { kind: 'file', file: File, preview: string }
  type ImageSlot = { kind: 'existing'; url: string } | { kind: 'file'; file: File; preview: string }
  const [images, setImages] = useState<ImageSlot[]>([])
  const [draggingOver, setDraggingOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
        stock: String(product.stock ?? 0),
        badge: (product as any).badge ?? '',
      })
      // Rebuild image slots from existing URLs
      const slots: ImageSlot[] = []
      if (product.imageUrl) slots.push({ kind: 'existing', url: product.imageUrl })
      if (product.imageUrls) {
        product.imageUrls.split(',').forEach(u => {
          const trimmed = u.trim()
          if (trimmed) slots.push({ kind: 'existing', url: trimmed })
        })
      }
      setImages(slots)
    } else {
      setForm(empty)
      setImages([])
    }
  }, [product, isOpen])

  // Cleanup object URLs on unmount / close
  useEffect(() => {
    return () => {
      images.forEach(img => { if (img.kind === 'file') URL.revokeObjectURL(img.preview) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  // ── Add images from file list ──
  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return
    const available = MAX_IMAGES - images.length
    if (available <= 0) { toast.error(`Maximum ${MAX_IMAGES} photos allowed.`); return }
    const accepted = Array.from(fileList).slice(0, available)
    const newSlots: ImageSlot[] = accepted.map(file => ({
      kind: 'file', file, preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newSlots])
  }, [images.length])

  const removeImage = (index: number) => {
    setImages(prev => {
      const slot = prev[index]
      if (slot.kind === 'file') URL.revokeObjectURL(slot.preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  // Drag handlers
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDraggingOver(true) }
  const onDragLeave = () => setDraggingOver(false)
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDraggingOver(false)
    addFiles(e.dataTransfer.files)
  }

  // ── Upload a single file, return hosted URL ──
  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await api.post(endpoints.products.upload, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data.url as string
  }

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category || form.stock === '') {
      toast.error('Please fill in all required fields.')
      return
    }
    if (images.length === 0) {
      toast.error('Please add at least one product photo.')
      return
    }

    setSaving(true)
    try {
      // Upload any new file slots
      const resolvedUrls: string[] = []
      for (const slot of images) {
        if (slot.kind === 'existing') {
          resolvedUrls.push(slot.url)
        } else {
          const url = await uploadFile(slot.file)
          resolvedUrls.push(url)
        }
      }

      const primaryUrl = resolvedUrls[0]
      const additionalUrls = resolvedUrls.slice(1).join(',')

      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        material: form.material,
        stone: form.stone,
        imageUrl: primaryUrl,
        imageUrls: additionalUrls || null,
        stock: parseInt(form.stock),
      }

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
            className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-lg font-playfair font-bold text-gray-100">
                {isEdit ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

              {/* ── Photo Upload ── */}
              <div>
                <label className={labelCls}>
                  Product Photos * <span className="text-gray-600 font-normal">({images.length}/{MAX_IMAGES}) — first photo is the main image</span>
                </label>

                {/* Drop Zone */}
                {images.length < MAX_IMAGES && (
                  <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                      draggingOver
                        ? 'border-accent bg-accent/10 scale-[1.01]'
                        : 'border-gray-700 hover:border-accent/60 hover:bg-gray-800/60'
                    }`}
                  >
                    <PhotoIcon className="w-10 h-10 text-gray-600 mb-2" />
                    <p className="text-sm text-gray-400 text-center">
                      <span className="text-accent font-medium">Click to upload</span> or drag & drop photos
                    </p>
                    <p className="text-xs text-gray-600 mt-1">PNG, JPG, WEBP — up to {MAX_IMAGES} photos</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={e => addFiles(e.target.files)}
                    />
                  </div>
                )}

                {/* Image previews */}
                {images.length > 0 && (
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {images.map((slot, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slot.kind === 'file' ? slot.preview : slot.url}
                          alt={`Photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {/* Primary badge */}
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-accent text-white text-[9px] font-bold px-1 py-0.5 rounded">Main</span>
                        )}
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 p-0.5 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <TrashIcon className="w-3.5 h-3.5 text-white" />
                        </button>
                        {/* Uploading indicator */}
                        {slot.kind === 'file' && saving && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                    ))}
                    {/* Add more slot */}
                    {images.length < MAX_IMAGES && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-lg border-2 border-dashed border-gray-700 flex flex-col items-center justify-center hover:border-accent/60 hover:bg-gray-800/60 transition-colors"
                      >
                        <PlusIcon className="w-5 h-5 text-gray-600" />
                      </button>
                    )}
                  </div>
                )}
              </div>

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
              <div className="flex gap-3 pt-2 pb-1">
                <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-accent hover:bg-accent/90 disabled:opacity-60 text-white rounded-lg transition-all text-sm font-semibold flex items-center justify-center gap-2">
                  {saving && <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
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
