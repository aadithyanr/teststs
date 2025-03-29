import type { Metadata } from "next"
import { FeaturedPost } from "@/components/featured-post"
import { SiteHeader } from "@/components/site-header"
import { CategoryFilterWrapper } from "@/components/category-filter-wrapper"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"
import type { Post } from "@/lib/types"

export const metadata: Metadata = {
  title: "Olostep Blog - Web Scraping API and Tutorials",
  description: "Latest updates, guides, and tutorials about web scraping, data collection, and API usage from Olostep.",
  openGraph: {
    title: "Olostep Blog - Web Scraping API and Tutorials",
    description:
      "Latest updates, guides, and tutorials about web scraping, data collection, and API usage from Olostep.",
    url: "https://olostep.com/blog",
    siteName: "Olostep",
    images: [
      {
        url: "https://www.firecrawl.dev/images/blog/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Olostep Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olostep Blog - Web Scraping API and Tutorials",
    description:
      "Latest updates, guides, and tutorials about web scraping, data collection, and API usage from Olostep.",
    images: ["https://www.firecrawl.dev/images/blog/og-image.jpg"],
  },
}

// Get all posts directly in the page component
async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), "content")

  try {
    const filenames = fs.readdirSync(postsDirectory)

    const postsPromises = filenames
      .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
      .map(async (filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { data, content } = matter(fileContents)

        // Process content for list view (we don't need the full HTML for the list)
        const processedContent = await remark().use(remarkGfm).use(html, { sanitize: false }).process(content)
        const contentHtml = processedContent.toString()

        return {
          slug: filename.replace(/\.mdx?$/, ""),
          title: data.title || "",
          description: data.description || "",
          date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
          category: data.category || "Uncategorized",
          thumbnail: data.thumbnail || "/placeholder.svg",
          author: {
            name: data.author?.name || "Anonymous",
            role: data.author?.role || "",
            avatar: data.author?.avatar || "/placeholder.svg",
          },
          content: contentHtml, // Add the content property to fix the TypeScript error
        }
      })

    const posts = await Promise.all(postsPromises)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error loading posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const allPosts = await getAllPosts()
  const featuredPost = allPosts[0] // Most recent post as featured
  const remainingPosts = allPosts.slice(1)

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto px-4 py-12">
        {featuredPost && <FeaturedPost post={featuredPost} />}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Explore Articles</h2>
          <CategoryFilterWrapper posts={remainingPosts} />
        </div>
      </main>
    </div>
  )
}