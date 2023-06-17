import Link from "next/link";
import addAlpha from "../lib/add-alpha";
import stringToColor from "../lib/string-to-color";
import { Suspense } from "react";
import { api } from "../lib/api";
import {
  Topic,
  Tag,
} from "../api/categories/[category]/topics/recommended/route";
import useSWR from "swr";

type TopicProps = {
  title: string;
  tags: Tag[];
  link: string;
  index?: number;
};
export const getRecommendedTopics = (category: string) =>
  api(`/api/categories/${category}/topics/recommended`, {
    cache: "no-store",
  })
    .then((data) => data.json())
    .then((data) => data["data"]);

export default async function RecommendedTopics({
  category = "",
}: {
  category: string;
}) {
  const recommendedTopics = await getRecommendedTopics(category);
  console.log(recommendedTopics, "TOPICS");
  return (
    <div>
      Recommended Topics
      <Suspense fallback={<TopicSkeleton />}>
        <Topics topics={recommendedTopics} />
      </Suspense>
    </div>
  );
}

const Tag = (props: Tag) => {
  const tagColor = stringToColor(props?.name || "");
  return (
    <p
      style={{
        border: `1px solid ${tagColor}`,
        backgroundColor: `${addAlpha(tagColor, 0.2)}`,
        color: tagColor,
      }}
      className="text-xs px-4 rounded"
    >
      {props.name}
    </p>
  );
};

const TopicRow = ({ title, tags, link, index = 0 }: TopicProps) => {
  return (
    <div
      className={`flex justify-between border-2 border-gray-200 p-2 ${
        index !== 0 ? "border-t-0" : ""
      }`}
    >
      <div>
        <p>{title}</p>
        <div className="flex">
          {tags.map((tag) => (
            <div className="mr-4 flex mt-1">
              <Tag {...tag} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Link href={link}>Write</Link>
      </div>
    </div>
  );
};

export const Topics = (props: { topics: Topic[] }) => {
  const { topics } = props;
  return topics.map((topic, index) => <TopicRow index={index} {...topic} />);
};

export const TopicSkeleton = () => {
  return <>Loading...</>;
};
