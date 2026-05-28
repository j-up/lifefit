import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "보육수당 비과세 계산기 | 2026 자녀별 세금 절세 실수령액 계산",
  description:
    "2026년 개정된 자녀 1인당 월 20만 원 보육수당 비과세 혜택을 기반으로, 자녀 수와 연봉 구간별로 실제 아낄 수 있는 소득세 및 매월 추가되는 실수령액을 1분 만에 비교 시뮬레이션해 드립니다.",
  keywords: [
    "보육수당 비과세",
    "보육수당 비과세 계산기",
    "자녀 1인당 20만원 비과세",
    "2026 보육수당 개편",
    "소득세 절세 계산기",
    "직장인 보육수당",
    "실수령액 계산기",
    "재테크 계산기",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/child-tax-benefit",
  },
  openGraph: {
    title: "보육수당 비과세 개편 절세액 & 실수령액 계산기",
    description: "2026년 자녀 1인당 20만 원으로 확대된 보육수당 비과세! 내 자녀 수와 연봉에 맞춰 매달 월급이 얼마나 올라갈지 시뮬레이션해 보세요.",
    url: "https://lifefit.kr/tools/child-tax-benefit",
    images: [
      {
        url: "/og-child-tax-benefit.png",
        width: 1200,
        height: 630,
        alt: "보육수당 비과세 계산기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
