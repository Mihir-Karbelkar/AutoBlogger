import prisma from '@autoblogger/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export type Category = {
  id: string;
  label: string;
};

export async function GET(_: NextRequest) {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
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
