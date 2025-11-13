import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Chào mừng đến với trang chủ của My Next App",
};

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Chào mừng đến với Next.js
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Đây là trang chủ của ứng dụng Next.js với Layout và Metadata được
          thiết lập đầy đủ.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/about"
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Tìm hiểu thêm
          </Link>
        </div>
      </div>
    </div>
  );
}
