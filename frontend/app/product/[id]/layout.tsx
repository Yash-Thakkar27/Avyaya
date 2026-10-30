import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/server-api'
import { pageMetadata, SITE_URL, toJsonLd } from '@/lib/site'

interface Props {
  params: { id: string }
  children: React.ReactNode
}

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const path = `/product/${params.id}`
  const product = await getProduct(params.id)
  if (product === null) return { title: 'Product not found' }
  if (!product) return pageMetadata({ title: 'Lab-Grown Diamond Jewellery', description: 'Avyaya fine jewellery with lab-grown diamonds.', path })

  const description = product.description
    ? truncate(product.description, 160)
    : `${product.name} in ${product.material} with ${product.stone}, by Avyaya.`
  return pageMetadata({ title: product.name, description, path, image: product.imageUrl })
}

export default async function ProductLayout({ params, children }: Props): Promise<JSX.Element> {
  const product = await getProduct(params.id)
  if (product === null) notFound()
  // API unreachable: still render the client page, just without structured data
  if (!product) return <>{children}</>

  const url = `${SITE_URL}/product/${product.id}`
  const gallery = (product.imageUrls ?? '').split(',').map((u) => u.trim()).filter(Boolean)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: [product.imageUrl, ...gallery].filter(Boolean),
        sku: String(product.id),
        category: product.category,
        material: product.material,
        brand: { '@type': 'Brand', name: 'Avyaya' },
        additionalProperty: product.stone
          ? [{ '@type': 'PropertyValue', name: 'Stone', value: product.stone }]
          : undefined,
        offers: {
          '@type': 'Offer',
          url,
          priceCurrency: 'INR',
          price: product.price,
          availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@id': `${SITE_URL}/#organization` },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
          { '@type': 'ListItem', position: 3, name: product.name },
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
