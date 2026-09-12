'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import api, { endpoints, Product } from '@/lib/api'
import {
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  TruckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const CONTACT_EMAIL = 'avyayajewels@gmail.com'

const ProductPage = () => {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [copied, setCopied] = useState(false)

  // Build full image list from primary + imageUrls
  const allImages: string[] = []
  if (product?.imageUrl) allImages.push(product.imageUrl)
  if (product?.imageUrls) {
    product.imageUrls.split(',').forEach(u => { const t = u.trim(); if (t) allImages.push(t) })
  }

  useEffect(() => {
    if (!productId) return
    setLoading(true)
    api.get(endpoints.products.getById(parseInt(productId)))
      .then(res => setProduct(res.data))
      .catch(() => toast.error('Failed to load product.'))
      .finally(() => setLoading(false))
  }, [productId])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)

  const nextImage = () => setSelectedImageIndex(prev => (prev + 1) % allImages.length)
  const prevImage = () => setSelectedImageIndex(prev => (prev - 1 + allImages.length) % allImages.length)

  // Build mailto link
  const mailtoLink = product
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}&body=${encodeURIComponent(`Hi Avyaya Jewels,\n\nI'm interested in purchasing "${product.name}" (₹${product.price.toLocaleString('en-IN')}).\n\nPlease share more details.\n\nThank you!`)}`
    : `mailto:${CONTACT_EMAIL}`

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast.success('Link copied!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Could not copy link.')
    }
  }

  // ── Loading skeleton ──
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-100 rounded animate-pulse w-3/4" />
              <div className="h-6 bg-gray-100 rounded animate-pulse w-1/4" />
              <div className="h-24 bg-gray-100 rounded animate-pulse" />
              <div className="h-14 bg-gray-100 rounded-xl animate-pulse w-full" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">Product not found.</p>
          <Link href="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-accent">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-accent">{product.category}</Link>
            <span>/</span>
            <span className="text-primary">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link href="/shop" className="inline-flex items-center space-x-2 text-gray-600 hover:text-accent transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Shop</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Image Gallery ── */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {allImages.length > 0 ? (
                    <Image
                      src={allImages[selectedImageIndex]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <SparklesIcon className="w-16 h-16" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Arrows (only when multiple images) */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>

                  {/* Dot indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === selectedImageIndex ? 'bg-accent scale-125' : 'bg-white/60 hover:bg-white'}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Out of stock overlay */}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-sm bg-red-600 px-4 py-2 rounded-full tracking-wide">SOLD OUT</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedImageIndex ? 'border-accent shadow-md' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} view ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Product Information ── */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Header */}
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">{product.category}</p>
              <h1 className="text-3xl font-playfair font-bold text-primary mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                {product.stock > 0 && product.stock <= 5 && (
                  <span className="text-sm text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full">
                    Only {product.stock} left
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Details */}
            <div className="bg-gray-50 rounded-xl p-5 space-y-3">
              {product.material && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Material</span>
                  <span className="text-gray-600">{product.material}</span>
                </div>
              )}
              {product.stone && (
                <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                  <span className="font-medium text-gray-700">Stone</span>
                  <span className="text-gray-600">{product.stone}</span>
                </div>
              )}
              <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                <span className="font-medium text-gray-700">Category</span>
                <span className="text-gray-600">{product.category}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                <span className="font-medium text-gray-700">Availability</span>
                {product.stock > 0
                  ? <span className="text-green-600 font-semibold">In Stock</span>
                  : <span className="text-red-600 font-semibold">Sold Out</span>
                }
              </div>
            </div>

            {/* ── Contact to Purchase CTA ── */}
            <div className="space-y-3">
              <motion.a
                href={mailtoLink}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-3 bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg shadow-accent/20 text-base"
              >
                <EnvelopeIcon className="w-5 h-5" />
                Enquire to Purchase
              </motion.a>

              <p className="text-center text-sm text-gray-500">
                Contact us at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent font-medium hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            {/* Wishlist + Share */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:border-accent hover:bg-red-50 transition-all text-sm font-medium text-gray-600"
              >
                {isFavorited
                  ? <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  : <HeartIcon className="w-5 h-5" />
                }
                {isFavorited ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:border-accent transition-all text-sm font-medium text-gray-600"
              >
                <ShareIcon className="w-5 h-5" />
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>

            {/* Trust badges */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <TruckIcon className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Free delivery within 5–7 business days</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheckIcon className="w-5 h-5 text-accent flex-shrink-0" />
                <span>30-day return policy &amp; lifetime warranty</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <EnvelopeIcon className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Personalised assistance — email us anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default ProductPage