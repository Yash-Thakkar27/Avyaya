import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Jewellery Care Guide',
  description: 'How to clean, store and look after your lab-grown diamond jewellery so it keeps its sparkle.',
  path: '/care',
})

export default function CareLayout({ children }: { children: React.ReactNode }) {
  return children
}
