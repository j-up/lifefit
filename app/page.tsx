import Link from "next/link";
import Image from "next/image";
import { posts } from "@/app/data/posts";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* JSON-LD: BreadcrumbList for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "홈",
                item: "https://lifefit.kr",
              },
            ],
          }),
        }}
      />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
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
            <Link href="/tools/njob-tax" className="hover:text-blue-600">
              N잡 세금 계산기
            </Link>
            <Link href="/tools/car-bond" className="hover:text-blue-600">
              차 채권 환급금
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
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="rounded-2xl border border-teal-50 bg-teal-50/50 p-6 transition-all hover:shadow-sm">
            <span className="text-xs font-semibold uppercase text-teal-600">
              추천 도구
            </span>
            <h2 className="mt-1 text-xl font-bold text-gray-900">
              N잡러 세금·건보료 폭탄 계산기
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              종합소득세 신고 후 건강보험료 인상과 피부양자 탈락 리스크를 확인하세요.
            </p>
            <Link
              href="/tools/njob-tax"
              className="mt-4 inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700"
            >
              바로가기 →
            </Link>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                최신 정보 및 가이드
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                누구나 쉽게 이해할 수 있는 복지·금융 가이드
              </p>
            </div>
            <span className="text-sm text-gray-400">
              총 {posts.length}개의 콘텐츠
            </span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-lg hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <Link href={`/posts/${post.slug}`} className="relative block h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={267}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm">
                    {post.category}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} 소요</span>
                  </div>

                  <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
                    {post.summary}
                  </p>

                  <div className="mt-auto pt-4">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      자세히 보기
                      <svg
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
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
          <div className="mb-8 grid gap-6 sm:grid-cols-3 text-sm">
            <div>
              <h3 className="mb-3 font-bold text-gray-900">도구</h3>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <Link href="/tools/short-work" className="hover:text-blue-600 transition-colors">
                    육아기 단축근무 급여 계산기
                  </Link>
                </li>
                <li>
                  <Link href="/tools/fit-youth" className="hover:text-blue-600 transition-colors">
                    청년 주거지원 대상자 판별기
                  </Link>
                </li>
                <li>
                  <Link href="/tools/njob-tax" className="hover:text-blue-600 transition-colors">
                    N잡러 건보료 폭탄 계산기
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-gray-900">인기 가이드</h3>
              <ul className="space-y-2 text-gray-500">
                {posts.slice(0, 3).map((post) => (
                  <li key={post.id}>
                    <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors line-clamp-1">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-gray-900">LifeFit</h3>
              <p className="text-gray-500 leading-relaxed">
                내 삶에 딱 맞는 정부 지원금과 복지 혜택을 가장 쉽고 빠르게 찾아주는 서비스입니다.
              </p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 border-t border-gray-100 pt-6">
            © 2026 LifeFit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
