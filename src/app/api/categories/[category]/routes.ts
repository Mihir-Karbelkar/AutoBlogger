import { authOptions } from '@autoblogger/app/auth-options';
import { delay } from '@autoblogger/app/lib/delay';
import prisma from '@autoblogger/app/lib/prisma';
import { getServerSession } from 'next-auth';
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
  await delay(2000);
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
