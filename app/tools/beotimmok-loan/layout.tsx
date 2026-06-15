import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "청년 버팀목 전세대출 한도 & 이자 계산기 | LifeFit",
  description:
    "2026년 청년 버팀목 전세자금대출 조건에 맞춘 예상 대출 한도와 소득별 이자율, 우대금리를 반영한 월별 실제 이자 납입액을 1분 만에 확인하세요.",
  keywords: [
    "청년 버팀목 전세대출",
    "버팀목 전세대출 한도",
    "버팀목 전세대출 금리",
    "버팀목 전세대출 계산기",
    "청년 전세대출",
    "재테크 계산기",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/beotimmok-loan",
  },
  openGraph: {
    title: "청년 버팀목 전세대출 한도 & 이자 계산기 | LifeFit",
    description: "내 연소득과 전세 보증금으로 대출 가능한 한도와 매월 내야 하는 이자를 빠르게 계산해 보세요.",
    url: "https://lifefit.kr/tools/beotimmok-loan",
    images: [
      {
        url: "/og-beotimmok-loan.png",
        width: 1200,
        height: 630,
        alt: "청년 버팀목 전세대출 계산기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
