import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 육아기 근로시간 단축 급여 계산기 | 실수령액 모의계산",
  description:
    "2026년 확대된 육아기 근로시간 단축 제도! 줄어든 월급만큼 고용보험에서 얼마나 지원받을 수 있는지, 내 예상 실수령액을 1분 만에 완벽하게 모의계산해 보세요.",
  keywords:
    "2026 육아기 근로시간 단축 급여 계산기, 단축근무 급여, 육아휴직 급여 계산, 육아 단축근무 실수령액, 2026 단축근무 급여 모의계산, 고용보험 육아수당",
  openGraph: {
    title: "2026 육아기 근로시간 단축 급여 계산기 | 실수령액 모의계산",
    description:
      "단축근무 신청 전 필수 확인! 내 월급 기준으로 회사 지급액과 고용보험 지원금을 합산한 예상 실수령액을 정확히 모의계산합니다.",
    url: "https://lifefit.kr/tools/short-work",
    siteName: "LifeFit",
    images: [
      {
        url: "https://lifefit.kr/og-short-work.png",
        width: 1200,
        height: 630,
        alt: "2026 육아기 단축근무 급여 계산기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function ShortWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
