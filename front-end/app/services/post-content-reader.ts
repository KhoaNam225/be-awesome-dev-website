import { parse } from 'date-fns'
import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import markdownit from 'markdown-it'
import { join } from 'path'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)

import { GetObjectCommand } from '@aws-sdk/client-s3'
import { Readable } from 'stream'
import { Post, PostFrontMatter } from '../models/post'
import { AWS_S3_POSTS_BUCKET, POSTS_CONTENT_DIR } from '../static-configs'
import { firaCode } from '../utils/fonts'
import { getS3Client } from './aws-s3-config-provider'

export async function readPostContentFromS3(postKey: string) {
  const s3Client = getS3Client()
  const command = new GetObjectCommand({
    Bucket: AWS_S3_POSTS_BUCKET,
    Key: postKey,
  })

  const response = await s3Client.send(command)

  const body = response.Body as Readable
  let data = ''

  if (body) {
    for await (const chunk of body) {
      data += chunk
    }
  }

  const post = parsePost(data)
  return post
}

export async function readPostContentFromPath(path: string) {
  const publicFolderPath = join(process.cwd(), POSTS_CONTENT_DIR)
  const fullPath = [publicFolderPath, path].join('/')
  const postContent = await readFile(fullPath, { encoding: 'utf-8' })

  const post = parsePost(postContent)
  return post
}

function parsePost(rawContent: string): Post {
  const result: any = matter(rawContent)

  if (result.isEmpty) {
    throw new Error('File is empty when parsing front matter.')
  }

  const { title, author, dateCreated, dateModified, tags, abstract } =
    result.data

  if (!title) {
    throw new Error('File without title')
  }

  if (!author) {
    throw new Error('File without author')
  }

  if (!dateCreated) {
    throw new Error('File without dateCreated')
  }

  if (!dateModified) {
    throw new Error('File without dateModified')
  }

  const createdDate = parse(dateCreated, 'dd-MM-yyyy', new Date())
  const modifiedDate = parse(dateCreated, 'dd-MM-yyyy', new Date())

  const postFrontMatter: PostFrontMatter = {
    title,
    author,
    dateCreated: createdDate,
    dateModified: modifiedDate,
    abstract,
    tags: tags ?? [],
  }

  const md: markdownit = markdownit({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            `<pre><code class="hljs rounded-md my-2 shadow-2xl ${firaCode.className}">` +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            '</code></pre>'
          )
        } catch (__) {}
      }

      return (
        '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>'
      )
    },
  })

  const post: Post = {
    frontMatter: postFrontMatter,
    content: md.render(result.content),
  }

  return post
}
