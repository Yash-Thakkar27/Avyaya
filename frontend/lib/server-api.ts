import type { Blog, Product } from './api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
// Cached responses are reused for this long, so admin edits show up on the public pages within ~5 minutes
const REVALIDATE_SECONDS = 300

/**
 * Server-side fetch for page data, metadata, JSON-LD and the sitemap.
 * Returns null when the API says the item doesn't exist (404) and undefined when
 * the API is unreachable or errors, so callers only 404 a page for a real miss
 * and can fall back to fetching in the browser otherwise.
 */
async function fetchJson<T>(path: string): Promise<T | null | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(10000),
    })
    if (res.status === 404) return null
    if (!res.ok) {
      console.error(`API ${path} returned ${res.status}`)
      return undefined
    }
    return (await res.json()) as T
  } catch (err) {
    console.error(`API ${path} failed`, err)
    return undefined
  }
}

export const getProduct = (id: string) =>
  /^\d+$/.test(id) ? fetchJson<Product>(`/products/${id}`) : Promise.resolve(null)

export const getBlog = (slug: string) => fetchJson<Blog>(`/blogs/${encodeURIComponent(slug)}`)

export const getProducts = async () => (await fetchJson<Product[]>('/products')) ?? undefined

export const getBlogs = async () => (await fetchJson<Blog[]>('/blogs')) ?? undefined
