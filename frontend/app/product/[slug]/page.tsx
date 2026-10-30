import { getProduct } from '@/lib/server-api'
import { parseProductId } from '@/lib/catalog'
import ProductClient from './ProductClient'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Same request as the layout's, so Next serves it from the fetch cache
  const product = await getProduct(params.slug)
  return <ProductClient productId={parseProductId(params.slug) ?? ''} initialProduct={product ?? undefined} />
}
