import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Shipping Policy',
  description: 'Delivery timelines, charges and coverage for Avyaya orders across India.',
  path: '/shipping',
})

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return children
}
