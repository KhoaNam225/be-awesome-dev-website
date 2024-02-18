import PostMetadata from '@/app/components/post-meta-data'
import {
  readMarkdownFilesMetaData,
  readPostsMetaDataFromS3,
} from '@/app/services/file-reader'
import {
  readPostContentFromPath,
  readPostContentFromS3,
} from '@/app/services/post-content-reader'
import { sanitize } from 'isomorphic-dompurify'
import { notFound } from 'next/navigation'

type PostSegment = {
  id: string
}

export async function generateStaticParams(): Promise<PostSegment[]> {
  const filesMetaData = await readPostsMetaDataFromS3()

  const params = filesMetaData.map((file) => ({
    id: file.url,
  }))
  return params
}

export default async function Page({ params }: { params: { id: string } }) {
  const filesMetaData = await readPostsMetaDataFromS3()
  const relevantFile = filesMetaData.find((file) => file.url === params.id)

  if (!relevantFile) {
    return notFound()
  }

  const fullPath = [relevantFile.filePath, relevantFile.fileName].join('/')
  const fileContent = await readPostContentFromS3(fullPath)

  const sanitizedHTML = sanitize(fileContent.content)

  return (
    <div className="w-9/12 mx-auto">
      <PostMetadata metadata={fileContent.frontMatter} />
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      ></div>
    </div>
  )
}
