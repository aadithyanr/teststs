import { redirect } from "next/navigation"

export default function HomePage() {
  redirect("/blog")
  return null
}

