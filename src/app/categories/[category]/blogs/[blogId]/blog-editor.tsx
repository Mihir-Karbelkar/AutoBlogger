"use client";
import dynamic from "next/dynamic";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { useCompletion } from "ai/react";
import { Keyword } from "@prisma/client";

const Editor = dynamic(() => import("@autoblogger/app/components/editor"));

export default function BlogEditor(props: {
  defaultValue: string;
  category: string;
  blogId: string;
  mode: "edit" | "view";
  keywords: Keyword[];
  topic: string;
}) {
  const { defaultValue, category, blogId, mode, topic, keywords } = props;
  const [content, setContent] = useState(defaultValue);
  const router = useRouter();
  const blogEditorRef = useRef<EditorJS>();
  const { complete, completion, isLoading } = useCompletion({
    api: "/api/completion",
  });

  console.log(completion, "Completion");
  return (
    <div className="relative">
      <Editor
        defaultValue={defaultValue}
        onChange={(currentContent) => {
          setContent(currentContent);
        }}
        setContents={completion}
      />
      {/* <Editor editorRef={blogEditorRef} holder="blog-editor" /> */}
      <button
        onClick={async () => {
          complete(
            `Write a blog in 50 words on ${topic} with keywords - ${keywords
              .map((key) => key.key)
              .join(", ")} :`
          );
        }}
      >
        save
      </button>
      <button
        className="absolute right-5 top-3 z-10"
        type="button"
        onClick={() => {
          const payload = {
            content,
          };
          fetch(`/api/categories/${category}/topics/${blogId}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }).then(() => {
            router.push(`/dashboard/${category}`);
          });
        }}
      >
        Publish
      </button>
    </div>
  );
}
