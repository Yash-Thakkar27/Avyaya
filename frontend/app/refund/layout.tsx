import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Refund Policy',
  description: 'How and when refunds are processed for Avyaya orders.',
  path: '/refund',
})

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return children
}
