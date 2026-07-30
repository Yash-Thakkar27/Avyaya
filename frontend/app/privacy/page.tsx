'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sections = [
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'sharing', title: 'Sharing Your Information' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'security', title: 'Data Security' },
  { id: 'rights', title: 'Your Rights' },
  { id: 'retention', title: 'Data Retention' },
  { id: 'contact', title: 'Contact Us' },
]

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('')

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
              <p className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4">Legal</p>
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-primary mb-6">
                Privacy Policy
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Your privacy matters to us. This policy explains how Avyaya collects, uses, and protects your personal information.
              </p>
              <p className="text-gray-500 text-sm mt-6">Last updated: July 2025</p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">

              {/* Table of Contents — Sticky Sidebar */}
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

              {/* Policy Content */}
              <motion.div
                className="flex-1 prose prose-invert max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="space-y-12">

                  {/* Section 1 */}
                  <div id="information-we-collect" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">1</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Information We Collect</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-6">
                      <div>
                        <h3 className="text-accent font-semibold mb-3">Personal Information</h3>
                        <p className="text-gray-400 leading-relaxed">When you create an account or place an order, we collect information such as your name, email address, phone number, shipping address, and billing information.</p>
                      </div>
                      <div>
                        <h3 className="text-accent font-semibold mb-3">Transaction Data</h3>
                        <p className="text-gray-400 leading-relaxed">Details about purchases you make through our platform, including the products ordered, prices, and payment method type (we do not store full card numbers).</p>
                      </div>
                      <div>
                        <h3 className="text-accent font-semibold mb-3">Usage Data</h3>
                        <p className="text-gray-400 leading-relaxed">Information about how you interact with our website, such as pages visited, time spent, links clicked, and your device and browser information.</p>
                      </div>
                      <div>
                        <h3 className="text-accent font-semibold mb-3">Communications</h3>
                        <p className="text-gray-400 leading-relaxed">Any messages, inquiries, or feedback you send us through our contact form or email.</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div id="how-we-use" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">2</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">How We Use Your Information</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <ul className="space-y-4">
                        {[
                          'Process and fulfill your orders, including sending order confirmations and shipping updates',
                          'Provide customer support and respond to your inquiries',
                          'Send you transactional emails and, with your consent, marketing communications',
                          'Personalize your shopping experience and recommend products you may love',
                          'Improve our website, products, and services through analytics',
                          'Prevent fraud and maintain the security of our platform',
                          'Comply with legal obligations and enforce our terms',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div id="sharing" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">3</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Sharing Your Information</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-6">
                      <p className="text-gray-400 leading-relaxed">We do not sell, trade, or rent your personal information to third parties. We may share it only in these circumstances:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: 'Service Providers', desc: 'Trusted partners who help us operate our business (payment processing, shipping, email delivery) under strict confidentiality agreements.' },
                          { title: 'Legal Requirements', desc: 'When required by law, court order, or government authority to protect rights, property, or safety.' },
                          { title: 'Business Transfers', desc: 'In the event of a merger, acquisition, or sale, your data may be transferred as part of that transaction.' },
                          { title: 'With Your Consent', desc: 'We will share your information in any other circumstance only with your explicit consent.' },
                        ].map((item) => (
                          <div key={item.title} className="bg-gray-900 rounded-xl p-5 border border-gray-700">
                            <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div id="cookies" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">4</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Cookies & Tracking</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8 space-y-4">
                      <p className="text-gray-400 leading-relaxed">We use cookies and similar tracking technologies to enhance your browsing experience. These include:</p>
                      <div className="space-y-3">
                        {[
                          { type: 'Essential Cookies', desc: 'Required for the website to function — shopping cart, authentication, security.' },
                          { type: 'Analytics Cookies', desc: 'Help us understand how visitors use our site so we can improve it.' },
                          { type: 'Marketing Cookies', desc: 'Allow us to show you relevant ads on other platforms (with your consent).' },
                        ].map((c) => (
                          <div key={c.type} className="flex gap-4 p-4 bg-gray-900 rounded-xl border border-gray-700">
                            <span className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            <div>
                              <span className="text-white font-medium text-sm">{c.type}: </span>
                              <span className="text-gray-400 text-sm">{c.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm">You can control cookies through your browser settings. Note that disabling some cookies may affect website functionality.</p>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div id="security" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">5</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Data Security</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed mb-4">We implement robust security measures to protect your personal data, including SSL encryption for all data transmissions, secure servers, and regular security audits. Payments are processed by Razorpay, a PCI-DSS compliant payment gateway — we never store your full card details.</p>
                      <p className="text-gray-400 leading-relaxed">While we strive to protect your information, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and protect your account credentials.</p>
                    </div>
                  </div>

                  {/* Section 6 */}
                  <div id="rights" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">6</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Your Rights</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 mb-6">You have the following rights regarding your personal information:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { right: 'Access', desc: 'Request a copy of your personal data' },
                          { right: 'Correction', desc: 'Update inaccurate or incomplete data' },
                          { right: 'Deletion', desc: 'Request erasure of your personal data' },
                          { right: 'Portability', desc: 'Receive your data in a portable format' },
                          { right: 'Objection', desc: 'Object to certain processing activities' },
                          { right: 'Opt-out', desc: 'Unsubscribe from marketing at any time' },
                        ].map((r) => (
                          <div key={r.right} className="flex items-start gap-3 p-4 bg-gray-900 rounded-xl border border-gray-700">
                            <span className="text-accent text-lg">✦</span>
                            <div>
                              <p className="text-white font-medium text-sm">{r.right}</p>
                              <p className="text-gray-400 text-sm">{r.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section 7 */}
                  <div id="retention" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">7</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Data Retention</h2>
                    </div>
                    <div className="bg-surface border border-gray-800 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed">We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Account data is typically retained for the duration of your account plus 3 years. You may request deletion at any time, subject to legal requirements.</p>
                    </div>
                  </div>

                  {/* Section 8 */}
                  <div id="contact" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">8</span>
                      <h2 className="font-playfair text-2xl font-bold text-primary">Contact Us</h2>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-2xl p-8">
                      <p className="text-gray-400 leading-relaxed mb-6">If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please reach out to us:</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-accent">✉</span>
                          <a href="mailto:avyayajewels@gmail.com" className="text-white hover:text-accent transition-colors">avyayajewels@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-accent">📞</span>
                          <span className="text-white">+91 98207 77037</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-accent">📍</span>
                          <span className="text-white">Mumbai, India</span>
                        </div>
                      </div>
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
