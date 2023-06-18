import { authOptions } from '@autoblogger/app/auth-options';
import prisma from '@autoblogger/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export type Category = {
  id: string;
  label: string;
};

export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
    where: {
      userId: session?.user?.id,
    },
  });
  return NextResponse.json(
    {
      data: categories.map((category) => ({
        id: category.id,
        label: category.name,
      })),
    },
    {
      status: 200,
    }
  );
}
