'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  MinusIcon, 
  PlusIcon, 
  TrashIcon,
  ShoppingBagIcon,
  ArrowLeftIcon,
  GiftIcon,
  TruckIcon
} from '@heroicons/react/24/outline'

const CartPage = () => {
  // Sample cart items - in real app, this would come from state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Eternal Solitaire Ring',
      price: 45000,
      quantity: 1,
      size: '7',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      category: 'Rings',
      material: '18K Gold',
      stone: '1ct Lab Diamond'
    },
    {
      id: 2,
      name: 'Classic Drop Earrings',
      price: 32000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      category: 'Earrings',
      material: '18K Gold',
      stone: '0.5ct Lab Diamond'
    }
  ])

  const [promoCode, setPromoCode] = useState('')
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50000 ? 0 : 1500
  const promoDiscount = isPromoApplied ? subtotal * 0.1 : 0
  const taxes = (subtotal - promoDiscount) * 0.18
  const total = subtotal - promoDiscount + taxes + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'AVYAYA10') {
      setIsPromoApplied(true)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-accent transition-colors mb-4"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Continue Shopping</span>
              </Link>
              <h1 className="text-4xl font-playfair font-bold text-primary">Shopping Cart</h1>
              <p className="text-lg text-gray-600 mt-2">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </motion.div>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ShoppingBagIcon className="w-16 h-16 text-accent opacity-20" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-primary mb-2">
                            <Link href={`/product/${item.id}`} className="hover:text-accent transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">
                            {item.material} • {item.stone}
                          </p>
                          <p className="text-sm text-gray-500 mb-4">
                            Category: {item.category}
                            {item.size && ` • Size: ${item.size}`}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3 border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                              >
                                <MinusIcon className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                              >
                                <PlusIcon className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
                            >
                              <TrashIcon className="w-4 h-4" />
                              <span className="text-sm">Remove</span>
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-500">
                              {formatPrice(item.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Promo Code */}
              <motion.div
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <GiftIcon className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-primary">Promo Code</h3>
                </div>
                
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    disabled={isPromoApplied}
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={isPromoApplied}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      isPromoApplied
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : 'bg-accent text-white hover:bg-accent/90'
                    }`}
                  >
                    {isPromoApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                
                {isPromoApplied && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ Promo code applied! You saved {formatPrice(promoDiscount)}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 sticky top-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-primary mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span>-{formatPrice(promoDiscount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">{formatPrice(taxes)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <span className="text-gray-600">Shipping</span>
                      {subtotal > 50000 && (
                        <p className="text-xs text-green-600">Free shipping!</p>
                      )}
                    </div>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TruckIcon className="w-5 h-5 text-accent" />
                    <span className="font-medium text-primary">Delivery Information</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Estimated delivery: 5-7 business days<br />
                    {subtotal < 50000 && 'Free shipping on orders over ₹50,000'}
                  </p>
                </div>

                {/* Checkout Button */}
                <button className="w-full btn-primary text-lg py-4 mb-4">
                  Proceed to Checkout
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Secure checkout with 256-bit SSL encryption
                </p>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBagIcon className="w-24 h-24 text-gray-300 mx-auto mb-8" />
            <h2 className="text-3xl font-playfair font-bold text-primary mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. 
              Start shopping to fill it up with beautiful jewelry pieces.
            </p>
            <Link href="/shop" className="btn-primary inline-flex items-center">
              Start Shopping
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default CartPage