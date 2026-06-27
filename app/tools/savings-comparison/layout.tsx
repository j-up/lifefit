import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "청년도약계좌 vs 청년미래적금 비교 계산기 | LifeFit",
  description:
    "5년 만기 청년도약계좌(최대 70만원)와 3년 만기 청년미래적금(최대 50만원)의 금리, 비과세 혜택, 정부 기여금 매칭을 비교하고 내게 맞는 최적의 목돈 마련 적금을 시뮬레이션해 드립니다.",
  keywords: [
    "청년도약계좌",
    "청년미래적금",
    "도약계좌 미래적금 비교",
    "청년도약계좌 청년미래적금",
    "청년 적금 비교",
    "목돈 마련 계산기",
    "청년 금융 혜택",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/savings-comparison",
  },
  openGraph: {
    title: "청년도약계좌 vs 청년미래적금 비교 시뮬레이터 | LifeFit",
    description: "내 연봉과 저축 가능 금액을 입력하여 청년도약계좌와 청년미래적금의 만기 원리금, 정부 지원금, 실질 연 환산 이율을 한눈에 비교해 보세요.",
    url: "https://lifefit.kr/tools/savings-comparison",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
