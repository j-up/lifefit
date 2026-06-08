import Link from "next/link";
import Image from "next/image";
import { posts as staticPosts } from "@/app/data/posts";
import SubscribeCard from "@/app/components/SubscribeCard";
import Footer from "@/app/components/Footer";

async function getDbPosts() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/posts?select=*&order=date.desc`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        next: { revalidate: 60 }, // On-demand revalidation every 60s
      }
    );

    if (!response.ok) {
      console.error("Supabase Fetch Error:", await response.text());
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch DB posts:", error);
    return [];
  }
}

export default async function Home() {
  const dbPosts = await getDbPosts();
  
  // Merge static and dynamic posts, remove duplicates by slug, sort by date
  const allPostsMap = new Map();
  staticPosts.forEach(p => allPostsMap.set(p.slug, p));
  dbPosts.forEach((p: any) => allPostsMap.set(p.slug, {
    ...p,
    id: p.id.toString(), // Ensure id is string
    readTime: p.read_time // Map read_time to readTime for compatibility
  }));
  
  const allPosts = Array.from(allPostsMap.values()).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
      {/* Quick Tool Shortcuts */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
          <nav className="no-scrollbar flex items-center gap-2 overflow-x-auto sm:gap-3">
            <Link
              href="/tools/savings-plan"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100 sm:text-sm"
            >
              <span className="text-base">💰</span>
              선납이연
            </Link>
            <Link
              href="/tools/kpass-climate"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 transition-colors hover:bg-indigo-100 sm:text-sm"
            >
              <span className="text-base">🚌</span>
              K패스기후
            </Link>
            <Link
              href="/tools/future-savings"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#e8f3ff] px-3 py-1.5 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100 sm:text-sm"
            >
              <span className="text-base">✨</span>
              미래적금
            </Link>
            <Link
              href="/tools/tax-calculator"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 transition-colors hover:bg-indigo-100 sm:text-sm"
            >
              <span className="text-base">📊</span>
              이자세금
            </Link>
            <Link
              href="/tools/short-work"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 transition-colors hover:bg-orange-100 sm:text-sm"
            >
              <span className="text-base">👶</span>
              육아수당
            </Link>
            <Link
              href="/tools/child-tax-benefit"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-600 transition-colors hover:bg-teal-100 sm:text-sm"
            >
              <span className="text-base">🍼</span>
              보육비과세
            </Link>
            <Link
              href="/tools/fit-youth"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-600 transition-colors hover:bg-purple-100 sm:text-sm"
            >
              <span className="text-base">🏠</span>
              월세지원
            </Link>
            <Link
              href="/tools/njob-tax"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-600 transition-colors hover:bg-teal-100 sm:text-sm"
            >
              <span className="text-base">💸</span>
              N잡세금
            </Link>
            <Link
              href="/tools/car-bond"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-600 transition-colors hover:bg-green-100 sm:text-sm"
            >
              <span className="text-base">🚗</span>
              자동차채권
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              생활을 더 건강하고 풍요롭게
            </h1>
            <p className="mt-4 text-base text-gray-500 sm:text-lg">
              2026년 정부 정책, 복지 정보, 금융 팁을 한눈에 확인하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Reorganized Tools Section */}
        <div id="tools" className="space-y-12 scroll-mt-24">
          {/* 실시간 인기 도구 TOP 3 Section */}
          <section className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-3xl p-6 sm:p-8 border border-blue-100/50 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white text-base shadow-sm">
                  🔥
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">실시간 가장 많이 찾는 계산기 TOP 3</h2>
                  <p className="text-xs text-gray-500 mt-0.5">GA4 사용자 체류 시간 및 클릭률 기준 인기 도구</p>
                </div>
              </div>
            </div>
            
            <div className="grid gap-5 sm:grid-cols-3">
              {/* 1위: 청년미래적금 */}
              <div className="group relative rounded-2xl bg-white p-5 border border-blue-200/60 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
                      실시간 1위 🔥
                    </span>
                    <span className="text-xs font-bold text-blue-500">우대금리 진단</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    청년미래적금 자격&amp;수령액 계산기
                  </h3>
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                    2026년 6월 신설 청년미래적금 가입조건 판별 및 매칭금액 만기 수령액 시뮬레이션
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">평균 체류 시간 2분 26초</span>
                  <Link
                    href="/tools/future-savings"
                    className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    진단하기 →
                  </Link>
                </div>
              </div>

              {/* 2위: 적금 선납이연 */}
              <div className="group relative rounded-2xl bg-white p-5 border border-indigo-200/60 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700">
                      실시간 2위 ⚡
                    </span>
                    <span className="text-xs font-bold text-indigo-500">수익 극대화</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    적금 선납이연 플랜 계산기
                  </h3>
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                    6-1-5, 1-11 플랜과 파킹통장을 연계하여 이자를 2배로 불리는 추가 세후 이자 시뮬레이션
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">파킹 연계 기능 Up ✨</span>
                  <Link
                    href="/tools/savings-plan"
                    className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    계산하기 →
                  </Link>
                </div>
              </div>

              {/* 3위: K-패스 vs 기후동행카드 */}
              <div className="group relative rounded-2xl bg-white p-5 border border-gray-200/60 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-bold text-gray-700">
                      실시간 3위 🚌
                    </span>
                    <span className="text-xs font-bold text-gray-500">교통비 절약</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    K-패스 vs 기후동행카드 비교기
                  </h3>
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                    내 대중교통 이용 패턴과 월 승차 횟수를 입력하여 나에게 딱 맞는 최적의 교통카드를 판별
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">1분 만에 비교 완료</span>
                  <Link
                    href="/tools/kpass-climate"
                    className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    비교하기 →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Category 1: Financial Asset Management */}
          <section>
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                💰
              </span>
              <h2 className="text-xl font-bold text-gray-900">재테크 & 금융 관리</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-2xl border border-blue-200 bg-white p-6 transition-all hover:shadow-md">
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase text-blue-600">
                  New
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  적금 선납이연 플랜 계산기
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  6-1-5, 1-11 등 적금 이자를 극대화하는 선납이연 납입일자를 확인하세요.
                </p>
                <Link
                  href="/tools/savings-plan"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600"
                >
                  계산해보기 →
                </Link>
              </div>
              <div className="group rounded-2xl border border-indigo-200 bg-white p-6 transition-all hover:shadow-md">
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold uppercase text-indigo-600">
                  New
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-indigo-600">
                  2026 이자 세금 비교 계산기
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  일반, 저율과세, 비과세 중 내 연봉에 맞는 가장 유리한 저축을 찾으세요.
                </p>
                <Link
                  href="/tools/tax-calculator"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600"
                >
                  계산해보기 →
                </Link>
              </div>
              <div className="group rounded-2xl border border-blue-200 bg-white p-6 transition-all hover:shadow-md">
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase text-blue-600">
                  HOT
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  청년미래적금 자격&amp;수령액 계산기
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  2026년 6월 신설 청년미래적금 가입조건 판별 및 매칭금액 만기 수령액 시뮬레이션
                </p>
                <Link
                  href="/tools/future-savings"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600"
                >
                  판별해보기 →
                </Link>
              </div>
            </div>
          </section>

          {/* Category 2: Welfare & Support */}
          <section>
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                🎁
              </span>
              <h2 className="text-xl font-bold text-gray-900">정부 지원 & 복지 혜택</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-2xl border border-orange-200 bg-white p-6 transition-all hover:shadow-md">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600">
                  육아기 근로시간 단축 급여 계산기
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  단축근무 시 실제로 내가 받을 수 있는 급여를 모의 계산해보세요.
                </p>
                <Link
                  href="/tools/short-work"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-orange-600"
                >
                  확인하기 →
                </Link>
              </div>
              <div className="group rounded-2xl border border-purple-200 bg-white p-6 transition-all hover:shadow-md">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600">
                  청년 주거지원 대상자 판별기
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  내가 청년 주거지원 정책의 대상자인지 1분 만에 확인해보세요.
                </p>
                <Link
                  href="/tools/fit-youth"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600"
                >
                  확인하기 →
                </Link>
              </div>
              <div className="group rounded-2xl border border-indigo-200 bg-white p-6 transition-all hover:shadow-md">
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold uppercase text-indigo-600">
                  New
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-indigo-600">
                  K-패스 vs 기후동행카드 비교기
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  내 교통 패턴과 승차 횟수에 맞는 최적의 교통카드를 1분 만에 판별해 드립니다.
                </p>
                <Link
                  href="/tools/kpass-climate"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600"
                >
                  비교해보기 →
                </Link>
              </div>
            </div>
          </section>

          {/* Category 3: Living & Tax */}
          <section>
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                🏠
              </span>
              <h2 className="text-xl font-bold text-gray-900">생활 밀착 & 세금 관리</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-2xl border border-teal-200 bg-white p-6 transition-all hover:shadow-md">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600">
                  N잡러 세금·건보료 폭탄 계산기
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  부업 수익 발생 시 건강보험료 인상과 피부양자 탈락 리스크를 확인하세요.
                </p>
                <Link
                  href="/tools/njob-tax"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-teal-600"
                >
                  계산해보기 →
                </Link>
              </div>
              <div className="group rounded-2xl border border-green-200 bg-white p-6 transition-all hover:shadow-md">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600">
                  자동차 미환급 채권 환급금 계산기
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  차량 구매 시 의무 매입한 채권, 지금 바로 돌려받을 수 있는 금액을 확인하세요.
                </p>
                <Link
                  href="/tools/car-bond"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-green-600"
                >
                  조회하기 →
                </Link>
              </div>
              <div className="group rounded-2xl border border-teal-200 bg-white p-6 transition-all hover:shadow-md">
                <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase text-teal-600">
                  New
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-teal-600">
                  보육수당 자녀별 비과세 계산기
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  2026 자녀별 월 20만 원 보육수당 비과세 개편으로 매월 늘어나는 실수령액 계산
                </p>
                <Link
                  href="/tools/child-tax-benefit"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-teal-600"
                >
                  계산하기 →
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Blog Posts Grid */}
        <div id="blog" className="mt-20 scroll-mt-24">
          <div className="mb-8 flex items-end justify-between border-t border-gray-100 pt-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                최신 정보 및 가이드
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                누구나 쉽게 이해할 수 있는 복지·금융 가이드
              </p>
            </div>
            <span className="text-sm text-gray-400">
              총 {allPosts.length}개의 콘텐츠
            </span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
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
                    {(() => {
                      const map: Record<string, string> = {
                        housing: "주거",
                        tax: "세금",
                        welfare: "복지",
                        saving: "자산",
                        car: "차량",
                      };
                      return map[post.category] ?? post.category;
                    })()}
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

        {/* 하단 구독 알림 카드 */}
        <div className="mt-20">
          <SubscribeCard />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

