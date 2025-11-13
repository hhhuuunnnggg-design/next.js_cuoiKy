import type { Metadata } from "next";
import ClientClock from "../components/ClientClock";
import ServerTime from "../components/ServerTime";

export const dynamic = "force-dynamic"; // ensure server time updates per request

export const metadata: Metadata = {
  title: "Thời gian",
  description: "So sánh server render time và client realtime clock",
};

export default function TimePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Static vs Server vs Client
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Ví dụ về render server (SSR) và client (CSR/Hydration). Khối bên trái
          hiển thị thời gian do server render tại thời điểm request. Khối bên
          phải là đồng hồ client cập nhật mỗi giây.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ServerTime />
          <ClientClock />
        </div>
      </div>
    </div>
  );
}
