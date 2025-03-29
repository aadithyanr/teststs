import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Post } from "@/lib/types"

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-xl overflow-hidden">
        {/* Left side - Image - Increased height */}
        <div className="relative aspect-[4/3] md:aspect-auto min-h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-orange-400 to-orange-300">
          {/* If there's a post thumbnail, use it as a background with reduced opacity */}
          {post.thumbnail && (
            <Image
              src={post.thumbnail || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col justify-center py-6">
          <time className="text-gray-500 mb-4">{formatDate(post.date)}</time>

          <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

          <p className="text-gray-700 mb-6 text-lg">{post.description}</p>

          <div className="flex items-center">
            <span className="text-gray-700">By {post.author.name}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

