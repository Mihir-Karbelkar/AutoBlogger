import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RecommendedTopics from '../../components/recommended';
import CategoryTopics from '../../components/topics';
import Button from '@autoblogger/app/components/overriden/button';
export default async function Page({
  params,
}: {
  params: { category: string; categoryName: string };
}) {
  const { category, categoryName } = params;
  return (
    <div className="w-2/3">
      <div>
        <div className="flex justify-between">
          <div className="text-3xl text-bold ">Topics</div>
          {categoryName === 'All' ? null : (
            <Link href={`/categories/${category}/add-topic`}>
              <Button>+ Add Topic</Button>
            </Link>
          )}
        </div>
        {/* @ts-ignore */}
        <CategoryTopics category={category} />
      </div>
      {/* ts-ignore*/}
      <div>
        <div className="mt-4 text-3xl text-bold">Recommended Topics</div>
        {/* @ts-ignore */}
        <RecommendedTopics category={category} />
      </div>
    </div>
  );
}
