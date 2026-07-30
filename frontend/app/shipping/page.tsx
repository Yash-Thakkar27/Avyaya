'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sections = [
  { id: 'processing-times', title: 'Processing Times' },
  { id: 'delivery', title: 'Delivery Partners' },
  { id: 'domestic', title: 'Domestic Shipping (India)' },
  { id: 'international', title: 'International Shipping' },
  { id: 'tracking', title: 'Order Tracking' },
  { id: 'packaging', title: 'Packaging & Insurance' },
  { id: 'delays', title: 'Delays & Issues' },
  { id: 'address', title: 'Address Accuracy' },
]

const domesticRates = [
  { zone: 'Metro Cities', timeframe: '2–4 business days', cost: 'Free on orders above ₹5,000 | ₹150 below' },
  { zone: 'Tier 2 & 3 Cities', timeframe: '3–6 business days', cost: 'Free on orders above ₹5,000 | ₹200 below' },
  { zone: 'Remote Areas', timeframe: '5–10 business days', cost: 'Free on orders above ₹5,000 | ₹350 below' },
  { zone: 'Express Delivery', timeframe: '1–2 business days', cost: '₹499 (Metro cities only)' },
]

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-primary">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-1/3 w-96 h-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">Legal</p>
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-primary mb-6">
                Shipping Policy
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Every Avyaya piece is carefully packed and insured for its journey to you. Here's everything you need to know about our shipping.
              </p>
              <p className="text-gray-500 text-sm mt-6">Last updated: July 2025</p>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-10 border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '🚚', label: 'Free Shipping', value: 'Orders ₹5,000+' },
                { icon: '📦', label: 'Processing', value: '1–2 Business Days' },
                { icon: '🔒', label: 'Fully Insured', value: 'Every Shipment' },
                { icon: '🌍', label: 'International', value: 'Available' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="bg-surface border border-gray-800 rounded-2xl p-5 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-white text-sm font-medium">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">

              {/* Sidebar */}
              <motion.aside
                className="lg:w-64 flex-shrink-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="sticky top-28 bg-surface border border-gray-800 rounded-2xl p-6">
                  <p className="text-accent text-xs tracking-widest uppercase font-semibold mb-4">Contents</p>
                  <ul className="space-y-2">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="text-gray-400 hover:text-accent text-sm transition-colors block py-1 border-l-2 border-transparent hover:border-accent pl-3"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.aside>

              {/* Content */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="space-y-12">

                  <div id="processing-times" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">1</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Processing Times</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-4">
                      <p className="text-gray-400 leading-relaxed">Each Avyaya jewellery piece is quality-checked and lovingly packed before dispatch. Standard processing time is <span className="text-white font-medium">1–2 business days</span> from order confirmation.</p>
                      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                        <p className="text-accent text-sm font-semibold mb-1">Custom Orders</p>
                        <p className="text-gray-400 text-sm">Custom or bespoke pieces require 4–8 weeks for production, plus standard shipping time. You will be notified when your order is ready to ship.</p>
                      </div>
                      <p className="text-gray-500 text-sm">Orders placed after 2 PM IST or on weekends/public holidays will begin processing the next business day.</p>
                    </div>
                  </div>

                  <div id="delivery" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">2</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Delivery Partners</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed mb-6">We partner with reputable courier services to ensure safe and timely delivery of your jewellery. Our primary partners include:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Blue Dart', 'DTDC', 'Delhivery', 'FedEx'].map((partner) => (
                          <div key={partner} className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
                            <p className="text-white font-medium text-sm">{partner}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm mt-4">The courier partner is selected based on your delivery location to ensure the fastest and safest option.</p>
                    </div>
                  </div>

                  <div id="domestic" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">3</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Domestic Shipping (India)</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left text-accent text-sm font-semibold py-3 pr-6">Zone</th>
                              <th className="text-left text-accent text-sm font-semibold py-3 pr-6">Timeframe</th>
                              <th className="text-left text-accent text-sm font-semibold py-3">Shipping Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            {domesticRates.map((row, i) => (
                              <tr key={row.zone} className={`border-b border-gray-800 ${i % 2 === 0 ? '' : 'bg-gray-900/30'}`}>
                                <td className="text-white py-4 pr-6 font-medium text-sm">{row.zone}</td>
                                <td className="text-gray-400 py-4 pr-6 text-sm">{row.timeframe}</td>
                                <td className="text-gray-400 py-4 text-sm">{row.cost}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div id="international" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">4</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">International Shipping</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-4">
                      <p className="text-gray-400 leading-relaxed">We ship to select international destinations. International orders are shipped via FedEx International Priority or DHL Express.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { region: 'SAARC Countries', time: '5–7 business days', note: 'Nepal, Sri Lanka, Bangladesh, etc.' },
                          { region: 'Asia Pacific', time: '7–10 business days', note: 'UAE, Singapore, Malaysia, etc.' },
                          { region: 'USA / Europe', time: '10–15 business days', note: 'All major destinations' },
                        ].map((r) => (
                          <div key={r.region} className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                            <p className="text-accent font-semibold text-sm mb-1">{r.region}</p>
                            <p className="text-white text-sm mb-1">{r.time}</p>
                            <p className="text-gray-500 text-xs">{r.note}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                        <p className="text-yellow-400 text-sm font-semibold mb-1">⚠ Customs & Duties</p>
                        <p className="text-gray-400 text-sm">International customers are responsible for any customs duties, taxes, or import fees charged by their country. These are not included in our shipping charges.</p>
                      </div>
                    </div>
                  </div>

                  <div id="tracking" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">5</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Order Tracking</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed">Once your order is dispatched, you will receive an email and SMS with your tracking number and a link to track your shipment in real time. You can also track your order from your Avyaya account dashboard under "My Orders".</p>
                    </div>
                  </div>

                  <div id="packaging" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">6</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Packaging & Insurance</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-4">
                      <p className="text-gray-400 leading-relaxed">Every Avyaya piece is presented in our signature gift box, wrapped in tissue, and sealed in a discreet, tamper-evident shipping box. All shipments are insured at full declared value. In the unlikely event of loss or damage during transit, we will replace or refund your order.</p>
                      <div className="flex items-center gap-4 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                        <span className="text-2xl">💎</span>
                        <p className="text-gray-300 text-sm">Your jewellery is packed in our signature keepsake box — perfect for gifting, no extra gift-wrapping needed.</p>
                      </div>
                    </div>
                  </div>

                  <div id="delays" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">7</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Delays & Issues</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed mb-4">While we strive for timely delivery, delays may occasionally occur due to weather conditions, courier strikes, or high-demand periods (festivals, holidays). If your order is significantly delayed, please contact us and we will investigate immediately.</p>
                      <p className="text-gray-400 leading-relaxed">If your package arrives damaged, please take photographs immediately and contact us within 48 hours at <a href="mailto:avyayajewels@gmail.com" className="text-accent hover:underline">avyayajewels@gmail.com</a>.</p>
                    </div>
                  </div>

                  <div id="address" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">8</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Address Accuracy</h2>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed mb-4">Please ensure your delivery address is complete and accurate at the time of ordering. Avyaya is not responsible for delivery failures or delays due to incorrect address information provided by the customer. If you need to change your address after placing an order, contact us immediately — we can make changes only before the order is dispatched.</p>
                      <a href="/contact" className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:underline">
                        Contact Support →
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
