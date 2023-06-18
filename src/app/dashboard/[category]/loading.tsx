import { TopicRowSkeleton } from '../../components/recommended';

export default async function Loading() {
  return (
    <div className="w-2/3">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="text-3xl text-bold ">Topics</div>
        </div>
        {Array.from({ length: 2 }).map((_, index) => (
          <TopicRowSkeleton key={`${index}`} />
        ))}
      </div>
      <div className="w-full">
        <div className="mt-4 text-3xl text-bold">Recommended Topics</div>
        {Array.from({ length: 5 }).map((_, index) => (
          <TopicRowSkeleton key={`${index}`} />
        ))}
      </div>
    </div>
  );
}
