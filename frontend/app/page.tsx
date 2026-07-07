import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedCategories from '@/components/FeaturedCategories'
import USPSection from '@/components/USPSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import CustomerTrust from '@/components/CustomerTrust'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedCategories />
      <USPSection />
      <FeaturedProducts />
      <CustomerTrust />
      <Footer />
    </main>
  )
}