import { redirect } from "next/navigation"

export default function HomePage() {
  // Make sure the redirect works properly in production
  redirect("/blog")
}