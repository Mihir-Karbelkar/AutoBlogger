import { api } from "@autoblogger/app/lib/api";
import BlogEditor from "./blog-editor";

const getInitialData = (category: string, blogId: string) =>
  api(`/api/categories/${category}/topics/${blogId}`, {
    method: "GET",
    cache: "no-store",
  })
    .then((data) => data.json())
    .then((data) => data["data"]);

export default async function EditTopic({
  params: { category, blogId },
  searchParams: { mode },
}: {
  params: { category: string; blogId: string };
  searchParams: { mode: "edit" | "view" };
}) {
  const data = await getInitialData(category, blogId);
  console.log(data, `/api/categories/${category}/topics/${blogId}`, "DATA");
  const { content } = data;
  return (
    <>
      {mode === "edit" ? (
        <BlogEditor
          mode={mode || "view"}
          category={category}
          blogId={blogId}
          defaultValue={content}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </>
  );
}
