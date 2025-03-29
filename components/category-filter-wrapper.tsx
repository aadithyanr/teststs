"use client"

import { useState } from "react"
import { CategoryFilter } from "@/components/category-filter"
import { BlogGrid } from "@/components/blog-grid"
import type { Post } from "@/lib/types"

export function CategoryFilterWrapper({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("All")

  // Filter posts based on the selected category
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => {
          // Case-insensitive comparison to handle potential case mismatches
          return post.category.toLowerCase() === activeCategory.toLowerCase()
        })

  return (
    <>
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <BlogGrid posts={filteredPosts} />
    </>
  )
}

