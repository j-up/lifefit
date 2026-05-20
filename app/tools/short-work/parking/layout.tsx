import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026년 파킹통장 금리 비교 & 이자 추천 계산기 | 주요 은행 혜택 한눈에",
  description:
    "토스뱅크, 카카오뱅크, 케이뱅크, 신한, 농협 등 2026년 최신 파킹통장 금리와 수수료 혜택을 실시간 비교하세요. 내 예상 예치금액을 입력하고 가장 많은 이자를 주는 통장을 추천받아 보세요.",
  keywords: [
    "파킹통장 금리비교",
    "파킹통장 추천",
    "2026 파킹통장 금리",
    "자유입출금 통장 이자",
    "인터넷은행 파킹통장",
    "토스 파킹통장",
    "카카오 세이프박스",
    "비상금통장 추천",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/short-work/parking",
  },
  openGraph: {
    title: "2026년 전국 파킹통장 금리 비교 & 내 맞춤 이자 계산기",
    description: "하루만 맡겨도 이자가 쏠쏠! 나에게 가장 높은 수익을 줄 파킹통장을 1초 만에 비교하고 확인해 보세요.",
    url: "https://lifefit.kr/tools/short-work/parking",
    images: [
      {
        url: "/og-parking-bank.png", // 파킹통장 비교 서비스 고유 OG 이미지
        width: 1200,
        height: 630,
        alt: "파킹통장 금리 비교 계산기",
      },
    ],
  },
};

export default function ParkingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
