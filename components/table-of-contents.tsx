"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  title: string
  level: number
}

export function TableOfContents() {
  const [sections, setSections] = useState<Section[]>([])
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    // Find all headings in the content
    const headings = Array.from(document.querySelectorAll(".mdx h1, .mdx h2, .mdx h3"))

    // Create section objects from headings
    const sectionData = headings.map((heading) => ({
      id: heading.id,
      title: heading.textContent || "",
      level: Number.parseInt(heading.tagName.charAt(1)),
    }))

    setSections(sectionData)

    // Set up intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -80% 0px",
      },
    )

    // Observe all headings
    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  // Handle click on TOC item
  const handleTOCClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()

    // Find the element to scroll to
    const element = document.getElementById(id)
    if (element) {
      // Scroll to the element with smooth behavior
      element.scrollIntoView({ behavior: "smooth" })

      // Update URL hash without jumping
      window.history.pushState(null, "", `#${id}`)

      // Set active section
      setActiveSection(id)
    }
  }

  if (sections.length === 0) return null

  return (
    <div className="space-y-2">
      <h4 className="font-medium mb-4 text-sm">On this page</h4>
      <nav className="space-y-1">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleTOCClick(e, section.id)}
            className={cn(
              "block text-sm py-1 transition-colors hover:text-indigo-600",
              section.level === 1 ? "pl-0" : section.level === 2 ? "pl-4" : "pl-8",
              activeSection === section.id ? "text-indigo-600 font-medium" : "text-gray-500",
            )}
          >
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  )
}

