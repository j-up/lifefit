import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "청년 우대형 통장 개설 가능 은행 비교 | 2026 금리 및 혜택 안내",
  description:
    "2026년 청년 우대형 통장을 개설할 수 있는 주요 은행들의 금리, 우대 조건, 가입 방법을 한눈에 비교하세요. KB국민, 신한, 우리, 하나, 농협 등 실제 상품 정보 확인.",
  keywords: [
    "청년 우대형 통장",
    "청년 우대형 통장 은행",
    "청년 우대형 통장 금리",
    "청년 우대형 통장 개설",
    "2026 청년 통장",
  ],
  openGraph: {
    title: "청년 우대형 통장 개설 가능 은행 비교",
    description:
      "2026년 청년 우대형 통장 상품을 제공하는 주요 은행들의 금리와 혜택을 비교해 보세요.",
    type: "website",
    locale: "ko_KR",
  },
};

interface BankInfo {
  name: string;
  productName: string;
  baseRate: string;
  primeRate: string;
  maxRate: string;
  note: string;
}

const BANKS: BankInfo[] = [
  {
    name: "KB국민은행",
    productName: "KB청년도약계좌",
    baseRate: "3.0%",
    primeRate: "4.0%",
    maxRate: "7.0%",
    note: "월 납입한도 70만 원, 정부 인센티브 별도",
  },
  {
    name: "신한은행",
    productName: "신한 청년내일저축계좌",
    baseRate: "3.0%",
    primeRate: "4.0%",
    maxRate: "7.0%",
    note: "자동이체·비대면 채널 가입 시 우대금리 적용",
  },
  {
    name: "우리은행",
    productName: "우리 청년도약계좌",
    baseRate: "3.0%",
    primeRate: "4.0%",
    maxRate: "7.0%",
    note: "만기 3년 또는 5년 선택 가능",
  },
  {
    name: "하나은행",
    productName: "하나 청년도약계좌",
    baseRate: "3.0%",
    primeRate: "4.0%",
    maxRate: "7.0%",
    note: "비대면 앱 하나원큐으로 간편 가입",
  },
  {
    name: "NH농협은행",
    productName: "NH청년도약계좌",
    baseRate: "3.0%",
    primeRate: "4.0%",
    maxRate: "7.0%",
    note: "지역 농·축협 및 NH스마트뱅킹 가입 가능",
  },
  {
    name: "IBK기업은행",
    productName: "i-ONE 청년도약계좌",
    baseRate: "3.0%",
    primeRate: "4.0%",
    maxRate: "7.0%",
    note: "중소기업 재직자 및 자영업자 추가 혜택",
  },
];

export default function BanksPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "청년 우대형 통장 은행 비교",
            url: "https://lifefit.kr/tools/fit-youth/banks",
            applicationCategory: "FinancialApplication",
            operatingSystem: "All",
            description: "2026년 청년도약계좌 등 청년 우대형 통장을 개설할 수 있는 주요 은행의 금리와 혜택을 비교합니다.",
          }),
        }}
      />
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
              {
                "@type": "ListItem",
                position: 2,
                name: "청년 주거지원 판별기",
                item: "https://lifefit.kr/tools/fit-youth",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "은행 비교",
                item: "https://lifefit.kr/tools/fit-youth/banks",
              },
            ],
          }),
        }}
      />
      <div className="mx-auto max-w-md">
        {/* 메인으로 가기 */}
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            ← 메인으로
          </Link>
          <Link
            href="/tools/fit-youth"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            ← 계산기로
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            청년 우대형 통장
            <br />
            개설 가능 은행
          </h1>
          <p className="mt-2 text-base leading-relaxed text-gray-500">
            2026년 기준 청년 우대형 통장(청년도약계좌)을 제공하는 주요 은행과
            금리를 비교해 보세요.
          </p>
        </div>

        {/* 은행 카드 리스트 */}
        <div className="space-y-3">
          {BANKS.map((bank) => (
            <div
              key={bank.name}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500">
                  {bank.name}
                </span>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-bold text-blue-700">
                  최대 {bank.maxRate}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                {bank.productName}
              </h2>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400">기본금리</p>
                  <p className="font-semibold text-gray-700">
                    {bank.baseRate}
                  </p>
                </div>
                <div className="h-8 w-px bg-gray-100" />
                <div>
                  <p className="text-xs text-gray-400">우대금리</p>
                  <p className="font-semibold text-gray-700">
                    +{bank.primeRate}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500">{bank.note}</p>
            </div>
          ))}
        </div>



        {/* 나이 배너 CTA */}
        <div className="mt-6 rounded-xl bg-blue-600 p-5 text-white">
          <p className="mb-1 text-sm font-medium opacity-90">
            아직 정책 대상 여부를 확인 안 하셨나요?
          </p>
          <h3 className="mb-3 text-lg font-bold">
            1분 만에 내 지원금 대상 확인하기
          </h3>
          <Link
            href="/tools/fit-youth"
            className="flex w-full items-center justify-center rounded-lg bg-white py-3.5 text-base font-bold text-blue-700 transition-transform active:scale-[0.98]"
          >
            메인 판별기 바로가기 →
          </Link>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-gray-400">
          제공되는 금리는 2026년 기준이며, 은행별 정책 변경에 따라 실제 가입
          시점과 다를 수 있습니다. 정확한 정보는 해당 은행 홈페이지 또는
          영업점에서 확인하세요.
        </p>
      </div>
    </main>
  );
}
