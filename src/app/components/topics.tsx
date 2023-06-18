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
import { TopicSkeleton, Topics } from './recommended';

export const getCategoryTopics = (category: string) =>
  api(`/api/categories/${category}/topics`, {
    cache: 'no-store',
  })
    .then((data) => data.json())
    .then((data) => data['data']);

export default async function CategoryTopics({
  category = '',
}: {
  category: string;
}) {
  const topics = await getCategoryTopics(category);
  return (
    <Suspense fallback={<TopicSkeleton />}>
      <Topics topics={topics} type="user" />
    </Suspense>
  );
}
