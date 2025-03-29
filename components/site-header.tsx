import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/blog" className="font-serif text-2xl font-mediummm">
              <Image
                src="/olostep.svg"
                alt="Olostep"
                width={90}
                height={20}
                className="olostep-logo-top"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 ml-auto">
            <Link
              href="/use-cases"
              className="text-[15px] font-mediumm text-[#605a55] hover:border-b hover:border-dashed hover:border-current"
              style={{ fontFamily: "system-ui, Arial, sans-serif" }}
            >
              Use Cases
            </Link>
            <Link
              href="/playground"
              className="text-[15px] font-mediumm text-[#605a55] hover:border-b hover:border-dashed hover:border-current"
              style={{ fontFamily: "system-ui, Arial, sans-serif" }}
            >
              Try Playground
            </Link>
            <Link
              href="/docs"
              className="text-[15px] font-medium text-[#605a55] hover:border-b hover:border-dashed hover:border-current"
              style={{ fontFamily: "system-ui, Arial, sans-serif" }}
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="text-[15px] font-medium text-[#605a55] hover:border-b hover:border-dashed hover:border-current"
              style={{ fontFamily: "system-ui, Arial, sans-serif" }}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-[15px] font-medium text-[#605a55] hover:border-b hover:border-dashed hover:border-current"
              style={{ fontFamily: "system-ui, Arial, sans-serif" }}
            >
              Blog
            </Link>
          </nav>
          <Button size="sm" className="rounded-full bg-[#645bff] hover:bg-indigo-700 text-white px-6 ml-4">
            Sign Up <span className="ml-1 font-bold">→</span>
          </Button>
        </div>
      </div>
    </header>
  )
}