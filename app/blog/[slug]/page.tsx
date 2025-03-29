import Image from "next/image"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { TableOfContents } from "@/components/table-of-contents"
import type { Metadata } from "next"
import Script from "next/script"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"
import type { Post } from "@/lib/types"

interface PostPageProps {
  params: {
    slug: string
  }
}

// Get all post slugs
function getPostSlugs() {
  const postsDirectory = path.join(process.cwd(), "content")
  try {
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
  } catch (error) {
    console.error("Error reading post directory:", error)
    return []
  }
}

// Get post data by slug
async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postsDirectory = path.join(process.cwd(), "content")

    // Remove file extension from slug if present
    const cleanSlug = slug.replace(/\.mdx?$/, "")

    // Try both .md and .mdx extensions
    let fullPath = path.join(postsDirectory, `${cleanSlug}.md`)
    let fileExists = fs.existsSync(fullPath)

    if (!fileExists) {
      fullPath = path.join(postsDirectory, `${cleanSlug}.mdx`)
      fileExists = fs.existsSync(fullPath)
    }

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

// Generate static params for all posts at build time
export async function generateStaticParams() {
  const slugs = getPostSlugs()
  const params = slugs.map((file) => ({
    slug: file.replace(/\.mdx?$/, ""),
  }))

  console.log("Generated static params for slugs:", params.map((p) => p.slug).join(", "))
  return params
}

// Generate metadata for each post
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | Olostep Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://olostep.com/blog/${post.slug}`,
      siteName: "Olostep",
      images: [
        {
          url: post.thumbnail || "https://www.firecrawl.dev/images/blog/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.thumbnail || "https://www.firecrawl.dev/images/blog/og-image.jpg"],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  console.log("Rendering post page for slug:", params.slug)
  const post = await getPostBySlug(params.slug)

  if (!post) {
    console.error(`Post not found for slug: ${params.slug}`)
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="relative py-8">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Post header with image background */}
            <div className="relative aspect-[3/1] mb-16 rounded-lg overflow-hidden">
              <Image
                src={post.thumbnail || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              {/* Overlay with content */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-800/90 to-orange-500/80">
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">{post.title}</h1>
                  <div className="flex items-center gap-3">
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-white/30"
                    />
                    <div>
                      <p className="font-medium text-xl">{post.author.name}</p>
                      <p className="text-white/80">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-16 items-start">
              {/* Main content */}
              <div className="prose prose-lg max-w-3xl mx-auto xl:mx-0 prose-headings:scroll-mt-20 prose-headings:font-bold prose-a:text-blue-600">
                <div className="mdx" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Table of contents */}
              <div className="sticky top-24 w-full xl:w-64 shrink-0 order-first xl:order-last mb-8 xl:mb-0">
                <TableOfContents />
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Script for code copy functionality */}
      <Script id="code-copy-script" strategy="afterInteractive">
        {`
          function copyCode(button) {
            const pre = button.parentElement;
            const code = pre.querySelector('code');
            const textToCopy = code.textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
              button.textContent = 'Copied!';
              button.classList.add('copied');
              
              setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('copied');
              }, 2000);
            }).catch(err => {
              console.error('Failed to copy: ', err);
              button.textContent = 'Error';
              
              setTimeout(() => {
                button.textContent = 'Copy';
              }, 2000);
            });
          }
        `}
      </Script>
    </div>
  )
}

