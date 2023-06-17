"use client";

import { redirect, useSelectedLayoutSegment } from "next/navigation";
import { Category } from "../api/categories/route";
import CategoryHeader from "./category-header";

export default function CategoryHeaderWrapper({
  categories,
}: {
  categories: Category[];
}) {
  const segment = useSelectedLayoutSegment();
  if (segment === null) redirect(`/dashboard/${categories?.[0]?.id}`);
  return <CategoryHeader categories={categories} />;
}
