"use client"

import { cn } from "@/lib/utils"

const categories = ["All", "Product Updates", "Tutorials", "Customer Stories", "Tips & Resources"]

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void
  activeCategory: string
}

export function CategoryFilter({ onCategoryChange, activeCategory = "All" }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-6 py-3 rounded-full text-sm transition-colors",
            activeCategory === category ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

