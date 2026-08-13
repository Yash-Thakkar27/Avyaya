'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CalendarIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import api, { endpoints, Blog } from '@/lib/api'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    api
      .get(endpoints.blogs.getBySlug(slug))
      .then((res) => setBlog(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 pt-28">
        <div className="max-w-3xl mx-auto px-4 py-16 space-y-4 animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-3/4" />
          <div className="h-4 bg-gray-800 rounded w-1/3" />
          <div className="h-72 bg-gray-800 rounded-2xl mt-8" />
          <div className="space-y-3 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-800 rounded" style={{ width: `${85 + Math.random() * 15}%` }} />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (notFound || !blog) {
    return (
      <main className="min-h-screen bg-gray-950 pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-6">Post not found.</p>
          <Link href="/blog" className="text-amber-400 hover:text-amber-300 font-medium underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950">
      {/* ── Cover image hero ── */}
      {blog.coverImageUrl && (
        <div className="relative w-full h-72 sm:h-96 lg:h-[480px] mt-16">
          <Image
            src={blog.coverImageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        </div>
      )}

      {/* ── Article ── */}
      <article className={`max-w-3xl mx-auto px-4 sm:px-6 ${blog.coverImageUrl ? '-mt-20 relative z-10' : 'pt-32'} pb-24`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-400 transition-colors mb-8 group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-800">
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4" />
              {formatDate(blog.createdAt)}
            </span>
            {blog.author && (
              <span className="flex items-center gap-1.5">
                <UserIcon className="w-4 h-4" />
                {blog.author}
              </span>
            )}
          </div>

          {/* Rich HTML content rendered safely */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.div>
      </article>
    </main>
  )
}
