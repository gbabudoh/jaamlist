import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { getPresignedUploadUrl, BUCKETS, initializeMinio } from '@/lib/minio'
import { v4 as uuidv4 } from 'uuid'

let minioInitialized = false

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!minioInitialized) {
      await initializeMinio()
      minioInitialized = true
    }

    const { filename, bucket = BUCKETS.AVATARS } = await req.json()

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
    }

    // Validate bucket
    if (!Object.values(BUCKETS).includes(bucket)) {
      return NextResponse.json({ error: 'Invalid bucket' }, { status: 400 })
    }

    // Generate a unique filename to prevent collisions
    const fileExtension = filename.split('.').pop()
    const uniqueFilename = `${session.user.id}/${uuidv4()}.${fileExtension}`

    // Get presigned URL from Minio
    const uploadUrl = await getPresignedUploadUrl(bucket, uniqueFilename)

    // The public URL where the file will be accessible after upload
    // Note: This assumes Minio is configured with public read access or via a proxy
    const publicUrl = `${process.env.MINIO_ENDPOINT}/${bucket}/${uniqueFilename}`

    return NextResponse.json({
      uploadUrl,
      publicUrl,
      filename: uniqueFilename,
    })
  } catch (error) {
    console.error('Storage upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
