import { getProducts } from '@/lib/server-api'
import ShopClient from './ShopClient'

export default async function ShopPage() {
  const products = await getProducts()
  return <ShopClient initialProducts={products ?? undefined} />
}
