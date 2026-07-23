'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import api, { endpoints } from '@/lib/api'
import { useAuthStore, useCartStore } from '@/lib/store'

const ShopPage = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { addItem } = useCartStore()
  const [loadingId, setLoadingId] = useState<number | null>(null)
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [apiLoading, setApiLoading] = useState(true)

  // Fetch real products from backend
  useEffect(() => {
    api.get(endpoints.products.getAll)
      .then(res => setAllProducts(res.data))
      .catch(() => toast.error('Failed to load products.'))
      .finally(() => setApiLoading(false))
  }, [])


  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['All', 'Rings', 'Earrings', 'Neckwear', 'Bracelets']
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ]

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
        default:
          return b.id - a.id
      }
    })

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, priceRange, sortBy, allProducts])

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

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'Bestseller': return 'bg-accent text-white'
      case 'New': return 'bg-green-500 text-white'
      case 'Sale': return 'bg-red-500 text-white'
      case 'Limited': return 'bg-purple-500 text-white'
      case 'Featured': return 'bg-blue-500 text-white'
      case 'Premium': return 'bg-amber-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-playfair font-bold text-primary mb-4">Our Collection</h1>
            <p className="text-lg text-gray-400">
              Discover our complete range of luxury jewelry pieces crafted with precision and designed to last a lifetime.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Loading skeleton */}
      {apiLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl h-72 animate-pulse" />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jewelry..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Categories
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-accent text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Price Range
                </label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{formatPrice(0)}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gray-800 text-gray-200 px-4 py-3 rounded-lg shadow border border-gray-700"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="card overflow-hidden border border-gray-700/50">
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <Image
                          src={product.imageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Sold Out overlay */}
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-sm bg-red-600 px-3 py-1 rounded-full tracking-wide">SOLD OUT</span>
                          </div>
                        )}

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(product.id)
                          }}
                          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors duration-300"
                        >
                          {favorites.includes(product.id) ? (
                            <HeartSolidIcon className="w-5 h-5 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
                          )}
                        </button>

                        {/* Quick Actions */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex space-x-3">
                            <Link
                              href={`/product/${product.id}`}
                              className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                            >
                              View Details
                            </Link>
                             <button
                               onClick={(e) => {
                                 e.preventDefault()
                                 handleAddToCart(product.id)
                               }}
                               disabled={loadingId === product.id || product.stock === 0}
                               className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors font-medium flex items-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                             >
                               <ShoppingBagIcon className="w-4 h-4" />
                               <span>
                                 {product.stock === 0 ? 'Sold Out' : loadingId === product.id ? 'Adding...' : 'Add to Cart'}
                               </span>
                             </button>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        {/* Category */}
                        <p className="text-sm text-gray-400 mb-2">{product.category}</p>

                        {/* Product Name */}
                        <h3 className="text-lg font-playfair font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                          {product.name}
                        </h3>

                        {/* Material & Stone */}
                        <p className="text-sm text-gray-400 mb-3">
                          {product.material} • {product.stone}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                           <span className="text-sm text-gray-400">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                          {product.originalPrice && (
                            <span className="text-sm text-green-600 font-medium">
                              Save {formatPrice(product.originalPrice - product.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('All')
                    setPriceRange([0, 100000])
                  }}
                  className="mt-4 btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ShopPage