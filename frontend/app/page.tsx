import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedCategories from '@/components/FeaturedCategories'
import USPSection from '@/components/USPSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { pageMetadata, SITE_DESCRIPTION } from '@/lib/site'

const HOME_TITLE = 'Avyaya | Lab-Grown Diamond Jewellery - Eternal as your love'

export const metadata: Metadata = {
  ...pageMetadata({ title: HOME_TITLE, description: SITE_DESCRIPTION, path: '/' }),
  title: { absolute: HOME_TITLE },
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedCategories />
      <USPSection />
      <FeaturedProducts />
      <Footer />
    </main>
  )
}