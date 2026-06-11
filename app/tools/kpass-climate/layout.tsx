import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "K패스 vs 기후동행카드 비교 계산기 | 2026 대중교통 할인 혜택 비교",
  description:
    "내 대중교통 이용 패턴에 맞는 최적의 교통카드를 찾아보세요. 서울 기후동행카드 무제한 정기권과 전국 K패스(k패스) 환급(캐시백) 혜택을 1분 만에 시뮬레이션하고 대중교통비를 절약하세요.",
  keywords: [
    "K패스",
    "k패스",
    "K패스 기후동행카드 비교",
    "대중교통 할인 계산기",
    "기후동행카드 청년",
    "K패스 청년",
    "교통카드 비교",
    "기후동행카드 계산기",
    "K패스 환급금 계산기",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/kpass-climate",
  },
  openGraph: {
    title: "K-패스 vs 기후동행카드 1분 비교 계산기",
    description: "매달 나가는 교통비, 더 많이 환급받는 카드는? 기후동행카드와 K-패스 혜택을 1분 만에 비교하고 매달 커피값을 아끼세요.",
    url: "https://lifefit.kr/tools/kpass-climate",
    images: [
      {
        url: "/og-kpass-climate.png", // Fallback / default og can be handled or custom image
        width: 1200,
        height: 630,
        alt: "K-패스 vs 기후동행카드 비교 계산기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
