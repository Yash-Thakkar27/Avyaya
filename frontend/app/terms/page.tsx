'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'products', title: 'Products & Descriptions' },
  { id: 'ordering', title: 'Ordering & Payment' },
  { id: 'custom', title: 'Custom Orders' },
  { id: 'intellectual', title: 'Intellectual Property' },
  { id: 'disclaimer', title: 'Disclaimers' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'governing', title: 'Governing Law' },
]

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-primary">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-10 left-1/4 w-64 h-64 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">Legal</p>
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-primary mb-6">
                Terms of Service
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Please read these terms carefully before using our website or making a purchase. By using Avyaya, you agree to be bound by these terms.
              </p>
              <p className="text-gray-500 text-sm mt-6">Last updated: July 2025</p>
            </motion.div>
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

                  <div id="acceptance" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">1</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Acceptance of Terms</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed">By accessing or using the Avyaya website (avyaya.com) or making a purchase, you confirm that you are at least 18 years of age and agree to be bound by these Terms of Service, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any part of these terms, please do not use our services.</p>
                    </div>
                  </div>

                  <div id="products" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">2</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Products & Descriptions</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-4">
                      <p className="text-gray-400 leading-relaxed">We strive to provide accurate and complete product descriptions, images, and pricing. However:</p>
                      <ul className="space-y-3">
                        {[
                          'Actual product colors may vary slightly from images due to monitor settings and photography lighting.',
                          'All our diamonds are lab-grown and certified. Certifications will be provided with each purchase.',
                          'Jewellery weights and dimensions are approximate and may vary slightly between pieces.',
                          'We reserve the right to limit quantities, correct pricing errors, and discontinue products.',
                          'Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes.',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div id="ordering" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">3</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Ordering & Payment</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-6">
                      <div>
                        <h3 className="text-accent font-semibold mb-3">Order Confirmation</h3>
                        <p className="text-gray-400 leading-relaxed">Placing an order constitutes an offer to purchase. Your order is confirmed only upon receipt of a written confirmation from Avyaya. We reserve the right to cancel any order due to stock unavailability, pricing errors, or suspected fraud.</p>
                      </div>
                      <div>
                        <h3 className="text-accent font-semibold mb-3">Payment</h3>
                        <p className="text-gray-400 leading-relaxed">Payments are processed securely via Razorpay. We accept major credit/debit cards, net banking, UPI, and other payment methods offered at checkout. Full payment is required before an order is processed.</p>
                      </div>
                      <div>
                        <h3 className="text-accent font-semibold mb-3">Pricing</h3>
                        <p className="text-gray-400 leading-relaxed">All prices are subject to change without notice. The price charged will be the price displayed at the time of your order confirmation. We are not responsible for typographical errors in pricing.</p>
                      </div>
                    </div>
                  </div>

                  <div id="custom" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">4</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Custom Orders</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed mb-4">Custom and bespoke jewellery orders are subject to additional terms:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { title: 'Non-Refundable Deposit', desc: 'A 50% non-refundable deposit is required to begin custom work.' },
                          { title: 'Timeline', desc: 'Custom pieces typically take 4–8 weeks to complete. We will provide estimated timelines during consultation.' },
                          { title: 'Design Approval', desc: 'Final designs require your written approval before production begins.' },
                          { title: 'No Returns', desc: 'Custom orders cannot be returned or exchanged unless there is a manufacturing defect.' },
                        ].map((item) => (
                          <div key={item.title} className="bg-gray-900 rounded-xl p-5 border border-gray-700">
                            <h4 className="text-white font-semibold mb-2 text-sm">{item.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div id="intellectual" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">5</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Intellectual Property</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed">All content on the Avyaya website — including text, images, logos, designs, product photographs, and graphics — is the exclusive property of Avyaya and is protected by Indian and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or use our content without prior written permission.</p>
                    </div>
                  </div>

                  <div id="disclaimer" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">6</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Disclaimers</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed">Our website and products are provided "as is" without warranties of any kind. Avyaya makes no representations or warranties regarding the accuracy or completeness of website content. We are not responsible for any damages arising from your use of our website or products.</p>
                    </div>
                  </div>

                  <div id="liability" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">7</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Limitation of Liability</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed">To the fullest extent permitted by law, Avyaya shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability to you for any claim shall not exceed the amount paid for the specific product or service giving rise to the claim.</p>
                    </div>
                  </div>

                  <div id="governing" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">8</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Governing Law</h2>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed mb-4">These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.</p>
                      <p className="text-gray-400 leading-relaxed">For any questions about these terms, please contact us at <a href="mailto:avyayajewels@gmail.com" className="text-accent hover:underline">avyayajewels@gmail.com</a> or call us at <span className="text-white">+91 98207 77037</span>.</p>
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
