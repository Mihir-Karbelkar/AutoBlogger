import { authOptions } from '@autoblogger/app/auth-options';
import prisma from '@autoblogger/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
export type Tag = {
  link: string;
  name: string;
};

export type Topic = {
  title: string;
  tags: Tag[];
  link: string;
};

export async function GET(
  _: NextRequest,
  { params }: { params: { category: string } }
) {
  const { category } = params;
  const session = await getServerSession(authOptions);
  const dbCat = await prisma.category.findFirst({
    where: {
      id: category,
      userId: session?.user.id,
    },
  });
  const blogs =
    dbCat?.name === 'All'
      ? await prisma.blogPost.findMany({
          where: {
            userId: session?.user?.id,
            recommended: false,
          },
          include: {
            keywords: true,
          },
        })
      : await prisma.blogPost.findMany({
          where: {
            categoryId: category,
            userId: session?.user?.id,
            recommended: false,
          },
          include: {
            keywords: true,
          },
        });
  const topics = blogs.map((blog) => ({
    title: blog.topic,
    tags: blog.keywords.map((keyword) => ({ name: keyword.key, link: '' })),
    link: `/categories/${category}/blogs/${blog.id}?mode=edit`,
  }));

  return NextResponse.json(
    {
      data: topics,
    },
    {
      status: 200,
    }
  );
}

export async function POST(
  req: NextRequest,
  { params: { category } }: { params: { category: string } }
) {
  const payload = await req.json();
  const session = await getServerSession(authOptions);
  const blog = await prisma.blogPost.create({
    data: {
      ...payload,
      author: {
        connect: {
          id: session?.user?.id,
        },
      },
      topic: payload?.topic,
      keywords: {
        create: payload.keywords.map((key: string) => ({
          key,
        })),
      },
      category: {
        connect: {
          id: category,
        },
      },
    },
  });

  return NextResponse.json(
    {
      status: 200,
    },
    {
      status: 200,
    }
  );
}
