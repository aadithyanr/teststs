import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
      <p className="text-muted-foreground mb-8">Could not find the requested blog post.</p>
      <Link
        href="/blog"
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
      >
        Return Home
      </Link>
    </div>
  )
}

