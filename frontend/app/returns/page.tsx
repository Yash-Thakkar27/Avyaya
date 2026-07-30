'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const faqs = [
  {
    q: 'What is your return window?',
    a: 'We accept returns within 7 days of delivery for eligible items. The item must be unused, in its original packaging, with all certificates and tags intact.'
  },
  {
    q: 'Are custom or resized pieces returnable?',
    a: 'Custom, bespoke, or resized pieces are not eligible for return or exchange unless there is a manufacturing defect. Please refer to our Refund Policy for full details.'
  },
  {
    q: 'How long does the refund take?',
    a: 'Once we receive and inspect the returned item, refunds are processed within 2 business days. Credit/debit card refunds take 5–7 business days; UPI refunds take 1–3 business days.'
  },
  {
    q: 'Can I exchange for a different size?',
    a: 'Yes! We offer size exchanges within 14 days of delivery, subject to availability. Please contact us before sending the item back.'
  },
  {
    q: 'Do I pay for return shipping?',
    a: 'For approved returns and defective items, we provide a prepaid return shipping label. For exchanges, shipping costs may apply depending on the reason.'
  },
  {
    q: 'What if my order arrives damaged?',
    a: 'We are so sorry! Please photograph the damaged item and packaging, then contact us within 48 hours of delivery. We will send a replacement or issue a full refund promptly.'
  },
]

const steps = [
  {
    number: '01',
    icon: '✉',
    title: 'Contact Us',
    desc: 'Email avyayajewels@gmail.com with your order number, reason for return, and photos of the item. Our team will respond within 2 business days.',
  },
  {
    number: '02',
    icon: '✓',
    title: 'Get Approval',
    desc: 'Once approved, you will receive a Return Authorization number and a prepaid return shipping label via email.',
  },
  {
    number: '03',
    icon: '📦',
    title: 'Pack & Ship',
    desc: 'Pack the item securely in its original packaging (Avyaya box + tissue), affix the label, and drop off at any partner courier location.',
  },
  {
    number: '04',
    icon: '🔍',
    title: 'Inspection',
    desc: 'Once received, our quality team inspects the item within 2 business days to ensure return conditions are met.',
  },
  {
    number: '05',
    icon: '💰',
    title: 'Refund or Exchange',
    desc: 'Your refund is processed to the original payment method, or your exchange is dispatched — whichever you chose.',
  },
]

export default function ReturnsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-primary">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">Customer Care</p>
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-primary mb-6">
                Returns & Exchanges
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Your satisfaction is our priority. If something isn't perfect, we make it right — simply and quickly.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Key Info Banner */}
        <section className="py-10 border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🗓', title: '7-Day Returns', desc: 'From delivery date' },
                { icon: '↔', title: '14-Day Exchanges', desc: 'Size & style swaps' },
                { icon: '🚚', title: 'Free Return Shipping', desc: 'On approved returns' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="bg-surface border border-gray-800 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="text-3xl block mb-3">{item.icon}</span>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl font-bold text-primary mb-3">How Returns Work</h2>
                <p className="text-gray-400">Simple, 5-step hassle-free process</p>
              </div>

              <div className="relative">
                {/* Connector line */}
                <div className="absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-accent/50 to-transparent hidden md:block" />

                <div className="space-y-6">
                  {steps.map((step, i) => (
                    <motion.div
                      key={step.number}
                      className="flex gap-6 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-surface border border-gray-700 flex items-center justify-center">
                          <span className="text-2xl">{step.icon}</span>
                        </div>
                        <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{i + 1}</span>
                      </div>
                      <div className="bg-surface border border-gray-800 rounded-2xl p-6 flex-1 hover:border-accent/30 transition-colors duration-300">
                        <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* What Can & Can't Be Returned */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-10">
                <h2 className="font-playfair text-3xl font-bold text-primary mb-3">What Can Be Returned?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-accent font-semibold mb-4 flex items-center gap-2">
                    <span className="text-lg">✅</span> Eligible for Return
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Unused, unworn items in original condition',
                      'Items with all original packaging and certificates',
                      'Items returned within 7 days of delivery',
                      'Items without any alterations or customisation',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-gray-400 font-semibold mb-4 flex items-center gap-2">
                    <span className="text-lg">❌</span> Not Eligible
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Custom or bespoke jewellery pieces',
                      'Items that have been resized or engraved',
                      'Items returned after 7 days',
                      'Sale items and gift cards',
                      'Items without original packaging or certificates',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-10">
                <h2 className="font-playfair text-3xl font-bold text-primary mb-3">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-surface border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="text-white font-medium pr-4">{faq.q}</span>
                      <motion.span
                        className="text-accent text-xl flex-shrink-0"
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-gray-800 pt-4">
                            <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
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
              <h2 className="font-playfair text-2xl font-bold text-primary mb-3">Ready to Start Your Return?</h2>
              <p className="text-gray-400 mb-6">Contact our team and we'll guide you through every step of the process.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:avyayajewels@gmail.com?subject=Return%20Request"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm"
                >
                  ✉ Email Us to Initiate Return
                </a>
                <Link
                  href="/refund"
                  className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 hover:border-accent hover:text-accent font-medium px-6 py-3 rounded-xl transition-all duration-200 text-sm"
                >
                  View Full Refund Policy
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
