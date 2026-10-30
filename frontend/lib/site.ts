import type { Metadata } from 'next'

export const SITE_URL = 'https://www.avyayajewels.co.in'
export const SITE_NAME = 'Avyaya'
export const SITE_DESCRIPTION =
  'Luxury jewellery with lab-grown diamonds, designed for daily wear with investment value.'
export const INSTAGRAM_URL = 'https://www.instagram.com/avyayajewels/'

// Serialise JSON-LD for a <script> tag; escaping "<" stops backend text from closing the tag
export const toJsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

/**
 * Per-page title, description, canonical and social tags. Canonical and og:url
 * must be set per page, otherwise every page inherits the homepage URL.
 */
export function pageMetadata({ title, description, path, image, type = 'website' }: PageMetadataOptions): Metadata {
  const images = image ? [{ url: image }] : undefined
  return {
    // Absolute rather than relying on the root title template, which nested layouts with their own title break
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'en_IN',
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  }
}

export const noIndex: Metadata = { robots: { index: false, follow: false } }
