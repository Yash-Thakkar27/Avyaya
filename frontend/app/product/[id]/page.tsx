'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api, { endpoints } from '@/lib/api'
import { useAuthStore, useCartStore } from '@/lib/store'
import { 
  HeartIcon, 
  ShoppingBagIcon, 
  ShareIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

const ProductPage = () => {
  const params = useParams()
  const productId = params.id
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { addItem } = useCartStore()

  // Sample product data - in real app, this would come from API based on productId
  const product = {
    id: parseInt(productId as string),
    name: 'Eternal Solitaire Ring',
    price: 45000,
    originalPrice: 52000,
    category: 'Rings',
    material: '18K Gold',
    stone: '1ct Lab Diamond',
    description: 'The Eternal Solitaire Ring embodies timeless elegance with its classic design and exceptional craftsmanship. Featuring a stunning 1-carat lab-grown diamond set in premium 18K gold, this ring represents eternal love and commitment.',
    features: [
      'Certified lab-grown diamond',
      'Conflict-free and sustainable',
      '18K gold setting',
      'Lifetime warranty',
      'Professional certification included'
    ],
    specifications: {
      'Metal': '18K Gold',
      'Stone': '1ct Lab-grown Diamond',
      'Clarity': 'VS1',
      'Color': 'D (Colorless)',
      'Cut': 'Brilliant Round',
      'Setting': 'Four-prong solitaire',
      'Band Width': '2mm',
      'Ring Size': 'Adjustable (5-9)'
    },
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.8,
    reviews: 24,
    inStock: true,
    sku: 'AVY-RS-001'
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [selectedSize, setSelectedSize] = useState('7')
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart')
      router.push('/login')
      return
    }
    setIsAddingToCart(true)
    try {
      const response = await api.post(endpoints.cart.add, { productId: product.id, quantity })
      addItem(response.data)
      toast.success('Added to cart!')
    } catch {
      toast.error('Could not add to cart. Please try again.')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const sizes = ['5', '6', '7', '8', '9']
  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      date: '2024-02-15',
      comment: 'Absolutely stunning ring! The diamond sparkles beautifully and the craftsmanship is exceptional. Exactly what I was looking for.'
    },
    {
      id: 2,
      name: 'Arjun Patel',
      rating: 5,
      date: '2024-02-10',
      comment: 'Perfect for our engagement. The quality exceeded expectations and the delivery was prompt. Highly recommend Avyaya!'
    },
    {
      id: 3,
      name: 'Meera Krishnan',
      rating: 4,
      date: '2024-02-05',
      comment: 'Beautiful ring, great value for money. The lab-grown diamond looks identical to mined diamonds. Very satisfied with the purchase.'
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link 
          href="/shop" 
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-accent transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Shop</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === selectedImageIndex ? 'bg-accent' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === selectedImageIndex ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Product Header */}
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <h1 className="text-3xl font-playfair font-bold text-primary mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-primary mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-primary mb-3">Ring Size</h3>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-white'
                        : 'border-gray-300 text-gray-600 hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-primary mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2 py-4 disabled:opacity-70"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
                </button>
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="p-4 border border-gray-300 rounded-lg hover:border-accent transition-colors"
                >
                  {isFavorited ? (
                    <HeartSolidIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-600" />
                  )}
                </button>
                <button className="p-4 border border-gray-300 rounded-lg hover:border-accent transition-colors">
                  <ShareIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">In Stock</span>
                <span className="text-sm text-gray-500">• SKU: {product.sku}</span>
              </div>
            </div>

            {/* Delivery & Return Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <TruckIcon className="w-5 h-5 text-accent" />
                <span className="text-sm text-gray-600">Free delivery within 5-7 business days</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="w-5 h-5 text-accent" />
                <span className="text-sm text-gray-600">30-day return policy & lifetime warranty</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="py-4 px-2 border-b-2 border-accent text-accent font-medium">
                Specifications
              </button>
              <button className="py-4 px-2 text-gray-500 hover:text-primary">
                Reviews ({product.reviews})
              </button>
              <button className="py-4 px-2 text-gray-500 hover:text-primary">
                Care Instructions
              </button>
            </nav>
          </div>

          {/* Specifications */}
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-playfair font-bold text-primary mb-8">Customer Reviews</h3>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-primary">{review.name}</h4>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default ProductPage