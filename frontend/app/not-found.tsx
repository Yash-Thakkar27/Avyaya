import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-4xl font-playfair font-bold text-primary mb-4">Page not found</h1>
        <p className="text-gray-400 mb-10">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link href="/shop" className="btn-primary px-8 py-4">
          Explore Collection
        </Link>
      </section>
      <Footer />
    </main>
  )
}
