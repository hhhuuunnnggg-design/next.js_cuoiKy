import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Tìm hiểu thêm về ứng dụng và công nghệ chúng tôi sử dụng",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Giới thiệu
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          <p>
            Đây là trang giới thiệu của ứng dụng Next.js. Trang này được tạo để
            minh họa cách sử dụng metadata trong Next.js.
          </p>
          <p>
            Mỗi trang có thể có metadata riêng, bao gồm title và description để
            tối ưu hóa SEO.
          </p>
          <div className="mt-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Công nghệ sử dụng
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Next.js 16 - Framework React</li>
              <li>TypeScript - Type safety</li>
              <li>Tailwind CSS - Styling</li>
              <li>Metadata API - SEO optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
