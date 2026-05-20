import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "적금 선납이연 계산기 | 6-1-5, 1-11 이자 극대화 플랜",
  description:
    "적금 선납이연 방식을 활용해 이자 수익을 극대화하는 최적의 입금 일정을 계산해 드립니다. 6-1-5, 1-11, 6-6 등 다양한 플랜 비교.",
  keywords: [
    "선납이연 계산기",
    "적금 선납이연",
    "6-1-5 플랜",
    "1-11 플랜",
    "적금 이자 극대화",
    "재테크 계산기",
  ],
  alternates: {
    canonical: "https://lifefit.kr/tools/savings-plan",
  },
  openGraph: {
    title: "적금 선납이연 이자 수익 극대화 계산기",
    description: "같은 적금이라도 더 많은 이자를 받는 방법! 선납이연 플랜을 1분 만에 짜보세요.",
    url: "https://lifefit.kr/tools/savings-plan",
    images: [
      {
        url: "/og-savings-plan.png",
        width: 1200,
        height: 630,
        alt: "적금 선납이연 계산기",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
