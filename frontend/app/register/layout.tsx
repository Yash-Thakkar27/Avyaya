import type { Metadata } from 'next'
import { noIndex } from '@/lib/site'

export const metadata: Metadata = { ...noIndex, title: 'Create Account' }

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}
