"use client";
import RichTextEditor from "@autoblogger/app/components/editor";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogEditor(props: {
  defaultValue: string;
  category: string;
  blogId: string;
  mode: "edit" | "view";
}) {
  const { defaultValue, category, blogId, mode } = props;
  const [content, setContent] = useState(defaultValue);
  console.log(defaultValue, "DEFAULT");
  const router = useRouter();
  return (
    <div className="relative">
      <RichTextEditor
        defaultValue={defaultValue}
        onChange={(currentContent) => {
          setContent(currentContent);
        }}
        disable={mode === "view"}
      />
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
