import Link from 'next/link';
import addAlpha from '../lib/add-alpha';
import stringToColor from '../lib/string-to-color';
import { Suspense } from 'react';
import { api } from '../lib/api';
import {
  Topic,
  Tag,
} from '../api/categories/[category]/topics/recommended/route';
import useSWR from 'swr';
import Button from './overriden/button';

type TopicProps = {
  title: string;
  tags: Tag[];
  link: string;
  index?: number;
  type: 'recommended' | 'user';
};
export const getRecommendedTopics = (category: string) =>
  api(`/api/categories/${category}/topics/recommended`, {
    cache: 'no-store',
  })
    .then((data) => data.json())
    .then((data) => data['data']);

export default async function RecommendedTopics({
  category = '',
}: {
  category: string;
}) {
  const recommendedTopics = await getRecommendedTopics(category);
  return (
    <Suspense fallback={<TopicSkeleton />}>
      <Topics topics={recommendedTopics} type="recommended" />
    </Suspense>
  );
}

const Tag = (props: Tag) => {
  const tagColor = stringToColor(props?.name || '');
  return (
    <p
      style={{
        border: `1px solid ${tagColor}`,
        backgroundColor: `${addAlpha(tagColor, 0.2)}`,
        color: tagColor,
      }}
      className="text-sm px-4 rounded"
    >
      {props.name}
    </p>
  );
};

const TopicRow = ({ title, tags, link, index = 0, type }: TopicProps) => {
  return (
    <div
      className={`flex justify-between items-center py-6 ${
        index !== 0 ? 'border-t-1 border-gray-300 border-t' : ''
      }`}
    >
      <div>
        <p className="text-xl">{title}</p>
        <div className="flex mt-2">
          {tags.map((tag) => (
            <div key={tag.link} className="mr-4 flex mt-1">
              <Tag {...tag} />
            </div>
          ))}
        </div>
      </div>
      <div className="mr-6">
        <Link href={link}>
          <Button role="button">
            {type === 'recommended' ? 'Write' : 'Edit'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const Topics = (props: {
  topics: Topic[];
  type: 'recommended' | 'user';
}) => {
  const { topics, type } = props;
  return (
    <>
      {topics.length > 0 ? (
        topics.map((topic, index) => (
          <TopicRow key={topic.link} index={index} type={type} {...topic} />
        ))
      ) : (
        <div className="text-xl">No topics.</div>
      )}
    </>
  );
};

export const TopicSkeleton = () => {
  return <>Loading...</>;
};

export const TopicRowSkeleton = () => {
  return (
    <div className={`w-full  py-6 animate-pulse`}>
      <div className="text-xl rounded-lg  w-[40%] h-4 bg-gray-300"></div>
      <div className="flex mt-4  rounded-lg w-[30%] h-3 bg-gray-300"></div>
    </div>
  );
};
