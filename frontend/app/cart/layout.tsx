import type { Metadata } from 'next'
import { noIndex } from '@/lib/site'

export const metadata: Metadata = { ...noIndex, title: 'Cart' }

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children
}
