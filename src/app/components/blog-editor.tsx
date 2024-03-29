"use client";
import dynamic from "next/dynamic";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useCompletion } from "ai/react";
import { Keyword } from "@prisma/client";
import Loading from "../categories/[category]/blogs/[blogId]/loading";
import TextareaAutosize from "react-textarea-autosize";
import { api } from "@autoblogger/app/lib/api";
import Button from "@autoblogger/app/components/overriden/button";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const Editor = dynamic(() => import("@autoblogger/app/components/editor"), {
  ssr: false,
});

export default function BlogEditor(props: {
  defaultValue: string;
  category: string;
  blogId: string;
  mode: "edit" | "view";
  keywords: Keyword[];
  topic: string;
  isChatGptArticle: boolean;
}) {
  const { defaultValue, category, blogId, mode, topic, isChatGptArticle } =
    props;
  const [content, setContent] = useState(defaultValue);
  const [title, setTitle] = useState<string>(topic);
  const router = useRouter();
  const blogEditorRef = useRef<EditorJS>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log(isChatGptArticle, "IS CHATGPT");
    if (!isChatGptArticle) {
      toast({
        title: "My tokens ran out 😅",
        duration: Infinity,
        description:
          "This is a dummy article that will show up if my trial period ends. Ability to add your tokens coming soon",
        variant: "default",
      });
    }
  }, [isChatGptArticle]);
  return (
    <div className="relative mt-10">
      {/* <Editor
        defaultValue={defaultValue}
        onChange={(currentContent) => {
          setContent(currentContent);
        }}
        setContents={completion}
      /> */}
      <div className="flex justify-center">
        <div className="w-[80%] relative">
          <TextareaAutosize
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <Editor
            defaultValue={defaultValue}
            editorRef={blogEditorRef}
            holder="blog-editor"
            onChange={(con) => {
              setContent(con);
            }}
          />
          <Button
            className="absolute right-5 top-1 z-10 !w-20"
            type="button"
            disabled={isLoading}
            isLoading={isLoading}
            onClick={() => {
              setIsLoading(true);
              const payload = {
                content,
                topic: title,
              };
              fetch(`/api/categories/${category}/topics/${blogId}`, {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                cache: "no-cache",
              })
                .then(() => {
                  router.push(`/dashboard/${category}`);
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

// export default Loading;
