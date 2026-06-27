import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026년 우리 아이 정부 지원금 캘린더 & 종합 계산기 | LifeFit",
  description:
    "아동의 출생일만 입력하면 부모급여, 아동수당, 첫만남이용권, 가정양육수당 등 2026년 기준 우리 아이가 자라며 받게 될 모든 수당과 정확한 지급 일정을 캘린더로 즉시 계산해 드립니다.",
  keywords: [
    "부모급여",
    "아동수당",
    "첫만남이용권",
    "양육수당",
    "아동수당 지급일",
    "육아 지원금",
    "아동수당 계산기",
    "정부 지원금 캘린더",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/child-benefits",
  },
  openGraph: {
    title: "우리 아이 정부 지원금 캘린더 & 종합 계산기 | LifeFit",
    description: "출생일 입력 시 우리 아이가 수령할 부모급여, 아동수당 등의 누적 지원금 총액과 매월 지급 일정을 타임라인 차트로 한눈에 모의 시뮬레이션해 보세요.",
    url: "https://lifefit.kr/tools/child-benefits",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
