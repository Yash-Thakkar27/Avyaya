import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { getProduct } from '@/lib/server-api'
import { pageMetadata, SITE_URL, toJsonLd } from '@/lib/site'
import { categoryByName, productPath, productSlug } from '@/lib/catalog'

interface Props {
  params: { slug: string }
  children: React.ReactNode
}

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (product === null) return { title: 'Product not found' }
  if (!product) {
    return pageMetadata({
      title: 'Lab-Grown Diamond Jewellery',
      description: 'Avyaya fine jewellery with lab-grown diamonds.',
      path: `/product/${params.slug}`,
    })
  }

  const description = product.description
    ? truncate(product.description, 160)
    : `${product.name} in ${product.material} with ${product.stone}, by Avyaya.`
  return pageMetadata({ title: product.name, description, path: productPath(product), image: product.imageUrl })
}

export default async function ProductLayout({ params, children }: Props): Promise<JSX.Element> {
  const product = await getProduct(params.slug)
  if (product === null) notFound()
  // API unreachable: still render the client page, just without structured data
  if (!product) return <>{children}</>
  // Legacy /product/12 links and renamed products land on the current slug
  if (params.slug !== productSlug(product)) permanentRedirect(productPath(product))

  const url = `${SITE_URL}${productPath(product)}`
  const category = categoryByName(product.category)
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
          { name: 'Home', item: `${SITE_URL}/` },
          { name: 'Shop', item: `${SITE_URL}/shop` },
          ...(category ? [{ name: category.heading, item: `${SITE_URL}/shop/${category.slug}` }] : []),
          { name: product.name },
        ].map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, ...crumb })),
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
