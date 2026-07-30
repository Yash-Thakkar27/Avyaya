'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ringData = [
  { size: '4', diameter: '14.8 mm', circumference: '46.5 mm', usSz: '4', ukSz: 'H', euSz: '47' },
  { size: '5', diameter: '15.7 mm', circumference: '49.3 mm', usSz: '5', ukSz: 'J', euSz: '49' },
  { size: '6', diameter: '16.5 mm', circumference: '51.9 mm', usSz: '6', ukSz: 'L', euSz: '52' },
  { size: '7', diameter: '17.3 mm', circumference: '54.4 mm', usSz: '7', ukSz: 'N', euSz: '54' },
  { size: '8', diameter: '18.2 mm', circumference: '57.2 mm', usSz: '8', ukSz: 'P', euSz: '57' },
  { size: '9', diameter: '19.0 mm', circumference: '59.7 mm', usSz: '9', ukSz: 'R', euSz: '60' },
  { size: '10', diameter: '19.8 mm', circumference: '62.1 mm', usSz: '10', ukSz: 'T', euSz: '62' },
  { size: '11', diameter: '20.6 mm', circumference: '64.7 mm', usSz: '11', ukSz: 'V', euSz: '65' },
  { size: '12', diameter: '21.4 mm', circumference: '67.2 mm', usSz: '12', ukSz: 'X', euSz: '67' },
]

const braceletSizes = [
  { size: 'XS', wrist: '14–15 cm', bracelet: '16 cm' },
  { size: 'S', wrist: '15–16 cm', bracelet: '17 cm' },
  { size: 'M', wrist: '16–17 cm', bracelet: '18 cm' },
  { size: 'L', wrist: '17–18 cm', bracelet: '19 cm' },
  { size: 'XL', wrist: '18–19 cm', bracelet: '20 cm' },
]

const necklaceSizes = [
  { length: '14 inches (35 cm)', description: 'Choker — sits at the base of the neck' },
  { length: '16 inches (40 cm)', description: 'Collar — sits just below the collarbone (most popular)' },
  { length: '18 inches (45 cm)', description: 'Princess — sits on the upper chest, versatile' },
  { length: '20 inches (50 cm)', description: 'Matinee — rests near the bust' },
  { length: '24 inches (60 cm)', description: 'Opera — long pendant length' },
]

