import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Ring, Bracelet & Necklace Size Guide',
  description: "Find your ring size, bracelet size and necklace length with Avyaya's size charts and measuring tips.",
  path: '/size-guide',
})

export default function SizeGuideLayout({ children }: { children: React.ReactNode }) {
  return children
}
