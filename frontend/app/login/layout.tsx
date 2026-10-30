import type { Metadata } from 'next'
import { noIndex } from '@/lib/site'

export const metadata: Metadata = { ...noIndex, title: 'Sign In' }

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
