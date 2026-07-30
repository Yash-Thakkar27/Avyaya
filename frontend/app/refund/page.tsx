'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sections = [
  { id: 'eligibility', title: 'Eligibility for Refund' },
  { id: 'non-refundable', title: 'Non-Refundable Items' },
  { id: 'process', title: 'Refund Process' },
  { id: 'timeline', title: 'Refund Timeline' },
  { id: 'exchange', title: 'Exchanges' },
  { id: 'damaged', title: 'Damaged or Defective Items' },
  { id: 'contact', title: 'Contact Us' },
]

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-primary">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-1/3 w-80 h-80 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">Legal</p>
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-primary mb-6">
                Refund Policy
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                We want you to love every Avyaya piece. If something isn't right, here's how we make it right.
              </p>
              <p className="text-gray-500 text-sm mt-6">Last updated: July 2025</p>
            </motion.div>
          </div>
        </section>

        {/* Quick Summary Cards */}
        <section className="py-10 border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '✓', title: '7-Day Return Window', desc: 'From delivery date for eligible items', positive: true },
                { icon: '↔', title: 'Easy Exchanges', desc: 'Size or style swaps within 14 days', positive: true },
                { icon: '✗', title: 'Custom Orders', desc: 'Non-returnable unless defective', positive: false },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  className={`rounded-2xl p-6 border ${card.positive ? 'bg-accent/5 border-accent/20' : 'bg-gray-800/30 border-gray-700'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className={`text-2xl font-bold ${card.positive ? 'text-accent' : 'text-gray-500'}`}>{card.icon}</span>
                  <h3 className="text-white font-semibold mt-2 mb-1">{card.title}</h3>
                  <p className="text-gray-400 text-sm">{card.desc}</p>
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

                  <div id="eligibility" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">1</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Eligibility for Refund</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-4">
                      <p className="text-gray-400 leading-relaxed">To be eligible for a refund, your item must meet all of the following conditions:</p>
                      <ul className="space-y-3">
                        {[
                          'Returned within 7 days of delivery date',
                          'Item is unused, unworn, and in its original condition',
                          'All original tags, certificates, and packaging are intact',
                          'Item has not been resized, altered, or engraved',
                          'Return request has been approved by our team prior to shipping',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-400">
                            <span className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-accent text-xs">✓</span>
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div id="non-refundable" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">2</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Non-Refundable Items</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-4">
                      <p className="text-gray-400 leading-relaxed">The following items are not eligible for refund or return:</p>
                      <ul className="space-y-3">
                        {[
                          'Custom or bespoke jewellery pieces made to your specifications',
                          'Items that have been resized, engraved, or otherwise customised',
                          'Items showing signs of wear, damage, or alteration',
                          'Items returned without original packaging or certification',
                          'Sale or discounted items (unless defective)',
                          'Gift cards',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-400">
                            <span className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-gray-400 text-xs">✕</span>
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div id="process" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">3</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Refund Process</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <div className="space-y-6">
                        {[
                          { step: '01', title: 'Initiate Request', desc: 'Email us at avyayajewels@gmail.com with your order number, reason for return, and photos of the item within 7 days of delivery.' },
                          { step: '02', title: 'Await Approval', desc: 'Our team will review your request within 2 business days and send you a Return Authorization and prepaid return label if approved.' },
                          { step: '03', title: 'Ship the Item', desc: 'Carefully pack the item in its original packaging and drop it off at the designated courier location. Keep your tracking receipt.' },
                          { step: '04', title: 'Inspection', desc: 'Once we receive the item, our quality team will inspect it within 2 business days to ensure it meets return conditions.' },
                          { step: '05', title: 'Refund Issued', desc: 'Upon successful inspection, your refund will be processed to your original payment method within the timeline below.' },
                        ].map((s, i) => (
                          <div key={s.step} className="flex gap-5 items-start">
                            <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                              <span className="text-accent text-xs font-bold">{s.step}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-semibold mb-1">{s.title}</h4>
                              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div id="timeline" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">4</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Refund Timeline</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left text-accent text-sm font-semibold py-3 pr-6">Payment Method</th>
                              <th className="text-left text-accent text-sm font-semibold py-3">Refund Timeline</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { method: 'Credit / Debit Card', time: '5–7 business days' },
                              { method: 'Net Banking', time: '3–5 business days' },
                              { method: 'UPI', time: '1–3 business days' },
                              { method: 'Avyaya Store Credit', time: 'Instant' },
                            ].map((row, i) => (
                              <tr key={row.method} className={`border-b border-gray-800 ${i % 2 === 0 ? '' : 'bg-gray-900/30'}`}>
                                <td className="text-white py-4 pr-6 font-medium text-sm">{row.method}</td>
                                <td className="text-gray-400 py-4 text-sm">{row.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-gray-500 text-sm mt-4">Shipping charges are non-refundable unless the return is due to our error or a defective item.</p>
                    </div>
                  </div>

                  <div id="exchange" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">5</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Exchanges</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed mb-4">We offer exchanges within <span className="text-white font-medium">14 days of delivery</span> for size or style changes, subject to availability. Exchanges are processed as a return + new order. If the new item is of higher value, you will need to pay the difference. If lower, the difference will be refunded.</p>
                      <p className="text-gray-400 leading-relaxed">To initiate an exchange, contact us at <a href="mailto:avyayajewels@gmail.com" className="text-accent hover:underline">avyayajewels@gmail.com</a> with your order details.</p>
                    </div>
                  </div>

                  <div id="damaged" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">6</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Damaged or Defective Items</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed mb-4">If you receive a damaged or defective item, please contact us within <span className="text-white font-medium">48 hours of delivery</span> with clear photographs of the damage and original packaging. We will arrange a full replacement or refund at no additional cost, including return shipping.</p>
                      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                        <p className="text-accent text-sm font-semibold mb-1">Our Quality Promise</p>
                        <p className="text-gray-400 text-sm">Every Avyaya piece undergoes rigorous quality inspection before dispatch. In the rare event of a manufacturing defect, we take full responsibility.</p>
                      </div>
                    </div>
                  </div>

                  <div id="contact" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">7</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Contact Us</h2>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed mb-6">Have questions about a refund or return? Our team is here to help.</p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <span className="text-accent">✉</span>
                          <a href="mailto:avyayajewels@gmail.com" className="text-white hover:text-accent transition-colors">avyayajewels@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-accent">📞</span>
                          <span className="text-white">+91 98207 77037</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-accent">🕐</span>
                          <span className="text-gray-400">Mon–Sat, 10 AM – 7 PM IST</span>
                        </div>
                      </div>
                      <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm">
                        Contact Support
                      </Link>
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
