'use client';

import { Category } from '@autoblogger/app/api/categories/[category]/routes';
import Button from '@autoblogger/app/components/overriden/button';
import Input from '@autoblogger/app/components/overriden/input';
import { api } from '@autoblogger/app/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditTopic({
  params: { category },
}: {
  params: { category: string };
}) {
  const router = useRouter();
  const [cat, setCategory] = useState<Category>();
  useEffect(() => {
    fetch(`/api/categories`, { cache: 'no-cache' })
      .then((data) => data.json())
      .then((data) => {
        console.log(data, 'DATA');
        setCategory(
          data['data'].find((cat: { id: string }) => cat.id === category)
        );
      });
  }, [category]);
  return (
    <>
      <div className="relative h-full w-full bg-secondary">
        <div className="text-6xl text-white absolute top-10 text-bold left-1/2 -translate-x-1/2">
          {cat?.label}
        </div>
        <div className="flex justify-center p-10 py-40 rounded-lg bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const payload = {
                topic: data.get('topicName'),
                keywords: data
                  .get('keywords')
                  ?.toString()
                  .split(',')
                  .map((keyword) => keyword.trim()),
              };
              fetch(`/api/categories/${category}/topics`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                cache: 'no-cache',
              }).then(() => {
                router.push(`/dashboard/${category}`);
              });
            }}
            className="w-[80%]"
          >
            <div className="text-center mb-10  text-4xl">Add Topic</div>
            <Input
              name="topicName"
              className="mb-6 border-gray-400 border border-solid"
              placeholder="Enter Topic Name"
            />
            <Input
              name="keywords"
              className="mb-6 border-gray-400 border border-solid"
              placeholder='Enter keywords (separated by ",")'
            />
            <Button>Create</Button>
          </form>
        </div>
      </div>
    </>
  );
}
