import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        <h1>Hello Next.js 15</h1>
        <Link href="/about" className="text-blue-500">
          About Page
        </Link>
      </div>
    </div>
  );
}
