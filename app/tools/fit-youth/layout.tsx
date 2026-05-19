import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 청년 주거지원 대상자 판별기 | 청년월세 특별지원 모의계산",
  description:
    "나는 청년월세 특별지원 대상일까? 2026년 기준 중위소득 및 재산 요건을 1분 만에 분석하여 월 20만 원 월세 지원 대상자인지 정확히 모의계산해 드립니다.",
  keywords:
    "2026 청년 주거지원, 청년월세 특별지원 대상자, 청년월세지원 모의계산, 청년월세 소득기준, 청년 주거지원 판별기, 중위소득 60% 계산, LH 청년월세",
  openGraph: {
    title: "2026 청년 주거지원 대상자 판별기 | 청년월세 모의계산",
    description:
      "복잡한 중위소득 60% 조건, 1분이면 확인 끝! 2026년 청년월세 특별지원 대상자인지 빠르고 정확하게 판별해 드립니다.",
    url: "https://lifefit.kr/tools/fit-youth",
    siteName: "LifeFit",
    images: [
      {
        url: "https://lifefit.kr/og-fit-youth.png",
        width: 1200,
        height: 630,
        alt: "2026 청년 주거지원 대상자 판별기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function FitYouthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
