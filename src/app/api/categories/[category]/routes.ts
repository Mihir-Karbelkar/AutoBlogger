import prisma from '@autoblogger/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export type Category = {
  id: string;
  label: string;
};

export async function GET(
  _: NextRequest,
  { params }: { params: { category: string } }
) {
  const { category } = params;
  const categoryResponse = await prisma.category.findFirst({
    where: {
      id: category,
    },
  });
  return NextResponse.json(
    {
      data: categoryResponse,
    },
    {
      status: 200,
    }
  );
}
