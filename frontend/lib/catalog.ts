import type { Product } from './api'

export interface Category {
  /** URL segment, e.g. /shop/rings */
  slug: string
  /** Category value stored on products (see CATEGORIES in components/admin/ProductFormModal.tsx) */
  name: string
  title: string
  heading: string
  description: string
  intro: string
}

// Only categories with a public page. "Other" products appear on /shop only.
export const CATEGORIES: Category[] = [
  {
    slug: 'rings',
    name: 'Rings',
    title: 'Lab-Grown Diamond Rings',
    heading: 'Lab-Grown Diamond Rings',
    description:
      'Shop lab-grown diamond rings from Avyaya: solitaires, bands and everyday rings in gold, designed for daily wear.',
    intro:
      'From classic solitaires to slim stacking bands, our lab-grown diamond rings are made to be worn every day. Lab-grown diamonds have the same chemical and optical properties as mined diamonds, so you get the same sparkle at a more accessible price. Not sure of your size? See our ring size guide before you enquire.',
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    title: 'Lab-Grown Diamond Earrings',
    heading: 'Lab-Grown Diamond Earrings',
    description:
      'Shop lab-grown diamond earrings from Avyaya: studs, drops and hoops designed for everyday elegance.',
    intro:
      'Studs for the office, drops for an evening out, hoops for every day in between. Each pair is set with lab-grown diamonds, which are physically and chemically the same as mined diamonds, and finished to be comfortable enough to wear from morning to night.',
  },
  {
    slug: 'necklaces',
    name: 'Neckwear',
    title: 'Lab-Grown Diamond Necklaces & Pendants',
    heading: 'Necklaces & Pendants',
    description:
      'Shop lab-grown diamond necklaces and pendants from Avyaya, from delicate solitaire pendants to statement pieces.',
    intro:
      'A single solitaire on a fine chain or a piece that frames the neckline: our necklaces and pendants are set with lab-grown diamonds and designed to layer easily or stand on their own. Our size guide covers chain lengths if you are choosing for someone else.',
  },
  {
    slug: 'bracelets',
    name: 'Bracelets',
    title: 'Lab-Grown Diamond Bracelets',
    heading: 'Lab-Grown Diamond Bracelets',
    description:
      'Shop lab-grown diamond bracelets from Avyaya: tennis bracelets, bangles and fine chains for daily wear.',
    intro:
      'Tennis bracelets, bangles and fine chains set with lab-grown diamonds, made to be worn alone or stacked. Check the bracelet section of our size guide to find a comfortable fit.',
  },
]

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug)

export const categoryByName = (name: string | undefined | null) =>
  name ? CATEGORIES.find((c) => c.name.toLowerCase() === name.toLowerCase()) : undefined

/** Category page for a product category, or the full shop when it has no page */
export const categoryPath = (name: string | undefined | null) => {
  const category = categoryByName(name)
  return category ? `/shop/${category.slug}` : '/shop'
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Product URLs are "<name-slug>-<id>". The id at the end is what identifies the
 * product, so renaming a product changes the URL but old links still resolve
 * (and redirect to the new slug).
 */
export const productSlug = (product: Pick<Product, 'id' | 'name'>) => {
  const name = slugify(product.name ?? '')
  return name ? `${name}-${product.id}` : String(product.id)
}

export const productPath = (product: Pick<Product, 'id' | 'name'>) => `/product/${productSlug(product)}`

/** Reads the product id from a slug ("solitaire-ring-12") or a legacy numeric URL ("12") */
export const parseProductId = (slug: string) => slug.match(/(?:^|-)(\d+)$/)?.[1]
