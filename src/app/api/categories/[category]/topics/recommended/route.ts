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
  { params }: { params: { category: string } }
) {
  const { category } = params;
  await delay(2000);
  const session = await getServerSession();
  const blogs = await prisma.blogPost.findMany({
    where: {
      categoryId: category,
      userId: session?.user?.id,
    },
    include: {
      keywords: true,
    },
  });
  console.log(session, "Sess");

  const topics = blogs.map((blog) => ({
    title: blog.topic,
    tags: blog.keywords.map((keyword) => ({ name: keyword.key, link: "" })),
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
export const revalidate = 0;
