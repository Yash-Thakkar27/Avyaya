import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Returns Policy',
  description: 'How to return an Avyaya piece, including eligibility and timelines.',
  path: '/returns',
})

export default function ReturnsLayout({ children }: { children: React.ReactNode }) {
  return children
}
