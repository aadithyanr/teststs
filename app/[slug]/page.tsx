import { redirect } from "next/navigation"

// Redirect from root slug to /blog/[slug]
export default function SlugRedirect({ params }: { params: { slug: string } }) {
  redirect(`/blog/${params.slug}`)
  return null
}

