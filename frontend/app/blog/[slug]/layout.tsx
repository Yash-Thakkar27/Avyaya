import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlog } from '@/lib/server-api'
import { pageMetadata, SITE_URL, toJsonLd } from '@/lib/site'

interface Props {
  params: { slug: string }
  children: React.ReactNode
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const path = `/blog/${params.slug}`
  const blog = await getBlog(params.slug)
  if (blog === null) return { title: 'Post not found' }
  // Always set the post's own canonical, otherwise it inherits /blog from the parent layout
  if (!blog) return pageMetadata({ title: 'Blog', description: 'Stories and guides from Avyaya.', path })

  return {
    ...pageMetadata({
      title: blog.title,
      description: blog.excerpt,
      path,
      image: blog.coverImageUrl || undefined,
      type: 'article',
    }),
    authors: blog.author ? [{ name: blog.author }] : undefined,
  }
}

export default async function BlogPostLayout({ params, children }: Props): Promise<JSX.Element> {
  const blog = await getBlog(params.slug)
  if (blog === null) notFound()
  // API unreachable: still render the client page, just without structured data
  if (!blog) return <>{children}</>

  const url = `${SITE_URL}/blog/${blog.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.excerpt,
        image: blog.coverImageUrl || undefined,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
        author: blog.author ? { '@type': 'Person', name: blog.author } : { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: blog.title },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
      {children}
    </>
  )
}
