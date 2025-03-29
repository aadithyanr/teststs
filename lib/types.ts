export interface Author {
  name: string
  role: string
  avatar: string
}

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  category: string
  thumbnail: string
  author: Author
  content: string
}

