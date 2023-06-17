"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditTopic({
  params: { category },
}: {
  params: { category: string };
}) {
  const router = useRouter();
  return (
    <>
      <div className="relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const payload = {
              topic: data.get("topicName"),
              keywords: data
                .get("keywords")
                ?.toString()
                .split(",")
                .map((keyword) => keyword.trim()),
            };
            fetch(`/api/categories/${category}/topics`, {
              method: "POST",
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
          <input name="topicName" />
          <input name="keywords" />
          <button>Create</button>
        </form>
      </div>
    </>
  );
}
