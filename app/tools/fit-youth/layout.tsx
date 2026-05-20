import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 청년월세 특별지원 대상자 판별기 | 주거지원 혜택 확인",
  description:
    "내가 2026년 청년월세 특별지원 대상자인지 1분 만에 확인하세요. 중위소득 60% 기준과 자산 요건을 반영한 정확한 판별 결과를 제공합니다.",
  keywords: [
    "청년월세 특별지원",
    "청년 주거지원",
    "월세지원 대상 확인",
    "청년 주택드림 청약",
    "2026 청년 정책",
    "주거복지 판별기",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/fit-youth",
  },
  openGraph: {
    title: "2026 청년 월세지원 및 주거 정책 대상자 판별기",
    description: "나도 월 20만 원 받을 수 있을까? 복잡한 조건을 1분 만에 판별해 드립니다.",
    url: "https://lifefit.kr/tools/fit-youth",
    images: [
      {
        url: "/og-fit-youth.png",
        width: 1200,
        height: 630,
        alt: "청년 주거지원 판별기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
