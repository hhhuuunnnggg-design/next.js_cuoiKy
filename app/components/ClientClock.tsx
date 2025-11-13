"use client";

import { useEffect, useState } from "react";

function formatNow() {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "full",
    timeStyle: "long",
    hour12: false,
  }).format(new Date());
}

export default function ClientClock() {
  const [now, setNow] = useState<string>(formatNow());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(formatNow());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/30">
      <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">
        Client time
      </h3>
      <p className="mt-2 text-xl font-semibold text-blue-900 dark:text-blue-100">
        {now}
      </p>
      <p className="mt-1 text-xs text-blue-700/80 dark:text-blue-300/80">
        Cập nhật mỗi giây trên client (use client)
      </p>
    </div>
  );
}
