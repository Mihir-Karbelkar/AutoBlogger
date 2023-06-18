import { authOptions } from '@autoblogger/app/auth-options';
import prisma from '@autoblogger/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export type Tag = {
  link: string;
  name: string;
};

export type Topic = {
  title: string;
  tags: Tag[];
  link: string;
};

const getRecommendedTopicsPrompt = (category: string) => `
Generate 5 topics with max 3 keywords and title not exceeding 6 words on '${category}' category and send it in json format. The keywords for a single topic must not repeat

Sample Input: Mission

Sample Output: {
  "data": [
    {
      "title": "Unleashing Your Inner Purpose: Finding and Fulfilling Your Life Mission",
      "keywords": ["purpose", "life mission", "self-discovery", "passion", "fulfillment"]
    },
    {
      "title": "Mission-Driven Entrepreneurship: Building a Business That Makes a Difference",
      "keywords": ["mission-driven", "entrepreneurship", "social impact", "business", "sustainable"]
    },
    {
      "title": "From Inspiration to Action: Crafting a Personal Mission Statement",
      "keywords": ["inspiration", "action", "personal mission statement", "goal-setting", "motivation"]
    },
    {
      "title": "Mission Possible: Overcoming Challenges and Achieving Your Goals",
      "keywords": ["challenges", "goals", "achievement", "perseverance", "success"]
    },
    {
      "title": "Mission in Motion: Making a Meaningful Difference in Your Community",
      "keywords": ["community", "meaningful", "social change", "volunteering", "impact"]
    }
  ]
}

`;

const getRecommendedTopics = async (category: string) => {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    temperature: 0.6,
    prompt: `${getRecommendedTopicsPrompt(category)}: `,
    max_tokens: 400,
  });
  const topics = JSON.parse((await completion.json())?.choices?.[0]?.text);
  return topics?.data || [];
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
  let topics: Topic[] = [];
  let blogs =
    dbCat?.name === 'All'
      ? await prisma.blogPost.findMany({
          where: {
            userId: session?.user?.id,
            recommended: true,
          },
          include: {
            keywords: true,
          },
        })
      : await prisma.blogPost.findMany({
          where: {
            categoryId: category,
            userId: session?.user?.id,
            recommended: true,
          },
          include: {
            keywords: true,
          },
        });

  if (!dbCat?.fetched && dbCat?.name !== 'All') {
    if (dbCat?.name) {
      const openAiTopics: { title: string; keywords: string[] }[] =
        await getRecommendedTopics(dbCat.name);
      blogs = await Promise.all(
        openAiTopics.map(async (topic) => {
          const blog = await prisma.blogPost.create({
            data: {
              author: {
                connect: {
                  id: session?.user?.id,
                },
              },
              topic: topic?.title,
              keywords: {
                create: topic?.keywords?.map((key: string) => ({
                  key,
                })),
              },
              category: {
                connect: {
                  id: category,
                },
              },
              recommended: true,
            },
            include: {
              keywords: true,
            },
          });
          return blog;
        })
      );
      await prisma.category.update({
        where: {
          id: category,
        },
        data: {
          fetched: true,
        },
      });
    }
  }
  topics = blogs.map((blog) => ({
    title: blog.topic,
    tags: blog.keywords.map((keyword) => ({ name: keyword.key, link: '' })),
    link: `/categories/${category}/blogs/${blog.id}?mode=edit`,
  }));
  await prisma.$disconnect();
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
