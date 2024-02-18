import React from 'react'
import { PostFrontMatter } from '../models/post'

type PostMetadataProps = {
  metadata: PostFrontMatter
}

const PostMetadata: React.FC<PostMetadataProps> = ({
  metadata,
}: PostMetadataProps) => {
  const { title, author, dateCreated, dateModified, tags, abstract } = metadata
  const formattedDateCreated = dateCreated.toLocaleDateString('en-AU')
  const formattedDateModified = dateModified.toLocaleDateString('en-AU')

  return (
    <div className="post-metadata">
      <h1 className="text-5xl font-bold my-3">{title}</h1>
      <p className="my-3 text-xl">
        <span className="font-bold">Author:</span> {author}
      </p>
      <p className="italic font-light my-3 text-gray-500">
        <span>Date Created: {formattedDateCreated}</span>
        &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
        <span>Date Modified: {formattedDateModified}</span>
      </p>
      <div className="flex flex-row gap-2 my-3 items-center">
        <span className="font-bold">Topics: </span>
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-white hover:bg-[#004de5] text-blue-700 hover:text-white rounded px-3 py-1 m-1 cursor-pointer transition-colors duration-200"
          >
            {'#' + tag}
          </span>
        ))}
      </div>
      <hr />
      <p className="text-xl leading-relaxed mt-14">{abstract}</p>
    </div>
  )
}

export default PostMetadata
