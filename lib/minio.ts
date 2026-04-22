import * as Minio from 'minio'

if (!process.env.MINIO_ENDPOINT) {
  throw new Error('MINIO_ENDPOINT is not defined')
}

// Parse endpoint (e.g., http://149.102.155.247:9000)
const url = new URL(process.env.MINIO_ENDPOINT)
const endPoint = url.hostname
const port = parseInt(url.port) || (url.protocol === 'https:' ? 443 : 80)
const useSSL = url.protocol === 'https:'

export const minioClient = new Minio.Client({
  endPoint,
  port,
  useSSL,
  accessKey: process.env.MINIO_ROOT_USER || 'admin',
  secretKey: process.env.MINIO_ROOT_PASSWORD || 'G1veMePass2026',
})

export const BUCKETS = {
  AVATARS: 'avatars',
  EVENTS: 'event-assets',
  STREAMS: 'stream-recordings',
}

/**
 * Ensures that the required buckets exist
 */
export async function initializeMinio() {
  for (const bucket of Object.values(BUCKETS)) {
    const exists = await minioClient.bucketExists(bucket)
    if (!exists) {
      await minioClient.makeBucket(bucket, 'us-east-1')
      console.log(`Bucket "${bucket}" created successfully.`)
      
      // Set public policy for avatars if needed
      if (bucket === BUCKETS.AVATARS) {
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: { AWS: ['*'] },
              Action: ['s3:GetObject'],
              Resource: [`arn:aws:s3:::${bucket}/*`],
            },
          ],
        }
        await minioClient.setBucketPolicy(bucket, JSON.stringify(policy))
      }
    }
  }
}

/**
 * Generates a presigned URL for uploading a file
 */
export async function getPresignedUploadUrl(bucketName: string, fileName: string, expiry = 3600) {
  return await minioClient.presignedPutObject(bucketName, fileName, expiry)
}

/**
 * Generates a presigned URL for viewing a file
 */
export async function getPresignedDownloadUrl(bucketName: string, fileName: string, expiry = 3600) {
  return await minioClient.presignedGetObject(bucketName, fileName, expiry)
}
