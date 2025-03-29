import Image from "next/image"
import Link from "next/link"
import type { Post } from "@/lib/types"
import { formatDate } from "@/lib/utils"

export function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <article className="group">
            <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-4">
              {/* Thumbnail image */}
              <Image
                src={post.thumbnail || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              {/* Overlay with gradient for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
                <div className="absolute top-4 left-4 inline-flex items-center rounded-full border border-white/40 px-3 py-1 text-sm text-white backdrop-blur-sm bg-black/20">
                  {post.category}
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-[#635BFF] transition-colors">{post.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-sm">{post.author.name}</p>
                <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}