export default function SizeGuidePage() {
  const [measureMethod, setMeasureMethod] = useState<'string' | 'ring'>('string')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-primary">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">Customer Care</p>
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-primary mb-6">
                Size Guide
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Find your perfect fit. Use our comprehensive size guide to choose the right size for rings, bracelets, and necklaces.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

            {/* Ring Size Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-10">
                <span className="text-4xl mb-4 block">💍</span>
                <h2 className="font-playfair text-3xl font-bold text-primary mb-3">Ring Size Guide</h2>
                <p className="text-gray-400">Find your ring size using these two easy methods</p>
              </div>

              {/* Method Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-surface border border-gray-700 rounded-xl p-1 flex gap-1">
                  <button
                    onClick={() => setMeasureMethod('string')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${measureMethod === 'string' ? 'bg-accent text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    String Method
                  </button>
                  <button
                    onClick={() => setMeasureMethod('ring')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${measureMethod === 'ring' ? 'bg-accent text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Existing Ring
                  </button>
                </div>
              </div>

              {/* Method Instructions */}
              <div className="bg-surface border border-gray-800 rounded-2xl p-8 mb-8">
                {measureMethod === 'string' ? (
                  <div>
                    <h3 className="text-accent font-semibold mb-4">How to Measure with String or Paper</h3>
                    <ol className="space-y-4">
                      {[
                        'Wrap a thin strip of paper or string around the base of the finger you want to measure.',
                        'Mark where the string/paper overlaps, then measure the length in millimeters.',
                        'This measurement is your finger\'s circumference.',
                        'Find the matching circumference in the size chart below to find your ring size.',
                        'Tip: Measure in the afternoon when your fingers are at their largest. Avoid measuring when cold.',
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-gray-400">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-accent font-semibold mb-4">How to Measure Using an Existing Ring</h3>
                    <ol className="space-y-4">
                      {[
                        'Place a ring that fits you well on a flat surface.',
                        'Measure the inner diameter of the ring in millimeters.',
                        'Find the matching diameter in the size chart below.',
                        'Tip: Make sure the ring sits flat and you measure across the widest inner point.',
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-gray-400">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Ring Size Chart */}
              <div className="bg-surface border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-white font-semibold">Ring Size Chart</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900">
                      <tr>
                        {['Avyaya Size', 'Diameter (mm)', 'Circumference (mm)', 'US/CA', 'UK/AU', 'EU'].map((h) => (
                          <th key={h} className="text-left text-accent text-xs font-semibold uppercase tracking-wider px-6 py-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ringData.map((row, i) => (
                        <tr key={row.size} className={`border-t border-gray-800 ${i % 2 === 0 ? '' : 'bg-gray-900/30'} hover:bg-accent/5 transition-colors`}>
                          <td className="px-6 py-4 text-accent font-bold">{row.size}</td>
                          <td className="px-6 py-4 text-gray-300 text-sm">{row.diameter}</td>
                          <td className="px-6 py-4 text-gray-300 text-sm">{row.circumference}</td>
                          <td className="px-6 py-4 text-gray-300 text-sm">{row.usSz}</td>
                          <td className="px-6 py-4 text-gray-300 text-sm">{row.ukSz}</td>
                          <td className="px-6 py-4 text-gray-300 text-sm">{row.euSz}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                <p className="text-accent text-sm font-semibold mb-1">Not sure?</p>
                <p className="text-gray-400 text-sm">Between two sizes? We recommend going up half a size for comfort. You can also visit us in Mumbai for a free in-person sizing consultation.</p>
              </div>
            </motion.div>

            {/* Bracelet Size Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-10">
                <span className="text-4xl mb-4 block">✨</span>
                <h2 className="font-playfair text-3xl font-bold text-primary mb-3">Bracelet Size Guide</h2>
                <p className="text-gray-400">Measure your wrist to find the perfect bracelet fit</p>
              </div>

              <div className="bg-surface border border-gray-800 rounded-2xl p-8 mb-6">
                <h3 className="text-accent font-semibold mb-4">How to Measure Your Wrist</h3>
                <ol className="space-y-3">
                  {[
                    'Wrap a flexible measuring tape or piece of string around your wrist, just below the wrist bone.',
                    'Note the measurement — this is your wrist circumference.',
                    'For a comfortable fit, we add 1–2 cm of ease to wrist measurement.',
                    'For a looser, layering fit, go one size up.',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-gray-400">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-surface border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-white font-semibold">Bracelet Size Chart</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900">
                      <tr>
                        {['Size', 'Wrist Circumference', 'Bracelet Length'].map((h) => (
                          <th key={h} className="text-left text-accent text-xs font-semibold uppercase tracking-wider px-6 py-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {braceletSizes.map((row, i) => (
                        <tr key={row.size} className={`border-t border-gray-800 ${i % 2 === 0 ? '' : 'bg-gray-900/30'} hover:bg-accent/5 transition-colors`}>
                          <td className="px-6 py-4 text-accent font-bold">{row.size}</td>
                          <td className="px-6 py-4 text-gray-300 text-sm">{row.wrist}</td>
                          <td className="px-6 py-4 text-gray-300 text-sm">{row.bracelet}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Necklace Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-10">
                <span className="text-4xl mb-4 block">📿</span>
                <h2 className="font-playfair text-3xl font-bold text-primary mb-3">Necklace Length Guide</h2>
                <p className="text-gray-400">Choose the perfect necklace length for your style</p>
              </div>

              <div className="bg-surface border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-white font-semibold">Necklace Lengths</h3>
                </div>
                <div className="divide-y divide-gray-800">
                  {necklaceSizes.map((row, i) => (
                    <div key={i} className={`px-6 py-5 flex items-center gap-6 ${i % 2 === 0 ? '' : 'bg-gray-900/30'} hover:bg-accent/5 transition-colors`}>
                      <span className="text-accent font-bold text-sm w-36 flex-shrink-0">{row.length}</span>
                      <span className="text-gray-400 text-sm">{row.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-2xl font-bold text-primary mb-3">Still not sure about your size?</h2>
              <p className="text-gray-400 mb-6">Book a free consultation with our jewelry experts for personalized sizing assistance.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm">
                  Book a Consultation
                </Link>
                <a href="tel:+919820777037" className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 hover:border-accent hover:text-accent font-medium px-6 py-3 rounded-xl transition-all duration-200 text-sm">
                  Call Us: +91 98207 77037
                </a>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
