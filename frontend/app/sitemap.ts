import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { getBlogs, getProducts } from '@/lib/server-api'

export const revalidate = 3600

const STATIC_PATHS = [
  '',
  '/shop',
  '/blog',
  '/about',
  '/contact',
  '/care',
  '/size-guide',
  '/shipping',
  '/returns',
  '/refund',
  '/privacy',
  '/terms',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products = [], blogs = []] = await Promise.all([getProducts(), getBlogs()])

  return [
    ...STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...products.map((product) => ({
      url: `${SITE_URL}/product/${product.id}`,
      lastModified: product.createdAt,
    })),
    ...blogs
      .filter((blog) => blog.published)
      .map((blog) => ({
        url: `${SITE_URL}/blog/${blog.slug}`,
        lastModified: blog.updatedAt,
      })),
  ]
}
