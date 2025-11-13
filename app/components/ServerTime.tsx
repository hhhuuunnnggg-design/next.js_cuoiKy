import "server-only";

export default async function ServerTime() {
  const now = new Date();
  const formatted = new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "full",
    timeStyle: "long",
    hour12: false,
  }).format(now);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Server time
      </h3>
      <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
        {formatted}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Được render trên server
      </p>
    </div>
  );
}
