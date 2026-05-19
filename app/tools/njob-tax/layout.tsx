import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 N잡러 종합소득세 및 건보료 폭탄 계산기 | 피부양자 박탈 모의계산",
  description:
    "직장인 부업, 3.3% 프리랜서라면 필독! 2026년 최신 세법 기준, 5월 종합소득세 신고 후 내 건강보험료 인상액과 피부양자 탈락 리스크를 1분 만에 정확히 모의계산합니다.",
  keywords:
    "2026 N잡러 종합소득세 계산기, 프리랜서 건강보험료 폭탄, 부업 피부양자 박탈 기준, 3.3% 세금 건보료, 투잡 세금 모의계산, 스마트스토어 건보료, 투잡 건강보험료",
  openGraph: {
    title: "2026 N잡러 건보료 폭탄 계산기 | 피부양자 탈락 모의계산",
    description:
      "부업으로 번 돈, 건보료로 다 나간다? 2026년 기준 종소세 신고 후 피부양자 박탈 및 건보료 인상 위험을 지금 바로 모의계산해보세요.",
    url: "https://lifefit.kr/tools/njob-tax",
    siteName: "LifeFit",
    images: [
      {
        url: "https://lifefit.kr/og-njob-tax.png",
        width: 1200,
        height: 630,
        alt: "건보료 폭탄 계산기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function NJobTaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
