import { getBlogs } from '@/lib/server-api'
import BlogListClient from './BlogListClient'

export default async function BlogListPage() {
  const blogs = await getBlogs()
  return <BlogListClient initialBlogs={blogs ?? undefined} />
}
