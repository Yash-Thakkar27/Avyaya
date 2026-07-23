'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  SparklesIcon,
  CurrencyRupeeIcon,
  TruckIcon,
  CubeIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const USPSection = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: 'Certified Lab Diamonds',
      description: 'Ethically sourced lab-grown diamonds with the same brilliance and quality as mined diamonds.',
      color: 'text-blue-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'BIS Hallmark',
      description: 'All our jewelry comes with BIS hallmark certification ensuring purity and quality.',
      color: 'text-green-600'
    },
    {
      icon: CurrencyRupeeIcon,
      title: '90 Day Buyback',
      description: 'Investment protection with our 90-day buyback guarantee on all purchases.',
      color: 'text-accent'
    },
    {
      icon: TruckIcon,
      title: 'Free Shipping',
      description: 'Complimentary shipping across India with secure packaging and insurance.',
      color: 'text-purple-600'
    },
    {
      icon: CubeIcon,
      title: 'Hypoallergenic',
      description: 'Safe for sensitive skin with premium materials that prevent allergic reactions.',
      color: 'text-pink-600'
    },
    {
      icon: HeartIcon,
      title: 'Lifetime Service',
      description: 'Complimentary cleaning, polishing, and maintenance for the lifetime of your jewelry.',
      color: 'text-red-600'
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
    <section className="py-20 bg-gradient-to-br from-gray-950 to-gray-900">
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
            The Avyaya Promise
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We're committed to providing you with exceptional jewelry that combines
            timeless beauty, ethical sourcing, and uncompromising quality.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 h-full card-hover border border-gray-700/50">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-playfair font-semibold text-primary mb-4 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative element */}
                  <div className="mt-6">
                    <div className="w-12 h-1 bg-gradient-to-r from-accent to-gold-400 rounded-full group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 pt-16 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
        </motion.div>
      </div>
    </section>
  )
}

export default USPSection