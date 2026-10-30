import { getProduct } from '@/lib/server-api'
import ProductClient from './ProductClient'

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Same request as the layout's, so Next serves it from the fetch cache
  const product = await getProduct(params.id)
  return <ProductClient productId={params.id} initialProduct={product ?? undefined} />
}
