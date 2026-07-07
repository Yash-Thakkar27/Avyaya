'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

const CustomerTrust = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'The quality of the diamond earrings exceeded my expectations. The craftsmanship is exquisite and the lab-grown diamonds are absolutely stunning.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b64c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'Rahul Gupta',
      location: 'Delhi',
      rating: 5,
      text: 'Purchased an engagement ring and the entire experience was seamless. The 90-day buyback guarantee gave me confidence in my investment.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      name: 'Sneha Patel',
      location: 'Bangalore',
      rating: 5,
      text: 'Love my minimalist necklace! It\'s perfect for daily wear and the hypoallergenic material is great for my sensitive skin.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ]

  const trustBadges = [
    {
      title: 'BIS Hallmark',
      subtitle: 'Certified Quality',
      icon: '🏅'
    },
    {
      title: 'Lab Grown',
      subtitle: 'Ethically Sourced',
      icon: '💎'
    },
    {
      title: 'Free Shipping',
      subtitle: 'Pan India',
      icon: '🚚'
    },
    {
      title: '90 Day Buyback',
      subtitle: 'Investment Protection',
      icon: '🛡️'
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
    <section className="py-20 bg-gradient-to-br from-background to-gold-50">
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
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community of satisfied customers who trust Avyaya for their 
            most precious moments and everyday elegance.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              variants={itemVariants}
              className="text-center bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-3">{badge.icon}</div>
              <h3 className="font-semibold text-primary mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-accent" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              {/* Customer Info */}
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-primary rounded-lg p-8 md:p-12">
            <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-white mb-4">
              Ready to Find Your Perfect Piece?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the Avyaya difference with our premium collection of lab-grown 
              diamond jewelry. Every piece comes with our quality guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium">
                Shop Now
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-all font-medium">
                Book Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CustomerTrust