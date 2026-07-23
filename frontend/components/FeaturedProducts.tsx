'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import api, { endpoints } from '@/lib/api'
import { useAuthStore, useCartStore } from '@/lib/store'

const FeaturedProducts = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { addItem } = useCartStore()
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart')
      router.push('/login')
      return
    }
    setLoadingId(productId)
    try {
      const response = await api.post(endpoints.cart.add, { productId, quantity: 1 })
      addItem(response.data)
      toast.success('Added to cart!')
    } catch {
      toast.error('Could not add to cart. Please try again.')
    } finally {
      setLoadingId(null)
    }
  }

  // Mock featured products data
  const featuredProducts = [
    {
      id: 1,
      name: 'Eternal Solitaire Ring',
      price: 45000,
      originalPrice: 50000,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Rings',
      material: '18K Gold',
      stone: '1ct Lab Diamond'
    },
    {
      id: 2,
      name: 'Classic Drop Earrings',
      price: 32000,
      originalPrice: 35000,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Earrings',
      material: '18K Gold',
      stone: '0.5ct Lab Diamond'
    },
    {
      id: 3,
      name: 'Minimalist Chain Necklace',
      price: 28000,
      originalPrice: 30000,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Neckwear',
      material: '18K Gold',
      stone: 'Lab Diamond Accent'
    },
    {
      id: 4,
      name: 'Contemporary Band Ring',
      price: 25000,
      originalPrice: 28000,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Unisex',
      material: '18K Gold',
      stone: 'Lab Diamond Band'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

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
            Featured Products
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Handpicked pieces from our collection that embody sophistication, 
            craftsmanship, and timeless elegance.
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
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 border border-gray-700/50">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col space-y-2">
                      <button className="p-2 bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition-colors">
                        <HeartIcon className="w-5 h-5 text-gray-300 hover:text-accent" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={loadingId === product.id}
                        className="p-2 bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition-colors disabled:opacity-60"
                      >
                        <ShoppingBagIcon className="w-5 h-5 text-gray-300 hover:text-accent" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link 
                      href={`/product/${product.id}`}
                      className="bg-white text-primary px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-accent font-medium uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-playfair font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                    <Link href={`/product/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  
                  <div className="text-sm text-gray-500 mb-3">
                    <p>{product.material} • {product.stone}</p>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-600 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={loadingId === product.id}
                    className="w-full mt-4 btn-primary text-sm py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 disabled:opacity-60"
                  >
                    {loadingId === product.id ? 'Adding...' : 'Add to Cart'}
                  </button>
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