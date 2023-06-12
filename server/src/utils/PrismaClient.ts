import { PrismaClient } from '@prisma/client'

let prismaInstance: null | PrismaClient = null

function getPrismaInstance() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient()
  }
  return prismaInstance
}

export default getPrismaInstance