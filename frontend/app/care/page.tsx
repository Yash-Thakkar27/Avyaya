'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const careCategories = [
  {
    id: 'daily',
    icon: '🌟',
    title: 'Daily Care',
    subtitle: 'Simple habits to keep your jewellery radiant',
    tips: [
      { title: 'Last on, First off', desc: 'Always put your jewellery on last when getting ready — after perfume, lotions, and hairspray. Remove it first when undressing.' },
      { title: 'Avoid Chemicals', desc: 'Remove jewellery before applying perfume, body lotion, sunscreen, or hairspray. Chemicals can dull the metal and damage stones.' },
      { title: 'Remove During Activities', desc: 'Always remove jewellery before sleeping, exercising, swimming, or household chores. Physical impact and moisture are the biggest enemies.' },
      { title: 'Wipe After Wearing', desc: 'After each use, gently wipe your pieces with a soft, lint-free cloth to remove oils and sweat before storing.' },
    ]
  },
  {
    id: 'cleaning',
    icon: '✨',
    title: 'Cleaning',
    subtitle: 'Keep your pieces sparkling at home',
    tips: [
      { title: 'Gentle Soap & Water', desc: 'Prepare a solution of mild dish soap and lukewarm water. Soak your jewellery for 10–15 minutes, then gently scrub with a soft toothbrush.' },
      { title: 'Rinse Thoroughly', desc: 'Rinse under clean lukewarm running water, ensuring no soap remains in any crevices around stones or settings.' },
      { title: 'Pat Dry', desc: 'Pat dry with a soft, absorbent cloth. Allow to air dry completely before storing — moisture trapped in settings can cause damage over time.' },
      { title: 'Avoid Ultrasonic Cleaners at Home', desc: 'Unless advised by a jeweller, avoid ultrasonic cleaners for jewellery with glued settings or filled gemstones.' },
    ]
  },
  {
    id: 'storage',
    icon: '📦',
    title: 'Storage',
    subtitle: 'Proper storage prevents scratches and tarnish',
    tips: [
      { title: 'Store Separately', desc: 'Keep each piece in its own pouch or compartment. Diamonds are extremely hard and can scratch softer metals and gemstones.' },
      { title: 'Use Your Avyaya Box', desc: 'Your Avyaya jewellery box is lined with soft material designed to protect your pieces. Use it for long-term storage.' },
      { title: 'Cool, Dry Place', desc: 'Store jewellery away from direct sunlight, heat, and humidity. Avoid storing in bathrooms where steam and moisture are common.' },
      { title: 'Anti-Tarnish Strips', desc: 'For silver pieces, place anti-tarnish strips in your storage box to slow oxidation and maintain brightness.' },
    ]
  },
  {
    id: 'lab-diamonds',
    icon: '💎',
    title: 'Lab-Grown Diamonds',
    subtitle: 'Your diamonds are identical to natural — care for them the same way',
    tips: [
      { title: 'Same as Natural Diamonds', desc: 'Lab-grown diamonds have identical physical, chemical, and optical properties to mined diamonds. They require the same care.' },
      { title: 'Oils and Fingerprints', desc: 'Diamonds attract grease and oils, which reduces their brilliance. Clean regularly using the soap and water method.' },
      { title: 'Professional Prong Checks', desc: 'Have prongs checked by a professional jeweller annually. Loose prongs can result in stone loss.' },
      { title: 'Hardness Advantage', desc: 'At 10 on the Mohs scale, diamonds are the hardest material — but the settings (gold, platinum) can get scratched. Be mindful of impacts.' },
    ]
  },
  {
    id: 'gold',
    icon: '🌕',
    title: 'Gold & Gold Vermeil',
    subtitle: 'Caring for your gold pieces',
    tips: [
      { title: 'Avoid Chlorine', desc: 'Chlorine (swimming pools, hot tubs, cleaning products) can permanently damage and discolour gold. Always remove before entering water.' },
      { title: 'Polishing', desc: 'Use a gold polishing cloth to restore shine. Avoid abrasive cloths or paper towels that can scratch.' },
      { title: 'Gold Vermeil Care', desc: 'Gold vermeil has a thicker gold plating than standard plated pieces. Avoid excessive rubbing and exposure to moisture to preserve the finish.' },
      { title: 'Professional Polishing', desc: 'For fine gold pieces, annual professional polishing and inspection keeps them looking brand new.' },
    ]
  },
  {
    id: 'professional',
    icon: '🔧',
    title: 'Professional Servicing',
    subtitle: 'When to bring it to us',
    tips: [
      { title: 'Annual Check-Up', desc: 'We recommend an annual professional inspection for fine jewellery, especially rings and bracelets that experience daily wear.' },
      { title: 'Signs to Watch For', desc: 'Loose stones, bent prongs, broken clasps, or visible scratches on the metal — these all warrant a professional look.' },
      { title: 'Avyaya Servicing', desc: 'We offer complimentary cleaning and inspection for all Avyaya pieces purchased with us. Contact us to schedule.' },
      { title: 'Ultrasonic Professional Cleaning', desc: 'Professional ultrasonic cleaning is safe for most solid metal and diamond jewellery when done by an expert.' },
    ]
  },
]

export default function CareInstructionsPage() {
  const [activeTab, setActiveTab] = useState('daily')
  const activeCategory = careCategories.find(c => c.id === activeTab)!

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-primary">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-1/3 w-96 h-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">Customer Care</p>
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-primary mb-6">
                Care Instructions
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Your Avyaya jewellery is crafted to last a lifetime. With the right care, it will shine for generations to come.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Do's and Don'ts */}
        <section className="py-10 border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="bg-surface border border-gray-800 rounded-2xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-accent font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">✓</span>
                  Do's
                </h3>
                <ul className="space-y-2">
                  {['Store each piece separately', 'Remove before swimming or bathing', 'Clean gently with soft cloth', 'Put jewellery on last when dressing', 'Have prongs checked annually'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="bg-surface border border-gray-800 rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-gray-400 font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-xs font-bold">✕</span>
                  Don'ts
                </h3>
                <ul className="space-y-2">
                  {['Expose to chlorine or bleach', 'Wear while exercising', 'Apply perfume or lotion on jewellery', 'Store in direct sunlight', 'Use abrasive cleaning materials'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tabbed Care Guides */}
        <section className="py-16 pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {careCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === cat.id
                      ? 'bg-accent text-white shadow-lg shadow-accent/20'
                      : 'bg-surface border border-gray-700 text-gray-400 hover:border-accent hover:text-accent'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Active Category Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-10">
                  <span className="text-5xl block mb-4">{activeCategory.icon}</span>
                  <h2 className="font-playfair text-3xl font-bold text-primary mb-2">{activeCategory.title}</h2>
                  <p className="text-gray-400">{activeCategory.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeCategory.tips.map((tip, i) => (
                    <motion.div
                      key={tip.title}
                      className="bg-surface border border-gray-800 rounded-2xl p-6 hover:border-accent/30 transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="text-white font-semibold mb-2">{tip.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom CTA */}
            <motion.div
              className="mt-20 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-2xl font-bold text-primary mb-3">Need Professional Care?</h2>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">We offer complimentary cleaning and inspection for all Avyaya purchases. Book a service appointment or reach out to our care team.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm">
                  Book a Service
                </Link>
                <Link href="/returns" className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 hover:border-accent hover:text-accent font-medium px-6 py-3 rounded-xl transition-all duration-200 text-sm">
                  View Return Policy
                </Link>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
