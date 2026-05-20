import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 예적금 이자 세금 계산기 | 시중은행 vs 상호금융 실수령액 비교",
  description:
    "2026년 세율 인상을 반영한 이자 소득세 계산기입니다. 시중은행(15.4%)과 상호금융(저율과세)의 실수령액 차이를 한눈에 비교해 보세요.",
  keywords: [
    "이자 세금 계산기",
    "이자소득세 계산",
    "상호금융 저율과세",
    "비과세 종합저축",
    "2026 이자 세율",
    "예적금 실수령액",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/tax-calculator",
  },
  openGraph: {
    title: "2026 예적금 이자 세금 및 실수령액 비교 계산기",
    description: "세금 떼고 실제로 얼마 받을까? 시중은행과 신협/새마을금고 혜택을 즉시 비교하세요.",
    url: "https://lifefit.kr/tools/tax-calculator",
    images: [
      {
        url: "/og-tax-calculator.png",
        width: 1200,
        height: 630,
        alt: "이자 세금 비교 계산기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
