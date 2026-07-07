'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const FeaturedCategories = () => {
  const categories = [
    {
      name: 'Earrings',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      href: '/shop?category=Earrings',
      description: 'Elegant pieces for every occasion'
    },
    {
      name: 'Rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      href: '/shop?category=Rings',
      description: 'Timeless symbols of love'
    },
    {
      name: 'Neckwear',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      href: '/shop?category=Neckwear',
      description: 'Grace your neckline with luxury'
    },
    {
      name: 'Unisex',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      href: '/shop?category=Unisex',
      description: 'Modern pieces for everyone'
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

  return (
    <section className="py-20 bg-white">
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
            Discover Our Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each piece in our collection is thoughtfully designed to complement your unique style 
            while maintaining the timeless elegance of fine jewelry.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <Link href={category.href} className="block">
                <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square mb-4">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {category.name}
                    </span>
                  </div>
                  
                  {/* Hover Content */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white">
                      <p className="text-sm mb-3">{category.description}</p>
                      <span className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent/90 transition-colors">
                        Shop Now
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Category Info */}
                <div className="text-center">
                  <h3 className="text-xl font-playfair font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
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
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCategories