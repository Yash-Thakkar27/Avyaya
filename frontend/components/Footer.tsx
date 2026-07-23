'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' }
    ],
    customer: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Care Instructions', href: '/care' },
      { name: 'Returns', href: '/returns' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Shipping Policy', href: '/shipping' },
      { name: 'Refund Policy', href: '/refund' }
    ]
  }

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Pinterest', href: '#', icon: '📌' }
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Avyaya"
                  width={180}
                  height={70}
                  className="h-14 w-auto object-contain mb-4 brightness-0 invert"
                />
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Eternal as your love. We create minimalist fine jewelry with lab-grown 
                diamonds designed for daily wear with investment value. Every piece 
                tells a story of love, commitment, and timeless elegance.
              </p>
              
              {/* Newsletter */}
              <div>
                <h4 className="font-semibold mb-3">Stay Updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-accent"
                  />
                  <button className="bg-accent hover:bg-accent/90 px-6 py-2 rounded-r-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2">
              {footerLinks.customer.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-700 mt-12 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 lg:mb-0">
              © {new Date().getFullYear()} Avyaya. All rights reserved. Made with ❤️ in India.
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-accent transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h5 className="font-semibold text-accent mb-2">📞 Call Us</h5>
              <p className="text-gray-300 text-sm">+91 98765 43210</p>
              <p className="text-gray-400 text-xs">Mon-Sat 10AM-7PM</p>
            </div>
            <div>
              <h5 className="font-semibold text-accent mb-2">📧 Email Us</h5>
              <p className="text-gray-300 text-sm">hello@avyaya.com</p>
              <p className="text-gray-400 text-xs">We reply within 24 hours</p>
            </div>
            <div>
              <h5 className="font-semibold text-accent mb-2">📍 Visit Us</h5>
              <p className="text-gray-300 text-sm">Mumbai, India</p>
              <p className="text-gray-400 text-xs">By appointment only</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer