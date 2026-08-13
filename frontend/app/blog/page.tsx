'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CalendarIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import api, { endpoints, Blog } from '@/lib/api'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get(endpoints.blogs.getAll)
      .then((res) => setBlogs(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-gray-950 pt-24 pb-20">
      {/* ── Hero banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 border-b border-gray-800 py-20">
        {/* Decorative orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Avyaya Journal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Stories &amp; Inspiration
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Jewellery care guides, style tips, and the craftsmanship behind every piece.
          </motion.p>
        </div>
      </section>

      {/* ── Post grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-800" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-full" />
                  <div className="h-3 bg-gray-800 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No posts yet — check back soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300"
              >
                {/* Cover image */}
                <Link href={`/blog/${blog.slug}`} className="block relative h-52 overflow-hidden bg-gray-800">
                  {blog.coverImageUrl ? (
                    <Image
                      src={blog.coverImageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-900/30 to-gray-800">
                      <span className="text-4xl">✨</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {formatDate(blog.createdAt)}
                    </span>
                    {blog.author && (
                      <span className="flex items-center gap-1">
                        <UserIcon className="w-3.5 h-3.5" />
                        {blog.author}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${blog.slug}`}>
                    <h2 className="font-playfair text-xl font-bold text-gray-100 group-hover:text-amber-400 transition-colors duration-200 leading-snug line-clamp-2">
                      {blog.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  {blog.excerpt && (
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{blog.excerpt}</p>
                  )}

                  {/* Read more */}
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-2 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors group/link"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
