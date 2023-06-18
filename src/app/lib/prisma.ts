import { PrismaClient } from '@prisma/client';
import 'server-only';
declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}
prisma.$use(async (params, next) => {
  const result = await next(params);
  if (params.action === 'create' && params.model === 'Account') {
    const userId = params?.args?.data?.userId;
    const defaultCategories = [
      {
        name: 'All',
        userId,
      },
      {
        name: 'Custom',
        userId,
      },
      {
        name: 'ICP',
        userId,
      },
      {
        name: 'Mission',
        userId,
      },
      {
        name: 'Product',
        userId,
      },
    ];
    defaultCategories.map(async (category) => {
      await prisma.category.upsert({
        where: {
          name_userId: {
            name: category.name,
            userId: category.userId,
          },
        },
        create: {
          name: category.name,
          fetched: false,
          author: {
            connect: {
              id: userId,
            },
          },
        },
        update: {},
      });
    });
  }
  return result;
});

export default prisma;
