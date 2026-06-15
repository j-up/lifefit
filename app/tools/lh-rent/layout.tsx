import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LH 청년 전세임대주택 1·2·3순위 자격 판별기 | LifeFit",
  description:
    "2026년 LH 청년 전세임대주택 가입 기준에 맞춰 내가 몇 순위(1, 2, 3순위)에 해당하는지 진단하고, 원하는 보증금액별 매달 내야 하는 실제 LH 이자/임대료를 모의 계산해 보세요.",
  keywords: [
    "lh 청년 전세임대주택",
    "lh 청년 전세임대 3순위",
    "lh 청년 전세임대 자격",
    "lh 전세임대 이자 계산기",
    "청년 전세임대",
    "lh 청년전세",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/lh-rent",
  },
  openGraph: {
    title: "LH 청년 전세임대주택 1·2·3순위 자격 판별기 | LifeFit",
    description: "복잡한 LH 청년 전세임대주택의 순위 자격과 보증금 지원 시 납부해야 하는 월세(이자)를 1분 만에 판별해 드립니다.",
    url: "https://lifefit.kr/tools/lh-rent",
    images: [
      {
        url: "/og-lh-rent.png",
        width: 1200,
        height: 630,
        alt: "LH 청년 전세임대 자격 판별기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
