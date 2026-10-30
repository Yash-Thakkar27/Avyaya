import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Shop Lab-Grown Diamond Jewellery',
  description: "Browse Avyaya's lab-grown diamond rings, earrings, necklaces and more, crafted for everyday wear.",
  path: '/shop',
})

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
