import { delay } from "@autoblogger/app/lib/delay";
import prisma from "@autoblogger/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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
  { params: { blogId } }: { params: { category: string; blogId: string } }
) {
  const blog = await prisma.blogPost.findFirst({
    where: {
      id: blogId,
    },
    include: {
      keywords: true,
    },
  });
  console.log(blog);
  return NextResponse.json(
    {
      data: blog,
    },
    {
      status: 200,
    }
  );
}

export async function PUT(
  req: NextRequest,
  {
    params: { category, blogId },
  }: { params: { category: string; blogId: string } }
) {
  const payload = await req.json();
  const session = await getServerSession();
  const blog = await prisma.blogPost.update({
    where: {
      id: blogId,
    },
    data: {
      ...payload,
      author: {
        connect: {
          id: session?.user?.id,
          email: session?.user?.email,
        },
      },
      topic: payload?.topic,
      keywords: {
        connectOrCreate:
          payload?.keywords?.map((key: string) => ({
            where: {
              key,
            },
            create: {
              key,
            },
          })) || [],
      },
      category: {
        connect: {
          id: category,
        },
      },
      content: payload?.content || null,
    },
  });

  return NextResponse.json(
    {
      status: blog,
    },
    {
      status: 200,
    }
  );
}
