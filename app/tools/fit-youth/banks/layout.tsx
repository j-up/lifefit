import { Metadata } from "next";

export const metadata: Metadata = {
  title: "청년 주거지원 우대금리 은행 리스트 | 2026 청년월세 특별지원",
  description:
    "2026년 청년 주거지원 대상자라면 주목! 주택청약종합저축, 버팀목 전세자금대출 등 청년 우대금리를 제공하는 주요 은행 리스트와 혜택을 한눈에 확인하세요.",
  openGraph: {
    title: "청년 주거지원 우대금리 은행 리스트 | LifeFit",
    description: "내 지원금과 연계된 가장 유리한 은행 혜택을 찾아보세요.",
    url: "https://lifefit.kr/tools/fit-youth/banks",
    images: [{ url: "https://lifefit.kr/og-fit-youth-banks.png" }],
  },
};

export default function BanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
