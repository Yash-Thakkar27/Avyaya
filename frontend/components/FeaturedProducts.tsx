'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { EnvelopeIcon, SparklesIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import api, { endpoints, Product } from '@/lib/api'

const CONTACT_EMAIL = 'avyayajewels@gmail.com'

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(endpoints.products.getAll)
      .then(res => setProducts((res.data as Product[]).slice(0, 4)))
      .catch(() => toast.error('Failed to load featured products.'))
      .finally(() => setLoading(false))
  }, [])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  // Skeleton loader
  if (loading) {
    return (
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 bg-gray-800 rounded-lg animate-pulse w-64 mx-auto mb-4" />
            <div className="h-5 bg-gray-800 rounded animate-pulse w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Handpicked pieces that embody sophistication, craftsmanship, and timeless elegance.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 border border-gray-700/50 flex flex-col">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-700">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <SparklesIcon className="w-12 h-12 text-gray-600" />
                    </div>
                  )}

                  {/* Sold Out overlay */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-sm bg-red-600 px-3 py-1 rounded-full tracking-wide">SOLD OUT</span>
                    </div>
                  )}

                  {/* Quick View overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      href={`/product/${product.id}`}
                      className="bg-white text-primary px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-accent font-medium uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="text-base font-playfair font-semibold text-primary mb-1 group-hover:text-accent transition-colors line-clamp-1">
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-1">
                    {[product.material, product.stone].filter(Boolean).join(' • ')}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}`}
                      className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 font-medium transition-colors"
                    >
                      <EnvelopeIcon className="w-4 h-4" />
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Shop All Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-lg transition-colors"
          >
            Shop All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts