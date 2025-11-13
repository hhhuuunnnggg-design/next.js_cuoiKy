import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getPost(id: string): Promise<Post | null> {
  if (!id || id === "undefined") {
    // 🔥 fix lỗi id undefined
    console.error("ID bị undefined → trả về null");
    return null;
  }

  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  console.log("Fetching:", url);

  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params1: { id: string };
  params: { value: { id: string } };
}): Promise<Metadata> {
  console.log("generateMetadata nhận params:", params);
  console.log("generateMetadata nhận params.value.id:", params.value.id);
  const post = await getPost(params.value.id);

  if (!post) {
    return { title: "Không tìm thấy bài viết" };
  }

  return {
    title: post.title,
    description: post.body.slice(0, 120),
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("Trang chi tiết nhận params:", params);

  const post = await getPost(params.id);

  if (!post) return notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/posts" className="text-blue-600 hover:underline">
          ← Quay lại danh sách
        </Link>

        <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>

        <p className="mt-6 whitespace-pre-line text-lg">{post.body}</p>
      </div>
    </div>
  );
}
