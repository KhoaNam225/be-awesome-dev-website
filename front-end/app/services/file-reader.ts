import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3'
import { readdir } from 'fs/promises'
import { Dirent } from 'fs'
import { join } from 'path'
import { FileMetaData } from '../models/file-meta-data'
import { AWS_S3_POSTS_BUCKET, POSTS_CONTENT_DIR } from '../static-configs'
import { getS3Client } from './aws-s3-config-provider'

export async function readPostsMetaDataFromS3(): Promise<FileMetaData[]> {
  const s3Client = getS3Client()
  const filesMetaData: FileMetaData[] = []

  let isTruncated = true
  let marker: string | undefined = undefined

  while (isTruncated) {
    const command: ListObjectsCommand = new ListObjectsCommand({
      Bucket: AWS_S3_POSTS_BUCKET,
      Marker: marker,
    })

    const response = await s3Client.send(command)

    if (response.Contents) {
      response.Contents.forEach((file) => {
        if (file.Key && file.Key.endsWith('.md')) {
          const parts = file.Key.split('/')
          const newFile: FileMetaData = {
            fileName: parts[parts.length - 1],
            filePath: parts.slice(0, parts.length - 1).join('/'),
            url: getURLFromFilePath(file.Key),
          }
          filesMetaData.push(newFile)
        }
      })
    }

    isTruncated = !!response.IsTruncated // The use of !! here is because IsTruncated can be undefined
    marker = response.NextMarker
  }

  return filesMetaData
}

export async function readMarkdownFilesMetaData(): Promise<FileMetaData[]> {
  const publicFolderPath = join(process.cwd(), POSTS_CONTENT_DIR)
  const allFiles: Dirent[] = (
    await readdir(publicFolderPath, {
      withFileTypes: true,
      recursive: true,
      encoding: 'utf-8',
    })
  ).filter((item) => item.isFile() && item.name.endsWith('.md'))

  const filesMetaData: FileMetaData[] = allFiles.map((file) => {
    const path = file.path.replace(publicFolderPath, '')
    return {
      fileName: file.name,
      filePath: path,
      url: getURLFromFilePath([path, file.name].join('/')),
    }
  })

  return filesMetaData
}

function getURLFromFilePath(path: string) {
  return path
    .split('/')
    .filter((segment) => segment.length > 0)
    .map((segment) => segment.replace(/^[0-9]+./g, '').replace('.md', ''))
    .join('_')
    .toLowerCase()
}
