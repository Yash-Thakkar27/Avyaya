'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  SparklesIcon,
  ShieldCheckIcon,
  HeartIcon,
  GlobeAltIcon,
  UserGroupIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const AboutPage = () => {
  const values = [
    {
      icon: SparklesIcon,
      title: 'Exceptional Craftsmanship',
      description: 'Every piece is meticulously crafted by skilled artisans who bring decades of experience to their work.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Ethical Sourcing',
      description: 'We use only lab-grown diamonds and ethically sourced materials, ensuring our jewelry is conflict-free.'
    },
    {
      icon: HeartIcon,
      title: 'Emotional Connection',
      description: 'We believe jewelry should tell your story and celebrate life\'s most precious moments.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Sustainable Practices',
      description: 'Our commitment to sustainability extends to every aspect of our business operations.'
    }
  ]

  const milestones = [
    {
      year: '2019',
      title: 'Founded',
      description: 'Avyaya was founded with a vision to revolutionize the jewelry industry.'
    },
    {
      year: '2020',
      title: 'Lab-Diamond Pioneer',
      description: 'Became one of the first luxury brands to exclusively use lab-grown diamonds.'
    },
    {
      year: '2021',
      title: 'Digital Innovation',
      description: 'Launched our online platform with custom design capabilities.'
    },
    {
      year: '2022',
      title: 'Sustainability Certified',
      description: 'Achieved carbon-neutral operations and sustainable packaging.'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded internationally while maintaining our commitment to quality.'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Unique Designs' },
    { number: '99.9%', label: 'Customer Satisfaction' },
    { number: '5 Years', label: 'Of Excellence' }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-primary mb-6">
              Eternal as your love
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Avyaya, we craft luxury jewelry with lab-grown diamonds that celebrates life's most precious moments. 
              Our commitment to ethical practices and exceptional quality makes every piece a symbol of eternal love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Avyaya began with a simple yet powerful vision: to create luxury jewelry that doesn't compromise 
                  on ethics or beauty. Founded by passionate artisans and visionaries, we set out to revolutionize 
                  the jewelry industry by embracing lab-grown diamonds and sustainable practices.
                </p>
                <p>
                  Our name "Avyaya" comes from Sanskrit, meaning "eternal" or "imperishable" – reflecting our 
                  belief that love, like the jewelry we create, should last forever. Every piece we craft is 
                  designed to be treasured across generations, carrying with it the stories and memories of 
                  those who wear it.
                </p>
                <p>
                  Today, we continue to push boundaries in design, sustainability, and craftsmanship, ensuring 
                  that each piece of Avyaya jewelry represents the highest standards of quality and ethical 
                  responsibility.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Avyaya jewelry craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do, from design to delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary mb-6">
              Ready to Find Your Perfect Piece?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our collection of ethically crafted, luxury jewelry pieces that celebrate life's most precious moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/shop" className="btn-primary">
                Shop Collection
              </a>
              <a href="/contact" className="btn-secondary">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage