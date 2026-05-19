import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/app/data/posts";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-bold text-blue-600">
            LifeFit
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <Link href="/tools/short-work" className="hover:text-blue-600">
              육아수당 계산기
            </Link>
            <Link href="/tools/fit-youth" className="hover:text-blue-600">
              월세지원 계산기
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <article className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-12">
          <header className="mb-8">
            <span className="text-sm text-gray-400">{post.date}</span>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-gray-500">{post.summary}</p>
          </header>

          <div
            className="prose prose-blue max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 border-t border-gray-100 pt-8">
            <Link
              href="/"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← 목록으로 돌아가기
            </Link>
          </div>
        </article>


      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="text-center text-sm text-gray-400">
            © 2026 LifeFit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
