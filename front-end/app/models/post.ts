export type PostFrontMatter = {
  title: string
  author: string
  dateModified: Date
  dateCreated: Date
  abstract: string
  tags: string[]
}

export type Post = {
  frontMatter: PostFrontMatter
  content: string
}
