import { authOptions } from '@autoblogger/app/auth-options';
import { delay } from '@autoblogger/app/lib/delay';
import prisma from '@autoblogger/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { parse } from 'node-html-parser';
import { Configuration, OpenAIApi } from 'openai-edge';
import { data } from 'autoprefixer';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
const replicate = new Replicate({
  // get your token from https://replicate.com/account
  auth: process.env.REPLICATE_API_TOKEN || '',
});

const testOutput = `
<!DOCTYPE html>
<html>
<head>
    <title>Exploring Uncharted Territories: Adventurous Expeditions</title>
</head>
<body>
    <h1>Exploring Uncharted Territories: Adventurous Expeditions</h1>
    <p>
        In a world where much has been discovered and mapped, there is still a thrill in venturing into uncharted territories. The spirit of exploration and adventure continues to captivate the human imagination, pushing us to go beyond our comfort zones and discover new frontiers.
    </p>
    <p>
        Uncharted territories offer a unique opportunity to explore the unknown, where every step is an adventure and every moment is filled with anticipation. These expeditions take us to remote and untouched corners of the globe, allowing us to witness nature's wonders in their purest form.
    </p>
    <img src="image1.jpg" alt="Mountains in the distance">
    <p>
        Imagine standing on the edge of a vast wilderness, surrounded by towering mountains, dense forests, and pristine lakes. The air is crisp, and the silence is broken only by the sounds of nature. It is in these uncharted territories that we can truly disconnect from the chaos of modern life and reconnect with the raw beauty of our planet.
    </p>
    <p>
        Adventurous expeditions into uncharted territories also present us with challenges that test our physical and mental limits. Trekking through rugged terrains, crossing treacherous rivers, and enduring extreme weather conditions require resilience, determination, and teamwork. These expeditions push us to overcome obstacles and discover our true potential.
    </p>
    <img src="image2.jpg" alt="Divers exploring a coral reef">
    <p>
        Uncharted territories are not limited to land-based adventures. Exploring the depths of the ocean, diving into mysterious underwater caves, and discovering vibrant coral reefs offer a whole different dimension to adventurous expeditions. The marine world holds countless secrets, waiting to be explored by those with a passion for the unknown.
    </p>
    <p>
        It is important to approach these expeditions with respect for the environment and the local communities. Sustainable and responsible exploration ensures that future generations can also experience the wonders of uncharted territories. By minimizing our impact and supporting local conservation efforts, we can preserve these pristine landscapes for years to come.
    </p>
    <img src="image3.jpg" alt="A hiker looking over a valley">
    <p>
        So, if you're seeking a true adventure, consider embarking on an expedition to uncharted territories. Whether it's scaling towering peaks, diving into the depths of the ocean, or exploring remote jungles, these adventures will leave you with memories that last a lifetime. Unleash your inner explorer and discover the thrill of the unknown.
    </p>
</body>
</html>`;

const getImage = async (prompt: string) => {
  // return 'https://replicate.delivery/pbxt/ZXD8AIyWSzboM1dZeDEGa2UOZ8L900hFCaiEAuQeh2MfFKOiA/out-0.png';
  const output = await replicate?.run(
    'stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
    {
      input: {
        prompt: `image for a blog with description '${prompt}'`,
      },
    }
  );

  return (output as unknown as string[]) || [];
};

const getBlogPrompt = (title: string, keywords: string[]) => `
Write a blog in 300 words on ${title} and send it in HTML. Add images wherever neccessary (not more than 3) with a descriptive alt description and src attribute should not be there
Title: ${title}
Keywords: ${keywords.join(',')}
`;

const getBlog = async (title: string, keywords: string[]) => {
  return `<p>test</p>`;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    temperature: 0.6,
    prompt: `${getBlogPrompt(title, keywords)}: `,
    max_tokens: 1000,
  });
  return (await completion.json())?.choices?.[0]?.text;
};

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
  const session = await getServerSession(authOptions);
  const blog = await prisma.blogPost.findFirst({
    where: {
      id: blogId,
      userId: session?.user?.id,
    },
    include: {
      keywords: true,
    },
  });

  if (blog?.fetched)
    return NextResponse.json(
      {
        data: {
          ...blog,
        },
      },
      {
        status: 200,
      }
    );
  const blogHtml = await getBlog(
    blog?.topic || '',
    blog?.keywords?.map((key) => key?.key || '')?.filter(Boolean) || []
  );

  const root = parse(blogHtml);

  for (const img of root.querySelectorAll('img')) {
    try {
      const imgSrc = await getImage(img.getAttribute('alt') || '');
      // img.setAttribute('style', 'display:none;');
      img.setAttribute('src', `${imgSrc}` as string);
    } catch (e) {
      root.querySelectorAll('img').map((img) => {
        img.remove();
      });
    }
  }

  const header = root.querySelector('h1');
  if (header) {
    header.remove();
  }

  const updatedBlog = await prisma.blogPost.update({
    where: {
      id: blogId,
    },
    data: {
      content: root.querySelector('body')?.innerHTML || root?.innerHTML,
      fetched: true,
    },
    include: {
      keywords: true,
    },
  });

  return NextResponse.json(
    {
      data: updatedBlog,
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
  const session = await getServerSession(authOptions);
  const blog = await prisma.blogPost.update({
    where: {
      id: blogId,
    },
    data: {
      ...payload,
      author: {
        connect: {
          id: session?.user?.id,
        },
      },
      topic: payload?.topic,
      keywords: {
        connectOrCreate:
          payload?.keywords
            ?.filter(
              (value: string, index: number, arr: string[]) =>
                arr.indexOf(value) === index
            )
            ?.map((key: string) => ({
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
      recommended: false,
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
