import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

import { Prisma } from '@prisma/client'

export async function GET() {
  try {
    const password = await bcrypt.hash('jaamdemo123', 10)

    const creators: Prisma.UserCreateInput[] = [
      {
        email: 'sarah@jaamlist.com',
        name: 'Sarah Jenkins',
        role: 'CREATOR',
        password,
        bio: 'Jazz Musician and Soul Singer based in London.',
        streamingStatus: 'APPROVED',
      },
      {
        email: 'mike@jaamlist.com',
        name: 'Mike Laughs',
        role: 'CREATOR',
        password,
        bio: 'Stand-up comedian with over 10 years of experience.',
        streamingStatus: 'APPROVED',
      },
      {
        email: 'alex@jaamlist.com',
        name: 'Alex Plays',
        role: 'CREATOR',
        password,
        bio: 'Professional gamer and speedrunner.',
        streamingStatus: 'APPROVED',
      },
    ]

    for (const creator of creators) {
      await prisma.user.upsert({
        where: { email: creator.email },
        update: {},
        create: creator,
      })
    }

    return NextResponse.json({ 
      message: 'Demo creators seeded successfully',
      creators: creators.map(c => ({ email: c.email, password: 'jaamdemo123' }))
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
