import Link from "next/link";
import { usePathname } from "next/navigation";
import RecommendedTopics from "../recommended";
export default function Page({ params }: { params: { category: string } }) {
  const { category } = params;
  return (
    <>
      <RecommendedTopics category={category} />
    </>
  );
}
