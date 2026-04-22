import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const events = await prisma.event.findMany({
    include: {
      creator: true
    }
  })
  console.log(JSON.stringify(events, null, 2))
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
