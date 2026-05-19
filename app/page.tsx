import Link from "next/link";
import { posts } from "@/app/data/posts";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-bold text-blue-600">
            LifeFit
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <Link href="/tools/njob-tax" className="hover:text-blue-600">
              N잡 세금 계산기
            </Link>
            <Link href="/tools/short-work" className="hover:text-blue-600">
              육아수당 계산기
            </Link>
            <Link href="/tools/fit-youth" className="hover:text-blue-600">
              월세지원 계산기
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              생활을 더 건강하고 풍요롭게
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              정부 지원 정책, 복지 정보, 금융 팁을 한눈에 확인하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* Featured Tools CTA */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-blue-50 bg-blue-50/50 p-6 transition-all hover:shadow-sm">
            <span className="text-xs font-semibold uppercase text-blue-600">
              추천 도구
            </span>
            <h2 className="mt-1 text-xl font-bold text-gray-900">
              육아기 근로시간 단축 급여 계산기
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              단축근무 시 실제로 내가 받을 수 있는 급여를 모의 계산해보세요.
            </p>
            <Link
              href="/tools/short-work"
              className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              바로가기 →
            </Link>
          </div>
          <div className="rounded-2xl border border-purple-50 bg-purple-50/50 p-6 transition-all hover:shadow-sm">
            <span className="text-xs font-semibold uppercase text-purple-600">
              추천 도구
            </span>
            <h2 className="mt-1 text-xl font-bold text-gray-900">
              청년 주거지원 대상자 판별기
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              내가 청년 주거지원 정책의 대상자인지 1분 만에 확인해보세요.
            </p>
            <Link
              href="/tools/fit-youth"
              className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              바로가기 →
            </Link>
          </div>
          <div className="rounded-2xl border border-red-50 bg-red-50/50 p-6 transition-all hover:shadow-sm">
            <span className="text-xs font-semibold uppercase text-red-600">
              NEW! 강력 추천
            </span>
            <h2 className="mt-1 text-xl font-bold text-gray-900">
              N잡러 건보료 폭탄 계산기
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              종합소득세 신고 후 건강보험료 폭탄 및 피부양자 박탈 리스크를 미리 확인하세요.
            </p>
            <Link
              href="/tools/njob-tax"
              className="mt-4 inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700"
            >
              바로가기 →
            </Link>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            최신 정보 및 가이드
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-md"
              >
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <h3 className="mt-2 text-lg font-bold text-gray-900 hover:text-blue-600">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {post.summary}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <p className="text-center text-sm text-gray-400">
            © 2026 LifeFit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
