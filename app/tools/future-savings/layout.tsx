import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "청년미래적금 계산기 | 자격 판별 & 최대 만기 수령액 시뮬레이터",
  description:
    "2026년 6월 출시되는 청년미래적금의 우대형/일반형 가입 자격을 1분 만에 판별하고, 납입액(최대 50만 원)에 따른 비과세 혜택 및 정부 매칭 기여금을 합산한 최종 만기 실수령액을 모의 계산해 드립니다.",
  keywords: [
    "청년미래적금",
    "청년미래적금 계산기",
    "청년미래적금 자격",
    "청년미래적금 혜택",
    "2026 청년적금",
    "정부 기여금 적금",
    "청년 비과세 적금",
    "재테크 계산기",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/future-savings",
  },
  openGraph: {
    title: "청년미래적금 자격 판별 & 만기 수령액 계산기",
    description: "내 나이와 소득으로 청년미래적금 가입 대상인지 확인하고, 만기 시 정부 기여금과 비과세 혜택을 더한 예상 금액을 1분 만에 시뮬레이션해 보세요.",
    url: "https://lifefit.kr/tools/future-savings",
    images: [
      {
        url: "/og-future-savings.png",
        width: 1200,
        height: 630,
        alt: "청년미래적금 계산기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
