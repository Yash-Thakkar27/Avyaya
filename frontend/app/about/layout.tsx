import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description: 'Meet Avyaya, a jewellery brand creating minimalist fine jewellery with lab-grown diamonds for daily wear.',
  path: '/about',
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
