import { api } from "@autoblogger/app/lib/api";
import BlogEditor from "../../../../components/blog-editor";
export const metadata = {
  title: "Category creation",
  description: "",
};
const getInitialData = (category: string, blogId: string) =>
  api(`/api/categories/${category}/topics/${blogId}`, {
    method: "GET",
    cache: "no-store",
  })
    .then((data) => data.json())
    .then((data) => data);

export default async function EditTopic({
  params: { category, blogId },
  searchParams: { mode },
}: {
  params: { category: string; blogId: string };
  searchParams: { mode: "edit" | "view" };
}) {
  const { data, isChatGptArticle } = await getInitialData(category, blogId);
  const { content, keywords, topic } = data;
  return (
    <>
      {mode === "edit" ? (
        <BlogEditor
          mode={mode || "view"}
          category={category}
          blogId={blogId}
          defaultValue={content}
          keywords={keywords}
          topic={topic}
          isChatGptArticle={isChatGptArticle}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </>
  );
}
