import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"
import type { Post } from "./types"

const postsDirectory = path.join(process.cwd(), "content")

// Get all post slugs
export function getPostSlugs() {
  try {
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
  } catch (error) {
    console.error("Error reading post directory:", error)
    return []
  }
}

// Get post data by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Remove file extension from slug if present
    const cleanSlug = slug.replace(/\.mdx?$/, "")

    // Try both .md and .mdx extensions
    let fullPath = path.join(postsDirectory, `${cleanSlug}.md`)
    let fileExists = fs.existsSync(fullPath)

    if (!fileExists) {
      fullPath = path.join(postsDirectory, `${cleanSlug}.mdx`)
      fileExists = fs.existsSync(fullPath)
    }

    // Debug log to see what's happening
    console.log(`Looking for post: ${cleanSlug}`)
    console.log(`Full path: ${fullPath}`)
    console.log(`File exists: ${fileExists}`)

    if (!fileExists) {
      console.error(`Post file not found for slug: ${cleanSlug}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Process markdown content to HTML with enhanced formatting
    const processedContent = await remark().use(remarkGfm).use(html, { sanitize: false }).process(content)

    let contentHtml = processedContent.toString()

    // Simple code block enhancement - add copy button
    contentHtml = contentHtml.replace(
      /<pre><code class="language-([^"]+)">/g,
      '<pre class="language-$1"><button class="copy-button" onclick="copyCode(this)">Copy</button><code class="language-$1">',
    )

    // Process highlight syntax (==text==) to match the desired style
    contentHtml = contentHtml.replace(/==(.*?)==/g, '<span class="highlight">$1</span>')

    // Add IDs to headings for better anchor linking
    contentHtml = contentHtml.replace(/<(h[1-6])>(.*?)<\/h[1-6]>/g, (match, tag, content) => {
      const id = content
        .toLowerCase()
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
      return `<${tag} id="${id}">${content}</${tag}>`
    })

    // Ensure all required fields are present
    return {
      slug: cleanSlug,
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
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error)
    return null
  }
}

// Get all posts
export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs()
  const postsPromises = slugs.map((slug) => getPostBySlug(slug.replace(/\.mdx?$/, "")))
  const posts = await Promise.all(postsPromises)

  // Filter out any null posts and sort by date (newest first)
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

