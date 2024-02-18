import { S3Client } from '@aws-sdk/client-s3'

export function getS3Client(): S3Client {
  if (process.env.ENV === 'localdev' || process.env.ENV === 'localprod') {
    const accessKeyId =
      process.env.AWS_ACCESS_KEY_ID ?? 'AWS_ACCESS_KEY_ID_NOT_FOUND'
    const secretAccessKey =
      process.env.AWS_SECRET_ACCESS_KEY ?? 'AWS_SECRET_ACCESS_KEY_NOT_FOUND'
    const region = process.env.AWS_REGION ?? 'us-east-1'
    const endpoint = process.env.URL_ENDPOINT ?? 'http://localhost:4566'

    return new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
    })
  }

  return new S3Client()
}
