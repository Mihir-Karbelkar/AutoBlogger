"use client";
import Link from "next/link";
import { Category } from "../api/categories/route";
import { useSelectedLayoutSegment } from "next/navigation";

export default function CategoryHeader({
  categories,
}: {
  categories: Category[];
}) {
  const category = useSelectedLayoutSegment();
  return (
    <>
      <p className="text-2xl">Categories</p>
      <div className="flex justify-between">
        <div className="flex">
          {categories.map((category) => (
            <div className="mr-4">
              <Link href={`/dashboard/${category.id}`}>{category.label}</Link>
            </div>
          ))}
        </div>
        <Link href={`/categories/${category}/add-topic`}>Write</Link>
      </div>
    </>
  );
}
