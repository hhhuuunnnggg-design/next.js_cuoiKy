import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bài viết",
  description: "Danh sách bài viết từ JSONPlaceholder",
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Không thể tải danh sách bài viết");
  }

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  console.log(
    "Dữ liệu posts nhận được:",
    posts.map((p) => p.id)
  ); // debug

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">
          Danh sách bài viết
        </h1>

        <ul className="mt-8 space-y-6">
          {posts.slice(0, 20).map((post) => (
            <li key={post.id} className="rounded-lg border p-6 shadow-sm">
              <p className="mb-2 text-sm text-gray-500">
                👉 đây chính là id số <b>{post.id}</b>
              </p>

              <h2 className="text-xl font-semibold">{post.title}</h2>

              <p className="mt-2">{post.body}</p>

              <div className="mt-4">
                <Link
                  href={`/posts/${post.id}`} // 🔥 đảm bảo đúng path
                  className="inline-flex items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  Chi tiết
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
