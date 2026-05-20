import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 육아기 단축근무 급여 계산기 | 고용보험 지원금 & 실수령액",
  description:
    "2026년 확대된 육아기 근로시간 단축 제도를 반영한 급여 계산기입니다. 회사 월급과 고용보험 지원금을 합산한 실제 통장 수령액을 확인하세요.",
  keywords: [
    "육아기 단축근무 급여",
    "단축근무 계산기",
    "육아기 근로시간 단축",
    "고용보험 육아수당",
    "2026 육아기 제도",
    "단축근무 실수령액",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/short-work",
  },
  openGraph: {
    title: "2026 육아기 근로시간 단축 급여 및 실수령액 모의계산기",
    description: "일은 줄이고 아이와 함께! 내가 받을 실제 월급이 얼마인지 지금 바로 계산해보세요.",
    url: "https://lifefit.kr/tools/short-work",
    images: [
      {
        url: "/og-short-work.png",
        width: 1200,
        height: 630,
        alt: "육아기 단축근무 급여 계산기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
