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

  const socialLinks: { name: string; href: string; icon: React.ReactNode }[] = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/avyayajewels/?hl=en',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" fill="url(#ig-grad)" />
          <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
        </svg>
      )
    },
    { name: 'Facebook', href: '#', icon: <span className="text-xl">📘</span> },
    { name: 'Twitter', href: '#', icon: <span className="text-xl">🐦</span> },
    { name: 'Pinterest', href: '#', icon: <span className="text-xl">📌</span> }
  ]

  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800">
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
                <h4 className="font-semibold text-gray-100 mb-3">Stay Updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-l-lg focus:outline-none focus:border-accent"
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
            <h4 className="font-semibold text-gray-100 mb-4">Company</h4>
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
            <h4 className="font-semibold text-gray-100 mb-4">Customer Care</h4>
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
            <h4 className="font-semibold text-gray-100 mb-4">Legal</h4>
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

        {/* Book a Consultation CTA */}
        <motion.div
          className="border-t border-gray-700 mt-12 pt-10 pb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-800/50 rounded-2xl px-8 py-7 border border-gray-700">
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Ready to find your perfect piece?</h4>
              <p className="text-gray-400 text-sm">Book a free 1-on-1 consultation with our jewelry experts.</p>
            </div>
            <a
              href="mailto:avyayajewels@gmail.com?subject=Consultation%20Request&body=Hi%20Avyaya%20Team%2C%0A%0AI%20would%20like%20to%20book%20a%20consultation.%0A%0AName%3A%20%0APhone%3A%20%0APreferred%20Time%3A%20"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0 text-sm whitespace-nowrap"
            >
              <span>✉️</span>
              Book a Consultation
            </a>
          </div>
        </motion.div>

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
            <div className="text-gray-300 text-sm mb-4 lg:mb-0">
              © 2025 Avyaya. All rights reserved. Made with ❤️ in India.
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:opacity-80 transition-opacity"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h5 className="font-semibold text-accent mb-2">Call Us</h5>
              <p className="text-gray-200 text-sm">+91 98207 77037</p>
              <p className="text-gray-400 text-xs">Mon-Sat 10AM-7PM</p>
            </div>
            <div>
              <h5 className="font-semibold text-accent mb-2">Email Us</h5>
              <p className="text-gray-200 text-sm">avyayajewels@gmail.com</p>
              <p className="text-gray-400 text-xs">We reply within 24 hours</p>
            </div>
            <div>
              <h5 className="font-semibold text-accent mb-2">Visit Us</h5>
              <p className="text-gray-200 text-sm">Mumbai, India</p>
              <p className="text-gray-400 text-xs">By appointment only</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer