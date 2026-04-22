import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('jaamdemo123', 10)

  const creators = [
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
    console.log(`Seeded: ${creator.email}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
