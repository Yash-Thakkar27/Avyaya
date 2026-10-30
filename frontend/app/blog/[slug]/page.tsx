import { getBlog } from '@/lib/server-api'
import BlogPostClient from './BlogPostClient'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Same request as the layout's, so Next serves it from the fetch cache
  const blog = await getBlog(params.slug)
  return <BlogPostClient slug={params.slug} initialBlog={blog ?? undefined} />
}
