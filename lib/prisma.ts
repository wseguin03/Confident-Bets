import { PrismaClient } from '@prisma/client'
const globalForPrisma = (global as unknown) as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient({
    log: ['query']
})
if (process.env.NODE_ENV === 'development') globalForPrisma.prisma = prisma

// import { PrismaClient } from '@prisma/client'

// const prismaClientSingleton = () => {
//     return new PrismaClient()
// }

// declare global {
//     var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// import { PrismaClient } from '@prisma/client'
// declare global {
//     // allow global `var` declarations
//     // eslint-disable-next-line no-var
//     var prisma: PrismaClient | undefined
// }

// let prisma: PrismaClient

// if (typeof window === 'undefined') {
//     if (process.env.NODE_ENV === 'production') {
//         prisma = new PrismaClient()
//     } else {
//         if (!global.prisma) {
//             global.prisma = new PrismaClient()
//         }

//         prisma = global.prisma
//     }
// }
// //@ts-ignore
// export default prisma