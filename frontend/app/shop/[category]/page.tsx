import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProducts } from '@/lib/server-api'
import { CATEGORIES, categoryBySlug, productPath } from '@/lib/catalog'
import { pageMetadata, SITE_URL, toJsonLd } from '@/lib/site'
import ShopClient from '../ShopClient'

interface Props {
  params: { category: string }
}

// Only the categories in lib/catalog.ts have pages; anything else 404s
export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const category = categoryBySlug(params.category)
  if (!category) return {}
  return pageMetadata({
    title: category.title,
    description: category.description,
    path: `/shop/${category.slug}`,
  })
}

export default async function CategoryPage({ params }: Props) {
  const category = categoryBySlug(params.category)
  if (!category) notFound()

  const products = await getProducts()
  const inCategory = (products ?? []).filter(
    (product) => product.category?.toLowerCase() === category.name.toLowerCase()
  )
  const url = `${SITE_URL}/shop/${category.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': url,
        url,
        name: category.title,
        description: category.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: inCategory.length,
          itemListElement: inCategory.map((product, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}${productPath(product)}`,
            name: product.name,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
          { '@type': 'ListItem', position: 3, name: category.heading },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
      <ShopClient initialProducts={products ? inCategory : undefined} category={category} />
    </>
  )
}
